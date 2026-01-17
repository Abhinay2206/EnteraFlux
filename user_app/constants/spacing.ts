/**
 * GLP-1 Sentinel Design System - Spacing System
 * 8-point grid for consistent spacing throughout the app
 */

export const Spacing = {
    // Base 8pt grid
    space1: 4,   // 0.25rem - Tight spacing, icon padding
    space2: 8,   // 0.5rem  - Minimum touch target padding
    space3: 12,  // 0.75rem - Small gaps
    space4: 16,  // 1rem    - Default spacing unit
    space5: 20,  // 1.25rem - Comfortable spacing
    space6: 24,  // 1.5rem  - Section spacing
    space8: 32,  // 2rem    - Large section spacing
    space10: 40, // 2.5rem  - Major section breaks
    space12: 48, // 3rem    - Screen padding top/bottom
    space16: 64, // 4rem    - Extra large spacing
    space20: 80, // 5rem    - Maximum spacing

    // Semantic spacing aliases
    none: 0,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,

    // Screen padding
    screenPaddingHorizontal: 16,
    screenPaddingTop: 24,
    screenPaddingBottom: 24,

    // Card padding
    cardPadding: 16,
    cardPaddingSmall: 12,
    cardPaddingLarge: 20,

    // List item padding
    listItemPaddingVertical: 12,
    listItemPaddingHorizontal: 16,

    // Section spacing
    sectionSpacing: 24,
    sectionSpacingLarge: 32,

    // Input spacing
    inputSpacing: 12,
    inputPaddingHorizontal: 12,
    inputPaddingVertical: 12,

    // Button spacing
    buttonPaddingHorizontal: 24,
    buttonPaddingVertical: 12,
    buttonSpacing: 16,

    // Icon spacing
    iconMarginRight: 8,
    iconMarginLeft: 8,

    // Gap between elements
    gapXS: 4,
    gapSM: 8,
    gapMD: 16,
    gapLG: 24,
} as const;

// Border Radius
export const BorderRadius = {
    none: 0,
    sm: 8,   // Small elements, inputs
    md: 12,  // Buttons, cards
    lg: 16,  // Large cards
    xl: 24,  // Modals, bottom sheets
    full: 9999, // Pills, circular elements
} as const;

// Shadow/Elevation
export const Shadow = {
    none: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 5,
    },
    xl: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.15,
        shadowRadius: 25,
        elevation: 8,
    },
} as const;

// Touch Target Sizes (Accessibility)
export const TouchTarget = {
    minHeight: 48, // Minimum accessible touch target
    minWidth: 48,
    iconButton: 44, // Icon button size
} as const;

// Layout Breakpoints (for responsive design)
export const Breakpoints = {
    smallPhone: 320,
    phone: 375,
    largePhone: 414,
    tablet: 768,
    desktop: 1024,
} as const;

// Z-Index Levels
export const ZIndex = {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
} as const;

export default Spacing;
