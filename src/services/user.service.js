export const userService = {
    getUser
}

const loggedInUser = {
    name: 'Lidor Levi',
    coins: '125',
    moves: []
}

function getUser() {
    return loggedInUser
}