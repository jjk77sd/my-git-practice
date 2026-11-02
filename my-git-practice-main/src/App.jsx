import React, { useState } from "react";
import "./App.css";
import SinhVien from "./components/SinhVien";
import LopHoc from "./components/LopHoc";
import Khoa from "./components/Khoa";

function Header() {
return (
<header className="header">
<h2>QUẢN LÝ SINH VIÊN</h2>
<div className="profile">
<span>🔔</span>
<span>👤 Admin</span>
</div>
</header>
);
}

function Sidebar({ trangHienTai, setTrangHienTai }) {
const menu = [
{ ten: "Dashboard", icon: "📊" },
{ ten: "Quản lý sinh viên", icon: "👨‍🎓" },
{ ten: "Quản lý lớp", icon: "🏫" },
{ ten: "Quản lý khoa", icon: "🏢" },
{ ten: "Thống kê", icon: "📈" },
{ ten: "Cài đặt", icon: "⚙️" },
];

return (
<aside className="sidebar">
<h3>MENU</h3>

  <ul>
    {menu.map((item) => (
      <li
        key={item.ten}
        className={trangHienTai === item.ten ? "active" : ""}
        onClick={() => setTrangHienTai(item.ten)}
      >
        {item.icon} {item.ten}
      </li>
    ))}
  </ul>
</aside>

);
}

function Dashboard({ moTrangSinhVien }) {
const danhSach = JSON.parse(
localStorage.getItem("danhSachSinhVien") || "[]"
);

const soLop = new Set(danhSach.map((sv) => sv.lop)).size;

return (
<main className="content">
<h1>Dashboard</h1>

  <p className="subtitle">
    Chào mừng bạn đến với hệ thống quản lý sinh viên!
  </p>

  <div className="cards">
    <div className="card blue">
      <h3>Tổng sinh viên</h3>
      <h1>{danhSach.length}</h1>
      <p>Sinh viên hiện có</p>
    </div>

    <div className="card green">
      <h3>Tổng số lớp</h3>
      <h1>{soLop}</h1>
      <p>Lớp có sinh viên</p>
    </div>

    <div className="card orange">
      <h3>Số sinh viên có email</h3>
      <h1>{danhSach.filter((sv) => sv.email).length}</h1>
      <p>Đã cập nhật email</p>
    </div>

    <div className="card purple">
      <h3>Hệ thống</h3>
      <h1>✓</h1>
      <p>Đang hoạt động</p>
    </div>
  </div>

  <section className="welcome">
    <h2>Xin chào Admin! 👋</h2>

    <p>
      Đây là hệ thống quản lý sinh viên được xây dựng bằng ReactJS.
    </p>

    <button
      className="sv-btn-luu"
      onClick={moTrangSinhVien}
      style={{ marginTop: "15px", padding: "12px 20px" }}
    >
      👨‍🎓 Quản lý sinh viên
    </button>
  </section>

  <section className="welcome" style={{ marginTop: "25px" }}>
    <h2>Danh sách sinh viên gần đây</h2>

    {danhSach.length === 0 ? (
      <p>Chưa có dữ liệu sinh viên.</p>
    ) : (
      <div className="sv-bang">
        <table>
          <thead>
            <tr>
              <th>Mã sinh viên</th>
              <th>Họ và tên</th>
              <th>Lớp</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {danhSach.slice(-5).reverse().map((sv) => (
              <tr key={sv.maSV}>
                <td>{sv.maSV}</td>
                <td>{sv.hoTen}</td>
                <td>{sv.lop}</td>
                <td>{sv.email || "Chưa có"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </section>
</main>

);
}

function Footer() {
return (
<footer className="footer">
© 2026 Hệ thống quản lý sinh viên - ReactJS
</footer>
);
}

function App() {
const [trangHienTai, setTrangHienTai] = useState("Dashboard");

function hienThiTrang() {
switch (trangHienTai) {
case "Quản lý sinh viên":
return <SinhVien />;

  case "Quản lý lớp":
    return (
      <main className="content">
        <h1>Quản lý lớp</h1>
        <p>Chức năng này sẽ được xây dựng sau.</p>
      </main>
    );

case "Quản lý khoa":
  return <Khoa />;
  
  case "Thống kê":
    return (
      <main className="content">
        <h1>Thống kê sinh viên</h1>
        <p>Chức năng này sẽ được xây dựng sau.</p>
      </main>
    );

  case "Cài đặt":
    return (
      <main className="content">
        <h1>Cài đặt</h1>
        <p>Cài đặt hệ thống quản lý sinh viên.</p>
      </main>
    );

  default:
    return (
      <Dashboard
        moTrangSinhVien={() =>
          setTrangHienTai("Quản lý sinh viên")
        }
      />
    );
}

}

return (
<div className="app">
<Header />

  <div className="layout">
    <Sidebar
      trangHienTai={trangHienTai}
      setTrangHienTai={setTrangHienTai}
    />

    {hienThiTrang()}
  </div>

  <Footer />
</div>

);
}

export default App;