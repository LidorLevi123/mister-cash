import { useState } from 'react'

export function TransferFund({ onTransfer }) {

    const [coins, setCoins] = useState(0)

    function handleChange({ target }) {
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

        setCoins(value)
    }

    return (
        <form className="transfer-fund" onSubmit={(ev) => onTransfer(ev, coins)}>
            <h1>Transfer Coins:</h1>
            <input type="number" onChange={handleChange} value={coins} min="0" placeholder="Amount"/>
            <button>Send</button>
        </form>
    )
}