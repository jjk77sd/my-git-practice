import React from "react";
import "./App.css";

function Header() {
  return (
    <header className="header">
      <h2>ADMIN PANEL</h2>
      <div className="profile">
        <span>🔔</span>
        <span>👤 Admin</span>
      </div>
    </header>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>MENU</h3>
      <ul>
        <li className="active">📊 Dashboard</li>
        <li>👥 Người dùng</li>
        <li>📦 Sản phẩm</li>
        <li>🛒 Đơn hàng</li>
        <li>📈 Thống kê</li>
        <li>⚙️ Cài đặt</li>
      </ul>
    </aside>
  );
}

function Dashboard() {
  return (
    <main className="content">
      <h1>Dashboard</h1>
      <p className="subtitle">
        Chào mừng bạn đến với trang quản trị!
      </p>

      <div className="cards">
        <div className="card blue">
          <h3>Tổng người dùng</h3>
          <h1>1,250</h1>
          <p>+12% tháng này</p>
        </div>

        <div className="card green">
          <h3>Tổng sản phẩm</h3>
          <h1>350</h1>
          <p>+8% tháng này</p>
        </div>

        <div className="card orange">
          <h3>Đơn hàng</h3>
          <h1>120</h1>
          <p>+15% tháng này</p>
        </div>

        <div className="card purple">
          <h3>Doanh thu</h3>
          <h1>85M</h1>
          <p>+20% tháng này</p>
        </div>
      </div>

      <section className="welcome">
        <h2>Xin chào Admin! 👋</h2>
        <p>
          Đây là hệ thống quản lý được xây dựng
          bằng ReactJS.
        </p>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      © 2026 Admin Panel - ReactJS
    </footer>
  );
}

function App() {
  return (
    <div className="app">
      <Header />

      <div className="layout">
        <Sidebar />
        <Dashboard />
      </div>

      <Footer />
    </div>
  );
}

export default App;