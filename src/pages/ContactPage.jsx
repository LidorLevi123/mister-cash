import { useEffect, useState } from 'react'
import { ContactList } from '../cmps/ContactList'
import { ContactFilter } from '../cmps/ContactFilter'
import { Link } from 'react-router-dom'
import { contactActions } from '../store/actions/contact.actions'
import { useSelector } from 'react-redux'
import { utilService } from '../services/util.service'

export function ContactPage() {
    const contacts = useSelector(state => state.contactModule.contacts)
    const filterBy = useSelector(state => state.contactModule.filterBy)

    useEffect(() => {
        contactActions.loadContacts()
    }, [filterBy])

    function onChangeFilter(filterBy) {
        contactActions.setFilterBy(filterBy)
        // utilService.debounce(() => contactActions.setFilterBy(filterBy), 500)
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