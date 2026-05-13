package com.Verity.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Verity.Entity.TopicEntity;

@Repository
public interface TopicRepo extends JpaRepository<TopicEntity,String> {

    long countBySYSISDELETEDFalse();
    
    Optional<TopicEntity> findByName(String name);

    Optional<TopicEntity> findByTopicIDAndSYSISDELETEDFalse(String topicID);
}
