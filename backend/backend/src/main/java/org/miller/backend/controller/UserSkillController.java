package org.miller.backend.controller;

import org.miller.backend.model.UserSkill;
import org.miller.backend.service.UserSkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/userskills")
public class UserSkillController {

    @Autowired
    private UserSkillService userSkillService;

    @GetMapping("/all")
    public List<UserSkill> getAllUserSkills() {
        return userSkillService.getAllUserSkills();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserSkill> getUserSkillById(@PathVariable UUID id) {
        return userSkillService.getUserSkillById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UserSkill> createUserSkill(@RequestBody UserSkill userSkill) {
        UserSkill createdUserSkill = userSkillService.createUserSkill(userSkill);
        return new ResponseEntity<>(createdUserSkill, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserSkill> updateUserSkill(@PathVariable UUID id, @RequestBody UserSkill userSkillDetails) {
        try {
            UserSkill updatedUserSkill = userSkillService.updateUserSkill(id, userSkillDetails);
            return ResponseEntity.ok(updatedUserSkill);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserSkill(@PathVariable UUID id) {
        userSkillService.deleteUserSkill(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public List<UserSkill> getUserSkillsByUserId(@PathVariable UUID userId) {
        return userSkillService.getUserSkillsByUserId(userId);
    }
}
