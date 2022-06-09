const { createError } = require("../helpers/errors");

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      // res.status(400).json({ message: "missing required name field" });
      next(createError(400, error.message));
    }
    next();
  };
};

module.exports = {
  validateRequest,
};
