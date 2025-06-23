import axios from "axios"
import React, { useEffect, useState } from "react"

const API = "http://localhost:5005/api";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    type: "run",
    duration: 0,
    distance: 0,
    averageHeartRate: 0,
    averagePower: 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    await axios.post(`${API}/register`, { email, password });
    alert("Registered! Now login.");
  };

  const login = async () => {
    const res = await axios.post(`${API}/login`, { email, password });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    setEmail("");
    setPassword("");
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const fetchWorkouts = async () => {
    const res = await axios.get(`${API}/workouts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setWorkouts(res.data);
  };

  const createWorkout = async () => {
    await axios.post(`${API}/workouts`, form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchWorkouts();
    setForm({
      name: "",
      type: "run",
      duration: 0,
      distance: 0,
      averageHeartRate: 0,
      averagePower: 0,
    });
  };

  useEffect(() => {
    if (token) fetchWorkouts();
  }, [token]);

  if (!token)
    return (
      <div style={{ padding: 20 }}>
        <h2>Login / Register</h2>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
        <button onClick={login}>Login</button>
        <button onClick={register}>Register</button>
      </div>
    );

  return (
    <div style={{ padding: 20 }}>
      <h2>Tracklytics</h2>
      <button onClick={logout}>Logout</button>

      <h3>Create Workout</h3>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} /> <br />
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="run">Run</option>
        <option value="bike">Bike</option>
      </select> <br />
      <input name="duration" type="number" placeholder="Duration (min)" value={form.duration} onChange={handleChange} /> <br />
      <input name="distance" type="number" placeholder="Distance (km)" value={form.distance} onChange={handleChange} /> <br />
      <input name="averageHeartRate" type="number" placeholder="Avg HR" value={form.averageHeartRate} onChange={handleChange} /> <br />
      <input name="averagePower" type="number" placeholder="Avg Power" value={form.averagePower} onChange={handleChange} /> <br />
      <button onClick={createWorkout}>Add Workout</button>

      <h3>Your Workouts</h3>
      <ul>
        {workouts.map((w) => (
          <li key={w.id}>
            {w.name} | {w.type} | {w.distance} km | {w.duration} min
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;