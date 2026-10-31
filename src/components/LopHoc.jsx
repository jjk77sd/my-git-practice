import React, { useState } from "react";

function LopHoc() {
  const [danhSachLop, setDanhSachLop] = useState(() => {
    return JSON.parse(localStorage.getItem("danhSachLop") || "[]");
  });

  const [maLop, setMaLop] = useState("");
  const [tenLop, setTenLop] = useState("");
  const [khoaHoc, setKhoaHoc] = useState("");
  const [maLopSua, setMaLopSua] = useState("");
  const [tuKhoa, setTuKhoa] = useState("");

  function luuDuLieu(danhSachMoi) {
    setDanhSachLop(danhSachMoi);

    localStorage.setItem(
      "danhSachLop",
      JSON.stringify(danhSachMoi)
    );
  }

  function lamMoi() {
    setMaLop("");
    setTenLop("");
    setKhoaHoc("");
    setMaLopSua("");
  }

  function themLop(e) {
    e.preventDefault();

    if (
      maLop.trim() === "" ||
      tenLop.trim() === "" ||
      khoaHoc.trim() === ""
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const maDaTonTai = danhSachLop.some(
      (lop) =>
        lop.maLop.toLowerCase() === maLop.trim().toLowerCase() &&
        lop.maLop !== maLopSua
    );

    if (maDaTonTai) {
      alert("Mã lớp đã tồn tại!");
      return;
    }

    let danhSachMoi;

    if (maLopSua !== "") {
      danhSachMoi = danhSachLop.map((lop) =>
        lop.maLop === maLopSua
          ? {
              maLop: lop.maLop,
              tenLop: tenLop.trim(),
              khoaHoc: khoaHoc.trim(),
            }
          : lop
      );

      alert("Cập nhật lớp thành công!");
    } else {
      danhSachMoi = [
        ...danhSachLop,
        {
          maLop: maLop.trim(),
          tenLop: tenLop.trim(),
          khoaHoc: khoaHoc.trim(),
        },
      ];

      alert("Thêm lớp thành công!");
    }

    luuDuLieu(danhSachMoi);
    lamMoi();
  }

  function suaLop(lop) {
    setMaLop(lop.maLop);
    setTenLop(lop.tenLop);
    setKhoaHoc(lop.khoaHoc);
    setMaLopSua(lop.maLop);
  }

  function xoaLop(ma) {
    const xacNhan = window.confirm(
      "Bạn có chắc muốn xóa lớp này?"
    );

    if (!xacNhan) {
      return;
    }

    const danhSachMoi = danhSachLop.filter(
      (lop) => lop.maLop !== ma
    );

    luuDuLieu(danhSachMoi);

    if (maLopSua === ma) {
      lamMoi();
    }
  }

  const danhSachTimDuoc = danhSachLop.filter((lop) =>
    `${lop.maLop} ${lop.tenLop} ${lop.khoaHoc}`
      .toLowerCase()
      .includes(tuKhoa.toLowerCase())
  );

  return (
    <main className="content">
      <h1>Quản lý lớp</h1>

      <p className="subtitle">
        Quản lý thông tin các lớp học trong trường.
      </p>

      <section className="welcome">
        <h2>
          {maLopSua ? "Cập nhật lớp học" : "Thêm lớp học mới"}
        </h2>

        <form onSubmit={themLop}>
          <div className="sv-form-grid">
            <div>
              <label>Mã lớp</label>
              <input
                value={maLop}
                onChange={(e) => setMaLop(e.target.value)}
                placeholder="Ví dụ: 20TH1"
                disabled={maLopSua !== ""}
              />
            </div>

            <div>
              <label>Tên lớp</label>
              <input
                value={tenLop}
                onChange={(e) => setTenLop(e.target.value)}
                placeholder="Ví dụ: Công nghệ thông tin 1"
              />
            </div>

            <div>
              <label>Khóa học</label>
              <input
                value={khoaHoc}
                onChange={(e) => setKhoaHoc(e.target.value)}
                placeholder="Ví dụ: Khóa 20"
              />
            </div>
          </div>

          <button type="submit" className="sv-btn-luu">
            {maLopSua ? "Lưu thay đổi" : "Thêm lớp"}
          </button>

          <button
            type="button"
            className="sv-btn-xoa"
            onClick={lamMoi}
            style={{ marginLeft: "10px" }}
          >
            Làm mới
          </button>
        </form>
      </section>

      <section className="welcome" style={{ marginTop: "25px" }}>
        <h2>Danh sách lớp học</h2>

        <input
          value={tuKhoa}
          onChange={(e) => setTuKhoa(e.target.value)}
          placeholder="Tìm theo mã lớp, tên lớp hoặc khóa học..."
          style={{ width: "100%", marginBottom: "20px" }}
        />

        <div className="sv-bang">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã lớp</th>
                <th>Tên lớp</th>
                <th>Khóa học</th>
                <th>Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {danhSachTimDuoc.map((lop, index) => (
                <tr key={lop.maLop}>
                  <td>{index + 1}</td>
                  <td>{lop.maLop}</td>
                  <td>{lop.tenLop}</td>
                  <td>{lop.khoaHoc}</td>
                  <td>
                    <button
                      type="button"
                      className="sv-btn-sua"
                      onClick={() => suaLop(lop)}
                    >
                      Sửa
                    </button>

                    <button
                      type="button"
                      className="sv-btn-xoa"
                      onClick={() => xoaLop(lop.maLop)}
                      style={{ marginLeft: "8px" }}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}

              {danhSachTimDuoc.length === 0 && (
                <tr>
                  <td colSpan="5">Chưa có lớp học nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default LopHoc;