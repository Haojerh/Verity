import { useRef } from "react";
import { Camera } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../ui/Avatar";

export default function SettingAvatar({}) {
  const fileInputRef = useRef(null);
  const { user, setUser } = useAuth();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({
        ...prev,
        avatar: reader.result,
      }));
    };
    reader.readAsDataURL(file);
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