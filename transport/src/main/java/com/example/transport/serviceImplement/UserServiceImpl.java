package com.example.transport.serviceImplement;

import com.example.transport.entities.Role;
import com.example.transport.entities.User;
import com.example.transport.repository.UserRepository;
import com.example.transport.services.UserInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserInterface {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User addUser(User user) {
        // Vérifie que l'utilisateur n'a pas déjà un rôle
        if (user.getRole() == null) {
            user.setRole(Role.CLIENT);  // Par défaut, le rôle est CLIENT
        }
        return userRepository.save(user);
    }


    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<User> addListUsers(List<User> users) {
        return userRepository.saveAll(users);
    }

    @Override
    public String addUserWTCP(User user) {
        if (user.getPassword().length() < 6) {
            return "Password too short";
        }
        // Validation du mot de passe
        if (!user.getPassword().matches(".*[A-Z].*") || !user.getPassword().matches(".*[a-z].*") || !user.getPassword().matches(".*\\d.*")) {
            return "Password must contain uppercase letters, lowercase letters, and numbers";
        }
        userRepository.save(user);
        return "User added with password check";
    }

    @Override
    public String addUserWTUN(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return "Email already exists";
        }
        if (!user.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            return "Invalid email format";
        }
        userRepository.save(user);
        return "User added with unique email check";
    }

    @Override
    public User updateUser(Long id, User newUser) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            return null;
        }
        User user = optionalUser.get();
        user.setUsername(newUser.getUsername());
        user.setEmail(newUser.getEmail());
        user.setPassword(newUser.getPassword());
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllusers() {
        return userRepository.findAll();
    }

    @Override
    public User getUser(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public User getuserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
    }


    @Override
    public List<User> getUsersSW(String usernamePrefix) {
        return userRepository.findByUsernameStartingWith(usernamePrefix);
    }

    @Override
    public List<User> getUsersByEmail(String emailDomain) {
        return userRepository.findByEmailContaining(emailDomain);
    }
}
