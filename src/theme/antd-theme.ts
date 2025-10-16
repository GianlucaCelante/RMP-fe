// src/theme/antd-theme.ts
import type { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
  token: {
    // Colors - Stripe style
    colorPrimary: '#635bff',
    colorSuccess: '#00d924',
    colorWarning: '#ffa500',
    colorError: '#df1b41',
    colorInfo: '#0073e6',

    // Typography
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    fontSize: 14,

    // Layout
    borderRadius: 8,
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      siderBg: '#fafafa',
      bodyBg: '#f7f9fc',
    },
    Card: {
      borderRadiusLG: 12,
    },
    Table: {
      headerBg: '#fafafa',
    },
  },
};