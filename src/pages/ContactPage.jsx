import { useEffect, useState } from 'react'
import { contactService } from '../services/contact.service.local'
import { ContactList } from '../cmps/ContactList'

export function ContactPage() {
    const [contacts, setContacts] = useState(null)

    useEffect(() => {
        loadContacts()
    }, [])

    async function loadContacts() {
        try {
            const contacts = await contactService.query()
            setContacts(contacts)
        } catch (err) {
            console.log('Could not GET contacts')
        }
    }

    if(!contacts) return <div>Loading...</div>

    return (
        <section className='contact-page'>
            <ContactList contacts={contacts} />
        </section>
    )
}