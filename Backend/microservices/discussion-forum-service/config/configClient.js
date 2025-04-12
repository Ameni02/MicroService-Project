const axios = require('axios');

class ConfigClient {
    constructor(configServerUrl) {
        this.configServerUrl = configServerUrl;
        this.config = null;
    }

    async fetchConfig() {
        try {
            const response = await axios.get(`${this.configServerUrl}/discussion-forum-service/default`);
            this.config = response.data;
            return this.config;
        } catch (error) {
            console.error('Error fetching configuration:', error.message);
            throw error;
        }
    }

    getConfig() {
        return this.config;
    }

    getProperty(propertyPath) {
        if (!this.config) {
            throw new Error('Configuration not loaded. Call fetchConfig() first.');
        }

        const parts = propertyPath.split('.');
        let value = this.config;

        for (const part of parts) {
            if (value === undefined || value === null) {
                return undefined;
            }
            value = value[part];
        }

        return value;
    }
}

module.exports = ConfigClient; 