/**
 * Truncate text for mobile screens
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} - Truncated text with ellipsis if needed
 */
export function truncateForMobile(text, maxLength = 50) {
  if (typeof text !== "string") return "";

  const isMobile = window.innerWidth <= 768; // adjust breakpoint if needed

  if (isMobile && text.length > maxLength) {
    return text.slice(0, maxLength - 3) + "...";
  }

  return text;
}
