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

// /api/thoughts
router.route('/').get(getAllThought).post(createThought);

// /api/thoughts
router.route('/:thoughtId/reaction').post(createThought);

router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction);

module.exports = router;
