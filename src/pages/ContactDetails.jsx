import { useEffect, useState } from 'react'
import { contactService } from '../services/contact.service.local'

export function ContactDetails({ contactId, onBack }) {
    const [contact, setContact] = useState(null)

    useEffect(() => {
        loadContact()
    }, [])

    async function loadContact() {
        const contact = await contactService.getById(contactId)
        if(contact) setContact(contact)
    }

    if(!contact) return <div>Loading...</div>

    return (
        <section className='contact-details'>
            <h1>Contact Details</h1>
            <img src={`https://robohash.org/${contact._id}.png?set=set5`}></img>
            <h2>{ contact.name }</h2>
            <p>Phone: { contact.phone }</p>
            <p>Email: { contact.email }</p>
            <button className="btn-back" onClick={onBack}>Back</button>
        </section>
    )
}