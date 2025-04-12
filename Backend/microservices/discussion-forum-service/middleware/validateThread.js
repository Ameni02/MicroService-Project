// Validation middleware for thread creation
exports.validateThread = (req, res, next) => {
  const { title, content, author } = req.body;
  
  if (!title || !content || !author) {
    return res.status(400).json({ 
      message: 'All fields are required',
      missing: {
        title: !title,
        content: !content,
        author: !author
      }
    });
  }
  
  if (title.length > 200) {
    return res.status(400).json({ 
      message: 'Title must be less than 200 characters' 
    });
  }
  
  next();
};

// Validation middleware for thread updates
exports.validateThreadUpdate = (req, res, next) => {
  const { title, content } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ 
      message: 'Title and content are required for updating a thread',
      missing: {
        title: !title,
        content: !content
      }
    });
  }
  
  if (title.length > 200) {
    return res.status(400).json({ 
      message: 'Title must be less than 200 characters' 
    });
  }
  
  next();
};

// Validation middleware for reply creation
exports.validateReply = (req, res, next) => {
  const { content, author } = req.body;
  
  if (!content || !author) {
    return res.status(400).json({ 
      message: 'Content and author are required',
      missing: {
        content: !content,
        author: !author
      }
    });
  }
  
  next();
};

// Validation middleware for reply updates
exports.validateReplyUpdate = (req, res, next) => {
  const { content } = req.body;
  
  if (!content) {
    return res.status(400).json({ 
      message: 'Content is required for updating a reply',
      missing: {
        content: !content
      }
    });
  }
  
  next();
}; 