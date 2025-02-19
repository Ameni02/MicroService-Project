package com.example.consulting_management_service.service;

import com.example.consulting_management_service.entity.Admin;
import com.example.consulting_management_service.repository.AdminRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public Admin createAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Admin getAdminById(Long id) {
        return adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
    }

    public Admin updateAdmin(Long id, Admin updated) {
        Admin existing = getAdminById(id);
        existing.setFullName(updated.getFullName());
        existing.setEmail(updated.getEmail());
        existing.setPassword(updated.getPassword());
        return adminRepository.save(existing);
    }

    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }
}
