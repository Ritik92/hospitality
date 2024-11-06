
# Hotel Activity Dashboard

## Frontend

The frontend of this project is a visually appealing and interactive dashboard that displays hotel activity data. The key features include:

![Hotel Activity Dashboard Screenshot](https://github.com/user-attachments/assets/a092400c-1af3-4d9f-8f98-023edfe3cc56)

- Clear visualization of the most and least active areas within the hotel
- Summary of activity levels across all major hotel zones
- Responsive design that adapts well to various screen sizes

## Backend API Response

The backend API provides the necessary data to power the frontend dashboard. The API response includes the following key information:

```json
{
    "mostActiveArea": [
        "Spa",
        5400
    ],
    "leastActiveArea": [
        "Reception",
        500
    ],
    "activitySummary": {
        "Reception": 500,
        "Lobby": 1050,
        "Dining": 4000,
        "Gym": 3600,
        "Pool": 2400,
        "Spa": 5400,
        "Lounge": 1200
    }
}
```

- `mostActiveArea`: Identifies the area with the highest activity level, in this case the Spa with 5,400 visitors.
- `leastActiveArea`: Identifies the area with the lowest activity level, in this case the Reception with 500 visitors.
- `activitySummary`: Provides a detailed breakdown of the activity levels for each major zone within the hotel.

This API data is consumed by the frontend to generate the interactive dashboard, allowing hotel management to quickly identify high and low traffic areas and optimize operations accordingly.

## Running the Project Locally

To run the project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/hotel-activity-dashboard.git
   ```

2. Navigate to the backend directory and run it:
   ```
   cd backend
   tsc -b
   node dist/index.js
   ```
3. Navigate to the Frontend directory :
   ```
   cd frontend/vite-project
  
   ```

4.  Install the dependencies:
   ```
   npm install
   ```

5. Start the development server:
   ```
   npm run dev
   ```

6. Open your web browser and visit `http://localhost:5173` to view the running application.
