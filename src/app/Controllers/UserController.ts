import User, { IUser } from '../Models/User'

export class UserController {

    show(req, res) {
        User.findOne({ username: 'fachri.hawari' }).then((user) => {
            res.write(JSON.stringify(user))
        })

    }
    login(req, res) {
        res.write(req.body.username)
    }
    register(req, res) {
        res.view('auth/register')
    }
    loginSession(req, res) {

    }
    createAccount(req, res) {
        User.create({ username: 'Fachri Hawari', email: 'fachri.hawari@gmail.com', password: '123456' }, function (err, user) {
          if (err) throw new Error(err.message)

        })
        res.write(JSON.stringify(req.body))
    }
}
