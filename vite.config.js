import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({  
  base: '/final_project/',  
  plugins: [react()],  
  build: {  
    sourcemap: false,  
  },  
})
