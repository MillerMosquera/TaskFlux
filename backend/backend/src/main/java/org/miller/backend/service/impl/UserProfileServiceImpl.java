package org.miller.backend.service.impl;

import org.miller.backend.model.UserProfile;
import org.miller.backend.repository.UserProfileRepository;
import org.miller.backend.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserProfileServiceImpl implements UserProfileService {

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Override
    public List<UserProfile> getAllUserProfiles() {
        return userProfileRepository.findAll();
    }

    @Override
    public Optional<UserProfile> getUserProfileById(UUID id) {
        return userProfileRepository.findById(id);
    }

    @Override
    public UserProfile createUserProfile(UserProfile userProfile) {
        userProfile.setId(UUID.randomUUID());
        userProfile.setCreatedAt(LocalDateTime.now());
        userProfile.setUpdatedAt(LocalDateTime.now());
        return userProfileRepository.save(userProfile);
    }

    @Override
    public UserProfile updateUserProfile(UUID id, UserProfile userProfileDetails) {
        return userProfileRepository.findById(id)
                .map(userProfile -> {
                    userProfile.setFullName(userProfileDetails.getFullName());
                    userProfile.setAvatarUrl(userProfileDetails.getAvatarUrl());
                    userProfile.setBio(userProfileDetails.getBio());
                    userProfile.setLocation(userProfileDetails.getLocation());
                    userProfile.setPhone(userProfileDetails.getPhone());
                    userProfile.setUpdatedAt(LocalDateTime.now());
                    return userProfileRepository.save(userProfile);
                }).orElseThrow(() -> new RuntimeException("UserProfile not found with id " + id));
    }

    @Override
    public void deleteUserProfile(UUID id) {
        userProfileRepository.deleteById(id);
    }

    @Override
    public Optional<UserProfile> getUserProfileByUserId(UUID userId) {
        return userProfileRepository.findByUserId(userId);
    }
}