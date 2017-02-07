import * as config from '../config'
import * as http from 'http'
import * as fs from 'fs'
import * as util from 'util'
import * as path from 'path'
import * as url from 'url'
import * as pathToRegexp from 'path-to-regexp'
import * as ES6Promise from 'es6-promise'
import { View } from './View'
import webRoutes from '../routes/web'

export class Router {

    req: http.ServerRequest
    res: http.ServerResponse

    constructor (req, res) {
        this.req = req
        this.res = res
        console.log(req.method, req.url)
    }

    run() {
        this.onError()
        this.setHeaders()
        this.findRoute()
    }

	findForResponse(result) {
        let self = this
		// parse URL
		let parsedUrl = url.parse(this.req.url)
		// extract URL path
		let pathname =  path.join(config.directory.public, `${parsedUrl.pathname}`)

        // based on the URL path, extract the file extention. e.g. .js, .doc, ...
        let uglyExt = path.parse(pathname).ext

        let ext = uglyExt.replace('.','')

        let mime = config.mimes[ext]

        if ( ! ext || mime === undefined) {
            /*
             * call route if no have extension
             */
            this.findController(result)
        } else {

            /*
             * Find file if have extension
             */
            fs.exists(pathname, (exist) => {
                if(!exist) {
                    self.res.statusCode = 404
                    self.res.end(`File ${parsedUrl.pathname} not found!`)
                } else {

                    // if is a directory
                    if ( ! fs.statSync(pathname).isDirectory() ) {

                        // read file from file system
                        fs.readFile(pathname, function(err, data){
                            if(err){
                                self.res.statusCode = 500
                                self.res.end(`Error getting the file: ${err}.`)
                                console.log(`Error getting the file: ${err}.`)
                            } else {
                                // if the file is found, set Content-type and send data
                                self.res.setHeader('Content-type', mime || 'text/plain' )
                                self.res.end(data)

                            }

                       })
                    }
                }
            })
        }
	}

    addResponses() {
        let self = this
        this.addResponse('view', (filename, params = {}) =>  {
            self.res.write(new View(filename, params).render())
            self.res.end()
        })

        this.addResponse('dump', (data) =>  {            // self.res.writeHead(200, { "Content-Type": "application/json" });
            self.res.end(util.inspect(data));
        })

        var body: any = []
        self.req.on('data', function(chunk) {
            body.push(chunk)
        }).on('end', function() {
            body = Buffer.concat(body).toString()
            let objectBody: any = {}
            let datas = body.split('&')
            for (let data of datas ) {
                let [key, value] = data.split('=')
                objectBody[key] = value
            }
            self.addRequest('body', objectBody)
        })
    }

    findRoute() {

        let routeCollection = webRoutes.collection
        let self = this

        this.addResponses()

        let result = routeCollection.filter(function(v,i,a) {
            let keys = []
            let re: pathToRegexp.PathRegExp = pathToRegexp(<string> v.url, keys)
            return v.verb == self.req.method && re.test(self.req.url)
        })

        let currentRoute: any = result.length == 1 ? result[0] : {}

        this.findForResponse(currentRoute)
    }

    /**
     * @param currentRoute: Object 
     */
    addRequestParams(currentRoute) {

        let keys = []
        let re: pathToRegexp.PathRegExp = pathToRegexp(<string> currentRoute.url, keys)
        let params = re.exec(this.req.url)
        var reqParams = {}

        for ( let param of params) {
            let index = params.indexOf(param)
            if ( index > 0 )
                reqParams[keys[index - 1].name] = param
        }
        this.addRequest('params', reqParams)
    }

    addResponse(key, value) {
        this.res[key] = value
    }

    addRequest(key, value) {
        this.req[key] = value
    }

    findController(route) {

        let self = this

        let { verb, url, target } = route

        if (verb == undefined)  {
            this.onNotFound()
            return
        }


        this.addRequestParams(route)

        if (typeof target === 'function') {
            target(this.req, this.res)
            this.res.end()
        } else {

            let [ controllerName, methodName ] = target.split("@")
            let fileName = path.join(config.directory.controller, controllerName + ( process.env.NODE_ENV === 'production' ? '.js': '.ts' ))

            let cb = fs.exists(fileName, (exists) => {

                if (exists) {

                    let controllerClass = require(fileName)[controllerName]
                    let controllerInstance = new controllerClass()

                    try {
                        controllerInstance[methodName](self.req, self.res)
                    } catch (err) {
                        this.res.end(`Method ${methodName} not found in controller ${controllerName}`)
                    }

                 } else {
                    this.res.end(`Controller ${controllerName} not found`)
                }
            })
        }


    }

    triggerPromise(something) {
        let self = this
        let promise = new ES6Promise.Promise((resolve, reject) => {
            resolve(something)
        });

        promise.then((something: Function) => {
            self.res.end()
        })
    }

    setHeaders() {

        this.res.setHeader('X-Powered-By', 'nodeasy')

    }

    onNotFound() {
        this.res.statusCode = 404
        this.res.write('Not Found!')
        this.res.end()
    }

    onError() {
        let self = this
        this.req.on('error', (err) => {
            console.error(err);
            self.res.statusCode = 400;
            self.res.end();

        })

        this.res.on('error', (err) => {
            console.error(err)
        })

    }
}
