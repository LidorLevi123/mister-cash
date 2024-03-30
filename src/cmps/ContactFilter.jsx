import { useEffect, useState } from 'react'

export function ContactFilter(props) {

    const [filterBy, setFilterBy] = useState(props.filterBy)

    useEffect(() => {
        props.onChangeFilter(filterBy)
    }, [filterBy])

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

        setFilterBy(prevFilterBy => ({
            ...prevFilterBy,
            [field]: value
        }))
    }

    const { name, phone, email } = filterBy

    return (
        <form className="contact-filter">
            <label htmlFor="namel">Name</label>
            <input onChange={handleChange} value={name} type="text" name="name" id="name" placeholder="Enter name..."/>

            <label htmlFor="phone">Phone</label>
            <input onChange={handleChange} value={phone} type="text" name="phone" id="phone" placeholder="Enter phone number..."/>

            <label htmlFor="email">Email</label>
            <input onChange={handleChange} value={email} type="text" name="email" id="email" placeholder="Enter email address..."/>
        </form>
    )
}