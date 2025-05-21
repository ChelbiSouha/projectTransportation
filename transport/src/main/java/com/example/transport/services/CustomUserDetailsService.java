package com.example.transport.services;

import com.example.transport.entities.Role;
import com.example.transport.entities.User;
import com.example.transport.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Vérification spéciale pour les transporteurs
        if (user.getRole() == Role.TRANSPORTER) {
            if (user.getTransporter() == null || !user.getTransporter().isApproved()) {
                throw new DisabledException("Transporter account is not approved by admin yet.");
            }
        }

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),  // connexion par username
                user.getPassword(),
                getAuthorities(user)
        );
    }

    private Collection<? extends GrantedAuthority> getAuthorities(User user) {
        return List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));
    }
}
