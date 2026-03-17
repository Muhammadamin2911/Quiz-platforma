import React from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function AdminPage() {
  const navigate = useNavigate();

  return (
    <div className="admin-page-container">
      <div className="admin-profile-card">
        <button className="close-btn" onClick={() => navigate("/")}>✕</button>
        
        <div className="profile-header">
          <div className="profile-avatar">M</div>
          <h2>Admin bilan bog'lanish</h2>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <span className="label">Ism:</span>
            <span className="value">Muhammadamin G'ulomov</span>
          </div>
          
          <div className="detail-item">
            <span className="label">Telefon:</span>
            <span className="value">+998 20 000 12 10</span>
          </div>
        </div>

        <div className="action-buttons">
          <a href="https://t.me/M_dewolper" target="_blank" rel="noreferrer" className="btn telegram-btn">
            <span className="btn-icon">✈️</span> Telegram orqali yozish
          </a>
          
          <a href="tel:+998200001210" className="btn phone-btn">
            <span className="btn-icon">📞</span> Qo'ng'iroq qilish
          </a>
        </div>

        <button className="back-home-text" onClick={() => navigate("/")}>
          ← Bosh sahifaga qaytish
        </button>
      </div>
    </div>
  );
}

export default AdminPage;