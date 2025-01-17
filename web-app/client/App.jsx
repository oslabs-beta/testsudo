import { useState } from 'react';
import { Route, Routes } from 'react-router';
import Login from './pages/Login.jsx';
import SignUp from './components/SignUp.jsx';
import BackEndMetrics from './components/BackEndMetrics.jsx';
import Dashboard from './components/Dashboard.jsx';
import Projects from './components/Projects.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Landing from './pages/Landing.jsx';

function App() {
  const [projectIDState, setProjectIDState] = useState(() => {
    return localStorage.getItem('projectID') || '';
  });

  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/backendMetrics"
          element={<BackEndMetrics projectIDState={projectIDState} />}
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Projects setProjectIDState={setProjectIDState} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard projectIDState={projectIDState} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
