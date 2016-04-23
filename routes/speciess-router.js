'use strict';
module.exports = (router, models) => {
  // const express = require('express');
  // const router = module.exports = new express.Router();
  // let Species = require(__dirname+'/../models/species-model.js');
  let Species = models.Species;

  router.route('/speciess')
  .get((req, res) => {
    // Species.find({})
    // .populate('trees')
    // .exec((err, speciess) => {
    //   if (err) return res.sendStatus(500);
    //   return res.status(200).send(speciess);
    // });

    Species.find({}, (err, speciess) => {
      if (err) return res.status(500).send('error reading speciess').end();
      return res.status(200).json(speciess).end();
    });
  })
  .post((req, res) => {
    Species.find(req.body, (err, matches) => {
      if (matches.length) return res.status(200).send(matches[0]);

      var newSpecies = new Species(req.body);
      newSpecies.save((err, species) => {
        if (err) return res.status(500).send('error creating species').end();
        return res.status(200).json(species).end();
      });
    })


    // var newSpecies = new Species(req.body);
    // newSpecies.save((err, species) => {
    //   if (err) return res.status(500).send('error creating species').end();
    //   return res.status(200).json(species).end();
    // });
  });

  router.route('/speciess/:id')
  .get((req, res) => {
    Species.findById(req.params.id, (err, species) => {
      if (err) return res.status(500).send('error reading species with id  '+req.params.id).end();
      return res.status(200).json(species).end();
    });
  })
  .put((req, res) => {
    Species.find(req.body, (err, matches) => {
      if (matches.length) return res.status(200).send(matches[0]);

      Species.findByIdAndUpdate(req.params.id, req.body, (err, species) => {
        if (err) return res.status(500).send('error updating species with id '+req.params.id).end();
        return res.status(200).json(species).end();
      });
    });

    // Species.findByIdAndUpdate(req.params.id, req.body, (err, species) => {
    //   if (err) return res.status(500).send('error updating species with id '+req.params.id).end();
    //   return res.status(200).json(species).end();
    // });
  })
  .delete((req, res) => {
    Species.findByIdAndRemove(req.params.id, (err) => {
      if (err) return res.status(500).send('error deleting species with id '+req.params.id);
      return res.sendStatus(200);
    });
  });

  router.route('/speciess/:id/trees')
  .get((req, res) => {
    console.log('get trees of species');
    models.Tree.find({species: req.params.id}, (err, trees) => {
      if (err) return res.status(500).send('error find trees of requested species');
      return res.status(200).send(trees);
    });
  });
}
