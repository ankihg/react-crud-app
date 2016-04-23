'use strict';
module.exports = (mongoose, models) => {
  const treeSchema = new mongoose.Schema({
    species: {type: mongoose.Schema.Types.ObjectId, ref: 'Species'},
    lat: Number,
    lng: Number
  });

  models.Tree = mongoose.model('Tree', treeSchema);
}
