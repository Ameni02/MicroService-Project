package com.esprit.microservice.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@EnableDiscoveryClient
@SpringBootApplication
public class GatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayApplication.class, args);
	}
	@Bean
	public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
		return builder.routes()

				.route("feedbacks", r -> r.path("/feedback/**").uri("lb://FEEDBACK"))
				.route("trainings", r -> r.path("/training/**").uri("lb://TRAINING"))
				.route("evaluations", r -> r.path("/evaluation/**").uri("lb://EVALUATION"))
				.route("payment", r -> r.path("/payment/**").uri("lb://PAYMENT"))
				.route("documents", r -> r.path("/documents/**").uri("lb://DOCUMENTS"))
				.route("planification", r -> r.path("/planification/**").uri("lb://PLANIFICATION"))
				.build();
	}

}
