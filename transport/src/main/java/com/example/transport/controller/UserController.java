package com.example.transport.controller;

import com.example.transport.entities.User;
import com.example.transport.services.UserInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserInterface userInterface;

    @GetMapping("/test")
    public String test() {
        return "Hey user";
    }

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, World!";
    }

    @GetMapping("/details")
    public ResponseEntity<Map<String, Object>> getUserDetails() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", "User details here");

        return ResponseEntity.ok(response);
    }

    @PostMapping("/add")
    public User addUser(@RequestBody User user) {
        return userInterface.addUser(user);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable Long id) {
        userInterface.deleteUser(id);
    }

    @DeleteMapping("/delete")
    public void deleteUserByParam(@RequestParam Long id) {
        userInterface.deleteUser(id);
    }

    @PostMapping("/add-list")
    public List<User> addListUsers(@RequestBody List<User> users) {
        return userInterface.addListUsers(users);
    }

    @PostMapping("/add-with-confirm")
    public String addUserWithConfirmPassword(@RequestBody User user) {
        return userInterface.addUserWTCP(user);
    }

    @PostMapping("/add-unique")
    public String addUserWithUniqueName(@RequestBody User user) {
        return userInterface.addUserWTUN(user);
    }

    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable("id") Long id, @RequestBody User user) {
        return userInterface.updateUser(id, user);
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userInterface.getAllusers();
    }

    @GetMapping("/id/{id}")
    public User getUserById(@PathVariable Long id) {
        return userInterface.getUser(id);
    }

    @GetMapping("/username/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return userInterface.getuserByUsername(username);
    }

    @GetMapping("/search/username-starts-with/{prefix}")
    public List<User> getUsersStartingWith(@PathVariable String prefix) {
        return userInterface.getUsersSW(prefix);
    }

    @GetMapping("/search/by-email")
    public List<User> getUsersByEmail(@RequestParam String email) {
        return userInterface.getUsersByEmail(email);
    }
}
