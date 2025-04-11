# 📝 Feedback Management System

<div align="center">
  <img src="https://img.shields.io/badge/Spring_Boot-3.4-green" alt="Spring Boot">
  <img src="https://img.shields.io/badge/Angular-16-red" alt="Angular">
  <img src="https://img.shields.io/badge/Java-17-orange" alt="Java">
  <img src="https://img.shields.io/badge/Docker-Ready-blue" alt="Docker">
  <img src="https://img.shields.io/badge/Azure_Translator-Enabled-purple" alt="Azure">
</div>

<div align="center">
  <strong>A comprehensive feedback management system for online training platforms</strong>
</div>

## 📚 Overview

The Feedback Management System is a microservice-based solution designed to handle user feedback efficiently in online training environments. It provides a robust platform for collecting, translating, and analyzing user feedback with support for both authenticated and anonymous submissions.

## 🌟 Key Features

- **User Feedback Collection**
  - ⭐ Rating system (1-5 stars)
  - 💭 Detailed comment support
  - 🕵️ Anonymous submission option
  - 📝 Multiple feedback categories

- **Advanced Functionality**
  - 🌍 Automatic translation via Azure API
  - 🔍 Advanced search and filtering
  - 📊 Analytics dashboard
  - 📁 Feedback archiving system

- **Technical Features**
  - 🔐 Secure API endpoints
  - 🔄 Real-time updates
  - 📱 Responsive design
  - 🌐 Cross-platform compatibility

## 🚀 Quick Start

### Prerequisites
- Java 17
- Node.js & npm
- Maven
- MySQL

### Backend Setup (Spring Boot - Port 8063)
```bash
# Clone the repository
git clone https://github.com/Ameni02/MicroService-Project.git

# Navigate to backend directory
cd Backend/microservices/feedbacks

# Build and run
mvn clean install
java -jar target/feedbacks-0.0.1-SNAPSHOT.jar
```

### Frontend Setup (Angular - Port 4200)
```bash
# Navigate to frontend directory
cd Frontend/microservice_front

# Install dependencies
npm install

# Start development server
ng serve -o
```

## 🐳 Docker Deployment

```bash
# Build Docker image
docker build -t feedback-service .

# Run container
docker run -p 8063:8063 feedback-service

# Docker Compose (optional)
docker-compose up -d
```

## 🔧 Configuration

### Environment Variables
```properties
# Azure Translator Configuration
AZURE_TRANSLATOR_KEY=your_key_here
AZURE_TRANSLATOR_REGION=eastus

# Database Configuration
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/feedbacks
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=your_password
```

## 📖 API Documentation

Access the API documentation at: `http://localhost:8063/swagger-ui.html`

Key endpoints:
- `POST /api/feedbacks` - Create new feedback
- `GET /api/feedbacks` - List all feedbacks
- `POST /api/feedbacks/anonymous` - Submit anonymous feedback
- `GET /api/feedbacks/analytics` - Get feedback analytics

## 👩‍💻 Developer

**Ameni Zoubeir**
- ✉️ [Email](mailto:ameni.zoubeir@esprit.tn)
- 🔗 [GitHub](https://github.com/Ameni02)
- 🔗 [LinkedIn](https://www.linkedin.com/in/ameni-zoubeir-b458082bb/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ using Spring Boot and Angular</sub>
</div>

