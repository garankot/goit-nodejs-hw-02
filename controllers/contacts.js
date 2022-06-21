const { contacts } = require("../services");
const { createError } = require("../helpers/errors");

const listContacts = async (req, res, next) => {
  try {
    const allContacts = await contacts.getAll(req.query);
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contacts.getById(id);
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
    const { id } = req.user;
    console.log(req.user);
    const contact = await contacts.create(req.body, id);
    res.status(201).json(contact);
  } catch (error) {
    if (error.message.includes("duplicate")) {
      error.status = 400;
    }
    next(error);
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
      throw createError(400, "missing field favorite");
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
