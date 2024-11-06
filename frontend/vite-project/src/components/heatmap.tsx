// components/HeatMap.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
type CustomerActivity = {
    customer_id: string;
    timestamp: string;
    area: string;
    activity_type: string;
    dwell_time_seconds: number;
    coordinates: {
      x: number;
      y: number;
    };
  };

type HeatMapProps = {
  data: CustomerActivity[];
};

const HeatMap: React.FC<HeatMapProps> = ({ data }) => {
  // Function to get color based on activity level
  const getColor = (value: number) => {
    const intensity = Math.floor((value / data.length) * 255);
    return `rgb(${255 - intensity}, ${255 - intensity}, 255)`;
  };

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-5 gap-4">
          {data.map((activity, index) => (
            <div
              key={index}
              className="w-full h-24 bg-[#f0f0f0] rounded-md flex items-center justify-center text-sm font-medium"
              style={{
                backgroundColor: getColor(index),
                color: index > data.length / 2 ? 'white' : 'black'
              }}
              title={`Area: ${activity.area}\nActivity: ${activity.activity_type}\nDwell Time: ${activity.dwell_time_seconds} seconds`}
            >
              {activity.area}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HeatMap;