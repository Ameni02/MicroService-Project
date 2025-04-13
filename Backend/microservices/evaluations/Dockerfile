FROM openjdk:21
EXPOSE 8099
ADD target/evaluations-0.0.1-SNAPSHOT.jar evaluations.jar
ENTRYPOINT ["java", "-jar", "evaluations.jar"]
