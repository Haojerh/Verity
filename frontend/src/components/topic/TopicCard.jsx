import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function TopicCard({ topic, actions }) {
  const navigate = useNavigate();
  const [follow, setFollow] = useState(false);

  return (
    <div
      onClick={() => navigate(`/explore/${topic.id}`, { state: topic })}
      className="border rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="h-40 relative">
        <img
          className="w-full h-full object-cover"
          src={topic.cover}
          alt={topic.coverAlt}
        />

        <div className="absolute -bottom-6 left-6 p-1 rounded-full">
          <img
            className="w-12 h-12 rounded-full outline-3 outline-white object-cover"
            src={topic.avatar}
            alt={topic.avatarAlt}
          />
        </div>
      </div>

      <div className="pt-10 pb-6 px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold tracking-tight">
            {topic.title}
          </h3>

          {!actions && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFollow(!follow);
              }}
              className={`px-4 py-1.5 border-2 font-bold rounded-full text-sm active:scale-95 transition-all 
              ${
                follow
                  ? "border-destructive text-destructive hover:bg-destructive/5"
                  : "border-primary text-primary hover:bg-primary/5"
              }`}
            >
              {follow ? "- Unfollow" : "+ Follow"}
            </button>
          )}
        </div>

        <p className="text-zinc-600 mb-6 text-sm leading-relaxed line-clamp-2">
          {topic.description}
        </p>

        {actions && (
          <div onClick={(e) => e.stopPropagation()}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}