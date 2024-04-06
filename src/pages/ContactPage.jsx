import { useEffect, useState } from 'react'
import { contactService } from '../services/contact.service.local'
import { ContactList } from '../cmps/ContactList'
import { ContactFilter } from '../cmps/ContactFilter'
import { Link } from 'react-router-dom'

export function ContactPage() {
    const [contacts, setContacts] = useState(null)
    const [filterBy, setFilterBy] = useState({
        term: ''
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

    function onChangeFilter(filterBy) {
        setFilterBy(filterBy)
    }

    if (!contacts) return <div>Loading...</div>

    return (
        <section className='contact-page'>
            <ContactFilter onChangeFilter={onChangeFilter} filterBy={filterBy} />
            <Link to='/contact/edit'>Add Contact</Link>
            <ContactList contacts={contacts} />
        </section>
    )
}