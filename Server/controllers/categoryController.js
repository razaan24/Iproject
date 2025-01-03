const { Category } = require("../models");

class CategoryController {
  static async read(req, res, next) {
    try {
      const categories = await Category.findAll();

      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    try {
      const { name } = req.body;
      const category = await Category.create({ name });

      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      let category = await Category.findByPk(id);

      if (!category) {
        throw { name: "Notfound", id };
      }

      const { name } = req.body;
      await Category.update({ name }, { where: { id } });

      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);

      if (!category) {
        throw { name: "NotFound", id };
      }

      await category.destroy();

      res.status(200).json({
        message: `id ${id} has been deleted`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
