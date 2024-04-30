export const SET_CONTACTS = 'SET_CONTACTS'
export const REMOVE_CONTACT = 'REMOVE_CONTACT'
export const SET_FILTER_BY = 'SET_FILTER_BY'

const initialState = {
    contacts: null,
    filterBy: {
        term: ''
    }
}

export function contactReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_CONTACTS: {
            return {
                ...state,
                contacts: action.contacts
            }
        }
        case REMOVE_CONTACT: {
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.contactId)
            }
        }
        case SET_FILTER_BY: {
            return {
                ...state,
                filterBy: { ...action.filterBy }
            }
        }

        default:
            return state
    }
}