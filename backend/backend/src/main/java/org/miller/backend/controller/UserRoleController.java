package org.miller.backend.controller;

import org.miller.backend.model.UserRole;
import org.miller.backend.service.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/userroles")
public class UserRoleController {

    @Autowired
    private UserRoleService userRoleService;

    @GetMapping
    public List<UserRole> getAllUserRoles() {
        return userRoleService.getAllUserRoles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserRole> getUserRoleById(@PathVariable UUID id) {
        return userRoleService.getUserRoleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UserRole> createUserRole(@RequestBody UserRole userRole) {
        UserRole createdUserRole = userRoleService.createUserRole(userRole);
        return new ResponseEntity<>(createdUserRole, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserRole> updateUserRole(@PathVariable UUID id, @RequestBody UserRole userRoleDetails) {
        try {
            UserRole updatedUserRole = userRoleService.updateUserRole(id, userRoleDetails);
            return ResponseEntity.ok(updatedUserRole);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserRole(@PathVariable UUID id) {
        userRoleService.deleteUserRole(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public List<UserRole> getUserRolesByUserId(@PathVariable UUID userId) {
        return userRoleService.getUserRolesByUserId(userId);
    }
}