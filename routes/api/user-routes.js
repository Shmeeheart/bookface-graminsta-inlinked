const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
} = require('../../controllers/user-controller');
const {
  addFriend,
  deleteFriend,
} = require('../../controllers/friend-controller');

//api/users
router.route('/').get(getAllUser).post(createUser);

// api/users/:id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// api/user/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
