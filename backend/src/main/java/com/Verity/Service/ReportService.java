package com.Verity.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.Verity.DTO.ReportDTO;
import com.Verity.DTO.ReportRequest;
import com.Verity.Entity.CommentEntity;
import com.Verity.Entity.PostEntity;
import com.Verity.Entity.ReportEntity;
import com.Verity.Entity.UserEntity;
import com.Verity.Repo.CommentRepo;
import com.Verity.Repo.PostRepo;
import com.Verity.Repo.ReportRepo;
import com.Verity.Repo.UserRepo;

import lombok.RequiredArgsConstructor;
import net.bytebuddy.utility.RandomString;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepo reportRepo;
    private final PostRepo postRepo;
    private final CommentRepo commentRepo;
    private final UserRepo userRepo;

    public void createReport(ReportRequest request) {
        ReportEntity report = new ReportEntity();

        report.setReportID(RandomString.make(20));
        report.setReason(request.getReason());
        report.setType(request.getType());

        UserEntity reporter = userRepo.findById(request.getReporterID())
                .orElseThrow(() -> new RuntimeException("User not found"));
        report.setReporter(reporter);

        if ("POST".equalsIgnoreCase(request.getType())) {
            PostEntity post = postRepo.findById(request.getTargetID())
                    .orElseThrow(() -> new RuntimeException("Post not found"));
            report.setTargetPost(post);

        } else if ("COMMENT".equalsIgnoreCase(request.getType())) {
            CommentEntity comment = commentRepo.findById(request.getTargetID())
                    .orElseThrow(() -> new RuntimeException("Comment not found"));
            report.setTargetComment(comment);

        } else {
            throw new RuntimeException("Invalid report type");
        }

        reportRepo.save(report);
    }

    public List<ReportDTO> getAllReports() {
        List<ReportEntity> reports = reportRepo.findBySYSISDELETEDFalse();
            return reports.stream().map(report -> {
                ReportDTO dto = new ReportDTO();

                dto.setReportID(report.getReportID());
                dto.setReason(report.getReason());
                dto.setType(report.getType());
                dto.setDatetime(report.getSYSCREATEDDATE());

                if (report.getReporter() != null) {
                    dto.setReporterID(report.getReporter().getUserID());
                    dto.setReporterName(report.getReporter().getName());
                }

                if (report.getTargetPost() != null) {
                    dto.setTargetPostID(report.getTargetPost().getPostID());
                }

                if (report.getTargetComment() != null) {
                    dto.setTargetCommentID(report.getTargetComment().getCommentID());
                }

                return dto;

            }).toList();
    }
}