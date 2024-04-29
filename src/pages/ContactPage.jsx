import { useEffect, useState } from 'react'
import { contactService } from '../services/contact.service.local'
import { ContactList } from '../cmps/ContactList'
import { ContactFilter } from '../cmps/ContactFilter'
import { Link } from 'react-router-dom'
import { contactActions } from '../store/actions/contact.actions'
import { useSelector } from 'react-redux'

export function ContactPage() {
    const [filterBy, setFilterBy] = useState({
        term: ''
    })

    const contacts = useSelector(state => state.contactModule.contacts)
    
    useEffect(() => {
        contactActions.loadContacts()
    }, [filterBy])

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