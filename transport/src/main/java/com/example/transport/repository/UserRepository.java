package com.example.transport.repository;

import com.example.transport.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Recherche simple par username
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);

    // Vérifie si un username existe
    boolean existsByUsername(String username);

    // Vérifie si un email existe
    boolean existsByEmail(String email);

    // Requête personnalisée JPQL : commence par un préfixe (starts with)
    @Query("SELECT u FROM User u WHERE u.username LIKE CONCAT(:prefix, '%')")
    List<User> findByUsernameStartingWith(@Param("prefix") String usernamePrefix);

    // Recherche tous les utilisateurs dont l’email contient un domaine
    @Query("SELECT u FROM User u WHERE u.email LIKE %:domain%")
    List<User> findByEmailContaining(@Param("domain") String emailDomain);

}
