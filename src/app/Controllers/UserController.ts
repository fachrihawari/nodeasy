export class UserController {
    login(req, res) {
        res.write(req.body.username)
    }
    register(req, res) {
        res.view('auth/register')
    }
    loginSession(req, res) {

    }
    createAccount(req, res) {
        res.write(JSON.stringify(req.body))
    }
}