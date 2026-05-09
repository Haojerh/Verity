package com.Verity.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsDTO {
    private List<StatsCardDTO> statsCards;
    private List<AverageStatDTO> averageStats;
    private List<PostsOverTimeDTO> postsOverTime;
    private List<CategoryDistributionDTO> categoryDistribution;
    private List<UserGrowthDTO> userGrowth;
    private List<TopContributorDTO> topContributors;
    private List<ModerationStatDTO> moderationStats;
    private List<PeakActivityDTO> peakActivities;
}
