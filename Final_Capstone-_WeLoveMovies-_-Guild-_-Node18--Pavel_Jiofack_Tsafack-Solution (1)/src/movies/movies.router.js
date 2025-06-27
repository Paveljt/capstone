const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

// GET /movies
router
  .route("/")
  .get(controller.list)
  .all(methodNotAllowed);

// GET /movies/:movieId
router
  .route("/:movieId")
  .get(controller.read)
  .all(methodNotAllowed);

// nested routes with mergeParams
router.use("/:movieId/reviews", reviewsRouter)
router.use("/:movieId/theaters", theatersRouter);


module.exports = router;
