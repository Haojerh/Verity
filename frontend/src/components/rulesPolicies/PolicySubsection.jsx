export default function PolicySubsection({title, paragraphs = []}) {
  return (
    <div>
      <h3 className="text-foreground mb-2">
        {title}
      </h3>

      <div className="space-y-2 ml-4">
        {paragraphs.map((p, index) => (
          <p key={index}>
            {p.heading && (
              <strong className="text-foreground">
                {p.heading}{" "}
              </strong>
            )}

            {p.description}
          </p>
        ))}
      </div>
    </div>
  );
}