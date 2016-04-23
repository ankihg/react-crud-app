'use strict';
module.exports = (mongoose, models) => {

  const speciesSchema = new mongoose.Schema({
    genus: String,
    species: String,
    cmnName: String
  });

  models.Species = mongoose.model('Species', speciesSchema);
}
