import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TopicActions from "./TopicActions";

export default function TopicCard({ topic, onAction=null, onFollowToggle }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/explore/${topic.topicID}`)}
      className="border rounded-xl overflow-hidden group hover:shadow-xl dark:hover:shadow-dark-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="h-40 relative">
        <img
          className="w-full h-full object-cover"
          src={topic.banner}
          alt="Banner"
        />

        <div className="absolute -bottom-6 left-6 p-1 rounded-full">
          <img
            className="w-12 h-12 rounded-full outline-3 outline-white object-cover"
            src={topic.avatar}
            alt="Avatar"
          />
        </div>
      </div>

      <div className="pt-10 pb-6 px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold tracking-tight">
            {topic.name}
          </h3>

          {!onAction && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFollowToggle(topic.topicID);
              }}
              className={`px-4 py-1.5 border-2 font-bold rounded-full text-sm active:scale-95 transition-all 
              ${
                topic.isFollowed
                  ? "border-destructive text-destructive hover:bg-destructive/5"
                  : "border-primary text-primary hover:bg-primary/5"
              }`}
            >
              {topic.isFollowed ? "- Unfollow" : "+ Follow"}
            </button>
          )}
        </div>

        <p className="text-muted-foreground mb-6 text-sm leading-relaxed line-clamp-2">
          {topic.description}
        </p>

        {onAction && (
          <div onClick={(e) => e.stopPropagation()}>
            <TopicActions onAction={onAction} topic={topic} />
          </div>
        )}
      </div>
    </div>
  );
}