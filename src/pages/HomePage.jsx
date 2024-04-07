import { useEffect, useState } from 'react'

import { bitcoinService } from '../services/bitcoin.service'
import { userService } from '../services/user.service'

export function HomePage() {
    const [user, setUser] = useState(userService.getLoggedInUser())
    const [btcRate, setBtcRate] = useState(null)

    useEffect(() => {
        getRate()
    }, [])

    async function getRate() {
        const rate = await bitcoinService.getRate(user.balance)
        setBtcRate(rate)
    }

    if(!user) return

    return (
        <section className='home-page'>
            <h1>Hello { user.fullname }!</h1>
            <p>Balance: { user.balance }</p>
            <p>BTC Rate: { btcRate }</p>
        </section>
    )
}