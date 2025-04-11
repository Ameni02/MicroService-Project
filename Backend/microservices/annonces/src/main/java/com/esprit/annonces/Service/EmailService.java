package com.esprit.annonces.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void envoyerEmail(String destinataire, String sujet, String message) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(destinataire);
        mail.setSubject(sujet);
        mail.setText(message);
        mail.setFrom("kalaiamine38@gmail.com"); // ton adresse e-mail

        javaMailSender.send(mail);
    }
}
