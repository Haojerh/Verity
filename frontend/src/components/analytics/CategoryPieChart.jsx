import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const generateColor = (seed) => {
  const colors = [
    "#ef4444",
    "#3b82f6",
    "#22c55e",
    "#a855f7",
    "#f59e0b",
    "#06b6d4",
    "#ec4899",
    "#84cc16",
  ];

  return colors[seed % colors.length];
};

export default function CategoryPieChart({ data }) {
  return (
    <div className="bg-card border rounded-lg p-6">
      <h2 className="mb-4">Post Distribution by Category</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            labelLine={false}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={generateColor(index)} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
