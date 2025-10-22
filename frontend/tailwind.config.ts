import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			'geist-sans': [
  				'GeistSans',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			// Fluid typography using clamp - scales from 1280px to 1728px viewport
  			'fluid-xs': 'clamp(0.688rem, 0.625rem + 0.156vw, 0.75rem)',      // 11px -> 12px
  			'fluid-sm': 'clamp(0.813rem, 0.75rem + 0.156vw, 0.875rem)',      // 13px -> 14px
  			'fluid-base': 'clamp(0.938rem, 0.875rem + 0.156vw, 1rem)',       // 15px -> 16px
  			'fluid-lg': 'clamp(1.063rem, 1rem + 0.156vw, 1.125rem)',         // 17px -> 18px
  			'fluid-xl': 'clamp(1.188rem, 1.063rem + 0.313vw, 1.25rem)',      // 19px -> 20px
  			'fluid-2xl': 'clamp(1.375rem, 1.188rem + 0.469vw, 1.5rem)',      // 22px -> 24px
  			'fluid-3xl': 'clamp(1.75rem, 1.5rem + 0.625vw, 1.875rem)',       // 28px -> 30px
  			'fluid-4xl': 'clamp(2rem, 1.75rem + 0.625vw, 2.25rem)',          // 32px -> 36px
  		},
  		spacing: {
  			// Fluid spacing using clamp
  			'fluid-1': 'clamp(0.188rem, 0.156rem + 0.078vw, 0.25rem)',      // 3px -> 4px
  			'fluid-2': 'clamp(0.375rem, 0.313rem + 0.156vw, 0.5rem)',       // 6px -> 8px
  			'fluid-3': 'clamp(0.563rem, 0.5rem + 0.156vw, 0.75rem)',        // 9px -> 12px
  			'fluid-4': 'clamp(0.75rem, 0.625rem + 0.313vw, 1rem)',          // 12px -> 16px
  			'fluid-5': 'clamp(0.938rem, 0.813rem + 0.313vw, 1.25rem)',      // 15px -> 20px
  			'fluid-6': 'clamp(1.125rem, 1rem + 0.313vw, 1.5rem)',           // 18px -> 24px
  			'fluid-8': 'clamp(1.5rem, 1.25rem + 0.625vw, 2rem)',            // 24px -> 32px
  			'fluid-10': 'clamp(1.875rem, 1.5rem + 0.938vw, 2.5rem)',        // 30px -> 40px
  			'fluid-12': 'clamp(2.25rem, 1.875rem + 0.938vw, 3rem)',         // 36px -> 48px
  			'fluid-16': 'clamp(3rem, 2.5rem + 1.25vw, 4rem)',               // 48px -> 64px
  		},
  		gap: {
  			// Fluid gaps
  			'fluid-2': 'clamp(0.375rem, 0.313rem + 0.156vw, 0.5rem)',       // 6px -> 8px
  			'fluid-3': 'clamp(0.563rem, 0.5rem + 0.156vw, 0.75rem)',        // 9px -> 12px
  			'fluid-4': 'clamp(0.75rem, 0.625rem + 0.313vw, 1rem)',          // 12px -> 16px
  			'fluid-5': 'clamp(0.938rem, 0.813rem + 0.313vw, 1.25rem)',      // 15px -> 20px
  			'fluid-6': 'clamp(1.125rem, 1rem + 0.313vw, 1.5rem)',           // 18px -> 24px
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
export default config