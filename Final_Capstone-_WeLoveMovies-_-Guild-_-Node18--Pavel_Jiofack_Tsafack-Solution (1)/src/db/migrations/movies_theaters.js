exports.up = function(knex) {
  return knex.schema.createTable("movies_theaters", (table) => {
    table.increments("movies_theaters_id").primary();
    table.integer("movie_id").unsigned().notNullable();
    table.foreign("movie_id").references("movie_id").inTable("movies");
    table.integer("theater_id").unsigned().notNullable();
    table.foreign("theater_id").references("theater_id").inTable("theaters");
    table.boolean("is_showing");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("movies_theaters");
};
