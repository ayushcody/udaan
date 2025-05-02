import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      tailwindcss({
        config: {
          content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
          ],
          theme: {
            extend: {
              colors: {
                primary: "#B3E5E1",
                secondary: "#96A8FF",
                accent: "#513B3B",
                formBg: "#BDBDBD",
                lightGray: "#D9D9D9",
              },
              borderRadius: {
                'large': '59px',
              },
              boxShadow: {
                'custom': '0px 4px 4px rgba(0, 0, 0, 0.25)',
              },
            },
          },
        }
      }),
    ],
    define: {
      'process.env': env
    }
  };
});