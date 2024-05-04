import { contactService } from '../services/contact.service.local'
import { contactActions } from '../store/actions/contact.actions'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export function ContactEdit() {
    const [contact, setContact] = useState(contactService.getEmptyContact())
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadContact()
    }, [])

    async function saveContact() {
        try {
            const savedContact = await contactActions.saveContact(contact)
            navigate(`/contact/${savedContact._id}`)
            console.log('Contact saved!')
        } catch (err) {
            console.log('Could not save contact', err)
        }
    }

    async function removeContact() {
        try {
            await contactActions.removeContact(contact._id)
            console.log(`${contact.name} has been removed`)
            navigate('/contact')
        } catch (err) {
            console.log(err)
        }
    }

    async function loadContact() {
        try {
            const { contactId } = params
            if (!contactId) return
            const contact = await contactService.getById(contactId)
            if (contact) setContact(contact)
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
        <section className="contact-edit">
            <label htmlFor="name">Name</label>
            <input onChange={handleChange} value={name} type="text" name="name" id="name" />

            <label htmlFor="phone">Phone</label>
            <input onChange={handleChange} value={phone} type="text" name="phone" id="phone" />

            <label htmlFor="email">Email</label>
            <input onChange={handleChange} value={email} type="text" name="email" id="email" />

            {
                contact._id &&
                <button className="btn-remove" onClick={removeContact}>Delete</button>
            }
            <button className="btn-save" onClick={saveContact}>Save</button>
        </section>
    )
}