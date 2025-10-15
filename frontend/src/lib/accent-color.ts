/**
 * Tag accent colors utility
 * Colors cycle through blue -> green -> yellow
 */

export const ACCENT_COLORS = [
  '#2563EB', // Blue
  '#1DE165', // Green
  '#EB9010', // Yellow
] as const;

/**
 * Get tag accent color based on index
 * Colors cycle through blue -> green -> yellow
 */
export function getAccentColor(index: number): string {
  return ACCENT_COLORS[index % ACCENT_COLORS.length];
}
