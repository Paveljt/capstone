exports.up = function(knex) {
  return knex.schema.createTable("movies", (table) => {
    table.increments("movie_id").primary();
    table.string("title");
    table.text("description");
    table.integer("runtime_in_minutes");
    table.string("rating");
    table.string("image_url");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("movies");
};
