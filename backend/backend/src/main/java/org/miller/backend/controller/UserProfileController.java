package org.miller.backend.controller;

import org.miller.backend.model.UserProfile;
import org.miller.backend.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/userprofiles")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    @GetMapping
    public List<UserProfile> getAllUserProfiles() {
        return userProfileService.getAllUserProfiles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserProfile> getUserProfileById(@PathVariable UUID id) {
        return userProfileService.getUserProfileById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UserProfile> createUserProfile(@RequestBody UserProfile userProfile) {
        UserProfile createdUserProfile = userProfileService.createUserProfile(userProfile);
        return new ResponseEntity<>(createdUserProfile, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserProfile> updateUserProfile(@PathVariable UUID id, @RequestBody UserProfile userProfileDetails) {
        try {
            UserProfile updatedUserProfile = userProfileService.updateUserProfile(id, userProfileDetails);
            return ResponseEntity.ok(updatedUserProfile);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserProfile(@PathVariable UUID id) {
        userProfileService.deleteUserProfile(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<UserProfile> getUserProfileByUserId(@PathVariable UUID userId) {
        return userProfileService.getUserProfileByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}