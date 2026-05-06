package com.Verity.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Verity.Entity.ReportEntity;

@Repository
public interface ReportRepo extends JpaRepository<ReportEntity, String> {

    List<ReportEntity> findBySYSISDELETEDFalse();

    List<ReportEntity> findByTargetComment_CommentIDAndSYSISDELETEDFalse(String commentID);

    List<ReportEntity> findByTargetPost_PostIDAndSYSISDELETEDFalse(String postID);

    List<ReportEntity> findByTargetComment_Post_PostIDAndSYSISDELETEDFalse(String postID);
}
