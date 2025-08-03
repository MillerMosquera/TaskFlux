package org.miller.backend.service.impl;

import org.miller.backend.model.UserSkill;
import org.miller.backend.repository.UserSkillRepository;
import org.miller.backend.service.UserSkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
public class UserSkillServiceImpl implements UserSkillService {

    @Autowired
    private UserSkillRepository userSkillRepository;

    @Override
    public List<UserSkill> getAllUserSkills() {
        return userSkillRepository.findAll();
    }

    @Override
    public Optional<UserSkill> getUserSkillById(UUID id) {
        return userSkillRepository.findById(id);
    }

    @Override
    public UserSkill createUserSkill(UserSkill userSkill) {
        userSkill.setId(UUID.randomUUID());
        return userSkillRepository.save(userSkill);
    }

    @Override
    public UserSkill updateUserSkill(UUID id, UserSkill userSkillDetails) {
        return userSkillRepository.findById(id)
                .map(userSkill -> {
                    userSkill.setUserId(userSkillDetails.getUserId());
                    userSkill.setSkillName(userSkillDetails.getSkillName());
                    userSkill.setProficiencyLevel(userSkillDetails.getProficiencyLevel());
                    userSkill.setYearsExperience(userSkillDetails.getYearsExperience());
                    return userSkillRepository.save(userSkill);
                }).orElseThrow(() -> new RuntimeException("UserSkill not found with id: " + id));
    }

    @Override
    public void deleteUserSkill(UUID id) {
        userSkillRepository.deleteById(id);
    }

    @Override
    public List<UserSkill> getUserSkillsByUserId(UUID userId) {
        return userSkillRepository.findByUserId(userId);
    }
}
