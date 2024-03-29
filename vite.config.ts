import { defineConfig, loadEnv } from "vite";

import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.OPENAI_API_KEY": JSON.stringify(env.OPENAI_API_KEY),
      "process.env.LOCAL_DEPLOY": JSON.stringify(env.LOCAL_DEPLOY),
      "process.env.USING_BACKEND": JSON.stringify(env.USING_BACKEND),
      "process.env.LOCAL_BACKEND_URL": JSON.stringify(env.LOCAL_BACKEND_URL),
    },
    plugins: [react()],
  };
});
