export default function Header({ title, desc }) {
  return (
    <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-1">{title}</h2>
        <p className="text-sm text-gray-500">
          {desc}
        </p>
    </div>
  );
}