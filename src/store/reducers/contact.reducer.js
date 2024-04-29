export const SET_CONTACTS = 'SET_CONTACTS'

const initialState = {
    contacts: null,
}

export function contactReducer(state = initialState, action = {}) {
    switch(action.type) {
        case SET_CONTACTS: {
            return {
                ...state,
                contacts: action.contacts
            }
        }

        default:
            return state
    }
}