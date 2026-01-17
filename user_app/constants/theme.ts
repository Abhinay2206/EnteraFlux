/**
 * GLP-1 Sentinel Design System - Complete Theme
 * Integrates all design tokens with dark mode support
 */

import { Colors, getThemedColors, type ColorMode } from './colors';
import { Typography, TextStyles } from './typography';
import { Spacing, BorderRadius, Shadow, TouchTarget, ZIndex } from './spacing';

// Complete theme object
export const createTheme = (mode: ColorMode = 'light') => {
  const colors = getThemedColors(mode);

  return {
    mode,
    colors: {
      // Theme-aware colors
      ...colors,

      // Backwards-compatible aliases
      backgroundLight: colors.backgroundSecondary,
      textLight: colors.textTertiary,
      secondary: colors.info, // Using info blue as secondary

      // Raw color palette (for custom usage)
      palette: {
        primary: Colors.primary,
        success: Colors.success,
        advisory: Colors.advisory,
        warning: Colors.warning,
        error: Colors.error,
        info: Colors.info,
        gray: Colors.gray,
      },
    },
    typography: Typography,
    textStyles: TextStyles,
    spacing: Spacing,
    borderRadius: BorderRadius,
    shadow: Shadow,
    touchTarget: TouchTarget,
    zIndex: ZIndex,

    // Convenient fontSize shortcuts
    fontSize: {
      xs: Typography.caption.fontSize,
      sm: Typography.bodySmall.fontSize,
      md: Typography.body.fontSize,
      lg: Typography.h4.fontSize,
      xl: Typography.h3.fontSize,
      xxl: Typography.h2.fontSize,
    },
  } as const;
};

// Default light theme
export const lightTheme = createTheme('light');

// Dark theme
export const darkTheme = createTheme('dark');

// Type for theme
export type Theme = ReturnType<typeof createTheme>;

// Default export
export default lightTheme;