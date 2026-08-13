import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navItems = [
  { to: '/', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

const summaryCards = [
  { label: 'Active members', value: '4', tone: 'teal' },
  { label: 'Teams', value: '2', tone: 'violet' },
  { label: 'Weekly workouts', value: '12', tone: 'orange' },
  { label: 'Top score', value: '980', tone: 'green' },
];

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="topbar">
          <div>
            <p className="eyebrow">Performance dashboard</p>
            <h1>Octofit Tracker</h1>
          </div>
          <div className="status-pill">
            {import.meta.env.VITE_CODESPACE_NAME ? 'Codespaces mode' : 'Local mode'}
          </div>
        </header>

        <section className="summary-grid" aria-label="Summary metrics">
          {summaryCards.map((card) => (
            <article key={card.label} className={`summary-card ${card.tone}`}>
              <span>{card.label}</span>
              <strong>{card.value}</strong>
            </article>
          ))}
        </section>

        <nav className="nav-panel" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <main className="content-panel">
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
