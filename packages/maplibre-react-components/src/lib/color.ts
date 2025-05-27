export function hexToRgbString(hex: string): string {
  if (!/^#([0-9A-Fa-f]{6})$/.test(hex)) {
    throw new Error("Invalid color format #rrggbb.");
  }

  // Extrait les parties rouge, verte et bleue de la chaîne hexadécimale
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  // Retourne la chaîne formatée
  return `${r} ${g} ${b}`;
}
