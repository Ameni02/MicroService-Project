
# 📢 Advertisement Management Microservice

  

**By Mohammed Amine Kalai**

*Part of a scalable Spring Boot Microservices Architecture*

  

---

  

## 🧠 Augment Sync Summary

  

This microservice handles everything related to managing advertisements . It is designed as part of a distributed system architecture, using modern practices and tooling.

  

---

  

## 🏗️ Architecture

  

- ✅ **Microservices architecture**

- ☁️ **Spring Cloud** for service discovery (Eureka client)

- ⚙️ Runs on **port 8062**

- 🔧 External configuration via Config Server (`http://localhost:8888`)

  

---

  

## 🌟 Core Features

  

- 🛠️ CRUD operations for **advertisements** and **categories**

- 🔍 Advertisement **search with filters**

- 🚫 **Content moderation** powered by **OpenAI API**

- 📧 **Email notification** system

- 📅 **Date-based filtering**: today's ads, weekly ads

  

---

  

## 🔐 Security

  

- 🛡️ OAuth2 / JWT authentication with **Keycloak**

- 🔑 Role-based access:

-  `client_user`

-  `client_admin`

- 🔒 All API endpoints are protected

  

---

  

## 🛠️ Tech Stack

  


<div align="center"> <img src="https://img.shields.io/badge/Java-17-blue?logo=java&logoColor=white" alt="Java"> <img src="https://img.shields.io/badge/Spring_Boot-3.4.3-green?logo=spring&logoColor=white" alt="Spring Boot"> <img src="https://img.shields.io/badge/Spring_Security-✓-lightgrey" alt="Spring Security"> <img src="https://img.shields.io/badge/OAuth2/JWT-Keycloak-purple?logo=keycloak" alt="Keycloak Security"> <img src="https://img.shields.io/badge/MySQL-✓-blue?logo=mysql&logoColor=white" alt="MySQL"> <img src="https://img.shields.io/badge/OpenAI_API-✓-lightblue?logo=openai" alt="OpenAI API"> <img src="https://img.shields.io/badge/Eureka_Client-✓-yellow?logo=spring" alt="Eureka Client"> <img src="https://img.shields.io/badge/Maven-✓-red?logo=apachemaven&logoColor=white" alt="Maven"> <img src="https://img.shields.io/badge/Docker-✓-blue?logo=docker&logoColor=white" alt="Docker"> <img src="https://img.shields.io/badge/Config_Server-http--localhost--8888-brightgreen" alt="Config Server"> </div>

  

---

  

## 🚀 Getting Started

  

1. Make sure your **Config Server** is running on `http://localhost:8888`.

2. Start Eureka Discovery Server.

3. Build and run the microservice:

```bash

mvn  clean  install

java  -jar  target/annonce-service.jar

```

  

---

  

## 🐳 Docker Support

  

This service supports Docker for containerized deployments.

Make sure to include your Dockerfile and relevant environment configs.

  

---

  
  
  

---

  

## 📞 Contact

  

**Mohamed Amine Kalai**

✉️ MEDAMINE.KALAI@esprit.tn

🔗 [GitHub](#)

  

---

  

<div  align="center">  <sub>Built with ❤️ using Java, Spring Boot, and Microservices</sub>  </div>
