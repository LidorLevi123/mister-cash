import { combineReducers, legacy_createStore as createStore } from 'redux'
import { contactReducer } from './reducers/contact.reducer'

const rootReducer = combineReducers({
    contactModule: contactReducer,
})

export const store = createStore(rootReducer)