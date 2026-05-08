export default function RuleSection({ title, rules }) {
  return (
    <section className="bg-card border rounded-lg p-6">
      <h3 className="text-foreground mb-3">{title}</h3>

      <div className="space-y-3 text-muted-foreground">
        {rules.map((rule, index) => (
          <p key={index}>
            <strong className="text-foreground">
              {rule.heading}
            </strong>{" "}
            {rule.description}
          </p>
        ))}
      </div>
    </section>
  );
}
