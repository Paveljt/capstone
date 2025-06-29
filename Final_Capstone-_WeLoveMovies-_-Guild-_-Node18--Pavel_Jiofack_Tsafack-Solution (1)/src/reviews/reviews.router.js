const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// TODO: Add your routes here
router
  .route("/")
  .get(controller.list)
  .all(methodNotAllowed);

// DELETE /reviews/:reviewId
// PUT /reviews/:reviewId
router
  .route("/:reviewId")
  .delete(controller.destroy)
  .put(controller.update)
  .all(methodNotAllowed);
module.exports = router;
