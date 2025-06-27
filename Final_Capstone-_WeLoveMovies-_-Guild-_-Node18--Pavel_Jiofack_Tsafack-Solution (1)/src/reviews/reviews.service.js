const db = require("../db/connection");

const tableName = "reviews";

async function destroy(reviewId) {
  // TODO: Write your code here
  return db(tableName).where({ review_id: reviewId }).del();
}

async function list(movie_id) {
  // TODO: Write your code here
  return db("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select(
      "r.review_id",
      "r.content",
      "r.score",
      "r.created_at",
      "r.updated_at",
      "r.critic_id",
      "r.movie_id",
      "c.critic_id as critic:critic_id",
      "c.preferred_name as critic:preferred_name",
      "c.surname as critic:surname",
      "c.organization_name as critic:organization_name"
    )
    .where({ "r.movie_id": movie_id })
    .then((rows) =>
      rows.map((row) => ({
        review_id: row.review_id,
        content: row.content,
        score: row.score,
        created_at: row.created_at,
        updated_at: row.updated_at,
        critic_id: row.critic_id,
        movie_id: row.movie_id,
        critic: {
          critic_id: row["critic:critic_id"],
          preferred_name: row["critic:preferred_name"],
          surname: row["critic:surname"],
          organization_name: row["critic:organization_name"],
        },
      }))
    );
}

async function read(reviewId) {
  // TODO: Write your code here
  return db("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select(
      "r.review_id",
      "r.content",
      "r.score",
      "r.created_at",
      "r.updated_at",
      "r.critic_id",
      "r.movie_id",
      "c.critic_id as critic:critic_id",
      "c.preferred_name as critic:preferred_name",
      "c.surname as critic:surname",
      "c.organization_name as critic:organization_name"
    )
    .where({ "r.review_id": reviewId })
    .first()
    .then((row) => {
      if (!row) return null;

      return {
        review_id: row.review_id,
        content: row.content,
        score: row.score,
        created_at: row.created_at,
        updated_at: row.updated_at,
        critic_id: row.critic_id,
        movie_id: row.movie_id,
        critic: {
          critic_id: row["critic:critic_id"],
          preferred_name: row["critic:preferred_name"],
          surname: row["critic:surname"],
          organization_name: row["critic:organization_name"],
        },
      };
    });
}

async function readCritic(critic_id) {
  return db("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return db("reviews")
    .where({ review_id: review.review_id })
    .update({
      content: review.content,
      score: review.score,
      updated_at: db.fn.now(),
    })
    .then(() => read(review.review_id));
}

module.exports = {
  destroy,
  list,
  read,
  update,
};
