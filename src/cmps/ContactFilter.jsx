import { useEffect, useRef, useState } from 'react'
import { utilService } from '../services/util.service'

export function ContactFilter(props) {

    const [filterBy, setFilterBy] = useState(props.filterBy)
    const searchFunc = useRef(utilService.debounce(()=> props.onChangeFilter(filterBy), 500))

    useEffect(() => {
        searchFunc.current()
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

    const { term } = filterBy

    return (
        <form className="contact-filter">
            <input onChange={handleChange} value={term} type="text" name="term" id="term" placeholder="Search Contacts..."/>
        </form>
    )
}