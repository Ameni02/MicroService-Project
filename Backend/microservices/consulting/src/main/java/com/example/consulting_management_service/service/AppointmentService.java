package com.example.consulting_management_service.service;

import com.example.consulting_management_service.entity.Appointment;
import com.example.consulting_management_service.entity.Consultant;
import com.example.consulting_management_service.entity.User;
import com.example.consulting_management_service.repository.AppointmentRepository;
import com.example.consulting_management_service.repository.ConsultantRepository;
import com.example.consulting_management_service.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final ConsultantRepository consultantRepository;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              UserRepository userRepository,
                              ConsultantRepository consultantRepository) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.consultantRepository = consultantRepository;
    }

    // User requests an appointment
    public Appointment requestAppointment(Long userId, Long consultantId, Appointment appointmentData) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new RuntimeException("Consultant not found"));

        Appointment appointment = new Appointment();
        appointment.setUser(user);
        appointment.setConsultant(consultant);
        appointment.setStartTime(appointmentData.getStartTime());
        appointment.setEndTime(appointmentData.getEndTime());
        appointment.setStatus("PENDING");

        return appointmentRepository.save(appointment);
    }

    // Admin approves or declines
    public Appointment updateAppointmentStatus(Long appointmentId, String newStatus) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (!newStatus.equals("APPROVED") && !newStatus.equals("DECLINED")) {
            throw new RuntimeException("Invalid status, must be APPROVED or DECLINED");
        }
        appointment.setStatus(newStatus);
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
    }

    public Appointment updateAppointment(Long id, Appointment updated) {
        Appointment existing = getAppointmentById(id);
        existing.setStartTime(updated.getStartTime());
        existing.setEndTime(updated.getEndTime());
        existing.setStatus(updated.getStatus());
        return appointmentRepository.save(existing);
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }
}
