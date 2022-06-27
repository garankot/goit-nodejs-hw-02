const { validateRequest } = require("./validateRequest");
const { auth } = require("./auth");
const { validateId } = require("./validateId");
const { upload } = require("./upload");

module.exports = {
  validateRequest,
  auth,
  validateId,
  upload,
};
