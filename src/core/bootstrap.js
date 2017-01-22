import http from 'http'
import { Router } from './router'

export class Bootstrap {
	run() {
		http.createServer((request, response) => {      
			new Router(request, response).run()
		}).listen(8080)
	}
}