package com.esprit.annonces;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class AnnoncesApplication {

	public static void main(String[] args) {
		SpringApplication.run(AnnoncesApplication.class, args);
	}

}
