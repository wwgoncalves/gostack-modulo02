import User from "../models/User";

class UserController {
  async store(request, response) {
    try {
      const userExists = await User.findOne({
        where: { email: request.body.email }
      });

      if (userExists) {
        return response.status(400).json({ error: "User already exists." });
      }

      const { id, name, email, provider } = await User.create(request.body);

      return response.json({
        id,
        name,
        email,
        provider
      });
    } catch (error) {
      return response.json({ error });
    }
  }

  async update(request, response) {
    try {
      const { email, oldPassword } = request.body;

      const user = await User.findByPk(request.userId);

      if (email !== user.email) {
        const userExists = await User.findOne({
          where: { email }
        });

        if (userExists) {
          return response.status(400).json({ error: "User already exists." });
        }
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return response.status(401).json({ error: "Password does not match." });
      }

      const { id, name, provider } = await user.update(request.body);

      return response.json({
        id,
        name,
        email,
        provider
      });
    } catch (error) {
      return response.json({ error });
    }
  }
}

export default new UserController();
