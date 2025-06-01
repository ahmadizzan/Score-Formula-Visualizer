// Generate a unique color based on the signal's ID
export function generateSignalColor(id: string): string {
  // Use a hash function to generate a consistent color from the ID
  const hash = id.split('').reduce((acc, char) => {
    acc = (acc << 5) - acc + char.charCodeAt(0);
    return acc & acc;
  }, 0);
  // Use the hash to generate HSL color with:
  // - Hue: full range (0-360)
  // - Saturation: 65-85% for good visibility but not too bright
  // - Lightness: 45-65% for good contrast
  const hue = Math.abs(hash % 360);
  const saturation = 75 + hash % 11; // 65-85
  const lightness = 55 + hash % 11; // 45-65
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}