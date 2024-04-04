import { useEffect, useState } from 'react'
import { contactService } from '../services/contact.service.local'
import { ContactList } from '../cmps/ContactList'
import { ContactFilter } from '../cmps/ContactFilter'

export function ContactPage() {
    const [contacts, setContacts] = useState(null)
    const [filterBy, setFilterBy] = useState({
        name: '',
        email: '',
        phone: '',
    })

    useEffect(() => {
        loadContacts()
    }, [filterBy])

    async function loadContacts() {
        try {
            const contacts = await contactService.query(filterBy)
            setContacts(contacts)
        } catch (err) {
            console.log('Could not GET contacts')
        }
    }

    function onBack() {

    }

    function onChangeFilter(filterBy) {
        setFilterBy(filterBy)
    }

    if (!contacts) return <div>Loading...</div>

    return (
        <section className='contact-page'>
            <ContactFilter onChangeFilter={onChangeFilter} filterBy={filterBy} />
            <ContactList contacts={contacts} />
        </section>
    )
}