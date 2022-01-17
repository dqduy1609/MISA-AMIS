class CommonJS {
    /**
     * Hàm định dạng ngày tháng năm sang ngày/tháng/năm
     * @param {any} date  kiểu dữ liệu bất kỳ
     * CreatedBy: Duy (06/11/2021)
     */
    static formatDate(date) {
        var date = new Date(date)
        if (Number.isNaN(date.getTime())) {
            return ""
        }
        else {
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();

            return day + '/' + month + '/' + year;
        }
    }

    /**
     * Hàm định dạng hiển thị tiền tệ
     * @param {Number} money Số tiền
     * CreatedBy: Duy (06/11/2021)
     */
    static formatMoney(money) {
        if (money) {
            return money.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
        }
        return "";
    }
}



/**
 * Hiện toast message
 * @param {string} toastMessageID 
 * CreatedBy: QuangDuy (09/11/2021)
 */
function showToastMsg(toastMessageID) {
    $(toastMessageID).css('display', 'flex');
    $(toastMessageID).fadeIn(400).delay(3100).fadeOut(400);
}

/**
 * Ẩn toast message
 * CreatedBy: namngQuangDuyuyen (09/11/2021)
 */
function hideToastMsg() {
    $('.m-toast-msg').hide();
}

/**
 * Hiện icon loading trong lúc load
 * CreatedBy: QuangDuy (09/11/2021)
 */
function showIconLoading() {
    $('.m-loading').show();
}

/**
 * Ẩn icon loading sau khi load xong
 * CreatedBy: QuangDuy (09/11/2021)
 */
function hideIconLoading() {
    $('.m-loading').hide();
}


