// http://svcy.myclass.vn/swagger/ui/index?fbclid=IwAR2XidMqULEpQ0M4AhvSgKU8TXI9IqycOGzsLBYmibL5Wq-wpIG3gyh14sA#/
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
                    <button class="btn btn-danger" onclick="xoaSinhVien('${
                        sinhVien.maSinhVien
                    }')">Xóa</button>
                    <button class="btn btn-danger" onclick="xoaSinhVienIndex('${i}}')">Xóa</button>
                    <button class="btn btn-primary" onclick="suaSinhVien('${
                        sinhVien.maSinhVien
                    }')">Sửa</button>
                </td>
            </tr>
        `;
    }
    document.getElementById("tblSinhVien").innerHTML = noiDung;
}

function getApiSinhVien() {
    let promise = axios({
        url: "http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien",
        method: "GET",
    });

    promise.then(function (result) {
        // console.log(result.data);
        // Gọi hàm từ dữ liệu api tạo ra table
        renderTableSinhVien(result.data);
    });

    promise.catch(function (error) {
        console.log(error);
    });
}

getApiSinhVien();

//Thêm dữ liệu về server
document.querySelector("#btnXacNhan").onclick = function () {
    // Lấy dữ liệu từ ng dùng nhập vào và gán vào obj đúng format backend yêu cầu
    let sinhVien = new SinhVien();

    sinhVien.maSinhVien = document.getElementById("maSinhVien").value;
    sinhVien.tenSinhVien = document.getElementById("tenSinhVien").value;
    sinhVien.loaiSinhVien = document.getElementById("loaiSinhVien").value;
    sinhVien.email = document.getElementById("email").value;
    sinhVien.soDienThoai = document.getElementById("soDienThoai").value;
    sinhVien.diemToan = document.getElementById("diemToan").value;
    sinhVien.diemLy = document.getElementById("diemLy").value;
    sinhVien.diemHoa = document.getElementById("diemHoa").value;
    sinhVien.diemRenLuyen = document.getElementById("diemRenLuyen").value;

    // console.log('sinh vien', sinhVien);
    // Call API đưa dữ liệu về server
    let promise = axios({
        url: "http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien",
        method: "POST",
        data: sinhVien,
    });

    promise.then(function (result) {
        console.log(result.data);
        // Gọi hàm load lại table
        getApiSinhVien();
    });

    promise.catch(function (error) {
        console.log(error.response.data);
    });
};

function xoaSinhVien(maSinhVienClick) {
    let promise = axios({
        url: `http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=${maSinhVienClick}`,
        method: "DELETE",
    });

    promise.then(function (result) {
        console.log(result.data);
        // Gọi hàm load lại table
        getApiSinhVien();
    });

    promise.catch(function (error) {
        console.log(error.response.data);
    });
}

function suaSinhVien(maSinhVien) {
    let promise = axios({
        url: `http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=${maSinhVien}`,
        method: "GET",
    });

    promise.then(function (result) {
        console.log(result.data);
        let svSua = result.data
        // Lấy dữ liệu trả về thành công gán lên các control input
        document.getElementById("maSinhVien").value = svSua.maSinhVien;
        document.getElementById("tenSinhVien").value = svSua.tenSinhVien;
        document.getElementById("loaiSinhVien").value = svSua.loaiSinhVien;
        document.getElementById("email").value = svSua.email;
        document.getElementById("soDienThoai").value = svSua.soDienThoai;
        document.getElementById("diemToan").value = svSua.diemToan;
        document.getElementById("diemLy").value = svSua.diemLy;
        document.getElementById("diemHoa").value = svSua.diemHoa;
        document.getElementById("diemRenLuyen").value = svSua.diemRenLuyen;
        document.getElementById("maSinhVien").disabled = true;
    });

    promise.catch(function (error) {
        console.log(error.response.data);
    });
}

document.querySelector("#btnCapNhat").onclick = function () {
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

    let promise = axios({
        url: `http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=${svUpdate.maSinhVien}`,
        method: "PUT",
        data: svUpdate
    });

    promise.then(function (result) {
        document.getElementById("maSinhVien").disabled = false;
        console.log(result.data);
        // Gọi hàm load lại table
        getApiSinhVien();
    });

    promise.catch(function (error) {
        console.log(error.response.data);
    });
}