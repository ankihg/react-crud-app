'use strict';
module.exports = (router, models) => {
// const express = require('express');
// const router = module.exports = new express.Router();
// let Tree = require(__dirname+'/../models/tree-model.js');
  let Tree = models.Tree;

  router.route('/trees')
  .get((req, res) => {
    Tree.find({})
    .populate('species')
    .exec((err, trees) => {
      if (err) return res.sendStatus(500);
      return res.status(200).send(trees);
    });

    // Tree.find({}, (err, trees) => {
    //   if (err) return res.status(500).send('error reading trees').end();
    //   return res.status(200).json(trees).end();
    // });
  })
  .post((req, res) => {
    // req.body.species = models.Species.findById(req.body.species);
    var newTree = new Tree(req.body);
    newTree.save((err, tree) => {
      if (err) {
        console.log(err);
        return res.status(500).send('error creating tree').end();
      }
      return res.status(200).json(tree).end();
    });
  });

  router.route('/trees/:id')
  .get((req, res) => {
    Tree.findById(req.params.id)
    .populate('species')
    .exec((err, tree) => {
      if (err) return res.sendStatus(500);
      return res.status(200).send(tree);
    });

    // Tree.findById(req.params.id, (err, tree) => {
    //   if (err) return res.status(500).send('error reading tree with id  '+req.params.id).end();
    //   return res.status(200).json(tree).end();
    // });
  })
  .put((req, res) => {
    Tree.findByIdAndUpdate(req.params.id, req.body, (err, tree) => {
      if (err) return res.status(500).send('error updating tree with id '+req.params.id).end();
      return res.status(200).json(tree).end();
    });
  })
  .delete((req, res) => {
    Tree.findByIdAndRemove(req.params.id, (err) => {
      if (err) return res.status(500).send('error deleting tree with id '+req.params.id);
      return res.sendStatus(200);
    });
  });
}
