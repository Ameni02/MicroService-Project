package com.esprit.microservice.feedbacks;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class FeedbacksApplication {

	public static void main(String[] args) {
		SpringApplication.run(FeedbacksApplication.class, args);
	}

}
