package com.example.consulting_management_service.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Availability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Start and end of availability
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    // Link to the consultant
    @ManyToOne
    @JoinColumn(name = "consultant_id")
    @JsonIgnore  // <-- Prevents infinite loop in JSON serialization

    private Consultant consultant;
}
