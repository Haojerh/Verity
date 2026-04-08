import DebateCard from "../components/debate/DebateCard";

export default function Home() {
    const recommendedDebates = [
    {
        id: 1,
        title: "iOS vs Android",
        description: "Which mobile operating system provides the better overall experience for users in 2026?",
        poster: "debateMaster2026",
        date: "2026-04-01",
        prosVotes: 1247,
        consVotes: 1589,
        prosSide: "iOS",
        consSide: "Android",
        commentCount: 47,
        images: [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
        "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800"
        ]
    },
    {
        id: 2,
        title: "Remote Work vs Office Work",
        description: "Is working from home more productive than traditional office environments?",
        poster: "workLifeGuru",
        date: "2026-04-03",
        prosVotes: 2341,
        consVotes: 1876,
        prosSide: "Remote",
        consSide: "Office",
        commentCount: 89,
        images: [
        "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800"
        ]
    },
    {
        id: 3,
        title: "Electric Cars vs Gas Cars",
        description: "Are electric vehicles truly the future of transportation?",
        poster: "autoEnthusiast",
        date: "2026-04-04",
        prosVotes: 1823,
        consVotes: 1456,
        prosSide: "Electric",
        consSide: "Gas",
        commentCount: 62
    },
    {
        id: 4,
        title: "Coffee vs Tea",
        description: "Which is the superior morning beverage?",
        poster: "caffeineAddict",
        date: "2026-04-05",
        prosVotes: 987,
        consVotes: 1123,
        prosSide: "Coffee",
        consSide: "Tea",
        commentCount: 34,
        images: [
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
        "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800",
        "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800"
        ]
    }
    ];
  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="mb-6 text-xl font-semibold">
          Recommended Debates
        </h2>

        <div className="space-y-4">
          {recommendedDebates.map((debate) => (
            <DebateCard key={debate.id} debate={debate} />
          ))}
        </div>
      </div>
    </div>
  );
}
