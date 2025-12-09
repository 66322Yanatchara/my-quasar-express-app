// quasar.config.ts
import { defineConfig } from '#q-app/wrappers'
import { config } from 'dotenv'

// โหลดไฟล์ .env
config()

export default defineConfig((ctx) => {
  return {
    boot: ['axios'],

    css: ['app.scss'],

    extras: [
      'roboto-font',
      'material-icons'
    ],

    build: {
      vueRouterMode: 'hash',

      // ⭐ ใส่ env ที่นี่เท่านั้น
      env: {
        API_URL: process.env.API_URL || 'http://localhost:3000',
      },

      esbuildTarget: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20'
      }
    },

    devServer: {
      server: { type: 'http' },
      open: true
    },

    framework: {
      config: {},
      plugins: []
    },

    animations: [],

    ssr: {
      prodPort: 3000,
      middlewares: ['render'],
      pwa: false
    },

    pwa: {
      workboxMode: 'GenerateSW'
    }
  }
})
