import Modal from "../ui/Modal";
import SelectBox from "../ui/SelectBox";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import ModalFooter from "../ui/ModalFooter";
import ModalHeader from "../ui/ModalHeader";
import { Trash2 } from "lucide-react";
import { deleteTopic } from "../../services/TopicService";

export default function DeleteTopicModal({ topic, onClose, setTopics }) {
  const handleDelete = async () => {
    try {
      await deleteTopic(topic.topicID);

      setTopics((prev) =>
        prev.filter((t) => t.topicID !== topic.topicID)
      );

      onClose();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <Modal onClose={onClose}>
      <ModalHeader text="Delete Topic" color="red" icon={Trash2} onClose={onClose}/>

      <div className="px-8 pb-8 space-y-6">
        <ConfirmDisplay data={topic} entity="topic" type="delete" />
      </div>

      {/* Footer */}
      <ModalFooter
        buttonText="Confirm Delete"
        buttonColor="red" 
        onClose={onClose} 
        onSubmit={handleDelete}
      />
    </Modal>
  );
}