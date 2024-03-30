import { useEffect, useState } from 'react'
import { contactService } from '../services/contact.service.local'
import { ContactList } from '../cmps/ContactList'
import { ContactDetails } from './ContactDetails'
import { ContactFilter } from '../cmps/ContactFilter'

export function ContactPage() {
    const [contacts, setContacts] = useState(null)
    const [selectedContactId, setSelectedContactId] = useState(null)
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
        setSelectedContactId(null)
    }

    function onChangeFilter(filterBy) {
        setFilterBy(filterBy)
    }

    if (!contacts) return <div>Loading...</div>

    return (
        <section className='contact-page'>
            {
                selectedContactId ?
                    <ContactDetails contactId={selectedContactId} onBack={onBack} /> :
                    <>
                        <ContactFilter onChangeFilter={onChangeFilter} filterBy={filterBy}/>
                        <ContactList contacts={contacts} onSetSelectedContact={(contactId) => setSelectedContactId(contactId)} />
                    </>
            }
        </section>
    )
}