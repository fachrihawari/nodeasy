export class PageController {
    index(req, res) {
        res.view('page/home', {
            name: 'Fachri Hawari'
        })
    }
    about(req, res) {
        res.view('page/about', {
            name: 'Fachri Hawari'
        })
    }
    contact(req, res) {
        res.view('page/contact', {
            name: 'Fachri Hawari'
        })
    }
}