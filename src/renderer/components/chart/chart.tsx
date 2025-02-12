import React, { useState } from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

interface TransactionData {
  date: string;
  received: number;
  sent: number;
}

interface BarChartProps {
  data: TransactionData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#3b3b3b] text-white rounded-md shadow-lg py-3 px-2">
        <p className="text-xs font-medium mb-2 ml-2">{label}</p>
        <div className="w-[150px] py-1 px-2 rounded-sm bg-[#575759]">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span className="text-xs">Received</span>
            </div>
            <span className="text-xs font-medium">
              ${payload[0].value.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-xs">Sent</span>
            </div>
            <span className="text-xs font-medium">
              ${payload[1].value.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  const getBarColor = (date: string, type: 'received' | 'sent') => {
    if (!hoveredDate || hoveredDate === date) {
      return type === 'received' ? '#22c55e' : '#ef4444';
    }
    return type === 'received' ? '#aeaeae' : '#e0e0e0';
  };

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={10}
          onMouseMove={(state: any) => {
            if (state?.activePayload) {
              setHoveredDate(state.activePayload[0].payload.date);
            }
          }}
          onMouseLeave={() => setHoveredDate(null)}
        >
          <CartesianGrid 
            horizontal={true} 
            vertical={false} 
            strokeDasharray="0"
            stroke="#252525"
          />
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            orientation="right"
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="received"
            name="Received"
            radius={[4, 4, 0, 0]}
          >
            {data.map((entry) => (
              <Cell
                key={`received-${entry.date}`}
                fill={getBarColor(entry.date, 'received')}
              />
            ))}
          </Bar>
          <Bar
            dataKey="sent"
            name="Sent"
            radius={[4, 4, 0, 0]}
          >
            {data.map((entry) => (
              <Cell
                key={`sent-${entry.date}`}
                fill={getBarColor(entry.date, 'sent')}
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};






