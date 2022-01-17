let btnXacNhan = document.getElementById("btnXacNhan");
btnXacNhan.onclick = function () {
    // Input:
    let maSinhVien = document.getElementById("maSinhVien").value;
    let tenSinhVien = document.getElementById("tenSinhVien").value;
    let loaiSinhVien = document.getElementById("loaiSinhVien").value;
    let diemToan = document.getElementById("diemToan").value;
    let diemLy = document.getElementById("diemLy").value;
    let diemHoa = document.getElementById("diemHoa").value;
    let diemRenLuyen = document.getElementById("diemRenLuyen").value;

    console.log(maSinhVien);
    console.log(tenSinhVien);
    console.log(loaiSinhVien);
    console.log(diemToan);
    console.log(diemLy);
    console.log(diemHoa);
    console.log(diemRenLuyen);

    // Output
    document.getElementById("txtTenSinhVien").innerHTML = tenSinhVien;
    document.getElementById("txtMaSinhVien").innerHTML = maSinhVien;
    document.getElementById("txtLoaiSinhVien").innerHTML = loaiSinhVien;

    let dtb = tinhDiemTrungBinh(diemToan, diemLy, diemHoa);
    document.getElementById("txtDiemTrungBinh").innerHTML = dtb;

    let hocLuc = tinhXepLoai(dtb, diemRenLuyen);
    document.getElementById("txtXepLoai").innerHTML = hocLuc;
};

function tinhDiemTrungBinh(dToan, dLy, dHoa) {
    let dtb = (Number(dToan) + Number(dLy) + Number(dHoa)) / 3;
    return dtb;
}

function tinhXepLoai(diemTrungBinh, diemRenLuyen) {
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
}
