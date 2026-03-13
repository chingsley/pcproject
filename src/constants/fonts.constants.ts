/**
 * Font values in rem for responsive typography.
 */
export const FONTS = {
  FAMILY: {
    PRIMARY:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  SIZE: {
    SMALL: '0.75rem', // 12px at 16px base
    MEDIUM: '0.875rem', // 14px
    LARGE: '1rem', // 16px
    XLARGE: '1.25rem', // 20px
    XLARGEPLUS: '1.5rem', // 24px
    XXLARGE: '3rem', // 24px
  },
  WEIGHT: {
    THIN: 100,
    LIGHT: 300,
    NORMAL: 400,
    MEDIUM: 500,
    SEMIBOLD: 600,
    BOLD: 700,
  },
} as const;
