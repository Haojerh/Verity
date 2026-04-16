import Modal from "./Modal";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
import { LaptopMinimal, Sun, MoonStar } from "lucide-react";

export default function DisplayModeModal({ onClose, isDark, onDark }) {
  return (
    <Modal>
      <ModalHeader
        text="Display Mode"
        color="primary"
        icon={LaptopMinimal}
        onClose={onClose}
      />

      <div className="px-8 pb-8 space-y-3 flex flex-col">
        <button
          onClick={() => onDark(false)}
          className={`flex items-center gap-2 border-2 rounded-md p-3 transition-all
            ${!isDark 
              ? "bg-primary text-white border-secondary" 
              : "hover:bg-muted/80"}
          `}
        >
          <Sun className="w-6 h-6" />
          Light
        </button>

        <button
          onClick={() => onDark(true)}
          className={`flex items-center gap-2 border-2 rounded-md p-3 transition-all
            ${isDark 
              ? "bg-primary text-white border-secondary" 
              : "hover:bg-muted/80"}
          `}
        >
          <MoonStar className="w-6 h-6" />
          Dark
        </button>
      </div>

      <ModalFooter
        buttonText="Done"
        buttonColor="primary"
        buttonNumber={1}
        onClose={onClose}
      />
    </Modal>
  );
}