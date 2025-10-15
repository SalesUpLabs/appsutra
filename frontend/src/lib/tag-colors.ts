/**
 * Tag accent colors utility
 * Colors cycle through blue -> green -> yellow
 */

export const TAG_ACCENT_COLORS = [
  '#2563EB', // Blue
  '#1DE165', // Green
  '#EB9010', // Yellow
] as const;

/**
 * Get tag accent color based on index
 * Colors cycle through blue -> green -> yellow
 */
export function getTagColor(index: number): string {
  return TAG_ACCENT_COLORS[index % TAG_ACCENT_COLORS.length];
}
