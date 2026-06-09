/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        /* Brand */
        primary: "#4b88e4",
        primaryPurple: "#437cd3",
        primaryLight: "#5b84c4",
        primaryDark: "#2e466e",

        /* Layout */
        dashboardBg: "#f4f7f9",
        sidebarBg: "#212936",
        sidebarText: "#adb5bd",
        activeBg: "#385c99",
        pageBg: "#faf8fa",

        /* Base */
        white: "#ffffff",
        text: "#333333",
        grayText: "#6c757d",
        border: "#e9ecef",

        /* Forms */
        inputBorder: "#e0e0e0",
        inputFocus: "#4E72F8",
        placeholder: "#aaaaaa",
        link: "#4E72F8",
        error: "#ff4d4f",

        /* Status */
        info: "#767676",
        pending: "#5376c1",
        success: "#2ba17f",
        warning: "#eb8f0c",
        danger: "#e15f5f",

        /* Status Light */
        infoLight: "#f1f1f1",
        pendingLight: "#eef3ff",
        successLight: "#e8f7f2",
        warningLight: "#fff4df",
        dangerLight: "#ffe9e5",
      },

      spacing: {
        sidebar: "250px",
        header: "60px",
      },

      fontSize: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
      },
    },
  },

  plugins: [],
};