import { useEffect, useState } from 'react'
import { contactService } from '../services/contact.service.local'
import { ContactList } from '../cmps/ContactList'
import { ContactDetails } from './ContactDetails'

export function ContactPage() {
    const [contacts, setContacts] = useState(null)
    const [selectedContactId, setSelectedContactId] = useState(null)

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

    function onBack() {
        setSelectedContactId(null)
    }

    if (!contacts) return <div>Loading...</div>

    return (
        <section className='contact-page'>
            {
                selectedContactId ?
                    <ContactDetails contactId={selectedContactId} onBack={onBack}/> :
                    <ContactList contacts={contacts} onSetSelectedContact={(contactId) => setSelectedContactId(contactId)} />
            }
        </section>
    )
}