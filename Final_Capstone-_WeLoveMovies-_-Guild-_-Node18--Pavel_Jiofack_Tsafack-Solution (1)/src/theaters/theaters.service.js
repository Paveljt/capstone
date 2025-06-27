const db = require("../db/connection");

async function list() {
  const rows = await db("theaters as t")
    .leftJoin("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .leftJoin("movies as m", "mt.movie_id", "m.movie_id")
    .select(
      "t.theater_id",
      "t.name",
      "t.address_line_1",
      "t.address_line_2",
      "t.city",
      "t.state",
      "t.zip",
      "m.movie_id",
      "m.title",
      "m.rating",
      "m.runtime_in_minutes",
      "m.description",
      "m.image_url",
      "mt.is_showing"
    );

  const theatersMap = {};

  rows.forEach((row) => {
    if (!theatersMap[row.theater_id]) {
      theatersMap[row.theater_id] = {
        theater_id: row.theater_id,
        name: row.name,
        address_line_1: row.address_line_1 || "",
        address_line_2: row.address_line_2 || "",
        city: row.city,
        state: row.state,
        zip: row.zip,
        movies: [],
      };
    }

    if (row.movie_id) {
      theatersMap[row.theater_id].movies.push({
        movie_id: row.movie_id,
        title: row.title || "",
        rating: row.rating || "",
        runtime_in_minutes: row.runtime_in_minutes || 0,
        description: row.description || "",
        image_url: row.image_url || "",
        is_showing: !!row.is_showing,
      });
    }
  });

  return Object.values(theatersMap);
}

module.exports = {
  list,
};
