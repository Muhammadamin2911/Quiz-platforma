import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const quizCategories = [
    { id: "part-1", title: "1-qism", icon: "🚀", desc: "YADA 1 dan 50 gacha test" },
    { id: "part-2", title: "2-qism", icon: "⚖️", desc: "YADA 51 dan 100 gacha test" },
    { id: "part-3", title: "3-qism", icon: "🛤️", desc: "YADA 101 dan 150 gacha test" },
    { id: "part-4", title: "4-qism", icon: "♻️", desc: "YADA 151 dan 200 gacha test" },
    { id: "part-5", title: "5-qism", icon: "📦", desc: "YADA 201 dan 250 gacha test" },
    { id: "part-6", title: "6-qism", icon: "⚙️", desc: "YADA 251 dan 300 gacha test" },
    { id: "part-7", title: "7-qism", icon: "🏗️", desc: "YADA 301 dan 350 gacha test" },
    { id: "part-8", title: "8-qism", icon: "🧬", desc: "YADA 351 dan 400 gacha test" },
    { id: "part-9", title: "9-qism", icon: "🛠️", desc: "YADA 401 dan 450 gacha test" },
    { id: "part-10", title: "10-qism", icon: "📂", desc: "YADA 451 dan 500 gacha test" },
    { id: "admin", title: "Admin", icon: "🎗️", desc: "Admin bilan bog'lanish" },
  ];

  // Bosilganda yo'nalishni aniqlaydigan funksiya
  const handleCardClick = (id) => {
    if (id === "admin") {
      navigate("/admin"); // Admin sahifasiga o'tish
      // Agar tashqi havola bo'lsa: window.location.href = "https://t.me/username";
    } else {
      navigate(`/quiz/${id}`); // Quiz sahifasiga o'tish
    }
  };

  return (
    <div className="home-wrapper">
      <div className="hero-section">
        <h1>Bilimingizni sinab ko'ring</h1>
        <p>O'zingizga mos yo'nalishni tanlang va quizni boshlang</p>
      </div>

      <div className="categories-grid">
        {quizCategories.map((cat) => (
          <div 
            key={cat.id} 
            className={`category-card ${cat.id === 'admin' ? 'admin-card' : ''}`} 
            onClick={() => handleCardClick(cat.id)}
          >
            <div className="card-icon">{cat.icon}</div>
            <div className="card-content">
              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
            </div>
            <div className="arrow-icon">→</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;