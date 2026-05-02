export default function ModalFooter({buttonText="Confirm", buttonColor="primary", buttonNumber=2, onClose, onSubmit}) {
    return(
        <div className="px-8 py-6 flex justify-end gap-4 flex-wrap">
            {buttonNumber === 2 && 
                <button 
                className="hover:bg-muted/80 px-6 py-2 rounded-full transition-all"
                onClick={onClose}>
                    Cancel
                </button>
            }
            <button 
              onClick={async () => {
                console.log("BUTTON CLICKED")

                if (buttonNumber === 1) {
                    onClose?.();
                    return;
                }

                if (onSubmit) {
                    await onSubmit();
                }
            }}
              className={`bg-destructive hover:bg-destructive-hover text-white px-6 py-2 rounded-full transition-all
              ${buttonColor == "primary" && "bg-primary hover:bg-secondary"}
              ${buttonColor == "red" && "bg-destructive hover:bg-destructive-hover"}
            `}>
                {buttonText}
            </button>
        </div>
    );
}