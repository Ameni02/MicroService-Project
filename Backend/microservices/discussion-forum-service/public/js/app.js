// Connect to Socket.IO server
const socket = io();

// DOM Elements
const newThreadBtn = document.getElementById('newThreadBtn');
const newThreadForm = document.getElementById('newThreadForm');
const cancelThreadBtn = document.getElementById('cancelThreadBtn');
const threadsList = document.getElementById('threadsList');
const threadModal = new bootstrap.Modal(document.getElementById('threadModal'));
const newReplyForm = document.getElementById('newReplyForm');

// Show/Hide New Thread Form
newThreadBtn.addEventListener('click', () => {
    document.querySelector('.new-thread-form').classList.add('active');
});

cancelThreadBtn.addEventListener('click', () => {
    document.querySelector('.new-thread-form').classList.remove('active');
    newThreadForm.reset();
});

// Error handling function
function showError(message, container = null) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger alert-dismissible fade show';
    errorDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    if (container) {
        container.innerHTML = '';
        container.appendChild(errorDiv);
    } else {
        document.body.insertBefore(errorDiv, document.body.firstChild);
    }
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        errorDiv.classList.remove('show');
        setTimeout(() => errorDiv.remove(), 150);
    }, 5000);
}

// Success message function
function showSuccess(message, container = null) {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success alert-dismissible fade show';
    successDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    if (container) {
        container.innerHTML = '';
        container.appendChild(successDiv);
    } else {
        document.body.insertBefore(successDiv, document.body.firstChild);
    }
    
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
        successDiv.classList.remove('show');
        setTimeout(() => successDiv.remove(), 150);
    }, 3000);
}

// Handle New Thread Submission
newThreadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const threadData = {
        title: document.getElementById('threadTitle').value,
        content: document.getElementById('threadContent').value,
        author: document.getElementById('threadAuthor').value
    };

    try {
        const response = await fetch('/api/threads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(threadData)
        });

        if (response.ok) {
            newThreadForm.reset();
            document.querySelector('.new-thread-form').classList.remove('active');
            loadThreads();
            showSuccess('Thread created successfully!');
        } else {
            const errorData = await response.json();
            showError(errorData.message || 'Failed to create thread. Please try again.');
        }
    } catch (error) {
        console.error('Error creating thread:', error);
        showError('An error occurred while creating the thread.');
    }
});

// Load All Threads
async function loadThreads() {
    try {
        const response = await fetch('/api/threads');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const threads = await response.json();
        
        if (threads.length === 0) {
            threadsList.innerHTML = '<div class="alert alert-info">No threads yet. Be the first to create one!</div>';
            return;
        }
        
        threadsList.innerHTML = threads.map(thread => `
            <div class="card thread-card">
                <div class="card-body">
                    <h5 class="card-title">${thread.title}</h5>
                    <p class="card-text">${thread.content.substring(0, 150)}${thread.content.length > 150 ? '...' : ''}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <span class="badge bg-primary author-badge">
                                <i class="fas fa-user me-1"></i>${thread.author}
                            </span>
                            <span class="timestamp ms-2">
                                <i class="fas fa-clock me-1"></i>${new Date(thread.createdAt).toLocaleString()}
                            </span>
                        </div>
                        <div class="thread-actions">
                            <button class="btn btn-sm btn-outline-primary me-1" onclick="loadThreadDetails('${thread.id}')">
                                <i class="fas fa-comments me-1"></i>View Discussion
                            </button>
                            <button class="btn btn-sm btn-outline-secondary me-1" onclick="editThread('${thread.id}')">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="btn btn-sm btn-outline-danger" onclick="deleteThread('${thread.id}')">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading threads:', error);
        showError('Failed to load threads. Please try again later.', threadsList);
    }
}

// Load Thread Details
async function loadThreadDetails(threadId) {
    try {
        const response = await fetch(`/api/threads/${threadId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const thread = await response.json();
        console.log('Loaded thread details:', thread);
        
        document.getElementById('threadModalTitle').textContent = thread.title;
        document.getElementById('threadContent').innerHTML = `
            <div class="card mb-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <h5 class="card-title">${thread.title}</h5>
                        <div class="btn-group">
                            <button class="btn btn-sm btn-outline-primary" onclick="editThread('${thread.id}')">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="btn btn-sm btn-outline-danger" onclick="deleteThread('${thread.id}')">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                    <p class="card-text">${thread.content}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="badge bg-primary author-badge">
                            <i class="fas fa-user me-1"></i>${thread.author}
                        </span>
                        <div>
                            <span class="timestamp me-2">
                                <i class="fas fa-clock me-1"></i>${new Date(thread.createdAt).toLocaleString()}
                            </span>
                            <button class="btn btn-sm ${thread.isLocked ? 'btn-danger' : 'btn-success'}" 
                                    onclick="toggleThreadLock('${thread.id}', ${thread.isLocked})">
                                <i class="fas fa-${thread.isLocked ? 'unlock' : 'lock'} me-1"></i>
                                ${thread.isLocked ? 'Unlock Thread' : 'Lock Thread'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Update replies list
        const repliesList = document.getElementById('repliesList');
        if (thread.Replies && thread.Replies.length > 0) {
            console.log('Displaying replies:', thread.Replies);
            repliesList.innerHTML = thread.Replies.map(reply => `
                <div class="card reply-card" data-reply-id="${reply.id}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <div class="d-flex align-items-center">
                                <span class="badge bg-secondary author-badge me-2">
                                    <i class="fas fa-user me-1"></i>${reply.author}
                                </span>
                                <span class="timestamp">
                                    <i class="fas fa-clock me-1"></i>${new Date(reply.createdAt).toLocaleString()}
                                </span>
                            </div>
                            <div class="btn-group">
                                <button class="btn btn-sm btn-outline-primary" onclick="editReply('${thread.id}', '${reply.id}')">
                                    <i class="fas fa-edit"></i> Edit
                                </button>
                                <button class="btn btn-sm btn-outline-danger" onclick="deleteReply('${thread.id}', '${reply.id}')">
                                    <i class="fas fa-trash"></i> Delete
                                </button>
                            </div>
                        </div>
                        <p class="card-text">${reply.content}</p>
                    </div>
                </div>
            `).join('');
        } else {
            console.log('No replies to display');
            repliesList.innerHTML = '<div class="alert alert-info">No replies yet. Be the first to reply!</div>';
        }

        // Update reply form
        const replyForm = document.querySelector('.new-reply-form');
        if (thread.isLocked) {
            replyForm.innerHTML = `
                <div class="card-header bg-danger text-white">
                    <h6 class="mb-0"><i class="fas fa-lock me-2"></i>Thread Locked</h6>
                </div>
                <div class="card-body">
                    <div class="alert alert-warning">
                        <i class="fas fa-exclamation-triangle me-2"></i>This thread is locked. No new replies can be added.
                    </div>
                </div>
            `;
        } else {
            replyForm.innerHTML = `
                <div class="card-header bg-light">
                    <h6 class="mb-0">Add a Reply</h6>
                </div>
                <div class="card-body">
                    <form id="newReplyForm">
                        <input type="hidden" id="replyThreadId" value="${threadId}">
                        <div class="mb-3">
                            <label for="replyContent" class="form-label">Your Reply</label>
                            <textarea class="form-control" id="replyContent" rows="3" required></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="replyAuthor" class="form-label">Your Name</label>
                            <input type="text" class="form-control" id="replyAuthor" required>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="submit" class="btn btn-primary">Post Reply</button>
                        </div>
                    </form>
                </div>
            `;
            
            // Remove any existing event listeners
            const oldForm = document.getElementById('newReplyForm');
            if (oldForm) {
                const newForm = oldForm.cloneNode(true);
                oldForm.parentNode.replaceChild(newForm, oldForm);
            }
            
            // Add event listener to the new form
            const form = document.getElementById('newReplyForm');
            if (form) {
                console.log('Adding submit event listener to reply form');
                form.addEventListener('submit', handleReplySubmit);
            } else {
                console.error('Reply form not found in DOM');
            }
        }
        
        threadModal.show();
    } catch (error) {
        console.error('Error loading thread details:', error);
        showError('Failed to load thread details. Please try again.');
    }
}

// Handle Reply Submission
async function handleReplySubmit(e) {
    e.preventDefault();
    
    const replyData = {
        content: document.getElementById('replyContent').value,
        author: document.getElementById('replyAuthor').value,
        threadId: document.getElementById('replyThreadId').value
    };

    try {
        console.log('Sending reply data:', replyData);
        const response = await fetch(`/api/threads/${replyData.threadId}/replies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: replyData.content,
                author: replyData.author
            })
        });

        console.log('Response status:', response.status);
        const responseData = await response.json();
        console.log('Response data:', responseData);

        if (response.ok) {
            document.getElementById('newReplyForm').reset();
            
            // Update the replies list with all replies
            const repliesList = document.getElementById('repliesList');
            if (responseData.Replies && responseData.Replies.length > 0) {
                console.log('Updating replies list with:', responseData.Replies);
                repliesList.innerHTML = responseData.Replies.map(reply => `
                    <div class="card reply-card">
                        <div class="card-body">
                            <p class="card-text">${reply.content}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="badge bg-secondary author-badge">
                                    <i class="fas fa-user me-1"></i>${reply.author}
                                </span>
                                <span class="timestamp">
                                    <i class="fas fa-clock me-1"></i>${new Date(reply.createdAt).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                `).join('');
            } else {
                console.log('No replies found in response');
                repliesList.innerHTML = '<div class="alert alert-info">No replies yet. Be the first to reply!</div>';
            }
            
            showSuccess('Reply posted successfully!');
        } else {
            showError(responseData.message || 'Failed to post reply. Please try again.');
        }
    } catch (error) {
        console.error('Error posting reply:', error);
        showError('An error occurred while posting the reply.');
    }
}

// Toggle Thread Lock Status
async function toggleThreadLock(threadId, currentLockStatus) {
    try {
        const response = await fetch(`/api/threads/${threadId}/toggle-lock`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        showSuccess(result.message);
        loadThreadDetails(threadId);
    } catch (error) {
        console.error('Error toggling thread lock:', error);
        showError('Failed to toggle thread lock status. Please try again.');
    }
}

// Socket.IO event handlers
socket.on('newThread', (thread) => {
    loadThreads();
});

socket.on('newReply', (data) => {
    if (document.getElementById('replyThreadId').value === data.threadId) {
        loadThreadDetails(data.threadId);
    }
});

// Initial load
loadThreads();

// Edit Thread
async function editThread(threadId) {
    try {
        console.log(`Editing thread with ID: ${threadId}`);
        const response = await fetch(`/api/threads/${threadId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const thread = await response.json();
        
        // Create edit form
        const editForm = `
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">Edit Thread</h5>
                </div>
                <div class="card-body">
                    <form id="editThreadForm">
                        <div class="mb-3">
                            <label for="editThreadTitle" class="form-label">Title</label>
                            <input type="text" class="form-control" id="editThreadTitle" value="${thread.title}" required>
                        </div>
                        <div class="mb-3">
                            <label for="editThreadContent" class="form-label">Content</label>
                            <textarea class="form-control" id="editThreadContent" rows="5" required>${thread.content}</textarea>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-secondary me-2" id="cancelEditBtn">Cancel</button>
                            <button type="submit" class="btn btn-primary">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        // Check if we're in the thread modal or in the main thread list
        const threadModalElement = document.getElementById('threadModal');
        const isInThreadModal = threadModalElement && threadModalElement.classList.contains('show');
        
        if (isInThreadModal) {
            // We're in the thread modal, update its content
            document.getElementById('threadModalTitle').textContent = 'Edit Thread';
            document.getElementById('threadContent').innerHTML = editForm;
            
            // Add event listener to the cancel button
            document.getElementById('cancelEditBtn').addEventListener('click', () => {
                threadModal.hide();
            });
        } else {
            // We're in the main thread list, find the thread card
            // Find all thread cards and look for the one with the edit button for this thread
            const threadCards = document.querySelectorAll('.thread-card');
            let threadCard = null;
            
            for (const card of threadCards) {
                const editButton = card.querySelector(`button[onclick="editThread('${threadId}')"]`);
                if (editButton) {
                    threadCard = card;
                    break;
                }
            }
            
            if (threadCard) {
                // Replace the thread card with the edit form
                threadCard.innerHTML = editForm;
                
                // Add event listener to the cancel button
                document.getElementById('cancelEditBtn').addEventListener('click', () => {
                    loadThreads(); // Reload the threads list
                });
            } else {
                // If we can't find the thread card, show an error
                showError('Could not find the thread to edit. Please try again.');
                return;
            }
        }
        
        // Add event listener to the form
        document.getElementById('editThreadForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const updatedThread = {
                title: document.getElementById('editThreadTitle').value,
                content: document.getElementById('editThreadContent').value
            };
            
            try {
                console.log(`Updating thread with ID: ${threadId}`, updatedThread);
                const updateResponse = await fetch(`/api/threads/${threadId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedThread)
                });
                
                if (updateResponse.ok) {
                    showSuccess('Thread updated successfully!');
                    
                    if (isInThreadModal) {
                        threadModal.hide();
                    }
                    
                    loadThreads(); // Refresh the threads list
                } else {
                    const errorData = await updateResponse.json();
                    showError(errorData.message || 'Failed to update thread. Please try again.');
                }
            } catch (error) {
                console.error('Error updating thread:', error);
                showError('An error occurred while updating the thread.');
            }
        });
    } catch (error) {
        console.error('Error loading thread for editing:', error);
        showError('Failed to load thread for editing. Please try again.');
    }
}

// Delete Thread
async function deleteThread(threadId) {
    if (confirm('Are you sure you want to delete this thread? This action cannot be undone.')) {
        try {
            const response = await fetch(`/api/threads/${threadId}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                showSuccess('Thread deleted successfully!');
                
                // Check if we're in the thread modal or in the main thread list
                const threadModalElement = document.getElementById('threadModal');
                const isInThreadModal = threadModalElement && threadModalElement.classList.contains('show');
                
                if (isInThreadModal) {
                    threadModal.hide();
                }
                
                loadThreads(); // Refresh the threads list
            } else {
                const errorData = await response.json();
                showError(errorData.message || 'Failed to delete thread. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting thread:', error);
            showError('An error occurred while deleting the thread.');
        }
    }
}

// Edit Reply
async function editReply(threadId, replyId) {
    try {
        console.log(`Fetching reply with ID: ${replyId} from thread: ${threadId}`);
        const response = await fetch(`/api/threads/${threadId}/replies/${replyId}`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            const contentType = response.headers.get('content-type');
            let errorMessage = `HTTP error! status: ${response.status}`;
            
            if (contentType && contentType.includes('application/json')) {
                const errorData = await response.json();
                errorMessage += `, message: ${errorData.error || errorData.message || 'Unknown error'}`;
            } else {
                const textError = await response.text();
                console.error('Non-JSON error response:', textError);
                errorMessage += ', received non-JSON response';
            }
            
            throw new Error(errorMessage);
        }
        
        const reply = await response.json();
        console.log('Reply data received:', reply);
        
        // Create edit form
        const editForm = `
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">Edit Reply</h5>
                </div>
                <div class="card-body">
                    <form id="editReplyForm">
                        <div class="mb-3">
                            <label for="editReplyContent" class="form-label">Content</label>
                            <textarea class="form-control" id="editReplyContent" rows="5" required>${reply.content}</textarea>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-secondary me-2" onclick="loadThreadDetails('${threadId}')">Cancel</button>
                            <button type="submit" class="btn btn-primary">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        // Replace the reply with the edit form
        const replyElement = document.querySelector(`[data-reply-id="${replyId}"]`);
        if (replyElement) {
            replyElement.innerHTML = editForm;
            
            // Add event listener to the form
            document.getElementById('editReplyForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const updatedContent = document.getElementById('editReplyContent').value;
                console.log('Sending updated reply content:', updatedContent);
                
                try {
                    const updateResponse = await fetch(`/api/threads/${threadId}/replies/${replyId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ content: updatedContent })
                    });
                    
                    if (updateResponse.ok) {
                        const result = await updateResponse.json();
                        console.log('Update response:', result);
                        showSuccess('Reply updated successfully!');
                        loadThreadDetails(threadId); // Refresh the thread details
                    } else {
                        const errorData = await updateResponse.json();
                        showError(errorData.message || errorData.error || 'Failed to update reply. Please try again.');
                    }
                } catch (error) {
                    console.error('Error updating reply:', error);
                    showError('An error occurred while updating the reply.');
                }
            });
        }
    } catch (error) {
        console.error('Error loading reply for editing:', error);
        showError('Failed to load reply for editing. Please try again.');
    }
}

// Delete Reply
async function deleteReply(threadId, replyId) {
    if (confirm('Are you sure you want to delete this reply? This action cannot be undone.')) {
        try {
            const response = await fetch(`/api/threads/${threadId}/replies/${replyId}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                showSuccess('Reply deleted successfully!');
                loadThreadDetails(threadId); // Refresh the thread details
            } else {
                const errorData = await response.json();
                showError(errorData.message || 'Failed to delete reply. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting reply:', error);
            showError('An error occurred while deleting the reply.');
        }
    }
} 