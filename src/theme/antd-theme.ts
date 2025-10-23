// src/theme/antd-theme.ts

import { ThemeConfig } from 'antd';

/**
 * Ant Design theme configuration
 * Inspired by Stripe's design system
 */
export const antdTheme: ThemeConfig = {
  token: {
    // Primary Colors
    colorPrimary: '#635bff',        // Stripe purple/blue
    colorSuccess: '#00d924',        // Success green
    colorWarning: '#ffa500',        // Warning orange
    colorError: '#df1b41',          // Error red
    colorInfo: '#635bff',           // Info (same as primary)

    // Background Colors
    colorBgLayout: '#f6f9fc',       // Page background
    colorBgContainer: '#ffffff',    // Card/Container background
    colorBgElevated: '#ffffff',     // Elevated elements (dropdown, modal)

    // Text Colors
    colorText: '#1a1f36',           // Primary text
    colorTextSecondary: '#697386',  // Secondary text
    colorTextTertiary: '#8898aa',   // Tertiary text
    colorTextQuaternary: '#c6ccd5', // Quaternary text

    // Border Colors
    colorBorder: '#e3e8ee',         // Default border
    colorBorderSecondary: '#f0f3f7',// Secondary border

    // Border Radius
    borderRadius: 8,                // Default border radius
    borderRadiusLG: 12,             // Large border radius
    borderRadiusSM: 6,              // Small border radius

    // Font
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
    fontSize: 14,
    fontSizeLG: 16,
    fontSizeSM: 12,

    // Box Shadow
    boxShadow: '0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02)',
    boxShadowSecondary: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      headerHeight: 64,
      headerPadding: '0 24px',
      siderBg: '#ffffff',
      bodyBg: '#f6f9fc',
    },
    Menu: {
      itemBg: 'transparent',
      itemSelectedBg: 'rgba(99, 91, 255, 0.08)',
      itemSelectedColor: '#635bff',
      itemHoverBg: '#f6f9fc',
      itemHoverColor: '#1a1f36',
      itemColor: '#697386',
      iconSize: 20,
    },
    Button: {
      primaryShadow: 'none',
      controlHeight: 40,
      controlHeightLG: 48,
      controlHeightSM: 32,
    },
    Table: {
      headerBg: '#f6f9fc',
      headerColor: '#697386',
      borderColor: '#e3e8ee',
    },
    Card: {
      boxShadow: '0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02)',
    },
    Input: {
      controlHeight: 40,
      borderRadius: 6,
    },
    Select: {
      controlHeight: 40,
    },
  },
};