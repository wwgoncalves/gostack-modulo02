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
}

export default new UserController();
