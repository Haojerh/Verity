package com.Verity.Repo;

import com.Verity.Entity.PostEntity;
import com.Verity.Entity.PostStanceEntity;
import com.Verity.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostStanceRepo extends JpaRepository<PostStanceEntity, String> {
    long countByPostIDAndChosenStance(PostEntity post, String stance);
    Optional<PostStanceEntity> findByPostIDAndUser(PostEntity post, UserEntity user);
    @Query(value = """
        SELECT COUNT(DISTINCT uid) FROM (
            SELECT userID as uid FROM post_stance WHERE postID = :postId
            UNION
            SELECT authorID as uid FROM comment WHERE postID = :postId
        ) as total_participants
        """, nativeQuery = true)
    long countUniqueParticipants(@Param("postId") String postId);
}