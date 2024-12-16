// vite.config.js
export default {
    server: {
      port: 3000, // specify port if you want
    },
    envPrefix: 'VITE_', // this ensures only VITE_ prefixed env vars are exposed
    build: {
      outDir: 'dist', // output directory for build files
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    },
    base: '/find-local-dish/',
  }
