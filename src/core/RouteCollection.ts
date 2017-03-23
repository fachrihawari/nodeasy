interface IRouteContent {
    verb: String, 
    url: String, 
    target: String
}

export class RouteCollection  {

    collection: Array<IRouteContent> = []
    
    /**
     * Default wrapper
     * 
     * @param {any} verb 
     * @param {any} url 
     * @param {any} target 
     * 
     * @memberOf RouteCollection
     */
    default(verb, url, target) {        
        this.collection.push({
            verb, url, target
        })
    }
    get(url, target) {        
        this.default('GET', url, target)
    }
    post(url, target) {
        this.default('POST', url, target)
    }
    put(url, target) {
        this.default('PUT', url, target)
    }
    patch(url, target) {
        this.default('PATCH', url, target)
    }
    delete(url, target) {
        this.default('DELETE', url, target)
    }


    /**
     * Resource method for route scaffoldings
     * 
     * @param {any} bind 
     * @param {any} target 
     * @param {*} [option={}] 
     * 
     * @memberOf RouteCollection
     */
    resource(bind, target, option: any = {}) {
        let self = this

        let filteredResource = this.resourceValue

        // Filter if "only" option available
        if (option.only !== undefined) {
            filteredResource = filteredResource.filter(resource => {
                return option.only.indexOf(resource.method) > -1
            })
        }
        
        // Filter if "except" option available 
        else if (option.except !== undefined) {
            filteredResource = filteredResource.filter(resource => {
                return  option.except.indexOf(resource.method) == -1
            })
        }
        
        // call filtered resource
        filteredResource.forEach(v => {
            self.default(v.verb, '/'+ bind + v.url, target + '@' + v.method)                  
        })

    }

    
    get resourceValue() {
        return [
            { verb: 'GET', method: 'index', url: ''},
            { verb: 'GET', method: 'create', url: '/create' },
            { verb: 'POST', method: 'store', url: '' },
            { verb: 'GET', method: 'edit', url: '/:id/edit' },
            { verb: 'GET', method: 'show', url: '/:id' },
            { verb: 'PUT', method: 'update', url: '/:id' },
            { verb: 'DELETE', method: 'delete', url: '/:id' }
        ]
    }

}