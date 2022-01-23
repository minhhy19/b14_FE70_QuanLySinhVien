function SinhVien(maSV, tenSV, loaiSV, email, soDT, dToan, dLy, dHoa, dRenLuyen) {
    this.maSinhVien = maSV;
    this.tenSinhVien = tenSV;
    this.loaiSinhVien = loaiSV;
    this.email = email;
    this.soDienThoai = soDT;
    this.diemToan = dToan;
    this.diemLy = dLy;
    this.diemHoa = dHoa;
    this.diemRenLuyen = dRenLuyen;
    this.tinhDiemTrungBinh = function () {
        let diemTrungBinh =
            (Number(this.diemToan) +
                Number(this.diemLy) +
                Number(this.diemHoa)) /
            3;
        return diemTrungBinh;
    };
    this.xepLoai = function () {
        let diemRenLuyen = this.diemRenLuyen;
        let diemTrungBinh = this.tinhDiemTrungBinh();
        let loaiHocLuc = "";

        if (diemRenLuyen < 5) {
            loaiHocLuc = "Yếu";
            return loaiHocLuc;
        }

        if (diemTrungBinh < 5) {
            loaiHocLuc = "Yếu";
        } else if (diemTrungBinh >= 5 && diemTrungBinh < 6.5) {
            loaiHocLuc = "Trung bình";
        } else if (diemTrungBinh >= 6.5 && diemTrungBinh < 8) {
            loaiHocLuc = "Khá";
        } else if (diemTrungBinh >= 8 && diemTrungBinh <= 10) {
            loaiHocLuc = "Giỏi";
        } else {
            loaiHocLuc = "Không hợp lệ";
        }
        return loaiHocLuc;
    };
}
