export class PageController {

    index(req, res) {
        res.view('page/home', {
            name: 'Fachri Hawari'
        })
    }

    show() {
        
    }

    create() {
        
    }

    store(req, res) {        
        res.end("Store page")
    }

    edit() {
        
    }

    update() {
        
    }

    delete() {
        
    }
}