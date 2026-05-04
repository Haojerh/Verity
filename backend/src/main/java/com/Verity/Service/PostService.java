package com.Verity.Service;

import com.Verity.DTO.PostDTO;
import com.Verity.DTO.PostRequest;
import com.Verity.Entity.PostEntity;
import com.Verity.Entity.TopicEntity;
import com.Verity.Repo.PostRepo;
import com.Verity.Repo.TopicRepo;
import com.Verity.Utils.FileUtil; // Using the new utility
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepo postRepo;
    private final TopicRepo topicRepo;
    private final String uploadDir = System.getProperty("user.dir") + "/uploads/posts/";

    public PostDTO createPost(PostRequest request, MultipartFile image) throws IOException {
        PostEntity post = new PostEntity();
        post.setTitle(request.getTitle());
        post.setDescription(request.getDescription());
        post.setProLabel(request.getProLabel());
        post.setConLabel(request.getConLabel());

        if (image != null && !image.isEmpty()) {
            String fileName = FileUtil.saveFile(image, uploadDir, "PST");
            post.setImagePath(fileName);
        }

        TopicEntity topic = topicRepo.findById(request.getTopicID())
                .orElseThrow(() -> new RuntimeException("Topic not found"));
        post.setTopic(topic);

        PostEntity savedPost = postRepo.save(post);

        return mapToDTO(savedPost);
    }

    public List<PostDTO> getAllPosts() {
        return postRepo.findAll().stream()
                .filter(post -> !Boolean.TRUE.equals(post.getSYSISDELETED()))
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private PostDTO mapToDTO(PostEntity entity) {
        PostDTO dto = new PostDTO();
        dto.setPostID(entity.getPostID());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setProLabel(entity.getProLabel());
        dto.setConLabel(entity.getConLabel());
        dto.setImagePath(entity.getImagePath());

        dto.setSYSCREATEDDATE(entity.getSYSCREATEDDATE());

        if (entity.getTopic() != null) {
            dto.setTopicID(entity.getTopic().getTopicID());
            dto.setTopicName(entity.getTopic().getName());
        }

        return dto;
    }
}