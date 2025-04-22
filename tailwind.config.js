/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: 'inherit',
            h1: {
              color: 'inherit',
            },
            h2: {
              color: 'inherit',
            },
            h3: {
              color: 'inherit',
            },
            h4: {
              color: 'inherit',
            },
            a: {
              color: 'inherit',
              '&:hover': {
                color: 'inherit',
              },
            },
            blockquote: {
              borderLeftColor: 'currentColor',
              fontStyle: 'italic',
              color: 'inherit',
            },
            strong: {
              color: 'inherit',
            },
            code: {
              color: 'inherit',
            },
            pre: {
              backgroundColor: 'var(--tw-prose-pre-bg)',
              color: 'inherit',
            },
            ol: {
              listStyleType: 'decimal',
            },
            ul: {
              listStyleType: 'disc',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  darkMode: 'class',
} 