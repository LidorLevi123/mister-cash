import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userService } from '../services/user.service'

export function LoginPage() {
    const [userCreds, setUserCreds] = useState({ fullname: '', email: '', username: '', password: '' })
    const [isSignUp, setIsSignUp] = useState(true)
    const navigate = useNavigate()

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = (+value || '')
                break;
            case 'checkbox':
                value = target.checked
            default:
                break;
        }

        setUserCreds(prevCreds => ({
            ...prevCreds,
            [field]: value
        }))
    }

    async function onSignup(ev) {
        ev.preventDefault()
        try {
            await userService.signup(userCreds)
            navigate('/')
        } catch (err) {
            console.log('Could not signup', err)
        }
    }

    async function onLogin(ev) {
        ev.preventDefault()
        try {
            const user = await userService.login(userCreds)
            if(user) navigate('/')
        } catch (err) {
            console.log('Could not login', err)
        }
    }

    const { fullname, username, password, email } = userCreds

    return (
        <section className="login-page">
            {
                !isSignUp ?
                    <form onSubmit={onSignup}>
                        <label htmlFor="name">Fullname</label>
                        <input onChange={handleChange} value={fullname} type="text" name="fullname" id="fullname" />

                        <label htmlFor="phone">Username</label>
                        <input onChange={handleChange} value={username} type="text" name="username" id="username" />

                        <label htmlFor="password">Password</label>
                        <input onChange={handleChange} value={password} type="password" name="password" id="password" />

                        <label htmlFor="email">Email</label>
                        <input onChange={handleChange} value={email} type="email" name="email" id="email" />

                        <p>Already signed up? <a onClick={() => setIsSignUp(true)}>Login!</a></p>
                        <button>Signup</button>
                    </form> :
                    <form onSubmit={onLogin}>
                        <label htmlFor="phone">Username</label>
                        <input onChange={handleChange} value={username} type="text" name="username" id="username" />

                        <label htmlFor="password">Password</label>
                        <input onChange={handleChange} value={password} type="password" name="password" id="password" />

                        <p>New user? <a onClick={() => setIsSignUp(false)}>Signup!</a></p>
                        <button>Login</button>
                    </form>
            }
        </section>
    )
}