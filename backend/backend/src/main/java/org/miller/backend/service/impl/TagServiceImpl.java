package org.miller.backend.service.impl;

import org.miller.backend.model.Tag;
import org.miller.backend.repository.TagRepository;
import org.miller.backend.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TagServiceImpl implements TagService {

    @Autowired
    private TagRepository tagRepository;

    @Override
    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    @Override
    public Optional<Tag> getTagById(UUID id) {
        return tagRepository.findById(id);
    }

    @Override
    public Tag createTag(Tag tag) {
        tag.setId(UUID.randomUUID());
        return tagRepository.save(tag);
    }

    @Override
    public Tag updateTag(UUID id, Tag tagDetails) {
        return tagRepository.findById(id)
                .map(tag -> {
                    tag.setName(tagDetails.getName());
                    tag.setColor(tagDetails.getColor());
                    tag.setDescription(tagDetails.getDescription());
                    return tagRepository.save(tag);
                }).orElseThrow(() -> new RuntimeException("Tag not found with id " + id));
    }

    @Override
    public void deleteTag(UUID id) {
        tagRepository.deleteById(id);
    }

    @Override
    public Optional<Tag> getTagByName(String name) {
        return tagRepository.findByName(name);
    }
}