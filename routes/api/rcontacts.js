const express = require("express");

const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateFavorite,
} = require("../../controllers/contacts");
const { validateRequest } = require("../../middlewares/validateRequest");
const { schemaCreate, schemaPatch } = require("../../models");

router.get("/", listContacts);

router.get("/:id", getContactById);

router.post("/", validateRequest(schemaCreate), addContact);

router.put("/:id", updateContact);

router.patch("/:id/favorite", validateRequest(schemaPatch), updateFavorite);

router.delete("/:id", removeContact);

module.exports = router;
