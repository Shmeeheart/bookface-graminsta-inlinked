const router = require('express').Router();
const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thought-controller');

const {
  addReaction,
  deleteReaction,
} = require('../../controllers/reaction-controller');

// get all thoughts
router.route('/').get(getAllThought);

// get thought by ID and create new thought
router.route('/:thoughtId').get(getThoughtById).post(createThought);

// get thought by ID and update
router.route('/:thoughtId').put(updateThought);

// delete thought
router.route('/:thoughtId').delete(deleteThought);

// add reaction
router.route('/:thoughtId/reaction').post(addReaction);

// delete reaction
router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction);

module.exports = router;
