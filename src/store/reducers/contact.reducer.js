export const SET_CONTACTS = 'SET_CONTACTS'
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