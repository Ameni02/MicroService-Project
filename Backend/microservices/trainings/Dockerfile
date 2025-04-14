# Utiliser l'image Java 17
FROM openjdk:17-jdk-slim

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier JAR
COPY target/training-service-0.0.1-SNAPSHOT.jar training-service.jar

# Exposer le port 8081
EXPOSE 8081

# Démarrer l'application
ENTRYPOINT ["java", "-jar", "training-service.jar"]
