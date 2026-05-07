import Modal from "../ui/Modal";
import { Share2 } from "lucide-react";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import ModalFooter from "../ui/ModalFooter";
import ModalHeader from "../ui/ModalHeader";
import { Copy, Link } from "lucide-react";
import { useState } from "react";

export default function ShareModal({ post, onClose }) {
  const [copy, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/post/${post.postID}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };
  
  return (
    <Modal onClose={onClose}>
      <ModalHeader text="Share Post" color="primary" icon={Share2} onClose={onClose}/>

      <div className="px-8 py-8 space-y-6">
        <div className="flex items-center justify-between gap-4 pl-4 pr-2 py-2 rounded-xl bg-muted/70 border">
            <div className="flex flex-row gap-6 items-center">
                <Link className="w-5 h-5 text-muted-foreground"/>
                <p className="text-sm text-muted-foreground underline">{shareUrl}</p>
            </div>
            <button 
              onClick={handleCopy}
              className="h-full px-6 py-2 rounded-md bg-primary text-white hover:bg-secondary transition-colors">
                {copy ? "Copied!" : "Copy"}
            </button>
        </div>
      </div>

      {/* Footer */}
      <ModalFooter buttonText="Done" buttonNumber={1} buttonColor="primary" onClose={onClose} />
    </Modal>
  );
}