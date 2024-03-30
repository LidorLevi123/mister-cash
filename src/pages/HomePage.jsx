import { useEffect, useState } from 'react'

import { bitcoinService } from '../services/bitcoin.service'
import { userService } from '../services/user.service'

export function HomePage() {
    const [user, setUser] = useState(userService.getUser())
    const [btcRate, setBtcRate] = useState(null)

    useEffect(() => {
        getRate()
    }, [])

    async function getRate() {
        const rate = await bitcoinService.getRate(user.coins)
        setBtcRate(rate)
    }

    if(!user) return

    return (
        <section className='home-page'>
            <h1>Hello { user.name }!</h1>
            <p>Coins: { user.coins }</p>
            <p>BTC Rate: { btcRate }</p>
        </section>
    )
}