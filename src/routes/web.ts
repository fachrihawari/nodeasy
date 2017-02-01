/*
    Route file, support anonymous function and Controller
    like below

    route.get('/contact', 'PageController@contact')
    route.get('/anonymous', (req, res) => {
        res.view('page/home', { name : 'anonymous' })
    })

    route.post('/:username/post/:id', 'UserController@profile')
*/


import { RouteCollection } from './../core/RouteCollection'

let route = new RouteCollection()

route.get('/', 'PageController@index')
route.get('/about', 'PageController@about')
route.get('/contact', 'PageController@contact')

route.get('/login', 'UserController@login')
route.post('/login', 'UserController@loginSession')
route.get('/register', 'UserController@register')
route.post('/register', 'UserController@createAccount')
route.get('/user/:username', 'UserController@show')



export default route
