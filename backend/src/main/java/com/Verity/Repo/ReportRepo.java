package com.Verity.Repo;

import java.util.List;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.Verity.Entity.ReportEntity;

@Repository
public interface ReportRepo extends JpaRepository<ReportEntity, String> {

    List<ReportEntity> findBySYSISDELETEDFalse();

    List<ReportEntity> findByTargetComment_CommentIDAndSYSISDELETEDFalse(String commentID);

    List<ReportEntity> findByTargetPost_PostIDAndSYSISDELETEDFalse(String postID);

    List<ReportEntity> findByTargetComment_Post_PostIDAndSYSISDELETEDFalse(String postID);

    @Modifying
    @Transactional
    @Query("UPDATE ReportEntity r SET r.SYSISDELETED = true WHERE r.targetPost.postID = :postID OR r.targetComment.post.postID = :postID")
    void softDeleteByPostID(String postID);
}
