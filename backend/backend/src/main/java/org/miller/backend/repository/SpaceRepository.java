package org.miller.backend.repository;

import org.miller.backend.model.Space;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SpaceRepository extends JpaRepository<Space, UUID> {
    List<Space> findByCreatedBy_Id(UUID createdById);

    Optional<Space> findByName(String name);
}