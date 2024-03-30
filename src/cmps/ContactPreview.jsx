export function ContactPreview({ contact }) {
    return (
        <article className='contact-preview'>
            <h3>{contact.name}</h3>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
        </article>
    )
}