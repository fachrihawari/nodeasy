import * as http from 'http'
import { Router } from './Router'

const port = process.env.NODE_ENV === 'production' ? 8080 : 8080

export class Bootstrap {
	run() {
		let self = this
		http.createServer((request, response) => {
			new Router(request, response).run()
		}).listen(port)
		console.log(`Server listening on port ${port}`)
	}
}

