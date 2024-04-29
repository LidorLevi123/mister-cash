import { contactService } from '../../services/contact.service.local'
import { store } from '../store'
import { SET_CONTACTS, SET_FILTER_BY } from '../reducers/contact.reducer'

export const contactActions = {
    loadContacts,
    setFilterBy
}

async function loadContacts() {
    try {
        const { filterBy } = store.getState().contactModule
        const contacts = await contactService.query(filterBy)
        const action = {
            type: SET_CONTACTS,
            contacts
        }
        store.dispatch(action)
    } catch (err) {
        console.log('error:', err)
    }
}

async function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}