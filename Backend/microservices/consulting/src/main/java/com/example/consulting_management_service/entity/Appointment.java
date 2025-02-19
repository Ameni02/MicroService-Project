package com.example.consulting_management_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The user (client) who created the appointment
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // The consultant with whom the appointment is requested
    @ManyToOne
    @JoinColumn(name = "consultant_id")
    private Consultant consultant;

    // Date/time of the requested slot
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    // Appointment status
    private String status; // e.g. "PENDING", "APPROVED", "DECLINED"
}
