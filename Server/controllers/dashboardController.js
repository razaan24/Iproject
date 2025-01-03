const imagekit = require("../helpers/imageKit");
const { Dashboard, Category } = require("../models");
const { Op } = require("sequelize");

class DashboardController {
  static async read(req, res, next) {
    try {
      const { search, filter } = req.query;
      const paramsQuerySQL = {};

      //search
      if (search) {
        paramsQuerySQL.where = paramsQuerySQL.where || {};
        paramsQuerySQL.where.name = { [Op.iLike]: `%${search}%` };
      }

      //filtering
      if (filter) {
        paramsQuerySQL.where = {
          categoryId: filter,
        };
      }

      const dashboards = await Dashboard.findAll(paramsQuerySQL, {
        include: {
          model: Category,
        },
      });

      res.status(200).json(dashboards);
    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  static async readDetail(req, res, next) {
    try {
      const { id } = req.params;
      const dashboard = await Dashboard.findByPk(id);

      if (!dashboard) {
        throw { name: "NotFound", id };
      }

      res.status(200).json(dashboard);
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    try {
      const imageInBase64 = req.file.buffer.toString("base64");

      const result = await imagekit.upload({
        file: imageInBase64,
        fileName: req.file.originalname,
      });

      console.log(req.file.buffer);

      const {
        icon,
        name,
        caption,
        status,
        price,
        notionUrl,
        imageUrl,
        categoryId,
      } = req.body;

      const dashbhoard = await Dashboard.create({
        icon: result.url,
        name,
        caption,
        status,
        price,
        notionUrl,
        imageUrl,
        categoryId,
      });

      res.status(201).json(dashbhoard);
    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      let dashboard = await Dashboard.findByPk(id);

      if (!dashboard) {
        throw { name: "NotFound", id };
      }

      const imageInBase64 = req.file.buffer.toString("base64");

      const result = await imagekit.upload({
        file: imageInBase64,
        fileName: req.file.originalname,
      });

      const {
        icon,
        name,
        caption,
        status,
        price,
        notionUrl,
        imageUrl,
        categoryId,
      } = req.body;

      await dashboard.update({
        icon: result.url,
        name,
        caption,
        status,
        price,
        notionUrl,
        imageUrl: result.url,
        categoryId,
      });

      res.status(200).json(dashboard);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const dashboard = await Dashboard.findByPk(id);

      if (!dashboard) {
        throw { name: "NotFound", id };
      }

      await dashboard.destroy();

      res.status(200).json({
        message: `id ${id} has been deleted`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DashboardController;
