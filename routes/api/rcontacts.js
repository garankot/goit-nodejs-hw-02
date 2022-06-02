const express = require("express");
const Joi = require("joi");
const router = express.Router();
const contacts = require("../../models/contacts");

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().max(12).required(),
});

router.get("/", async (req, res, next) => {
  try {
    const data = await contacts.listContacts();
    res.json(data);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contacts.getContactById(id);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    }
    res.json(contact);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "missing required name field" });
    }
    const contact = await contacts.addContact(name, email, phone);
    res.status(201).json(contact);
  } catch (err) {
    console.error(err.message);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contacts.removeContact(id);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(204).json({ message: "contact deleted" });
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "missing fields" });
    }
    const { name, email, phone } = req.body;
    const { id } = req.params;
    const contact = await contacts.updateContact(id, name, email, phone);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "contact update" });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
