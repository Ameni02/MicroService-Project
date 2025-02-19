package com.example.consulting_management_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Consultant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Column(unique = true)
    private String email;

    private String password;

    // A Consultant can have multiple availability slots
    @OneToMany(mappedBy = "consultant", cascade = CascadeType.ALL)
    private List<Availability> availabilities = new ArrayList<>();
}
