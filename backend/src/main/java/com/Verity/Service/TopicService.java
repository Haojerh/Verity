package com.Verity.Service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.Verity.DTO.TopicDTO;
import com.Verity.DTO.TopicRequest;
import com.Verity.Entity.TopicEntity;
import com.Verity.Repo.TopicRepo;

import lombok.RequiredArgsConstructor;
import net.bytebuddy.utility.RandomString;

@Service
@RequiredArgsConstructor
public class TopicService {
    private final TopicRepo topicRepo;
    private final String uploadDir = System.getProperty("user.dir") + "/uploads/topics/";

    public TopicDTO createTopic(TopicRequest request) throws IOException {
        new File(uploadDir).mkdirs();

        String avatarName = null;
        String bannerName = null;

        if (request.getAvatar() != null && !request.getAvatar().isEmpty()) {
            avatarName = "TAV-" + RandomString.make(10) + getExt(request.getAvatar());
            saveFile(request.getAvatar(), avatarName);
        }

        if (request.getBanner() != null && !request.getBanner().isEmpty()) {
            bannerName = "TBN-" + RandomString.make(10) + getExt(request.getBanner());
            saveFile(request.getBanner(), bannerName);
        }

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
            avatarName,
            bannerName
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
            deleteFile(topic.getAvatar());
            String avatarName = "TAV-" + RandomString.make(10) + getExt(request.getAvatar());
            saveFile(request.getAvatar(), avatarName);
            topic.setAvatar(avatarName);
        }

        if (request.getBanner() != null && !request.getBanner().isEmpty()) {
            deleteFile(topic.getBanner());
            String bannerName = "TBN-" + RandomString.make(10) + getExt(request.getBanner());
            saveFile(request.getBanner(), bannerName);
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

    private void saveFile(MultipartFile file, String filename) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        File target = new File(dir, filename);

        file.getInputStream().transferTo(new java.io.FileOutputStream(target));
    }

    private void deleteFile(String filename) {
        if (filename == null) return;

        File file = new File(uploadDir + filename);
        if (file.exists()) {
            file.delete();
        }
    }

    private String getExt(MultipartFile file) {
        String name = file.getOriginalFilename();

        if (name == null || !name.contains(".")) {
            return "";
        }

        return name.substring(name.lastIndexOf("."));
    }

    public TopicEntity getTopicById(String topicID){
        return topicRepo.findById(topicID).orElseThrow(() -> new RuntimeException("Error - Topic not found."));
    }
}