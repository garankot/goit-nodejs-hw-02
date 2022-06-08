const res = require("express/lib/response");
const { contacts } = require("../services/contact.service");

const listContacts = async (req, res, next) => {
  try {
    const allContacts = await contacts.getAll();
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, resp, next) => {
  try {
    const { id } = req.params;
    const contact = allContacts.getById(id);
    if (!contact) {
      throw createError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contact = await contacts.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    if (error.message.includes("duplicate")) {
      error.status = 400;
    }
    next(e);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contacts.deleteById(id);
    if (!contact) {
      throw createError(404, "Not found");
    }
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contacts.updateById(id, req.body);
    if (!contact) {
      throw createError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contacts.updateById(id, req.body);
    if (!contact) {
      throw createError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite,
};
