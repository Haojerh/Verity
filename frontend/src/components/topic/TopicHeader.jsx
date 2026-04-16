export default function TopicHeader({ topic }) {
  return (
    <div className="mt-4 overflow-hidden rounded-xl border">
      {/* Banner Image */}
      <div className="relative h-24 md:h-36 lg:h-48 w-full">
        <img
          className="w-full h-full object-cover"
          src={topic.cover}
          alt={topic.coverAlt}
        />
      </div>

      {/* Overlay Content */}
      <div className="relative px-8 pb-8 -mt-6 sm:-mt-12 md:-mt-14 lg:-mt-16 flex items-end gap-4 justify-between flex-wrap">
        <div className="flex flex-row items-end gap-4 md:gap-6">
          {/* Avatar */}
          <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full border-4 sm:border-6 md:border-8 border-white overflow-hidden shadow-xl dark:shadow-dark-xl">
              <img
                src={topic.avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
          </div>

          {/* Title + Desc */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">
              {topic.title}
          </h1>
        </div>

        {/* Follow Button */}
        <div className="mb-1">
          <button className="px-3 py-1 sm:px-4 sm:py-1.5 md:px-6 md:py-2 border-2 font-bold rounded-full text-sm active:scale-95 transition-all border-primary text-primary hover:bg-primary/5">
            + Follow
          </button>
        </div>
      </div>
    </div>
  );
}