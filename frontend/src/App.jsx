import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Search from './components/Search';
import Insert from './components/Insert';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/search" element={<Search />} />
          <Route path="/insert" element={<Insert />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;