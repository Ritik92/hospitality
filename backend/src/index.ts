import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Define a type for the sample data structure
interface CustomerActivity {
    customer_id: string;
    timestamp: string;
    area: string;
    activity_type: string;
    dwell_time_seconds: number;
    coordinates: {
        x: number;
        y: number;
    };
}

// Load sample data
const sampleData: CustomerActivity[] = [
    {
        "customer_id": "C001",
        "timestamp": "2024-11-01T10:15:00",
        "area": "Reception",
        "activity_type": "check-in",
        "dwell_time_seconds": 300,
        "coordinates": {
            "x": 5,
            "y": 10
        }
    },
    {
        "customer_id": "C002",
        "timestamp": "2024-11-01T10:20:00",
        "area": "Lobby",
        "activity_type": "seated",
        "dwell_time_seconds": 600,
        "coordinates": {
            "x": 15,
            "y": 20
        }
    },
    {
        "customer_id": "C003",
        "timestamp": "2024-11-01T11:00:00",
        "area": "Dining",
        "activity_type": "ordered",
        "dwell_time_seconds": 1800,
        "coordinates": {
            "x": 25,
            "y": 30
        }
    },
    {
        "customer_id": "C004",
        "timestamp": "2024-11-01T11:30:00",
        "area": "Gym",
        "activity_type": "exercise",
        "dwell_time_seconds": 3600,
        "coordinates": {
            "x": 35,
            "y": 40
        }
    },
    {
        "customer_id": "C005",
        "timestamp": "2024-11-01T12:00:00",
        "area": "Pool",
        "activity_type": "swim",
        "dwell_time_seconds": 2400,
        "coordinates": {
            "x": 45,
            "y": 50
        }
    },
    {
        "customer_id": "C006",
        "timestamp": "2024-11-01T13:00:00",
        "area": "Reception",
        "activity_type": "check-out",
        "dwell_time_seconds": 200,
        "coordinates": {
            "x": 5,
            "y": 10
        }
    },
    {
        "customer_id": "C007",
        "timestamp": "2024-11-01T14:00:00",
        "area": "Lobby",
        "activity_type": "waiting",
        "dwell_time_seconds": 450,
        "coordinates": {
            "x": 15,
            "y": 20
        }
    },
    {
        "customer_id": "C008",
        "timestamp": "2024-11-01T15:30:00",
        "area": "Spa",
        "activity_type": "relaxing",
        "dwell_time_seconds": 5400,
        "coordinates": {
            "x": 55,
            "y": 60
        }
    },
    {
        "customer_id": "C009",
        "timestamp": "2024-11-01T16:00:00",
        "area": "Dining",
        "activity_type": "ordered",
        "dwell_time_seconds": 2200,
        "coordinates": {
            "x": 25,
            "y": 30
        }
    },
    {
        "customer_id": "C010",
        "timestamp": "2024-11-01T17:00:00",
        "area": "Lounge",
        "activity_type": "seated",
        "dwell_time_seconds": 1200,
        "coordinates": {
            "x": 65,
            "y": 70
        }
    }
]

// Process data for insights
interface ActivitySummary {
    [key: string]: number;
}

interface Insights {
    mostActiveArea: [string, number];
    leastActiveArea: [string, number];
    activitySummary: ActivitySummary;
}

const processData = (data: CustomerActivity[]): Insights => {
    const activitySummary: ActivitySummary = {};

    data.forEach(({ area, dwell_time_seconds }) => {
        if (!activitySummary[area]) {
            activitySummary[area] = 0;
        }
        activitySummary[area] += dwell_time_seconds;
    });

    const sortedAreas = Object.entries(activitySummary).sort((a, b) => b[1] - a[1]);

    return {
        mostActiveArea: sortedAreas[0],
        leastActiveArea: sortedAreas[sortedAreas.length - 1],
        activitySummary
    };
};

app.get('/api/customer-activity', (req: Request, res: Response) => {
    const insights = processData(sampleData);
    res.json(insights);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
