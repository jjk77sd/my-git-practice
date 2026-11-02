import React, { useState } from "react";

function Khoa() {
  const [danhSachKhoa, setDanhSachKhoa] = useState(() => {
    return JSON.parse(localStorage.getItem("danhSachKhoa") || "[]");
  });

  const [maKhoa, setMaKhoa] = useState("");
  const [tenKhoa, setTenKhoa] = useState("");
  const [truongKhoa, setTruongKhoa] = useState("");
  const [tuKhoa, setTuKhoa] = useState("");
  const [maKhoaSua, setMaKhoaSua] = useState("");

  // Lưu danh sách khoa
  function luuDuLieu(danhSachMoi) {
    setDanhSachKhoa(danhSachMoi);

    localStorage.setItem(
      "danhSachKhoa",
      JSON.stringify(danhSachMoi)
    );
  }

  // Làm mới form
  function lamMoi() {
    setMaKhoa("");
    setTenKhoa("");
    setTruongKhoa("");
    setMaKhoaSua("");
  }

  // Thêm hoặc cập nhật khoa
  function themKhoa(e) {
    e.preventDefault();

    if (
      maKhoa.trim() === "" ||
      tenKhoa.trim() === "" ||
      truongKhoa.trim() === ""
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    // Kiểm tra mã khoa trùng
    const maDaTonTai = danhSachKhoa.some(
      (khoa) =>
        khoa.maKhoa.toLowerCase() ===
          maKhoa.trim().toLowerCase() &&
        khoa.maKhoa !== maKhoaSua
    );

    if (maDaTonTai) {
      alert("Mã khoa đã tồn tại!");
      return;
    }

    let danhSachMoi;

    if (maKhoaSua !== "") {
      // Cập nhật khoa
      danhSachMoi = danhSachKhoa.map((khoa) =>
        khoa.maKhoa === maKhoaSua
          ? {
              ...khoa,
              tenKhoa: tenKhoa.trim(),
              truongKhoa: truongKhoa.trim(),
            }
          : khoa
      );

      alert("Cập nhật khoa thành công!");
    } else {
      // Thêm khoa mới
      danhSachMoi = [
        ...danhSachKhoa,
        {
          maKhoa: maKhoa.trim(),
          tenKhoa: tenKhoa.trim(),
          truongKhoa: truongKhoa.trim(),
        },
      ];

      alert("Thêm khoa thành công!");
    }

    luuDuLieu(danhSachMoi);
    lamMoi();
  }

  // Chọn khoa cần sửa
  function suaKhoa(khoa) {
    setMaKhoa(khoa.maKhoa);
    setTenKhoa(khoa.tenKhoa);
    setTruongKhoa(khoa.truongKhoa);
    setMaKhoaSua(khoa.maKhoa);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Xóa khoa
  function xoaKhoa(ma) {
    const xacNhan = window.confirm(
      "Bạn có chắc muốn xóa khoa này?"
    );

    if (!xacNhan) {
      return;
    }

    const danhSachMoi = danhSachKhoa.filter(
      (khoa) => khoa.maKhoa !== ma
    );

    luuDuLieu(danhSachMoi);

    if (maKhoaSua === ma) {
      lamMoi();
    }

    alert("Đã xóa khoa!");
  }

  // Tìm kiếm khoa
  const danhSachTimDuoc = danhSachKhoa.filter((khoa) =>
    `${khoa.maKhoa} ${khoa.tenKhoa} ${khoa.truongKhoa}`
      .toLowerCase()
      .includes(tuKhoa.trim().toLowerCase())
  );

  return (
    <main className="content">
      <h1>Quản lý khoa</h1>

      <p className="subtitle">
        Quản lý thông tin các khoa trong trường.
      </p>

      {/* Form thêm và sửa khoa */}
      <section className="welcome khoa-form">
        <h2>
          {maKhoaSua ? "Cập nhật khoa" : "Thêm khoa mới"}
        </h2>

        <form onSubmit={themKhoa}>
          <div className="sv-form-grid">
            <div>
              <label>Mã khoa</label>
              <input
                type="text"
                value={maKhoa}
                onChange={(e) => setMaKhoa(e.target.value)}
                placeholder="Ví dụ: CNTT"
                disabled={maKhoaSua !== ""}
              />
            </div>

            <div>
              <label>Tên khoa</label>
              <input
                type="text"
                value={tenKhoa}
                onChange={(e) => setTenKhoa(e.target.value)}
                placeholder="Ví dụ: Công nghệ thông tin"
              />
            </div>

            <div>
              <label>Trưởng khoa</label>
              <input
                type="text"
                value={truongKhoa}
                onChange={(e) => setTruongKhoa(e.target.value)}
                placeholder="Nhập tên trưởng khoa"
              />
            </div>
          </div>

          <div className="khoa-buttons">
            <button type="submit" className="sv-btn-luu">
              {maKhoaSua ? "Lưu thay đổi" : "Thêm khoa"}
            </button>

            <button
              type="button"
              className="khoa-btn-reset"
              onClick={lamMoi}
            >
              Làm mới
            </button>
          </div>
        </form>
      </section>

      {/* Danh sách khoa */}
      <section className="welcome khoa-list">
        <h2>Danh sách khoa</h2>

        <input
          type="text"
          className="khoa-search"
          value={tuKhoa}
          onChange={(e) => setTuKhoa(e.target.value)}
          placeholder="Tìm theo mã khoa, tên khoa hoặc trưởng khoa..."
        />

        <div className="sv-bang">
          <table className="khoa-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã khoa</th>
                <th>Tên khoa</th>
                <th>Trưởng khoa</th>
                <th>Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {danhSachTimDuoc.map((khoa, index) => (
                <tr key={khoa.maKhoa}>
                  <td>{index + 1}</td>
                  <td>{khoa.maKhoa}</td>
                  <td>{khoa.tenKhoa}</td>
                  <td>{khoa.truongKhoa}</td>

                  <td>
                    <button
                      type="button"
                      className="sv-btn-sua"
                      onClick={() => suaKhoa(khoa)}
                    >
                      Sửa
                    </button>

                    <button
                      type="button"
                      className="sv-btn-xoa"
                      onClick={() => xoaKhoa(khoa.maKhoa)}
                      style={{ marginLeft: "8px" }}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}

              {danhSachTimDuoc.length === 0 && (
                <tr>
                  <td colSpan="5" className="khoa-empty">
                    {tuKhoa
                      ? "Không tìm thấy khoa phù hợp."
                      : "Chưa có khoa nào. Hãy thêm khoa mới!"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="khoa-count">
          Tổng số khoa: <strong>{danhSachKhoa.length}</strong>
        </p>
      </section>
    </main>
  );
}

export default Khoa;