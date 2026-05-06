import { Link } from "react-router-dom";
import Avatar from "../ui/Avatar";
import { formatDate } from "../../utils/Format";
import { useNavigate } from "react-router-dom";

export default function DebateHeader({ debate }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          navigate(`/profile/${debate.authorID}`)
        }
      }
      className="flex items-center gap-3 mb-3 cursor-pointer w-fit"
    >
      <div className="flex items-center gap-3 mb-3">
        <Avatar name={debate.authorName} imageUrl={debate.authorAvatar ? `http://localhost:8080/api/uploads/users/${debate.authorAvatar}` : null} />

        <div>
          <p className="font-medium text-sm">{debate.authorName}</p>
          <p className="text-xs text-muted-foreground">
            {formatDate(debate.SYSCREATEDDATE)}
          </p>
        </div>
      </div>
    </div>
  );
}