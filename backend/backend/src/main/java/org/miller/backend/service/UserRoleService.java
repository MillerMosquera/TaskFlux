package org.miller.backend.service;

import org.miller.backend.model.UserRole;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRoleService {
    List<UserRole> getAllUserRoles();

    Optional<UserRole> getUserRoleById(UUID id);

    UserRole createUserRole(UserRole userRole);

    UserRole updateUserRole(UUID id, UserRole userRoleDetails);

    void deleteUserRole(UUID id);

    List<UserRole> getUserRolesByUserId(UUID userId);
}