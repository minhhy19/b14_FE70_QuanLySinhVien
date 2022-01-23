function Validation() {
    this.kiemTraRong = function (value, selectorError) {
        if (value.trim() === "") {
            document.querySelector(selectorError).innerHTML =
                "Không được bỏ trống!";
            return false;
        }
        document.querySelector(selectorError).innerHTML = "";
        return true;
    };

    this.kiemTraEmail = function (value, selectorError) {
        let regexEmail =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        
        if (regexEmail.test(value)) {
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }

        document.querySelector(selectorError).innerHTML = 'Email không đúng định dạng!';
        return false;
    };

    this.kiemTraKyTu = function(value, selectorError) {
        let regexLetter = /^[A-Z a-z]+$/;
        if (regexLetter.test(value)) {
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = 'Không được chứa số hoặc ký tự đặc biệt';
        return false;
    }

    this.kiemTraSo = function(value, selectorError) {
        let regexNumber = /^[0-9]+$/;
        if (regexNumber.test(value)) {
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = 'Nhập số';
        return false;
    }

    this.kiemTraGiaTri = function(value, selectorError, minValue, maxValue) {
        if (Number(value) > maxValue || Number(value) < minValue) {
            document.querySelector(selectorError).innerHTML = `Giá trị từ ${minValue} - ${maxValue}`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.kiemTraDoDai = function(value, selectorError, minLength, maxLength) {
        if (value.length > maxLength || value.length < minLength) {
            document.querySelector(selectorError).innerHTML = `Gia trị nhập từ ${minLength} - ${maxLength} ký tự`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
}
