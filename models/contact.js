const { Schema, model } = require("mongoose");

const Joi = require("joi");

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const schemaCreate = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().max(12).required(),
  favorite: Joi.bool().required(),
});

const schemaPatch = Joi.object({
  favorite: Joi.bool().required().messages,
});

const Contact = model("contact", schema);

module.exports = {
  Contact,
  schemaCreate,
  schemaPatch,
};
