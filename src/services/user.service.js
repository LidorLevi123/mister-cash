import { storageService } from "./async-storage.service"

const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'
const USER_KEY = 'userDB'

export const userService = {
    login,
    logout,
    signup,
    getLoggedInUser,
    saveLocalUser,
    addMove
}

window.userService = userService

async function login({ username, password }) {
    const users = await storageService.query(USER_KEY)
    const user = users.find(user => user.username === username)
    if (user) {
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    userCred.moves = []
    userCred.balance = 500
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await storageService.post(USER_KEY, userCred)
    return saveLocalUser(user)
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, email: user.email, imgUrl: user.imgUrl, balance: user.balance, moves: user.moves }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function update({_id, balance, moves}) {
    const user = await storageService.get(USER_KEY, _id)
    user.balance = balance
    user.moves = moves
    await storageService.put(USER_KEY, user)

    // Handle case in which admin updates other user's details
    if (getLoggedInUser()._id === user._id) saveLocalUser(user)
    return user
}

async function addMove(contact, amount) {
    const loggedInUser = getLoggedInUser()
    const move = {
        toId: contact._id,
        to: contact.name,
        at: Date.now(),
        amount
    }
    loggedInUser.balance -= amount
    loggedInUser.moves.push(move)

    return await update(loggedInUser)
}