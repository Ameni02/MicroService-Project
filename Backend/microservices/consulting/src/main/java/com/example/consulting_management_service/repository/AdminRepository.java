package com.example.consulting_management_service.repository;

import com.example.consulting_management_service.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
}