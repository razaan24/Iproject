const imagekit = require("../helpers/imageKit");
const { User, Profile } = require("../models");

class ProfileController {
  static async showProfile(req, res, next) {
    try {
      const profile = await Profile.findOne({
        where: {
          userId: req.params.userId,
        },
        include: [
          {
            model: User,
            attributes: ["id", "username", "email"],
            include: [
              {
                model: Profile,
                attributes: ["imageUrl, caption, notionUrl"],
              },
            ],
          },
        ],
      });

      console.log(profile);

      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const { id } = req.userId;
      let profile = await Profile.findByPk(id);

      if (!profile) {
        throw { name: "Notfound", id };
      }

      const imageInBase64 = req.file.buffer.toString("base64");

      const result = await imagekit.upload({
        file: imageInBase64,
        fileName: req.file.originalname,
      });

      const { username, caption, notionUrl } = req.body;

      await profile.update({
        imageUrl: result.url,
        username,
        caption,
        notionUrl,
      });

      res.status(200).json({
        message: "Success update profile",
        profile,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProfileController;
