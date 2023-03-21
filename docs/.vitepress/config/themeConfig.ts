const themeConfig = {
    lastUpdatedText: 'Last Updated',
    logo: "https://raw.githubusercontent.com/EraserandRain/ImageHosting/main/toad.jpg",
    siteTitle: "EraserRain's Blog",
    nav: [
        { text: "Home", link: "/" },
        {
            text: "Blog",
            items: [
                { text: 'Frontend', link: '/Frontend' },
                { text: 'Backend', link: '/Backend' },
                { text: 'Ops', link: '/DevOps' },
                { text: 'Others', link: '/Others' },
            ]
        }
    ],
    socialLinks: [
        { icon: "github", link: "https://github.com/EraserandRain" }
    ],
    docFooter: {
        prev: '⬅',
        next: '➡'
    }
}
export default themeConfig