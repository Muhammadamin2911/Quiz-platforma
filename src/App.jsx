import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import QuizPage from "./pages/quizpage/QuizPage";
import "./App.css"
import AdminPage from './pages/admin/Admin';

function App() {
  return (
    <div className="container">
      {/* Doimiy ko'rinib turadigan Header */}
      <header>
        <h1>Mening Quiz Ilovam</h1>
      </header>

      <main>
        <Routes>
          {/* Bosh sahifa */}
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />

          {/* Quiz sahifasi ID bilan */}
          <Route path="/quiz/:id" element={<QuizPage />} />

          {/* Agar noto'g'ri URL kiritilsa (404 sahifa o'rniga Homega qaytaradi) */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;