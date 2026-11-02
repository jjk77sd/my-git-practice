import { useState, useEffect } from "react";

function SinhVien() {
  // Danh sách sinh viên
  const [danhSach, setDanhSach] = useState(() => {
    const data = localStorage.getItem("danhSachSinhVien");
    return data ? JSON.parse(data) : [];
  });

  // Thông tin nhập vào
  const [maSV, setMaSV] = useState("");
  const [hoTen, setHoTen] = useState("");
  const [lop, setLop] = useState("");
  const [email, setEmail] = useState("");

  // Từ khóa tìm kiếm
  const [tuKhoa, setTuKhoa] = useState("");

  // Mã sinh viên đang được chỉnh sửa
  const [maDangSua, setMaDangSua] = useState("");

  // Lưu danh sách vào localStorage
  useEffect(() => {
    localStorage.setItem(
      "danhSachSinhVien",
      JSON.stringify(danhSach)
    );
  }, [danhSach]);

  // Thêm hoặc cập nhật sinh viên
  function xuLyLuu() {
    if (!maSV.trim() || !hoTen.trim() || !lop.trim()) {
      alert("Vui lòng nhập mã sinh viên, họ tên và lớp!");
      return;
    }

    if (maDangSua === "") {
      // Kiểm tra mã sinh viên đã tồn tại chưa
      const daTonTai = danhSach.some(
        (sv) => sv.maSV.toLowerCase() === maSV.trim().toLowerCase()
      );

      if (daTonTai) {
        alert("Mã sinh viên đã tồn tại!");
        return;
      }

      const sinhVienMoi = {
        maSV: maSV.trim(),
        hoTen: hoTen.trim(),
        lop: lop.trim(),
        email: email.trim(),
      };

      setDanhSach([...danhSach, sinhVienMoi]);
      alert("Thêm sinh viên thành công!");
    } else {
      const danhSachMoi = danhSach.map((sv) => {
        if (sv.maSV === maDangSua) {
          return {
            ...sv,
            maSV: maSV.trim(),
            hoTen: hoTen.trim(),
            lop: lop.trim(),
            email: email.trim(),
          };
        }

        return sv;
      });

      // Không cho phép trùng mã sinh viên khi sửa
      const biTrung = danhSachMoi.some(
        (sv) =>
          sv.maSV.toLowerCase() === maSV.trim().toLowerCase() &&
          sv !== danhSachMoi.find((item) => item.maSV === maSV.trim())
      );

      if (biTrung) {
        alert("Mã sinh viên đã tồn tại!");
        return;
      }

      setDanhSach(danhSachMoi);
      alert("Cập nhật sinh viên thành công!");
    }

    lamMoi();
  }

  // Xóa nội dung biểu mẫu
  function lamMoi() {
    setMaSV("");
    setHoTen("");
    setLop("");
    setEmail("");
    setMaDangSua("");
  }

  // Hiển thị thông tin để sửa
  function xuLySua(sv) {
    setMaDangSua(sv.maSV);
    setMaSV(sv.maSV);
    setHoTen(sv.hoTen);
    setLop(sv.lop);
    setEmail(sv.email);
  }

  // Xóa sinh viên
  function xuLyXoa(ma) {
    const xacNhan = window.confirm(
      "Bạn có chắc muốn xóa sinh viên này không?"
    );

    if (xacNhan) {
      setDanhSach(danhSach.filter((sv) => sv.maSV !== ma));

      if (maDangSua === ma) {
        lamMoi();
      }
    }
  }

  // Tìm kiếm sinh viên
  const danhSachHienThi = danhSach.filter((sv) => {
    const tuKhoaNho = tuKhoa.toLowerCase();

    return (
      sv.maSV.toLowerCase().includes(tuKhoaNho) ||
      sv.hoTen.toLowerCase().includes(tuKhoaNho) ||
      sv.lop.toLowerCase().includes(tuKhoaNho)
    );
  });

  return (
    <div className="sv-container">
      <h1>Quản lý sinh viên</h1>

      <p className="sv-mo-ta">
        Thêm, sửa, xóa và tìm kiếm thông tin sinh viên.
      </p>

      <div className="sv-thong-ke">
        <div className="sv-the">
          <h3>Tổng sinh viên</h3>
          <p>{danhSach.length}</p>
        </div>

        <div className="sv-the">
          <h3>Số lớp</h3>
          <p>{new Set(danhSach.map((sv) => sv.lop)).size}</p>
        </div>
      </div>

      <div className="sv-khung">
        <h2>{maDangSua ? "Cập nhật sinh viên" : "Thêm sinh viên"}</h2>

        <div className="sv-form">
          <div>
            <label>Mã sinh viên</label>
            <input
              type="text"
              value={maSV}
              onChange={(e) => setMaSV(e.target.value)}
              disabled={maDangSua !== ""}
              placeholder="Ví dụ: SV001"
            />
          </div>

          <div>
            <label>Họ và tên</label>
            <input
              type="text"
              value={hoTen}
              onChange={(e) => setHoTen(e.target.value)}
              placeholder="Nhập họ tên"
            />
          </div>

          <div>
            <label>Lớp</label>
            <input
              type="text"
              value={lop}
              onChange={(e) => setLop(e.target.value)}
              placeholder="Ví dụ: 20TH1"
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
            />
          </div>
        </div>

        <div className="sv-nut">
          <button className="sv-btn-luu" onClick={xuLyLuu}>
            {maDangSua ? "Cập nhật" : "Thêm sinh viên"}
          </button>

          <button className="sv-btn-moi" onClick={lamMoi}>
            Làm mới
          </button>
        </div>
      </div>

      <div className="sv-khung">
        <h2>Danh sách sinh viên</h2>

        <input
          className="sv-tim-kiem"
          type="text"
          placeholder="Tìm theo mã sinh viên, họ tên hoặc lớp..."
          value={tuKhoa}
          onChange={(e) => setTuKhoa(e.target.value)}
        />

        <div className="sv-bang">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã sinh viên</th>
                <th>Họ và tên</th>
                <th>Lớp</th>
                <th>Email</th>
                <th>Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {danhSachHienThi.length === 0 ? (
                <tr>
                  <td colSpan="6" className="sv-trong">
                    Chưa có sinh viên nào.
                  </td>
                </tr>
              ) : (
                danhSachHienThi.map((sv, index) => (
                  <tr key={sv.maSV}>
                    <td>{index + 1}</td>
                    <td>{sv.maSV}</td>
                    <td>{sv.hoTen}</td>
                    <td>{sv.lop}</td>
                    <td>{sv.email || "Chưa có"}</td>
                    <td>
                      <button
                        className="sv-btn-sua"
                        onClick={() => xuLySua(sv)}
                      >
                        Sửa
                      </button>

                      <button
                        className="sv-btn-xoa"
                        onClick={() => xuLyXoa(sv.maSV)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SinhVien;