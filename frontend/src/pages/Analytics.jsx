import StatsCards from "../components/analytics/StatsCard";
import AverageStats from "../components/analytics/AverageStats";
import PostsOverTimeChart from "../components/analytics/PostsOverTimeChart";
import CategoryPieChart from "../components/analytics/CategoryPieChart";
import UserGrowthChart from "../components/analytics/UserGrowthChart";
import TopContributors from "../components/analytics/TopContributors";
import ModerationActivity from "../components/analytics/ModerationActivity";
import PeakActivityHours from "../components/analytics/PeakActivityHours";
import { ActivityIcon, AlertCircle, Clock, FileText, MessageSquare, ThumbsUp, Users } from "lucide-react";
import Header from "../components/ui/Header";
import { getAnalytics } from "../services/AnalyticsService";
import { useEffect, useState } from "react";

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  
  useEffect(() => {
    const fetchAnalytics = async () => {
        try {
            const res = await getAnalytics();
            setAnalytics(res.analytics);
        } catch (err) {
            console.log("Failed to fetch analytics: " + err);
        }
    };
    
    fetchAnalytics();
  } ,[])

  if (!analytics) {
    return <div className="p-6">Loading analytics...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto overflow-x-hidden space-y-6">
        <Header title="Analytics" desc="Comprehensive overview of platform metrics and performance" />

        <StatsCards statsCards={analytics.statsCards} />

        <AverageStats averageStats={analytics.averageStats} />

        <PostsOverTimeChart data={analytics.postsOverTime} />

        <CategoryPieChart data={analytics.categoryDistribution} />

        <UserGrowthChart data={analytics.userGrowth} />

        <div className="grid lg:grid-cols-2 gap-6">
            <TopContributors data={analytics.topContributors} />
            <ModerationActivity data={analytics.moderationStats} />
        </div>

        <PeakActivityHours data={analytics.peakActivities} />
    </div>
  );
}