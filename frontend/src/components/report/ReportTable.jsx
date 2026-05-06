import ReportRow from "./ReportRow";

export default function ReportTable({ reports }) {
  return (
    <div className="bg-background border overflow-visible shadow-md dark:shadow-dark-md">
      <table className="w-full text-sm border-separate border-spacing-0">
        <thead className="bg-muted/80 text-xs uppercase">
          <tr>
            <th className="p-4 text-left">Post/Thread</th>
            <th className="hidden md:table-cell p-4 text-left">Report Type</th>
            <th className="p-4 text-left">Reported By</th>
            <th className="hidden lg:table-cell p-4 text-left">Date & Time</th>
            <th className="p-4 text-left">Reason</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((report) => (
            <ReportRow
              key={report.reportID}
              report={report}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}