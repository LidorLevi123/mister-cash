import { useEffect, useState } from 'react'
import { contactService } from '../services/contact.service.local'
import { Link, useParams } from 'react-router-dom'
import { TransferFund } from '../cmps/TransferFund'
import { userService } from '../services/user.service'

export function ContactDetails() {
    const [contact, setContact] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadContact()
    }, [])

    async function loadContact() {
        try {
            const { contactId } = params
            const contact = await contactService.getById(contactId)
            if(contact) setContact(contact)
        } catch (err) {
            console.log('Could not load contact', err)
        }
    }

    async function onTransfer(ev, coins) {
        try {
            ev.preventDefault()
            const user = userService.getLoggedInUser()
            if(!coins || !user || user.balance < coins) return
            
            await userService.addMove(contact, coins)
            console.log(`Transfered ${coins} to ${contact.name}`)
        } catch (err) {
            console.log(err)
        }
    }

    if(!contact) return <div>Loading...</div>

    return (
        <section className='contact-details'>
            <h1>Contact Details</h1>
            <img src={ contact.imgSrc }></img>
            <h2>{ contact.name }</h2>
            <p>Phone: { contact.phone }</p>
            <p>Email: { contact.email }</p>
            <TransferFund onTransfer={onTransfer}/>
            <Link to='/contact'>Back</Link>
            <Link to={`/contact/edit/${contact._id}`}>Edit</Link>
        </section>
    )
}