import  { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Card } from '@/components/ui/card';

interface ActivitySummary {
    [key: string]: number;
}

interface Insights {
    mostActiveArea: [string, number];
    leastActiveArea: [string, number];
    activitySummary: ActivitySummary;
}

const ActivityHeatmap = () => {
    const [insights, setInsights] = useState<Insights | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/customer-activity');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Insights = await response.json();
                setInsights(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load activity data');
            }
        };

        fetchData();
    }, []);

    if (error) {
        return (
            <div className="p-4 text-red-500 text-center">
                <p>{error}</p>
            </div>
        );
    }

    if (!insights) {
        return (
            <div className="p-4 text-center">
                <p>Loading...</p>
            </div>
        );
    }

   
    const areas = Object.keys(insights.activitySummary);
    const activityValues = Object.values(insights.activitySummary);

    return (
        <Card className="p-4 w-full max-w-4xl">
            <Plot
                data={[
                    {
                        type: 'bar',
                        x: areas,
                        y: activityValues,
                        marker: {
                            color: activityValues.map(value => {
                                if (value === Math.max(...activityValues)) return '#FF6B6B';
                                if (value === Math.min(...activityValues)) return '#4ECDC4';
                                return '#45B7D1';
                            })
                        }
                    }
                ]}
                layout={{
                    title: 'Activity Levels by Area',
                    xaxis: {
                        title: 'Areas',
                        tickangle: -45
                    },
                    yaxis: {
                        title: 'Activity Level'
                    },
                    margin: {
                        b: 100
                    },
                    width: 800,
                    height: 500,
                    showlegend: false,
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                }}
                config={{
                    responsive: true,
                    displayModeBar: false
                }}
            />
        </Card>
    );
};

export default ActivityHeatmap;