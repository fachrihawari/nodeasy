import http from 'http'
import { Router } from './Router'
import webRoutes from '../routes/web'

export class Bootstrap {
	run() {
		http.createServer((request, response) => {      
			new Router(request, response).run()
		}).listen(8080)
	}
}