export class PageController {
    index(req, res) {
        res.view('pages/home', {
            name: 'Fachri Hawari'
        })
    }
    about(req, res) {
        res.view('pages/about', {
            name: 'Fachri Hawari'
        })
    }
    contact(req, res) {
        res.view('pages/contact', {
            name: 'Fachri Hawari'
        })
    }
}