/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    // Legacy aliases (kept for backward compatibility)
    text: '#10234B',
    tint: '#175BFF',

    // Core surfaces
    background: '#F7F9FC',
    foreground: '#10234B',

    // Cards / elevated surfaces
    card: '#FFFFFF',
    cardForeground: '#10234B',

    // Primary action color (buttons, links, active states)
    primary: '#175BFF',
    primaryDeep: '#0A2456',
    primaryForeground: '#ffffff',

    // Secondary / less-emphasis interactive surfaces
    secondary: '#EEF2F8',
    secondaryForeground: '#10234B',

    // Muted / subdued elements (dividers, timestamps, placeholders)
    muted: '#EEF2F8',
    mutedForeground: '#737373',

    // Accent highlights (badges, selected items, focus rings)
    accent: '#DDF7F0',
    accentForeground: '#10234B',

    // Destructive actions (delete, error states)
    destructive: '#E16363',
    destructiveForeground: '#ffffff',

    // Borders and input outlines
    border: '#E4EAF2',
    input: '#E4EAF2',
    blueSoft: '#E9F1FF',
    blueWash: '#F0F5FF',
    blueBorder: '#D6E5FF',
    mint: '#4BC6B9',
    mintSoft: '#DDF7F0',
    mintBorder: '#C9EEE5',
    success: '#229C72',
    warning: '#B77B21',
    amberSoft: '#FFF0D9',
    coral: '#E88972',
    heroText: '#D8E4FF',
    timelineDone: '#A8DECF',
    timelineBorder: '#CFE0FF',
  },

  // Border radius (in px). Sync from the sibling web artifact's --radius
  // CSS variable. This value applies to cards, buttons, inputs, and modals.
  radius: 8,
};

export default colors;
