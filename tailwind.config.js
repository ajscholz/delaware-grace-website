module.exports = {
  theme: {
    fontFamily: {
      display: ["Bebas Neue", "sans-serif"],
      body: ["Montserrat", "sans-serif"],
    },
    boxShadow: {
      sm: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
      default: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
      md: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
      lg: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
      xl: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      outline: "0 0 0 3px rgba(66, 153, 225, 0.5)",
      none: "none",
    },

    extend: {
      colors: {
        dgRed: {
          50: "#FEF4F5",
          100: "#FDE9EB",
          200: "#FBC7CC",
          300: "#F8A5AE",
          400: "#F26271",
          500: "#ED1F34",
          600: "#D51C2F",
          700: "#8E131F",
          800: "#6B0E17",
          900: "#470910",
        },
        dgBlue: {
          50: "#F6FBFE",
          100: "#EEF7FD",
          200: "#D4EAFB",
          300: "#BADEF8",
          400: "#86C5F2",
          500: "#52ACED",
          600: "#4A9BD5",
          700: "#31678E",
          800: "#254D6B",
          900: "#193447",
        },
        dgGreen: {
          50: "#FBFDF6",
          100: "#F6FAED",
          200: "#E9F3D1",
          300: "#DBECB5",
          400: "#C0DD7E",
          500: "#A5CF47",
          600: "#95BA40",
          700: "#637C2B",
          800: "#4A5D20",
          900: "#323E15",
        },
      },
      opacity: {
        10: ".1",
        20: ".2",
        30: ".3",
        40: ".4",
        60: ".6",
        70: ".7",
        80: ".8",
        90: ".9",
      },
      spacing: {
        xs: ".125rem",
        72: "18rem",
        84: "21rem",
        96: "24rem",
        108: "27rem",
        120: "30rem",
        132: "33rem",
        144: "36rem",
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
        full: "100%",
      },
    },
  },
  plugins: [],
}
