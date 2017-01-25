import config from '../config/app'
import webRoutes from '../routes/web'
import path from 'path'
import fs from 'fs'
import { View } from './View'

export class Router {
    constructor (req, res) {
        this.req = req
        this.res = res
    }
    run() {

        this.onError()
        this.setHeaders()
        this.findRoute()
        
    }
    
    findRoute() {


        let routeCollection = webRoutes.collection 
        let self = this


        this.addResponse('view', (filename, params = {}) =>  {
            self.res.write(new View(filename, params).render())
        })


        let result = routeCollection.filter(function(v,i,a) {
            return v.verb == self.req.method && v.url == self.req.url
        })

        if (result.length)
            this.findController(result[0])
        else
            this.onNotFound()


        
        
    }

    addResponse(key, value) {
        this.res[key] = value
    }

    findController(route) {

        let self = this
            
        let { verb, url, target } = route        

        if (typeof target === 'function') {
            target(this.req, this.res)
            this.res.end()
        } else {
            let [ controllerName, methodName ] = target.split("@")        
            let fileName = path.join(config.directory.controller, controllerName+".js")
            let cb = fs.exists(fileName, (exists) => {
                if (exists) {
                    let controllerClass = require(fileName)[controllerName]
                    let controllerInstance = new controllerClass()
                    controllerInstance[methodName](self.req, self.res)
                    this.res.end()
                } else {
                    self.onNotFound()
                }
            })   
        }   


    }
    setHeaders() {

        this.res.setHeader('X-Powered-By', 'nodeasy')  

    }
    onNotFound() {    
        this.res.statusCode = 404    
        self.res.end()
    }
    onError() {

        this.req.on('error', (err) => {
            console.error(err)
            this.res.statusCode = 400
            this.res.end()
        })

        this.res.on('error', (err) => {
            console.error(err)
        })

    }
}


