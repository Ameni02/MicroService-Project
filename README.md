#  Our Microservices Project

## 👥 Team Members:
- **Ons Fendouli**
- **Ameni Zoubeir**
- **Mohamed Amine Kalai**
- **Balkis Sekri**
- **Mootaz Chouchene**
- **Mouna Chokri**


## 🚀 Microservices Included:
- **Feedback Service** (`/feedbacks/**`)
- **Training Service** (`/trainings/**`)
- **Evaluation Service** (`/evaluations/**`)
- **Payment Service** (`/payment/**`)
- **Documents Service** (`/documents/**`)
- **Planification Service** (`/planifications/**`)

## ⚙️ Technologies Used:
- **Spring Boot**
- **Spring Cloud Gateway**
- **Eureka Service Discovery**
- **Maven**

## 📌 How to Run the API Gateway
1. Clone this repository:

   git clone https://github.com/Ameni02/MicroService-Project.git



# 📅 Event Scheduling Service

## 🧩 Description

Le **Event Scheduling Service** est responsable de la planification, de la modification, de la suppression et du suivi des événements de formation. Il permet de gérer les sessions (en ligne ),  et de notifier les participants via d'autres microservices connectés.
Ce service est dédié à la gestion complète du calendrier des événements liés aux formations. Il permet de :
Créer, modifier, annuler ou reprogrammer des sessions de formation.
Planifier des événements synchrones (visioconférences ou asynchrones (modules e-learning).
---

## 🛠️ Technologies utilisées

- **Langage :** Spring Boot / Node.js 
- **Communication interservices :** REST / Kafka
- **Authentification :** Keycloak via API Gateway
- **Conteneurisation :** Docker

---

## 🔐 Sécurité

Ce service est protégé via Keycloak. Il nécessite un token valide pour accéder aux routes protégées. L’accès se fait uniquement à travers l’**API Gateway**.

---




