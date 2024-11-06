"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Load sample data
const sampleData = [
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
];
const processData = (data) => {
    const activitySummary = {};
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
app.get('/api/customer-activity', (req, res) => {
    const insights = processData(sampleData);
    res.json(insights);
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
