const { User } = require("../models");

module.exports = class UserController {
  static async getUser(req, res, next) {
    try {
      const { params: { id } } = req;

      if (id) {
        const user = await User.findByPk(id);

        if (!user) {
          throw { name: "NotFound", msg: "User Not Found" };
        }

        res.json(user);
      } else {
        const users = await User.findAll();

        res.json(users);
      }
    } catch (error) {
      next(error);
    }
  }

  static async addUser(req, res, next) {
    try {
      const { body: { name, gender, email, phone, address } } = req;

      const user = await User.create({ name, gender, email, phone, address });

      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async editUser(req, res, next) {
    try {
      const { body: { name, gender, email, phone, address }, params: { id } } = req;

      const [rowAffected] = await User.update({
        name,
        gender,
        email,
        phone,
        address
      }, {
        where: { id },
        returning: true
      });

      if (!rowAffected) {
        throw { name: "NotFound", msg: "User Not Found" };
      }

      res.json({ msg: `user with id ${id} updated` });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { params: { id } } = req;

      const rowAffected = await User.destroy({ where: { id } });

      if (!rowAffected) {
        throw { name: "NotFound", msg: "User Not Found" };
      }

      res.json({ msg: `user with id ${id} deleted` });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
}