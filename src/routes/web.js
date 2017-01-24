import { Route } from './../core/route'

let route = new Route

route.get('/echo', 'HomeController@index')
route.post('/echo', 'HomeController@store')
route.get('/', (req, res) => {
    res.end("Root page")
})
route.resource('menu', 'MenuController', { 
    except: ['create', 'edit']
})

export default route