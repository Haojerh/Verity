import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PeakActivityHours({ data }) {
  return (
    <div className="bg-card border rounded-lg p-6">
      <h2 className="mb-4">Peak Activity by Hour (Average)</h2>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="activity" fill="#a855f7" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
