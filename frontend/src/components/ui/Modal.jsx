export default function Modal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-background w-full max-w-2xl mx-4 rounded-xl shadow-2xl dark-shadow-dark-2xl overflow-hidden border"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
