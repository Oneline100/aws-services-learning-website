import { HashRouter, Routes, Route } from 'react-router-dom';
import TopNav from './components/Nav/TopNav';
import HomePage from './pages/HomePage';
import ArchitecturePage from './pages/ArchitecturePage';

export default function App() {
  return (
    <HashRouter>
      <TopNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/architecture" element={<ArchitecturePage />} />
        <Route path="/architecture/:demoId" element={<ArchitecturePage />} />
      </Routes>
    </HashRouter>
  );
}
