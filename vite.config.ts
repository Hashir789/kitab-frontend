import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  server: {
    allowedHosts: ['f49e-182-181-229-235.ngrok-free.app'],
  },
  plugins: [react()],
});