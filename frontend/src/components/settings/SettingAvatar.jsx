import { useRef } from "react";
import { Camera } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import Avatar from "../ui/Avatar";
import { updateAvatar } from "../../services/UserService";

export default function SettingAvatar({}) {
  const fileInputRef = useRef(null);
  const { user, setUser } = useAuth();
  const { showToast } = useToast();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // preview instantly
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser((prev) => ({
        ...prev,
        avatar: reader.result,
      }));
    };
    reader.readAsDataURL(file);

    // upload to backend immediately
    try {
      await updateAvatar(file);
      showToast("Avatar Updated Successful")
    } catch (err) {
      console.error("Avatar upload failed", err);
      showToast(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="mb-4">Profile Picture</h3>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div
          className="relative group cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          {user?.avatar ?
           <img src={user.avatar} className="w-24 h-24 rounded-full object-cover" /> :
           <Avatar name={user?.name} size="xl" />
          }

          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Camera className="text-white" />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <p className="text-sm text-muted-foreground">
          Click avatar to change profile picture <br />
          Max size 10MB
        </p>
      </div>
    </div>
  );
}