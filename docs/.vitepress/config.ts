/**
 * @type {import('vitepress').UserConfig}
 */
const themeConfig = require('./config/themeConfig')
// const plugins = require('./config/plugins')


module.exports = {
    lang: 'en-US',
    title: "EraserRain's Blog",
    description: "",
    appearance: 'dark',
    lastUpdated: true,
    cleanUrls: 'without-subfolders',
    outDir: '../public',
    themeConfig
}
