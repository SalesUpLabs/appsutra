import fs from "node:fs";
import fg from "fast-glob";
import matter from "gray-matter";
import { request } from "undici";

// Configuration
const TIMEOUT = 10000; // 10 seconds
const MAX_CONCURRENT = 5;
const RETRY_ATTEMPTS = 2;

// Find all listing files
const files = await fg(["listings/**/*.md"], { dot: false });

if (files.length === 0) {
  console.log("ℹ No listing files found");
  process.exit(0);
}

let failed = false;
let checkedCount = 0;
let totalUrls = 0;

console.log(`🔗 Checking links in ${files.length} listing(s)...\n`);

// Helper function to check a single URL
async function checkUrl(url, context, retries = RETRY_ATTEMPTS) {
  try {
    const response = await request(url, {
      method: "HEAD",
      timeout: TIMEOUT,
      headers: {
        'User-Agent': 'AppSutra-LinkChecker/1.0 (+https://github.com/salesuplabs/appsutra)'
      }
    });

    if (response.statusCode >= 400) {
      if (retries > 0) {
        console.log(`⚠️  ${context}: ${url} returned ${response.statusCode}, retrying...`);
        return await checkUrl(url, context, retries - 1);
      }
      console.error(`❌ ${context}: ${url} → HTTP ${response.statusCode}`);
      return false;
    }

    console.log(`✅ ${context}: ${url} → HTTP ${response.statusCode}`);
    return true;
  } catch (error) {
    if (retries > 0 && (error.code === 'UND_ERR_CONNECT_TIMEOUT' || error.code === 'ENOTFOUND')) {
      console.log(`⚠️  ${context}: ${url} failed (${error.code}), retrying...`);
      return await checkUrl(url, context, retries - 1);
    }

    console.error(`❌ ${context}: ${url} → ${error.message}`);
    return false;
  }
}

// Process files with concurrency control
const semaphore = new Array(MAX_CONCURRENT).fill(null);
let semaphoreIndex = 0;

async function processFile(file) {
  // Wait for available semaphore slot
  await new Promise(resolve => {
    const checkSlot = () => {
      if (semaphore[semaphoreIndex] === null) {
        semaphore[semaphoreIndex] = true;
        resolve();
      } else {
        setTimeout(checkSlot, 100);
      }
    };
    checkSlot();
  });

  const currentIndex = semaphoreIndex;
  semaphoreIndex = (semaphoreIndex + 1) % MAX_CONCURRENT;

  try {
    const raw = fs.readFileSync(file, "utf8");
    const { data } = matter(raw);

    if (!data) {
      console.error(`❌ ${file}: No YAML front-matter found`);
      failed = true;
      return;
    }

    // Collect URLs to check
    const urlsToCheck = [];

    if (data.website) {
      urlsToCheck.push({ url: data.website, field: 'website' });
    }

    if (data.logo) {
      urlsToCheck.push({ url: data.logo, field: 'logo' });
    }

    totalUrls += urlsToCheck.length;

    if (urlsToCheck.length === 0) {
      console.log(`ℹ️  ${file}: No URLs to check`);
      return;
    }

    // Check each URL
    for (const { url, field } of urlsToCheck) {
      const isValid = await checkUrl(url, `${file} (${field})`);
      if (isValid) {
        checkedCount++;
      } else {
        failed = true;
      }
    }

  } catch (error) {
    console.error(`❌ ${file}: Error reading file - ${error.message}`);
    failed = true;
  } finally {
    // Release semaphore slot
    semaphore[currentIndex] = null;
  }
}

// Process all files
const promises = files.map(processFile);
await Promise.all(promises);

console.log(`\n📊 Link Check Summary:`);
console.log(`   Valid URLs: ${checkedCount}`);
console.log(`   Total URLs: ${totalUrls}`);
console.log(`   Failed URLs: ${totalUrls - checkedCount}`);
console.log(`   Files processed: ${files.length}`);

if (failed) {
  console.log(`\n❌ Link check failed`);
  process.exit(1);
} else {
  console.log(`\n✅ All links are working!`);
}