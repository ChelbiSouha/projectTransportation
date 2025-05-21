package com.example.transport.services;

import com.example.transport.entities.User;

import java.util.List;

public interface UserInterface {
    User addUser(User user);
    void deleteUser(Long id);
    List<User> addListUsers(List<User> users);
    String addUserWTCP(User user);
    String addUserWTUN(User user);
    User updateUser(Long id, User user);
    List<User> getAllusers();
    User getUser(Long id);
    User getuserByUsername(String username);
    List<User> getUsersSW(String usernamePrefix);
    List<User> getUsersByEmail(String emailDomain);
}
