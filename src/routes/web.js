import { RouteCollection } from './../core/RouteCollection'

let route = new RouteCollection()

route.get('/', 'PageController@index')
route.get('/about', 'PageController@about')
route.get('/contact', 'PageController@contact')

route.get('/anonymous', (req, res) => {
    res.view('page/home')
})

route.resource('menu', 'MenuController', { 
    except: ['create', 'edit']
})

export default route