const themeConfig = {
    lastUpdatedText: 'Last Updated',
    logo: "https://raw.githubusercontent.com/EraserandRain/ImageHosting/main/toad.jpg",
    siteTitle: "EraserRain's Blog",
    nav: [
        { text: "Home", link: "/" },
        {
            text: "Blog",
            items: [
                { text: 'Frontend', link: '/frontend' },
                { text: 'Backend', link: '/backend' },
                { text: 'Ops', link: '/ops' },
                { text: 'Others', link: '/others' },
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