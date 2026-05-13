import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

export default function PostsOverTimeChart({ data }) {
  return (
    <div className="bg-card border rounded-lg p-6">
      <h2 className="mb-4">Posts & Comments Over Time</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line type="monotone" dataKey="posts" stroke="#3b82f6" strokeWidth={2} />
          <Line type="monotone" dataKey="comments" stroke="#22c55e" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
