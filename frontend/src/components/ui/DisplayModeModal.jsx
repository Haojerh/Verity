export default function DisplayModeModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded">
        <h2>Display Mode</h2>

        <button onClick={onClose}>Light</button>
        <button onClick={onClose}>Dark</button>
      </div>
    </div>
  );
}