let arrSinhVien = [];
let kiemTra = new Validation();

document.getElementById("btnXacNhan").onclick = function () {
    let sinhVien = new SinhVien();
    sinhVien.maSinhVien = document.getElementById("maSinhVien").value;
    sinhVien.tenSinhVien = document.getElementById("tenSinhVien").value;
    sinhVien.email = document.getElementById("email").value;
    sinhVien.soDienThoai = document.getElementById("soDienThoai").value;
    sinhVien.loaiSinhVien = document.getElementById("loaiSinhVien").value;
    sinhVien.diemHoa = document.getElementById("diemHoa").value;
    sinhVien.diemLy = document.getElementById("diemLy").value;
    sinhVien.diemToan = document.getElementById("diemToan").value;
    sinhVien.diemRenLuyen = document.getElementById("diemRenLuyen").value;

    let valid = true;

    //Bắt lỗi trước khi thêm dữ liệu vào bảng
    valid =
        valid &
        kiemTra.kiemTraRong(sinhVien.maSinhVien, "#error_required_maSinhVien") &
        kiemTra.kiemTraRong(
            sinhVien.tenSinhVien,
            "#error_required_tenSinhVien"
        ) &
        kiemTra.kiemTraRong(sinhVien.email, "#error_required_email") &
        kiemTra.kiemTraRong(
            sinhVien.soDienThoai,
            "#error_required_soDienThoai"
        ) &
        kiemTra.kiemTraRong(sinhVien.diemToan, "#error_required_diemToan") &
        kiemTra.kiemTraRong(sinhVien.diemLy, "#error_required_diemLy") &
        kiemTra.kiemTraRong(sinhVien.diemHoa, "#error_required_diemHoa") &
        kiemTra.kiemTraRong(
            sinhVien.diemRenLuyen,
            "#error_required_diemRenLuyen"
        );

    // Kiểm tra định dạng

    valid &=
        kiemTra.kiemTraEmail(sinhVien.email, "#error_regex_email") &
        kiemTra.kiemTraKyTu(sinhVien.tenSinhVien, "#error_regex_tenSinhVien") &
        kiemTra.kiemTraSo(sinhVien.soDienThoai, "#error_regex_soDienThoai");

    // Kiểm tra giá trị
    valid &=
        kiemTra.kiemTraGiaTri(
            sinhVien.diemToan,
            "#error_min_max_diemToan",
            0,
            10
        ) &
        kiemTra.kiemTraGiaTri(sinhVien.diemLy, "#error_min_max_diemLy", 0, 10) &
        kiemTra.kiemTraGiaTri(
            sinhVien.diemHoa,
            "#error_min_max_diemHoa",
            0,
            10
        ) &
        kiemTra.kiemTraGiaTri(
            sinhVien.diemRenLuyen,
            "#error_min_max_diemRenLuyen",
            0,
            10
        );

    // Kiểm tra độ dài
    valid &= kiemTra.kiemTraDoDai(
        sinhVien.maSinhVien,
        "#error_length_maSinhVien",
        4,
        6
    );

    if (!valid) {
        return;
    }

    // Mỗi lần thêm sv sẽ lấy sv lưu vào mảng
    arrSinhVien.push(sinhVien);

    // console.log("arrSinhVien", arrSinhVien);

    renderTableSinhVien(arrSinhVien);

    // Lưu dữ liệu vào localstorage
    luuLocalStorage();
    {
        // // Tạo ra các thẻ trên giao diện
        // let trSinhVien = document.createElement("tr");
        // // Tạo ra các thẻ td chứa nội dung
        // let tdMaSinhVien = document.createElement("td");
        // tdMaSinhVien.innerHTML = sinhVien.maSinhVien;
        // let tdTenSinhVien = document.createElement("td");
        // tdTenSinhVien.innerHTML = sinhVien.tenSinhVien;
        // let tdLoaiSinhVien = document.createElement("td");
        // tdLoaiSinhVien.innerHTML = sinhVien.loaiSinhVien;
        // let tdDiemTrungBinh = document.createElement("td");
        // tdDiemTrungBinh.innerHTML = sinhVien.tinhDiemTrungBinh();
        // let tdDiemRenLuyen = document.createElement("td");
        // tdDiemRenLuyen.innerHTML = sinhVien.diemRenLuyen;
        // // Tạo nút button xóa
        // let btnXoa = document.createElement("button");
        // btnXoa.className = "btn btn-danger";
        // btnXoa.innerHTML = "Xóa";
        // btnXoa.onclick = function () {
        //     // Dom đến thẻ cha chứa button
        //     // let tdChuaButton = btnXoa.parentElement;
        //     // let trSV = tdChuaButton.parentElement;
        //     // trSV.remove();
        //     // Dom đến thẻ gần nhất chứa selector đó
        //     let tr = btnXoa.closest("tr");
        //     tr.remove();
        // };
        // // Tạo td cho nút xóa
        // let tdChucNang = document.createElement("td");
        // tdChucNang.appendChild(btnXoa);
        // // Đưa các thẻ td vào trong thẻ tr
        // trSinhVien.appendChild(tdMaSinhVien);
        // trSinhVien.appendChild(tdTenSinhVien);
        // trSinhVien.appendChild(tdLoaiSinhVien);
        // trSinhVien.appendChild(tdDiemTrungBinh);
        // trSinhVien.appendChild(tdDiemRenLuyen);
        // trSinhVien.appendChild(tdChucNang);
        // // Đưa thẻ tr vào tbody trên giao diện
        // document.getElementById("tblSinhVien").appendChild(trSinhVien);
    }
};

function renderTableSinhVien(arrSV) {
    let noiDung = "";
    for (let i = 0; i < arrSV.length; i++) {
        // Mỗi lần duyệt qua mảng sv => lấy ra 1 sv
        let sv = arrSV[i];
        let sinhVien = new SinhVien(
            sv.maSinhVien,
            sv.tenSinhVien,
            sv.loaiSinhVien,
            sv.email,
            sv.soDienThoai,
            sv.diemToan,
            sv.diemLy,
            sv.diemHoa,
            sv.diemRenLuyen
        );

        // Từ mỗi dữ liệu sv => Tạo ta nội dung thẻ tr và đưa vào chuỗi nội dung
        noiDung += `
            <tr>
                <td>${sinhVien.maSinhVien}</td>
                <td>${sinhVien.tenSinhVien}</td>
                <td>${sinhVien.loaiSinhVien}</td>
                <td>${sinhVien.tinhDiemTrungBinh()}</td>
                <td>${sinhVien.diemRenLuyen}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaSinhVien('${sinhVien.maSinhVien}')">Xóa</button>
                    <button class="btn btn-danger" onclick="xoaSinhVienIndex('${i}}')">Xóa</button>
                    <button class="btn btn-primary" onclick="suaSinhVien('${sinhVien.maSinhVien}')">Sửa</button>
                </td>
            </tr>
        `;
    }
    document.getElementById("tblSinhVien").innerHTML = noiDung;
}

function suaSinhVien(maSinhVienClick) {
    for (let i = 0; i < arrSinhVien.length; i++) {
        let sv = arrSinhVien[i];
        if (sv.maSinhVien === maSinhVienClick) {
            document.getElementById("maSinhVien").value = sv.maSinhVien;
            document.getElementById("tenSinhVien").value = sv.tenSinhVien;
            document.getElementById("loaiSinhVien").value = sv.loaiSinhVien;
            document.getElementById("email").value = sv.email;
            document.getElementById("soDienThoai").value = sv.soDienThoai;
            document.getElementById("diemToan").value = sv.diemToan;
            document.getElementById("diemLy").value = sv.diemLy;
            document.getElementById("diemHoa").value = sv.diemHoa;
            document.getElementById("diemRenLuyen").value = sv.diemRenLuyen;
            document.getElementById("maSinhVien").disabled = true;
        }
    }
}

document.getElementById("btnCapNhat").onclick = function () {
    console.log("ok");
    let svUpdate = new SinhVien();
    svUpdate.maSinhVien = document.getElementById("maSinhVien").value;
    svUpdate.tenSinhVien = document.getElementById("tenSinhVien").value;
    svUpdate.loaiSinhVien = document.getElementById("loaiSinhVien").value;
    svUpdate.email = document.getElementById("email").value;
    svUpdate.soDienThoai = document.getElementById("soDienThoai").value;
    svUpdate.diemToan = document.getElementById("diemToan").value;
    svUpdate.diemLy = document.getElementById("diemLy").value;
    svUpdate.diemHoa = document.getElementById("diemHoa").value;
    svUpdate.diemRenLuyen = document.getElementById("diemRenLuyen").value;

    for (let i = 0; i < arrSinhVien.length; i++) {
        let sinhVienCapNhat = arrSinhVien[i];

        if (sinhVienCapNhat.maSinhVien === svUpdate.maSinhVien) {
            sinhVienCapNhat.tenSinhVien = svUpdate.tenSinhVien;
            sinhVienCapNhat.loaiSinhVien = svUpdate.loaiSinhVien;
            sinhVienCapNhat.email = svUpdate.email;
            sinhVienCapNhat.soDienThoai = svUpdate.soDienThoai;
            sinhVienCapNhat.diemToan = svUpdate.diemToan;
            sinhVienCapNhat.diemLy = svUpdate.diemLy;
            sinhVienCapNhat.diemHoa = svUpdate.diemHoa;
            sinhVienCapNhat.diemRenLuyen = svUpdate.diemRenLuyen;
        }
    }

    document.getElementById("maSinhVien").disabled = false;
    renderTableSinhVien(arrSinhVien);
};

function xoaSinhVienIndex(indexClick) {
    arrSinhVien.splice(indexClick, 1);
    renderTableSinhVien(arrSinhVien);
}

function xoaSinhVien(maSinhVienClick) {
    console.log("maSinhVien", maSinhVienClick);
    // Tìm sv có mã click trong mảng
    for (let i = arrSinhVien.length - 1; i >= 0; i--) {
        // Mỗi lần duyện lấy ra 1 sv
        let sv = arrSinhVien[i];

        if (sv.maSinhVien === maSinhVienClick) {
            // Tại vị trí index này => Thực hiện xóa
            arrSinhVien.splice(i, 1);
        }
    }

    // Gọi lại hàm tạo bảng sau khi xóa dữ liệu
    renderTableSinhVien(arrSinhVien);
}

function luuLocalStorage() {
    //Trước khi lưu biến đổi mảng obj thành chuỗi
    let sMangSV = JSON.stringify(arrSinhVien);

    // Dùng đối tượng localstorage để lưu mảng SV
    localStorage.setItem("mangSinhVien", sMangSV);
}

function layLocalStorage() {
    if (localStorage.getItem("mangSinhVien")) {
        let sMangSinhVien = localStorage.getItem("mangSinhVien"); // Dữ liệu lấy ra là chuỗi

        arrSinhVien = JSON.parse(sMangSinhVien);

        //Gọi hàm tạo bảng sau khi lấy dữ liệu từ storage ra
        renderTableSinhVien(arrSinhVien);
    }
}

layLocalStorage();

document.querySelector('#btnTimKiem').onclick = function () {
    // Lấy từ khóa ng dùng nhập từ giao diện
    let tuKhoa = document.querySelector('#tuKhoa').value;
    tuKhoa = tuKhoa.trim().toLowerCase(); // Biến đổi tất cả ký tự hoa thành thường

    let arrSinhVienTimKiem = [];
    for(let i = 0; i < arrSinhVien.length; i ++) {
        let sinhVien = arrSinhVien[i];
        if (sinhVien.tenSinhVien.toLowerCase().search(tuKhoa) !== -1) {
            arrSinhVienTimKiem.push(sinhVien);
        }
    }
    //Gọi hàm tạo bảng từ mảng sv tìm kiếm
    
    renderTableSinhVien(arrSinhVienTimKiem);
}