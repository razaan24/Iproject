const { Favorite, Dashboard, Category } = require("../models");

class SaveController {
  static async add(req, res, next) {
    try {
      const { userId, dashboardId } = req.body;
      const favorite = await Favorite.create({ userId, dashboardId });

      res.status(201).json(favorite);
    } catch (error) {
      next(error);
    }
  }

  static async read(req, res, next) {
    try {
      const favorites = await Favorite.findAll({
        where: {
          userId: req.params.userId,
        },
        include: [
          {
            model: Dashboard,
            attributes: [
              "icon",
              "name",
              "caption",
              "price",
              "notionUrl",
              "imageUrl",
              "categoryId",
            ],
            include: {
              model: Category,
            },
          },
        ],
      });

      res.status(200).json(favorites);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { userId } = req.params.userId;
      const favorite = await Favorite.findByPk(userId);

      if (!favorite) {
        throw { name: "Forbidden", userId };
      }

      await favorite.destroy();

      res.status(200).json({
        message: `id ${userId} has been deleted`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SaveController;
