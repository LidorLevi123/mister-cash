import { contactService } from '../services/contact.service.local'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export function ContactEdit() {
    const [contact, setContact] = useState(contactService.getEmptyContact())
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadContact()
    }, [])

    async function saveContact(ev) {
        ev.preventDefault()
        try {
            const savedContact = await contactService.save(contact)
            navigate(`/contact/${savedContact._id}`)
            console.log('Contact saved!')
        } catch (err) {
            console.log('Could not save contact', err)
        }
    }

    async function loadContact() {
        try {
            const { contactId } = params
            if(!contactId) return
            const contact = await contactService.getById(contactId)
            if(contact) setContact(contact)
        } catch (err) {
            console.log('Could not load contact', err)
        }
    }

    function handleChange({ target }) {
        const field = target.name
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

        setContact(prevContact => ({
            ...prevContact,
            [field]: value
        }))
    }

    const { name, phone, email } = contact
    return (
        <form className="contact-edit" onSubmit={saveContact}>
            <label htmlFor="namel">Name</label>
            <input onChange={handleChange} value={name} type="text" name="name" id="name"/>

            <label htmlFor="phone">Phone</label>
            <input onChange={handleChange} value={phone} type="text" name="phone" id="phone"/>

            <label htmlFor="email">Email</label>
            <input onChange={handleChange} value={email} type="text" name="email" id="email"/>

            <button className="btn-save">Save</button>
        </form>
    )
}