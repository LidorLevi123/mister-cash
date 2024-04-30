import { contactService } from '../../services/contact.service.local'
import { store } from '../store'
import { SET_CONTACTS, REMOVE_CONTACT, SET_FILTER_BY } from '../reducers/contact.reducer'

export const contactActions = {
    loadContacts,
    removeContact,
    setFilterBy
}

async function loadContacts() {
    try {
        const { filterBy } = store.getState().contactModule
        const contacts = await contactService.query(filterBy)
        store.dispatch({ type: SET_CONTACTS, contacts })
    } catch (err) {
        console.log('Could not load contacts', err)
    }
}

async function removeContact(contactId) {
    try {
        await contactService.remove(contactId)
        store.dispatch({ type: REMOVE_CONTACT, contactId })
    } catch (err) {
        console.log('Could not remove contact', err)
    }
}

async function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}