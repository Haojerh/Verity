package com.Verity.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.Verity.DTO.AnalyticsDTO;
import com.Verity.DTO.AverageStatDTO;
import com.Verity.DTO.CategoryDistributionDTO;
import com.Verity.DTO.ModerationStatDTO;
import com.Verity.DTO.PeakActivityDTO;
import com.Verity.DTO.PostsOverTimeDTO;
import com.Verity.DTO.StatsCardDTO;
import com.Verity.DTO.TopContributorDTO;
import com.Verity.DTO.UserGrowthDTO;
import com.Verity.Repo.CommentRepo;
import com.Verity.Repo.PostRepo;
import com.Verity.Repo.PostStanceRepo;
import com.Verity.Repo.PunishmentLogRepo;
import com.Verity.Repo.ReportRepo;
import com.Verity.Repo.TopicRepo;
import com.Verity.Repo.UserRepo;
import com.Verity.Repo.VoteRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final UserRepo userRepo;
    private final PostRepo postRepo;
    private final CommentRepo commentRepo;
    private final ReportRepo reportRepo;
    private final VoteRepo voteRepo;
    private final PunishmentLogRepo punishmentLogRepo;
    private final TopicRepo topicRepo;
    private final PostStanceRepo postStanceRepo;

    public AnalyticsDTO getAnalytics() {
        AnalyticsDTO dto = new AnalyticsDTO();

        dto.setStatsCards(getStatsCards());
        dto.setAverageStats(getAverageStats());
        dto.setPostsOverTime(getPostsOverTime());
        dto.setCategoryDistribution(getCategoryDistribution());
        dto.setUserGrowth(getUserGrowth());
        dto.setTopContributors(getTopContributors());
        dto.setModerationStats(getModerationStats());
        dto.setPeakActivities(getPeakActivities());

        return dto;
    }

    private List<StatsCardDTO> getStatsCards() {
        long totalUsers = userRepo.count();
        long totalPosts = postRepo.count();
        long totalReports = reportRepo.count();
        long totalDebates = postRepo.count();

        return List.of(
            new StatsCardDTO(
                "Total Users",
                totalUsers,
                "Users",
                "blue-500"
            ),
            new StatsCardDTO(
                "Total Posts",
                totalPosts,
                "FileText",
                "primary"
            ),
            new StatsCardDTO(
                "Total Reports",
                totalReports,
                "AlertCircle",
                "destructive"
            ),
            new StatsCardDTO(
                "Total Debates",
                totalDebates,
                "ActivityIcon",
                "purple-500"
            )
        );
    }

    private List<AverageStatDTO> getAverageStats() {
        long totalPosts = postRepo.count();
        long totalComments = commentRepo.count();
        long totalVotes = voteRepo.count();

        double avgComments = totalPosts == 0 ? 0 : (double) totalComments / totalPosts;
        double avgVotes = totalPosts == 0 ? 0 : (double) totalVotes / totalPosts;
        double avgParticipants = postStanceRepo.avgParticipantsPerPost();
        double avgFollows = userRepo.avgFollowersPerUser();

        return List.of(
            new AverageStatDTO(
                "Average Comments per Post",
                String.format("%.1f", avgComments),
                "MessageSquare"
            ),
            new AverageStatDTO(
                "Average Votes per Post",
                String.format("%.1f", avgVotes),
                "ThumbsUp"
            ),
            new AverageStatDTO(
                "Average Participants per Post",
                String.format("%.1f", avgParticipants), 
                "Users"
            ),
            new AverageStatDTO(
                "Average Follows per User",
                String.format("%.1f", avgFollows), 
                "Plus"
            )
            
        );
    }

    private List<PostsOverTimeDTO> getPostsOverTime() {
        LocalDateTime startDate = LocalDateTime.now().minusDays(4);

        List<Object[]> postData = postRepo.countPostsLast5Days(startDate);
        List<Object[]> commentData = commentRepo.countCommentsLast5Days(startDate);

        Map<LocalDate, Long> postsMap = postData.stream()
            .collect(Collectors.toMap(
                row -> ((java.sql.Date) row[0]).toLocalDate(),
                row -> (Long) row[1]
            ));

        Map<LocalDate, Long> commentsMap = commentData.stream()
            .collect(Collectors.toMap(
                row -> ((java.sql.Date) row[0]).toLocalDate(),
                row -> (Long) row[1]
            ));

        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("MMM d");

        return IntStream.range(0, 5)
            .mapToObj(i -> {
                LocalDate date = LocalDate.now().minusDays(4 - i);

                return new PostsOverTimeDTO(
                    date.format(fmt),
                    postsMap.getOrDefault(date, 0L),
                    commentsMap.getOrDefault(date, 0L)
                );
            })
            .toList();
    }

    private List<CategoryDistributionDTO> getCategoryDistribution() {
        return topicRepo.findAll()
            .stream()
            .map(topic -> {
                long totalPosts = postRepo.countByTopic_TopicIDAndSYSISDELETEDFalse(topic.getTopicID());
                return new CategoryDistributionDTO(
                    topic.getName(),
                    totalPosts
                );
            })
            .filter(dto -> dto.getValue() > 0)
            .toList();
    }

    private List<UserGrowthDTO> getUserGrowth() {
        List<Object[]> results = userRepo.getUserGrowthByMonth();

        Map<Integer, Long> map = results.stream()
            .collect(Collectors.toMap(
                r -> ((Number) r[0]).intValue(),
                r -> (Long) r[1]
            ));

        return List.of(
            new UserGrowthDTO("Jan", map.getOrDefault(1, 0L)),
            new UserGrowthDTO("Feb", map.getOrDefault(2, 0L)),
            new UserGrowthDTO("Mar", map.getOrDefault(3, 0L)),
            new UserGrowthDTO("Apr", map.getOrDefault(4, 0L)),
            new UserGrowthDTO("May", map.getOrDefault(5, 0L)),
            new UserGrowthDTO("Jun", map.getOrDefault(6, 0L)),
            new UserGrowthDTO("Jul", map.getOrDefault(7, 0L)),
            new UserGrowthDTO("Aug", map.getOrDefault(8, 0L)),
            new UserGrowthDTO("Sep", map.getOrDefault(9, 0L)),
            new UserGrowthDTO("Oct", map.getOrDefault(10, 0L)),
            new UserGrowthDTO("Nov", map.getOrDefault(11, 0L)),
            new UserGrowthDTO("Dec", map.getOrDefault(12, 0L))
        );
    }

    private List<TopContributorDTO> getTopContributors() {
        return userRepo.findTopUsersByReputation(PageRequest.of(0, 5))
            .stream()
            .map(user -> new TopContributorDTO(
                user.getName(),
                voteRepo.sumReputationByUserID(user.getUserID())
            ))
            .toList();
    }

    private List<ModerationStatDTO> getModerationStats() {
        long warns = punishmentLogRepo.countByTypeIgnoreCase("WARN");
        long mutes = punishmentLogRepo.countByTypeIgnoreCase("MUTE");
        long bans = punishmentLogRepo.countByTypeIgnoreCase("BAN");

        return List.of(
            new ModerationStatDTO("Warnings Issued", warns),
            new ModerationStatDTO("Mutes Issued", mutes),
            new ModerationStatDTO("Bans Issued", bans)
        );
    }

    private List<PeakActivityDTO> getPeakActivities() {
        List<Object[]> results = postRepo.countPostsByHour();

        Map<Integer, Long> map = results.stream()
            .collect(Collectors.toMap(
                r -> ((Number) r[0]).intValue(),
                r -> (Long) r[1]
            ));

        return IntStream.range(0, 24)
            .mapToObj(hour -> new PeakActivityDTO(
                formatHour(hour),
                map.getOrDefault(hour, 0L)
            ))
            .toList();
    }

    private String formatHour(int hour) {
        if (hour == 0) return "12AM";
        if (hour < 12) return hour + "AM";
        if (hour == 12) return "12PM";
        return (hour - 12) + "PM";
    }
}