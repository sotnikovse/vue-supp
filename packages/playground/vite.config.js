const path = require('path')
const viteAutoRoute = require('vite-plugin-auto-routes')

module.exports = {
  alias: {
    '/~/': path.resolve(__dirname, './src'),
  },
  plugins: [viteAutoRoute({ pagesDir: 'src/pages' })],
}
