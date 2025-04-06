const { Thread, Reply } = require('../models');

// Error handling helper
const handleError = (res, error, message) => {
  console.error(`Error: ${message}`, error);
  res.status(500).json({ message: `Error ${message}` });
};

// Get all threads
exports.getAllThreads = async (req, res) => {
  try {
    const threads = await Thread.findAll({
      include: [Reply],
      order: [['createdAt', 'DESC']]
    });
    res.json(threads);
  } catch (error) {
    handleError(res, error, 'fetching threads');
  }
};

// Get a single thread by ID
exports.getThreadById = async (req, res) => {
  try {
    const thread = await Thread.findByPk(req.params.id, {
      include: [{
        model: Reply,
        order: [['createdAt', 'ASC']]
      }]
    });
    
    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' });
    }
    
    // Convert to plain object to ensure proper serialization
    const threadData = thread.get({ plain: true });
    console.log('Thread data with replies:', threadData);
    
    res.json(threadData);
  } catch (error) {
    handleError(res, error, 'fetching thread');
  }
};

// Create a new thread
exports.createThread = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    
    const thread = await Thread.create({
      title,
      content,
      author
    });
    
    // Emit socket event for real-time updates
    req.app.get('io').emit('newThread', thread);
    
    res.status(201).json(thread);
  } catch (error) {
    handleError(res, error, 'creating thread');
  }
};

// Add a reply to a thread
exports.addReply = async (req, res) => {
  try {
    const { content, author } = req.body;
    
    const thread = await Thread.findByPk(req.params.id);
    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' });
    }

    const reply = await Reply.create({
      content,
      author,
      threadId: thread.id
    });

    // Emit socket event for real-time updates
    req.app.get('io').emit('newReply', {
      threadId: thread.id,
      reply
    });

    // Fetch the updated thread with all replies
    const updatedThread = await Thread.findByPk(thread.id, {
      include: [Reply]
    });

    res.status(201).json(updatedThread);
  } catch (error) {
    handleError(res, error, 'adding reply');
  }
};

// Delete a thread
exports.deleteThread = async (req, res) => {
  try {
    const thread = await Thread.findByPk(req.params.id);
    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' });
    }
    
    await thread.destroy();
    res.json({ message: 'Thread deleted successfully' });
  } catch (error) {
    handleError(res, error, 'deleting thread');
  }
};

// Update a thread
exports.updateThread = async (req, res) => {
  try {
    const { title, content, isLocked } = req.body;
    const threadId = req.params.id;
    
    const thread = await Thread.findByPk(threadId);
    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' });
    }
    
    await thread.update({
      title: title || thread.title,
      content: content || thread.content,
      isLocked: isLocked !== undefined ? isLocked : thread.isLocked
    });
    
    res.json(thread);
  } catch (error) {
    handleError(res, error, 'updating thread');
  }
};

// Toggle thread lock status
exports.toggleLock = async (req, res) => {
  try {
    const threadId = req.params.id;
    
    const thread = await Thread.findByPk(threadId);
    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' });
    }
    
    await thread.update({
      isLocked: !thread.isLocked
    });
    
    res.json({
      message: `Thread ${thread.isLocked ? 'locked' : 'unlocked'} successfully`,
      isLocked: thread.isLocked
    });
  } catch (error) {
    handleError(res, error, 'toggling thread lock status');
  }
};