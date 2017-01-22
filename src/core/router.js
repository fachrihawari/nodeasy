import config from '../config/app'

export class Router {
    constructor (req, res) {
        this.req = req
        this.res = res
    }
    run() {
        this.onErrorRequest()
        this.onErrorResponse()
        this.findRoute()
    }
    findRoute() {
        if (this.req.method === 'GET' && this.req.url === '/echo') {
            this.req.pipe(this.res)
        }
        else 
            this.onNotFound()
        
    }
    setHeaders() {
        this.res.setHeader('X-Powered-By', 'nodeasy')  
    }
    onNotFound() {    
        this.res.statusCode = 404    
        this.res.end('Not Found!')
    }
    onErrorRequest() {
        this.req.on('error', (err) => {
            console.error(err)
            this.res.statusCode = 400
            this.res.end()
        })
    }
    onErrorResponse() {
        this.res.on('error', (err) => {
            console.error(err)
        })
    }
}

export class Route  {
    constructor() {
        
    }
    default(url, target) {
        let [ controller, method ] = target.split('@')
        console.log(controller, method)
    }
    get(url, target) {
        this.default(url, target)
    }
    post() {

    }
    put() {

    }
    patch() {

    }
    delete() {

    }
}