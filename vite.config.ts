import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_API_KEY': JSON.stringify('cur_live_0mUnm9U8k2ly1QiT97glSz7bl0UfPGom9DETT1xI')
    },
    plugins: [react()],
    base: "/Portfolio/"
  }
})