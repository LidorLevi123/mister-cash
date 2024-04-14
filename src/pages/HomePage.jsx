import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { bitcoinService } from '../services/bitcoin.service'
import { userService } from '../services/user.service'
import { MovesList } from '../cmps/MovesList'

export function HomePage() {
    const [user, setUser] = useState(userService.getLoggedInUser())
    const [btcRate, setBtcRate] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        getRate()
    }, [])

    async function getRate() {
        const rate = await bitcoinService.getRate(user.balance)
        setBtcRate(rate)
    }

    function onLogout() {
        userService.logout()
        navigate('/login')
    }

    if (!user) return
    const moves = user.moves.slice(0, 3).sort((m1, m2) => m2.at - m1.at)

    return (
        <section className='home-page'>
            <h1>Hello {user.fullname}!</h1>
            <p>Balance: {user.balance}</p>
            <p>BTC Rate: {btcRate}</p>
            <button onClick={onLogout}>Logout</button>
            <MovesList moves={moves} title="Your last 3 moves"/>
        </section>
    )
}