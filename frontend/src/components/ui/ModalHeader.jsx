import { X, Ban } from "lucide-react";

export default function ModalHeader({text="Confirm", color="primary", icon: Icon=Ban, onClose}) {
    return(
        <div className="px-8 py-6 flex items-center justify-between">
        <div className="flex flex-row gap-3 items-center">
            <Icon className={`w-8 h-8 p-1 rounded-md 
            ${color == "primary" && "text-primary bg-primary/10"}
            ${color == "red" && "text-destructive bg-destructive/10"}
            `}/>
            <h3 className="text-xl font-bold">{text}</h3>
        </div>
        <button onClick={onClose}>
            <X className="w-5 h-5" />
        </button>
      </div>
    );
}
