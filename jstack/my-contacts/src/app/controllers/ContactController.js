const contactsRepository = require('../repositories/ContactsRepository')

class ContactController {
    constructor(contactsRepository) {
        this._contactsRepository = contactsRepository;
    }

    index = async (req, res) => {
        res.json(await this._contactsRepository.findAll())
    };

    show = async (req, res) => {
        const { id } = req.params;
        const contact = await this._contactsRepository.findById(id);
        if(!contact) {
            res.status(404).json({ error: 'Contact not found' });
            return;
        }
        res.json(contact)
    }

    delete = async (req, res) => {
        const { id } = req.params;
        const contact = await this._contactsRepository.findById(id);
        if(!contact) {
            res.status(404).json({ error: 'Contact not found' });
            return;
        }
        await this._contactsRepository.deleteById(id);

        res.sendStatus(204);
    }
}


module.exports = new ContactController(contactsRepository);