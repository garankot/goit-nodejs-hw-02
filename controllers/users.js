const authService = require("../services/auth.service");
const emailService = require("../services/email.service");
const userService = require("../services/user.service");
const { createError } = require("../helpers/errors");

const registerUser = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    await emailService.sendEmail(user.email, user.verificationToken);
    res.status(201).json({
      name: user.name,
      email: user.email,
      id: user._id,
      description: user.description,
      avatarURL: user.avatarURL,
    });
  } catch (e) {
    next(e);
  }
};

const confirm = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await userService.findUser({ verificationToken });

    if (!user) {
      throw createError(404, "User not found");
    }

    await userService.updateUser(user._id, {
      verify: true,
      verificationToken: null,
    });
    return res.status(200).json({
      code: 200,
      message: "Verification successful",
    });
  } catch (e) {
    next(e);
  }
};

const resend = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userService.findUser({ email });
    if (!user) {
      throw createError(404, "User not found");
    }
    if (!user.verify) {
      throw createError(400, "User not confirmed. Check your email");
    }
    await emailService.sendEmail(user.email, user.verificationToken);
    return res.status(200).json({
      code: 200,
      message: "Verification email sent",
    });
  } catch (e) {
    next(e);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const token = await authService.loginUser(req.body);
    res.json(token);
  } catch (e) {
    next(e);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    await authService.logoutUser(req.user._id);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const data = await authService.authenticateUser(req.user.token);

    res.status(200).json({
      email: data.email,
      subscription: data.subscription,
      avatarURL: data.avatarURL,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  confirm,
  resend,
};
