export const userService = {
    getUser
}

const loggedInUser = {
    name: 'Lidor Levi',
    coins: 70233,
    moves: []
}

function getUser() {
    return loggedInUser
}