"use client";

import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const placementData = [
  { year: "2019-20", overallAvg: 8.63, btechAvg: 9.92, highest: 107.00 },
  { year: "2020-21", overallAvg: 9.06, btechAvg: 10.83, highest: 112.00 },
  { year: "2021-22", overallAvg: 11.57, btechAvg: 13.84, highest: 184.00 },
  { year: "2022-23", overallAvg: 13.97, btechAvg: 15.29, highest: 82.05 },
  { year: "2023-24", overallAvg: 13.81, btechAvg: 12.94, highest: 85.30 },
  { year: "2024-25", overallAvg: 12.89, btechAvg: 12.84, highest: 85.00 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-white/10 bg-black/80 p-4 shadow-xl backdrop-blur-md">
        <p className="mb-2 font-bold text-white">{`Academic Year: ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-semibold text-white">{entry.value} LPA</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function PlacementChart() {
  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md rounded-t-xl">
        <span className="text-sm font-semibold text-violet-300 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
          </span>
          Interactive Placement Trends (CTC in LPA)
        </span>
      </div>
      <div className="h-[400px] w-full p-4 bg-black/20 rounded-b-xl border border-t-0 border-white/5">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={placementData}
            margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorBtech" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOverall" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
            <XAxis 
              dataKey="year" 
              stroke="#ffffff50" 
              fontSize={12}
              tickMargin={10}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              yAxisId="left" 
              stroke="#ffffff50" 
              fontSize={12}
              tickFormatter={(value) => `${value}L`}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              stroke="#ffffff50" 
              fontSize={12}
              tickFormatter={(value) => `${value}L`}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff05' }} />
            <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="btechAvg"
              name="B.Tech Avg"
              stroke="#8b5cf6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorBtech)"
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="overallAvg"
              name="Overall Avg"
              stroke="#22d3ee"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorOverall)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="highest"
              name="Highest Package"
              stroke="#f43f5e"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 4, fill: "#f43f5e", strokeWidth: 2, stroke: "#000" }}
              activeDot={{ r: 6 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
