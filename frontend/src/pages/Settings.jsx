import { useState } from "react";
import SettingAvatar from "../components/settings/SettingAvatar";
import PersonalInfoForm from "../components/settings/PersonalInfoForm";
import PasswordForm from "../components/settings/PasswordForm";
import DangerZone from "../components/settings/DangerZone";
import { Save } from "lucide-react";
import DeleteModal from "../components/settings/DeleteModal";
import { useAuth } from "../context/AuthContext";

export default function Settings() {
  const { user } = useAuth();
  const [modal, setModal] = useState(false);

  if (!user) {
    return <div className="text-center mt-10">Loading settings...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
        <h2 className=" text-2xl mb-4">Settings</h2>

        <SettingAvatar user={user} />
        <PersonalInfoForm user={user} />
        <PasswordForm />

        <DangerZone setModal={setModal}/>

        {modal &&
        <DeleteModal
          user={user} 
          onClose={() => setModal(false)}
        />
        }
    </div>
  );
}