/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./main.tsx",
    "./AcademyRouter.tsx",
    "./AcademyContext.tsx",
    "./Admin/**/*.tsx",
    "./Instructor/**/*.tsx",
    "./Learner/**/*.tsx",
    "./Public/**/*.tsx",
    "./Shared/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#3D52A0",
          hover: "#4E63B0",
          dark: "#2C3D80",
          muted: "rgba(61, 82, 160, 0.06)",
          border: "rgba(61, 82, 160, 0.15)",
        },
        teal: {
          DEFAULT: "#0FA4AF",
          light: "#AFDDE5",
          dark: "#0A8A93",
          50: "#F0FDFA",
        },
        terracotta: {
          DEFAULT: "#964734",
          light: "#B85A45",
        },
        lavender: {
          DEFAULT: "#ADBBDA",
          light: "#EDE8F5",
          dark: "#8697C4",
        },
        aliceblue: "#EDE8F5",
        navy: {
          DEFAULT: "#003135",
          light: "#024950",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          elevated: "#FFFFFF",
          hover: "#F5F2FA",
        },
        glass: {
          DEFAULT: "rgba(255, 255, 255, 0.75)",
          light: "rgba(255, 255, 255, 0.4)",
          border: "rgba(0, 49, 53, 0.06)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.04em", fontWeight: "800" }],
        "display-lg": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.035em", fontWeight: "800" }],
        "display-md": ["2.5rem", { lineHeight: "1.15", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-sm": ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.025em", fontWeight: "700" }],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.25rem",
        "4xl": "1.5rem",
      },
      boxShadow: {
        "glow": "0 0 30px rgba(61, 82, 160, 0.15)",
        "glow-lg": "0 0 60px rgba(61, 82, 160, 0.25)",
        "glow-sm": "0 0 15px rgba(61, 82, 160, 0.1)",
        "glow-teal": "0 0 30px rgba(15, 164, 175, 0.2)",
        "glass": "0 8px 32px rgba(0, 49, 53, 0.04)",
        "glass-lg": "0 16px 48px rgba(0, 49, 53, 0.06)",
        "elevated": "0 1px 3px rgba(0, 49, 53, 0.04), 0 1px 2px rgba(0, 49, 53, 0.02)",
        "elevated-lg": "0 10px 15px -3px rgba(0, 49, 53, 0.04), 0 4px 6px -4px rgba(0, 49, 53, 0.02)",
        "elevated-xl": "0 20px 25px -5px rgba(0, 49, 53, 0.04), 0 8px 10px -6px rgba(0, 49, 53, 0.02)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-down": "fadeInDown 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-left": "slideInLeft 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-right": "slideInRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "border-beam": "borderBeam 3s linear infinite",
        "gradient-shift": "gradientShift 8s ease-in-out infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 30px rgba(61, 82, 160, 0.15)" },
          "50%": { boxShadow: "0 0 60px rgba(61, 82, 160, 0.3)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        borderBeam: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};
