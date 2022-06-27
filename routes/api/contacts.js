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
const { validateRequest, auth, validateId } = require("../../middlewares");
const { schemaCreate, schemaPatch } = require("../../models/contact");

router.get("/", auth, listContacts);

router.get("/:id", validateId, getContactById);

router.post("/", validateRequest(schemaCreate), auth, addContact);

router.put("/:id", validateId, updateContact);

router.patch(
  "/:id/favorite",
  validateId,
  validateRequest(schemaPatch),
  updateFavorite
);

router.delete("/:id", validateId, auth, removeContact);

module.exports = router;
