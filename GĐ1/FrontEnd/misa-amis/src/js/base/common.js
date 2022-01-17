export const Common = {
  /**
   * Định dạng hiển thị thông tin ngày là (ngày/tháng/năm)
   * @param {Date} date 
   * Author: DQDuy (10/12/2021)
   */
  formatDateDDMMYYYY(date) {
    if (date) {
      // debugger
      const thisDate = new Date(date);
      // Định dạng ngày
      let day = thisDate.getDate();
      day = (day < 10 ? `0${day}` : day);
      // Định dạng tháng
      let month = thisDate.getMonth() + 1;
      month = (month < 10 ? `0${month}` : month);
      // Định dạng năm
      let year = thisDate.getFullYear();
      // Kết quả hiển thị theo định dạng ngày/tháng/năm
      return `${day}/${month}/${year}`;
    } else
      return null;
  },

  /**
   * Format dữ liệu để bind vào input date
   * @param {Date} date 
   * @returns {YYY}-{MM}-{DD}
   * Author: DQDuy (10/12/2021)
   */
  formatDateYYYYMMDD(date) {
    if (date) {
      // debugger
      const thisDate = new Date(date);
      // Định dạng ngày
      let day = thisDate.getDate();
      day = (day < 10 ? `0${day}` : day);
      // Định dạng tháng
      let month = thisDate.getMonth() + 1;
      month = (month < 10 ? `0${month}` : month);
      // Định dạng năm
      let year = thisDate.getFullYear();
      // Kết quả hiển thị theo định dạng ngày/tháng/năm
      return `${year}-${month}-${day}`;
    } else
      return null;
  },


  /**
   * Format dữ liệu giới tính
   * @param {String} val 
   * @returns Male, Female, Other
   * CreatedBy: DQDuy (23/12/2021)
   */
  formatGender(val) {
    var result = "";
    if (val == "") {
      result = "";
    }
    if (val == "Other") {
      result = "2";
    }
    if (val == "Female") {
      result = "1";
    }
    if (val == "Male") {
      result = "0";
    }
    return result;
  },

  /**
   * Định dạng hiển thị tiền tệ theo VNĐ
   * @param {string} money 
   * Author: DQDuy (10/12/2021)
   */
  formatMoneyVND(money) {
    if (money) {
      return new Intl.NumberFormat('vi-VN', {
        style: `currency`,
        currency: 'VND'
      }).format(money);
    } else
      return '';
  },

  /**
   * Xóa highlight của người dùng trên trang web
   * Author: DQDuy (10/12/2021)
   */
  clearSelection() {
    if (document.selection && document.selection.empty) {
      document.selection.empty();
    } else if (window.getSelection) {
      var sel = window.getSelection();
      sel.removeAllRanges();
    }
  },

  /**
   * Hiển thị toast message
   * @param {object} toastMsg 
   * Author: DQDuy (10/12/2021)
   */
  toastMsgPopup(toastMsg) {
    if (toastMsg) {
      $(toastMsg).fadeIn(3000);
      setTimeout(() => {
        $(toastMsg).fadeOut(3000);
      }, 3000);
    }
  }
}

