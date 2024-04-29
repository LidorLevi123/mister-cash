import { contactService } from '../../services/contact.service.local'
import { store } from '../store'
import { SET_CONTACTS } from '../reducers/contact.reducer'

export const contactActions = {
    loadContacts
}

async function loadContacts() {
    try {
        const contacts = await contactService.query()
        const action = {
            type: SET_CONTACTS,
            contacts
        }
        store.dispatch(action)
    } catch (err) {
        console.log('error:', err)
    }
}