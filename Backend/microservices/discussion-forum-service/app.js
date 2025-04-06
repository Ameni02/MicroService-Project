const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');
const Eureka = require('eureka-js-client').Eureka;
const ConfigClient = require('./config/configClient');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Initialize config client
const configClient = new ConfigClient('http://localhost:8888');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Store Socket.IO instance in app
app.set('io', io);

// Import routes
const threadsRoutes = require('./routes/threads');

// Use routes
app.use('/api/threads', threadsRoutes);

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Database connection
const { testConnection } = require('./models');

// Eureka client configuration
const eurekaClient = new Eureka({
    instance: {
        app: 'discussion-forum-service',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        port: {
            '$': 5000,
            '@enabled': true,
        },
        vipAddress: 'discussion-forum-service',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
    },
    eureka: {
        host: 'localhost',
        port: 8761,
        servicePath: '/eureka/apps/',
    },
});

// Start the server
async function startServer() {
    try {
        // Fetch configuration from config server
        await configClient.fetchConfig();
        const port = process.env.PORT || 3000;

        // Connect to database
        await testConnection();

        // Start Eureka client
        eurekaClient.start();

        // Start HTTP server
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();

module.exports = app;