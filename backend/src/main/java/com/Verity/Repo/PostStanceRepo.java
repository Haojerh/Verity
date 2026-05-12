package com.Verity.Repo;

import java.util.List;
import java.util.Optional;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.Verity.Entity.PostEntity;
import com.Verity.Entity.PostStanceEntity;
import com.Verity.Entity.UserEntity;

@Repository
public interface PostStanceRepo extends JpaRepository<PostStanceEntity, String> {
    long countByPostIDAndChosenStanceIgnoreCase(PostEntity post, String stance);
    Optional<PostStanceEntity> findByPostIDAndUser(PostEntity post, UserEntity user);
    Optional<PostStanceEntity> findByUser_UserIDAndPostID_PostID(String userID, String postID);
//    @Query(value = """
//        SELECT COUNT(DISTINCT uid) FROM (
//            SELECT userID as uid FROM post_stance WHERE postID = :postId
//            UNION
//            SELECT authorID as uid FROM comment WHERE postID = :postId
//        ) as total_participants
//        """, nativeQuery = true)
    @Query(value = """ 
        SELECT COUNT(*) FROM (
            SELECT userID FROM post_stance WHERE postID = :postId
            UNION
            SELECT authorID FROM comment WHERE postID = :postId
        ) as total_participants
        """, nativeQuery = true)
    long countUniqueParticipants(@Param("postId") String postId);

    @Query(value = """
        SELECT COALESCE(AVG(participants), 0)
        FROM (
            SELECT p.postID,
                (
                    SELECT COUNT(DISTINCT ps.userID)
                    FROM post_stance ps
                    WHERE ps.postID = p.postID
                ) AS participants
            FROM post p
        ) x
    """, nativeQuery = true)
    Double avgParticipantsPerPost();

    List<PostStanceEntity> findByPostID_PostIDAndSYSISDELETEDFalse(String postId);

    @Modifying
    @Transactional
    @Query("UPDATE PostStanceEntity s SET s.SYSISDELETED = true WHERE s.postID.postID = :postID")
    void softDeleteByPostID(String postID);
}