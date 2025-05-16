const { uuid } = require('uuidv4');

let contacts = [
    {
        id: uuid(),
        name: "alessandro",
        email: "alessandro@email.com",
        phone: "11988877766",
        category_id: uuid()
    }
]

class ContactsRepository {
    findAll() {
        return new Promise((resolve, reject) => {
            resolve(contacts)
        })
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            resolve(contacts.find(x => x.id === id))
        })
    }

    deleteById(id) {
        return new Promise((resolve, reject) => {
          contacts = contacts.filter(x => x.id !== id)
          resolve()
        })
    }
}

module.exports = new ContactsRepository();