const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contactData = JSON.parse(data);
    return contactData;
  } catch (error) {
    console.error(error.message);
  }
};
// listContacts();

const getContactById = async (id) => {
  try {
    const allContacts = await listContacts();
    const contact = allContacts.find(
      (contact) => contact.id === (id = String(id))
    );
    return contact ? contact : null;
  } catch (error) {
    console.error(error.message);
  }
};
// getContactById("10")

const addContact = async (name, email, phone) => {
  try {
    const newContact = {
      id: uuid.v4(),
      name: name,
      email: email,
      phone: phone,
    };
    const allContacts = await listContacts();
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  } catch (error) {
    console.error(error.message);
  }
};
// addContact("Taras", "mail@gmail.com", "380980000000");

const removeContact = async (id) => {
  try {
    const allContacts = await listContacts();
    const index = allContacts.findIndex(
      (contact) => contact.id === (id = String(id))
    );
    const deletedContact = allContacts[index];
    if (index !== -1) {
      allContacts.splice(index, 1);
      await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    }
    return deletedContact ? deletedContact : null;
  } catch (error) {
    console.error(error.message);
  }
};
// removeContact("3e894990-db3f-11ec-b15a-1f8b2b89493c");

const updateContact = async (id, name, email, phone) => {
  try {
    const allContacts = await listContacts();
    const index = allContacts.findIndex(
      (contact) => contact.id === (id = String(id))
    );
    if (index !== -1) {
      allContacts[index].name = name;
      allContacts[index].email = email;
      allContacts[index].phone = phone;
      await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    }
  } catch (error) {
    console.error(error.message);
  }
};

// updateContact("3e894990-db3f-11ec-b15a-1f8b2b89493c", "Ta");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
