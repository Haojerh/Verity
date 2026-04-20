import { useState } from "react";
import Modal from "../ui/Modal";
import { Pencil } from "lucide-react";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import TextBox from "../ui/TextBox";
import ImageUpload from "../ui/ImageUpload";
import ModalFooter from "../ui/ModalFooter";
import ModalHeader from "../ui/ModalHeader";

export default function EditTopicModal({ topic, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    avatar: null,
    banner: null,
  });
  
  return (
    <Modal onClose={onClose}>
      <ModalHeader text="Edit Topic" color="primary" icon={Pencil} onClose={onClose}/>

      <div className="px-8 pb-8 space-y-6 overflow-y-auto flex-1">
        <TextBox
        label="New Title"
        placeholder="Enter topic title..."
        value={formData.title}
        onChange={(val) => setFormData(prev => ({ ...prev, title: val }))}
        />

        <TextBox
        multiline
        label="New Description"
        placeholder="Enter description..."
        value={formData.description}
        onChange={(val) => setFormData(prev => ({ ...prev, description: val }))}
        />

        <ImageUpload 
          label="New Topic Avatar"
          value={formData.avatar}
          onChange={(file) => setFormData(prev => ({ ...prev, avatar: file }))}
          type="avatar"
        />

        <ImageUpload 
          label="New Topic Banner"
          value={formData.banner}
          onChange={(file) => setFormData(prev => ({ ...prev, banner: file }))}
        />
      </div>

      {/* Footer */}
      <ModalFooter buttonText="Confirm Edit" buttonColor="primary" onClose={onClose} />
    </Modal>
  );
}