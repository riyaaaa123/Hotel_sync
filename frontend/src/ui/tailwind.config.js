module.exports = {
  // ...

  theme: {
    extend: {
      colors: {
        brand: {
          50: "rgb(245, 243, 255)",
          100: "rgb(237, 233, 254)",
          200: "rgb(221, 214, 254)",
          300: "rgb(196, 181, 253)",
          400: "rgb(167, 139, 250)",
          500: "rgb(139, 92, 246)",
          600: "rgb(124, 58, 237)",
          700: "rgb(109, 40, 217)",
          800: "rgb(91, 33, 182)",
          900: "rgb(76, 29, 149)",
        },
        neutral: {
          0: "rgb(255, 255, 255)",
          50: "rgb(249, 250, 251)",
          100: "rgb(243, 244, 246)",
          200: "rgb(229, 231, 235)",
          300: "rgb(209, 213, 219)",
          400: "rgb(156, 163, 175)",
          500: "rgb(107, 114, 128)",
          600: "rgb(75, 85, 99)",
          700: "rgb(55, 65, 81)",
          800: "rgb(31, 41, 55)",
          900: "rgb(17, 24, 39)",
          950: "rgb(3, 7, 18)",
        },
        error: {
          50: "rgb(255, 241, 242)",
          100: "rgb(255, 228, 230)",
          200: "rgb(254, 205, 211)",
          300: "rgb(253, 164, 175)",
          400: "rgb(251, 113, 133)",
          500: "rgb(244, 63, 94)",
          600: "rgb(225, 29, 72)",
          700: "rgb(190, 18, 60)",
          800: "rgb(159, 18, 57)",
          900: "rgb(136, 19, 55)",
        },
        warning: {
          50: "rgb(255, 247, 237)",
          100: "rgb(255, 237, 213)",
          200: "rgb(254, 215, 170)",
          300: "rgb(253, 186, 116)",
          400: "rgb(251, 146, 60)",
          500: "rgb(249, 115, 22)",
          600: "rgb(234, 88, 12)",
          700: "rgb(194, 65, 12)",
          800: "rgb(154, 52, 18)",
          900: "rgb(124, 45, 18)",
        },
        success: {
          50: "rgb(247, 254, 231)",
          100: "rgb(236, 252, 203)",
          200: "rgb(217, 249, 157)",
          300: "rgb(190, 242, 100)",
          400: "rgb(163, 230, 53)",
          500: "rgb(132, 204, 22)",
          600: "rgb(101, 163, 13)",
          700: "rgb(77, 124, 15)",
          800: "rgb(63, 98, 18)",
          900: "rgb(54, 83, 20)",
        },
        "brand-primary": "rgb(124, 58, 237)",
        "default-font": "rgb(17, 24, 39)",
        "subtext-color": "rgb(107, 114, 128)",
        "neutral-border": "rgb(229, 231, 235)",
        white: "rgb(255, 255, 255)",
        "default-background": "rgb(255, 255, 255)",
      },
      fontSize: {
        caption: [
          "12px",
          {
            lineHeight: "16px",
            fontWeight: "400",
            letterSpacing: "0em",
          },
        ],
        "caption-bold": [
          "12px",
          {
            lineHeight: "16px",
            fontWeight: "500",
            letterSpacing: "0em",
          },
        ],
        body: [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "400",
            letterSpacing: "0em",
          },
        ],
        "body-bold": [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "500",
            letterSpacing: "0em",
          },
        ],
        "heading-3": [
          "16px",
          {
            lineHeight: "20px",
            fontWeight: "600",
            letterSpacing: "0em",
          },
        ],
        "heading-2": [
          "20px",
          {
            lineHeight: "24px",
            fontWeight: "600",
            letterSpacing: "0em",
          },
        ],
        "heading-1": [
          "30px",
          {
            lineHeight: "36px",
            fontWeight: "600",
            letterSpacing: "0em",
          },
        ],
        "monospace-body": [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "400",
            letterSpacing: "0em",
          },
        ],
      },
      fontFamily: {
        caption: '"Public Sans"',
        "caption-bold": '"Public Sans"',
        body: '"Public Sans"',
        "body-bold": '"Public Sans"',
        "heading-3": '"Public Sans"',
        "heading-2": '"Public Sans"',
        "heading-1": '"Public Sans"',
        "monospace-body": "monospace",
      },
      boxShadow: {
        sm: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
        default: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
        md: "0px 4px 16px -2px rgba(0, 0, 0, 0.08), 0px 2px 4px -1px rgba(0, 0, 0, 0.08)",
        lg: "0px 12px 32px -4px rgba(0, 0, 0, 0.08), 0px 4px 8px -2px rgba(0, 0, 0, 0.08)",
        overlay:
          "0px 12px 32px -4px rgba(0, 0, 0, 0.08), 0px 4px 8px -2px rgba(0, 0, 0, 0.08)",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        DEFAULT: "8px",
        lg: "12px",
        full: "9999px",
      },
      container: {
        padding: {
          DEFAULT: "16px",
          sm: "calc((100vw + 16px - 640px) / 2)",
          md: "calc((100vw + 16px - 768px) / 2)",
          lg: "calc((100vw + 16px - 1024px) / 2)",
          xl: "calc((100vw + 16px - 1280px) / 2)",
          "2xl": "calc((100vw + 16px - 1536px) / 2)",
        },
      },
      spacing: {
        112: "28rem",
        144: "36rem",
        192: "48rem",
        256: "64rem",
        320: "80rem",
      },
      screens: {
        mobile: {
          max: "767px",
        },
      },
    },
  },
};
