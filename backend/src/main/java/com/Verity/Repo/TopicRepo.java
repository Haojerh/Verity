package com.Verity.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Verity.Entity.TopicEntity;

@Repository
public interface TopicRepo extends JpaRepository<TopicEntity,String> {
}
