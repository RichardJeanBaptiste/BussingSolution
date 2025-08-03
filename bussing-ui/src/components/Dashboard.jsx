import { useNavigate } from 'react-router';

function Dashboard() {
    let navigate = useNavigate();

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={() => navigate('/arrivals')}>Arrival</button>
            <button onClick={() => navigate('/departures')}>Departure</button>
        </div>
    )
}

export default Dashboard