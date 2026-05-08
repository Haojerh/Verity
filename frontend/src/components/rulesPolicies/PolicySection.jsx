export default function PolicySection({ icon: Icon, title, children }) {
  return (
    <section className="bg-card border rounded-lg p-6">
      <h2 className="text-foreground mb-4 flex items-center gap-2">
        {Icon && <Icon className="w-6 h-6" />}
        {title}
      </h2>

      <div className="space-y-4 text-muted-foreground">
        {children}
      </div>
    </section>
  );
}