const { Router } = require("express");

const routes = new Router();

routes.get("/", (request, response) => {
  return response.json({ message: "Hi" });
});

module.exports = routes;
