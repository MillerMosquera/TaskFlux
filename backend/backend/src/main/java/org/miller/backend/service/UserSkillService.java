package org.miller.backend.service;

import org.miller.backend.model.UserSkill;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserSkillService {
    List<UserSkill> getAllUserSkills();

    Optional<UserSkill> getUserSkillById(UUID id);

    UserSkill createUserSkill(UserSkill userSkill);

    UserSkill updateUserSkill(UUID id, UserSkill userSkillDetails);

    void deleteUserSkill(UUID id);

    List<UserSkill> getUserSkillsByUserId(UUID userId);
}
