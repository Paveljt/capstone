const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

async function reviewExists(request, response, next) {
  // TODO: Write your code here
  const { reviewId } = request.params;
  const foundReview = await service.read(reviewId);
  if (foundReview) {
    response.locals.review = foundReview;
    return next();
  }
  next({ status: 404, message: `Review cannot be found.` });
  
}

async function destroy(request, response) {
  // TODO: Write your code here
  const { review_id } = response.locals.review;
  await service.destroy(review_id);
  response.sendStatus(204);
}

async function list(request, response) {
  // TODO: Write your code here
  const { movieId } = request.params;
  const data = await service.list(movieId);
  response.json({ data });
  
}

function hasMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return next();
  }
  methodNotAllowed(request, response, next);
}

function noMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return methodNotAllowed(request, response, next);
  }
  next();
}

async function update(request, response) {
  // TODO: Write your code here
  const updatedReview = {
    review_id: response.locals.review.review_id,
    content: request.body.data.content,
    score: request.body.data.score,
  };
  const data = await service.update(updatedReview);
  response.json({ data });
}
function hasMovieIdInPath(req, res, next) {
  if (req.params.movieId) return next();
  methodNotAllowed(req, res, next);
}

function noMovieIdInPath(req, res, next) {
  if (req.params.movieId) return methodNotAllowed(req, res, next);
  next();
}

module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};
