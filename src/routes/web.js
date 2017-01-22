import { Route } from './../core/router'

let route = new Route()

route.get('/echo', 'HomeController@index')

export default route