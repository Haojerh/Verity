import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function UserGrowthChart({ data }) {
  return (
    <div className="bg-card border rounded-lg p-6">
      <h2 className="mb-4">User Growth (Last 7 Months)</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="users" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}