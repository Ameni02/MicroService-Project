const { Thread, Reply } = require('../models');

// Error handling helper
const handleError = (res, error, message) => {
  console.error(`Error: ${message}`, error);
  res.status(500).json({ message: `Error ${message}` });
};

// Get all replies for a thread
exports.getRepliesByThreadId = async (req, res) => {
  try {
    const replies = await Reply.findAll({
      where: { threadId: req.params.threadId },
      order: [['createdAt', 'ASC']]
    });
    
    res.json(replies);
  } catch (error) {
    handleError(res, error, 'fetching replies');
  }
};

// Create new reply
exports.createReply = async (req, res) => {
  try {
    const { content, author } = req.body;
    const threadId = req.params.threadId;
    
    if (!content || !author) {
      return res.status(400).json({ error: 'Content and author are required' });
    }
    
    // Check if thread exists
    const thread = await Thread.findByPk(threadId);
    
    if (!thread) {
      return res.status(404).json({ error: 'Thread not found' });
    }
    
    if (thread.isLocked) {
      return res.status(403).json({ error: 'Cannot reply to a locked thread' });
    }
    
    const reply = await Reply.create({
      content,
      author,
      threadId
    });
    
    // Emit Socket.io event to update clients in real-time
    req.app.get('io').emit('newReply', {
      threadId,
      reply
    });
    
    // Fetch the updated thread with all replies
    const updatedThread = await Thread.findByPk(threadId, {
      include: [{
        model: Reply,
        order: [['createdAt', 'ASC']]
      }]
    });
    
    // Convert to plain object to ensure proper serialization
    const threadData = updatedThread.get({ plain: true });
    console.log('Updated thread data with replies:', threadData);
    
    res.status(201).json(threadData);
  } catch (error) {
    handleError(res, error, 'creating reply');
  }
};

// Get a single reply by ID
exports.getReplyById = async (req, res) => {
  try {
    const replyId = req.params.replyId;
    const threadId = req.params.threadId;
    console.log(`Fetching reply with ID: ${replyId} from thread: ${threadId}`);
    
    // First check if the thread exists
    const thread = await Thread.findByPk(threadId);
    if (!thread) {
      console.log(`Thread with ID ${threadId} not found`);
      return res.status(404).json({ error: 'Thread not found' });
    }
    
    // Then find the reply
    const reply = await Reply.findOne({
      where: {
        id: replyId,
        threadId: threadId
      }
    });
    
    if (!reply) {
      console.log(`Reply with ID ${replyId} not found in thread ${threadId}`);
      return res.status(404).json({ error: 'Reply not found' });
    }
    
    console.log(`Reply found: ${JSON.stringify(reply)}`);
    res.json(reply);
  } catch (error) {
    console.error('Error in getReplyById:', error);
    handleError(res, error, 'fetching reply');
  }
};

// Update reply
exports.updateReply = async (req, res) => {
  try {
    const { content } = req.body;
    const replyId = req.params.replyId;
    
    const reply = await Reply.findByPk(replyId);
    
    if (!reply) {
      return res.status(404).json({ error: 'Reply not found' });
    }
    
    await reply.update({
      content: content || reply.content
    });
    
    // Fetch the updated thread with all replies
    const updatedThread = await Thread.findByPk(reply.threadId, {
      include: [{
        model: Reply,
        order: [['createdAt', 'ASC']]
      }]
    });
    
    // Convert to plain object to ensure proper serialization
    const threadData = updatedThread.get({ plain: true });
    console.log('Updated thread data with replies:', threadData);
    
    res.json(threadData);
  } catch (error) {
    handleError(res, error, 'updating reply');
  }
};

// Delete reply
exports.deleteReply = async (req, res) => {
  try {
    const replyId = req.params.replyId;
    
    const reply = await Reply.findByPk(replyId);
    
    if (!reply) {
      return res.status(404).json({ error: 'Reply not found' });
    }
    
    await reply.destroy();
    
    res.json({ message: 'Reply deleted successfully' });
  } catch (error) {
    handleError(res, error, 'deleting reply');
  }
}; 