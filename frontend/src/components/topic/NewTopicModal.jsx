import { useState } from "react";
import Modal from "../ui/Modal";
import { CirclePlus } from "lucide-react";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import TextBox from "../ui/TextBox";
import ImageUpload from "../ui/ImageUpload";
import ModalFooter from "../ui/ModalFooter";
import ModalHeader from "../ui/ModalHeader";

export default function NewTopicModal({ onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    avatar: null,
    banner: null,
  });

  return (
    <Modal onClose={onClose}>
      <ModalHeader text="New Topic" color="primary" icon={CirclePlus} onClose={onClose}/>

      <div className="px-8 pb-8 space-y-6 overflow-y-auto flex-1">
        <TextBox
          label="Enter Title"
          placeholder="Enter topic title..."
          value={formData.title}
          onChange={(val) => setFormData(prev => ({ ...prev, title: val }))} 
        />

        <TextBox
          multiline
          label="Enter Description"
          placeholder="Enter description..."
          value={formData.description}
          onChange={(val) => setFormData(prev => ({ ...prev, description: val }))}
        />

        <ImageUpload 
          label="Upload Topic Avatar"
          value={formData.avatar}
          onChange={(file) => setFormData(prev => ({ ...prev, avatar: file }))}
          type="avatar"
        />

        <ImageUpload 
          label="Upload Topic Banner"
          value={formData.banner}
          onChange={(file) => setFormData(prev => ({ ...prev, banner: file }))}
        />
      </div>

      {/* Footer */}
      <ModalFooter buttonText="Confirm Add" buttonColor="primary" onClose={onClose} />
    </Modal>
  );
}