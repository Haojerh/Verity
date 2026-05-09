package com.Verity.Service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.Verity.DTO.TopicDTO;
import com.Verity.DTO.TopicRequest;
import com.Verity.Entity.TopicEntity;
import com.Verity.Repo.TopicRepo;
import com.Verity.Utils.FileUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TopicService {
    private final TopicRepo topicRepo;
    private final String uploadDir = System.getProperty("user.dir") + "/uploads/topics/";

    public TopicDTO createTopic(TopicRequest request) throws IOException {
        String avatarName = FileUtil.saveFile(request.getAvatar(), uploadDir, "TAV");
        String bannerName = FileUtil.saveFile(request.getBanner(), uploadDir, "TBN");

        TopicEntity topic = new TopicEntity();
        topic.setName(request.getName());
        topic.setDescription(request.getDescription());
        topic.setAvatar(avatarName);
        topic.setBanner(bannerName);

        TopicEntity saved = topicRepo.save(topic);

        return new TopicDTO(
                saved.getTopicID(),
                saved.getName(),
                saved.getDescription(),
                saved.getAvatar(),
                saved.getBanner()
        );
    }

    public void deleteTopic(String id) {
        TopicEntity topicEntity = getTopicById(id);
        topicEntity.setSYSISDELETED(true);
        topicRepo.save(topicEntity);
    }

    public TopicDTO updateTopic(String id, TopicRequest request) throws IOException {
        TopicEntity topic = getTopicById(id);

        topic.setName(request.getName());
        topic.setDescription(request.getDescription());

        if (request.getAvatar() != null && !request.getAvatar().isEmpty()) {
            FileUtil.deleteFile(uploadDir, topic.getAvatar());

            String avatarName = FileUtil.saveFile(request.getAvatar(), uploadDir, "TAV");
            topic.setAvatar(avatarName);
        }

        if (request.getBanner() != null && !request.getBanner().isEmpty()) {
            FileUtil.deleteFile(uploadDir, topic.getBanner());

            String bannerName = FileUtil.saveFile(request.getBanner(), uploadDir, "TBN");
            topic.setBanner(bannerName);
        }

        TopicEntity saved = topicRepo.save(topic);

        return new TopicDTO(
                saved.getTopicID(),
                saved.getName(),
                saved.getDescription(),
                saved.getAvatar(),
                saved.getBanner()
        );
    }

    public List<TopicDTO> getAllTopics() {
        return topicRepo.findAll()
                .stream()
                .filter(topic -> !Boolean.TRUE.equals(topic.getSYSISDELETED()))
                .map(topic -> new TopicDTO(
                        topic.getTopicID(),
                        topic.getName(),
                        topic.getDescription(),
                        topic.getAvatar(),
                        topic.getBanner()
                ))
                .toList();
    }

    public TopicEntity getTopicById(String topicID){
        return topicRepo.findById(topicID).orElseThrow(() -> new RuntimeException("Error - Topic not found."));
    }

    public TopicDTO retrieveTopicById(String topicID) {
        TopicEntity topic = topicRepo.findByTopicIDAndSYSISDELETEDFalse(topicID)
                .orElseThrow(() -> new RuntimeException("Error - Topic not found."));

        TopicDTO dto = new TopicDTO();
        BeanUtils.copyProperties(topic, dto);
        return dto;
    }
}
