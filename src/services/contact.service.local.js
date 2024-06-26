import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'contact'

_createContacts()

export const contactService = {
    query,
    getById,
    save,
    remove,
    getEmptyContact,
}

async function query(filterBy = { term: '' }) {
    let contacts = await storageService.query(STORAGE_KEY)
    let regex = new RegExp(filterBy.term, 'i')

        contacts = contacts.filter(contact =>
            regex.test(contact.name) ||
            regex.test(contact.phone) ||
            regex.test(contact.email))

    return contacts
}

async function getById(contactId) {
    const contact = await storageService.get(STORAGE_KEY, contactId)

    // This is to prevent contact info rendering before the image (Better UX)
    const img = await utilService.loadImg(`https://robohash.org/${contact._id}.png?set=set5`)
    contact.imgSrc = img.src
    return contact
}

async function remove(contactId) {
    return await storageService.remove(STORAGE_KEY, contactId)
}

async function save(contact) {
    return contact._id ?
        await storageService.put(STORAGE_KEY, contact) :
        await storageService.post(STORAGE_KEY, contact)
}

function getEmptyContact() {
    return {
        name: '',
        email: '',
        phone: ''
    }
}

function _createContacts() {

    let contacts = utilService.loadFromStorage(STORAGE_KEY)
    if (contacts && contacts.length) return

    contacts = [
        {
            "_id": "5a56640269f443a5d64b32ca",
            "name": "Ochoa Hyde",
            "email": "ochoahyde@renovize.com",
            "phone": "+1 (968) 593-3824"
        },
        {
            "_id": "5a5664025f6ae9aa24a99fde",
            "name": "Hallie Mclean",
            "email": "halliemclean@renovize.com",
            "phone": "+1 (948) 464-2888"
        },
        {
            "_id": "5a56640252d6acddd183d319",
            "name": "Parsons Norris",
            "email": "parsonsnorris@renovize.com",
            "phone": "+1 (958) 502-3495"
        },
        {
            "_id": "5a566402ed1cf349f0b47b4d",
            "name": "Rachel Lowe",
            "email": "rachellowe@renovize.com",
            "phone": "+1 (911) 475-2312"
        },
        {
            "_id": "5a566402abce24c6bfe4699d",
            "name": "Dominique Soto",
            "email": "dominiquesoto@renovize.com",
            "phone": "+1 (807) 551-3258"
        },
        {
            "_id": "5a566402a6499c1d4da9220a",
            "name": "Shana Pope",
            "email": "shanapope@renovize.com",
            "phone": "+1 (970) 527-3082"
        },
        {
            "_id": "5a566402f90ae30e97f990db",
            "name": "Faulkner Flores",
            "email": "faulknerflores@renovize.com",
            "phone": "+1 (952) 501-2678"
        },
        {
            "_id": "5a5664027bae84ef280ffbdf",
            "name": "Holder Bean",
            "email": "holderbean@renovize.com",
            "phone": "+1 (989) 503-2663"
        },
        {
            "_id": "5a566402e3b846c5f6aec652",
            "name": "Rosanne Shelton",
            "email": "rosanneshelton@renovize.com",
            "phone": "+1 (968) 454-3851"
        },
        {
            "_id": "5a56640272c7dcdf59c3d411",
            "name": "Pamela Nolan",
            "email": "pamelanolan@renovize.com",
            "phone": "+1 (986) 545-2166"
        },
        {
            "_id": "5a5664029a8dd82a6178b15f",
            "name": "Roy Cantu",
            "email": "roycantu@renovize.com",
            "phone": "+1 (929) 571-2295"
        },
        {
            "_id": "5a5664028c096d08eeb13a8a",
            "name": "Ollie Christian",
            "email": "olliechristian@renovize.com",
            "phone": "+1 (977) 419-3550"
        },
        {
            "_id": "5a5664026c53582bb9ebe9d1",
            "name": "Nguyen Walls",
            "email": "nguyenwalls@renovize.com",
            "phone": "+1 (963) 471-3181"
        },
        {
            "_id": "5a56640298ab77236845b82b",
            "name": "Glenna Santana",
            "email": "glennasantana@renovize.com",
            "phone": "+1 (860) 467-2376"
        },
    ]

    utilService.saveToStorage(STORAGE_KEY, contacts)
}