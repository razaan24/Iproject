const { User, Dashboard } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const { userId, role } = req.loginInfo;

    if (role === "User") {
      const user = await User.findByPk(userId);

      if (!user) throw { name: "Forbidden" };

      const { id } = req.params;
      const dashboard = await Dashboard.findByPk(id);

      if (!dashboard) throw { name: "NotFound" };

      if (dashboard.userId !== user.id) throw { name: "Forbidden" };
    }
    next();
  } catch (error) {
    next(error);
  }
};

const admin = async (req, res, next) => {
  try {
    const { userId, role } = req.loginInfo;

    if (role === "User") {
      throw { name: "Forbidden" };
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authorization, admin };
