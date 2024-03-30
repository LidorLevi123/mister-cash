import { ContactPreview } from './ContactPreview'

export function ContactList({ contacts, onSetSelectedContact }) {
    return (
        <ul className="contact-list clean-list">
            {
                contacts.map(contact =>
                    <li key={contact._id} onClick={()=> onSetSelectedContact(contact._id)}>
                        <ContactPreview contact={contact}/>
                    </li>
                )
            }
        </ul>
    )
}