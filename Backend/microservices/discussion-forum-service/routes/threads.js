const express = require('express');
const router = express.Router();
const threadController = require('../controllers/threadController');
const replyController = require('../controllers/replyController');
const { validateThread, validateThreadUpdate, validateReply, validateReplyUpdate } = require('../middleware/validateThread');

// Routes pour les réponses (more specific routes first)
router.get('/:threadId/replies/:replyId', replyController.getReplyById);
router.put('/:threadId/replies/:replyId', validateReplyUpdate, replyController.updateReply);
router.delete('/:threadId/replies/:replyId', replyController.deleteReply);
router.get('/:threadId/replies', replyController.getRepliesByThreadId);
router.post('/:threadId/replies', validateReply, replyController.createReply);

// Routes pour les threads (less specific routes)
router.get('/', threadController.getAllThreads);
router.get('/:id', threadController.getThreadById);
router.post('/', validateThread, threadController.createThread);
router.put('/:id', validateThreadUpdate, threadController.updateThread);
router.delete('/:id', threadController.deleteThread);
router.patch('/:id/toggle-lock', threadController.toggleLock);

module.exports = router;