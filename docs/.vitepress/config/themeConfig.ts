const theme = {
    lastUpdatedText: 'Last Updated',
    logo: './img/toad.jpg',
    siteTitle: "EraserRain's Blog",
    nav: [
        { text: "Home", link: "/" },
        {
            text: "Blog",
            items: [
                {text: 'Frontend', link: '/frontend'},
                {text: 'Backend', link: '/backend'},
                {text: 'Ops', link: '/ops'},
                {text: 'Others', link: '/others'},
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
export default theme