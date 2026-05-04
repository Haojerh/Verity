package com.Verity.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.Verity.DTO.UserFavTopicDTO;
import com.Verity.Entity.TopicEntity;
import com.Verity.Entity.UserEntity;
import com.Verity.Entity.UserFavTopicEntity;
import com.Verity.Repo.TopicRepo;
import com.Verity.Repo.UserFavTopicRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserFavTopicService {

    private final UserFavTopicRepo userFavTopicRepo;
    private final UserServices userServices;
    private final TopicRepo topicRepo;

    public List<UserFavTopicDTO> getCurrentUserFavorites() {
        UserEntity user = userServices.getCurrentUser();
        List<UserFavTopicEntity> favorites = userFavTopicRepo.findByUser(user);

        return favorites.stream().map(fav -> {
            UserFavTopicDTO dto = new UserFavTopicDTO();
            dto.setTopicID(fav.getTopic().getTopicID());
            dto.setTopicName(fav.getTopic().getName());
            return dto;
        }).toList();
    }

    public void addFavorite(String topicID) {
        UserEntity user = userServices.getCurrentUser();

        TopicEntity topic = topicRepo.findById(topicID)
            .orElseThrow(() -> new RuntimeException("Topic not found"));

        boolean exists = userFavTopicRepo.existsByUserAndTopic(user, topic);
        if (exists) return;

        UserFavTopicEntity fav = UserFavTopicEntity.builder()
            .user(user)
            .topic(topic)
            .build();

        userFavTopicRepo.save(fav);
    }

    public void removeFavorite(String topicID) {
        UserEntity user = userServices.getCurrentUser();

        TopicEntity topic = topicRepo.findById(topicID)
                .orElseThrow(() -> new RuntimeException("Topic not found"));

        UserFavTopicEntity fav = userFavTopicRepo
                .findByUserAndTopic(user, topic)
                .orElseThrow(() -> new RuntimeException("Favorite not found"));

        userFavTopicRepo.delete(fav);
    }
}
