export default function FilterBar({
  filters = [],
  activeFilter,
  onChange,
}) {
  return (
    <div className="flex flex-row gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`h-8 px-3 text-xs rounded-full transition ${
            activeFilter === filter
              ? "bg-primary text-white"
              : "bg-muted hover:bg-muted/50"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}