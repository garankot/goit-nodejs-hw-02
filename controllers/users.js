const { user } = require("../models");
const authService = require("../services/auth.service");

const registerUser = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
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
    console.log(req.body);
    res.status(200).json({
      email: data.email,
      subscription: data.subscription,
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
};
