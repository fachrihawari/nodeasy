import http from 'http'
import { Router } from './router'

export class Bootstrap {
  run() {
    new Router().run()
  }
}