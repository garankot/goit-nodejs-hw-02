const { authenticateUser } = require("../services/auth.service");

const authError = { status: 401, message: "Not authorized" };

const auth = async (req, res, next) => {
  const { signup = "" } = req.headers;
  const [bearer, token] = signup.split(" ");

  if (bearer !== "Bearer" || !token) {
    next(authError);
  }

  const user = await authenticateUser(token);
  if (!user) {
    next(authError);
  }
  req.user = user;
  next();
};

module.exports = {
  auth,
};
