import { Link } from "react-router-dom";
import { formatDateTime } from "../../utils/Format";

export default function ModeratorRow({ report }) {
  return (
    <tr className="border-t hover:bg-muted/30">
      <td className="p-4 text-primary underline font-bold hover:text-secondary">
        <Link
          to={
            report.type === "POST"
              ? `/post/${report.targetPostID}`
              : `/comment/${report.targetCommentID}`
          }
        >
          {report.type === "POST" ? "Jump to Post" : "Jump to Comment"}
        </Link>
      </td>

      <td className="hidden md:table-cell p-4 text-left">
        <span className={`px-2 py-1 text-xs rounded-full ${
          report.type === "POST" ? "bg-destructive/15 text-destructive" : "bg-primary/15 text-primary"
        }`}>
          {report.type === "POST" ? "POST" : "COMMENT"}
        </span>
      </td>

      <td className="p-4 font-bold">{report.reporterName}</td>
      <td className="hidden lg:table-cell p-4">{formatDateTime(report.datetime)}</td>
      <td className="p-4">{report.reason}</td>
    </tr>
  );
}
