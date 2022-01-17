class BaseJS {
    FormMode = null;
    PrimaryKey = null;
    constructor() {
        this.host = "http://cukcuk.manhnv.net";
        this.apiRouter = null;
        this.setApiRouter();
        this.innitEvent();
    }

    /** 
    * Router Api tương ứng
    * createdBy: QuangDuy
    */
    setApiRouter() {

    }

    /**
     * Xử lý sự kiện
     * createdBy: QuangDuy
     */
    innitEvent() {

        var me = this;

        // sự kiện click khi bấm nút thêm mới
        $('#btnAdd').click(me.btnAddOnClick.bind(me));

        // sự kiện click khi bấm nút re-fresh
        $('#btnRefresh').click(function () {
            me.loadData();
        });

        // sự kiện click khi bấm nút cancel
        $('#btnCancel').click(me.btnCancelOnClick.bind(me));

        // sự kiện khi ấn nút lưu
        $('#btnSave').click(me.btnSaveOnClick.bind(me));

        // sự kiện double click vào từng bản ghi
        $('table tbody').on('dblclick', 'tr', me.trOndblClick.bind(me));

        // sự kiện click vào từng bản ghi 
        $('table tbody').on('click', 'tr', me.rowOnClick.bind(me));

        // sự kiện click khi bấm xác nhận xoá
        $('#btnDeleteRecord').click(me.btnDeleteOnClick.bind(me));

        // sự kiện khi bấm vào icon delete
        $('#btnDeleteIcon').click(function () {
            if (me.selectedRecordId) {
                $('#dlgPopup').show();
            }
            else {
                alert('Vui lòng chọn một bản ghi bằng cách click vào một dòng của bảng dữ liệu !!')
            }
        });


        /**
         * Validate những trường bắt buộc nhập
         * createdBy: QuangDuy 
         */
        $('input[required]').blur(function () {
            var value = $(this).val();
            if (!value) {
                $(this).addClass('m-input-error');
                $(this).attr('title', 'Trường này không được để trống');
                $(this).attr('validate', false);
            } else {
                $(this).removeClass('m-input-error');
                $(this).attr('validate', true);
            }

        })

        /**
         * Validate email
         * createdBy: QuangDuy
         */
        $('input[type="email"]').blur(function () {
            var value = $(this).val();
            var testEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!testEmail.test(value)) {
                $(this).addClass('m-input-error');
                $(this).attr('title', 'Email không hợp lệ');
                $(this).attr('validate', false);
            } else {
                $(this).removeClass('m-input-error');
                $(this).attr('validate', true);
            }
        });
    }

    /**
    * Load dữ liệu
    * createdBy: QuangDuy
    */
    loadData() {
        try {
            var me = this;
            showIconLoading();
            $('table tbody').empty();
            var columns = $('table thead th');
            var getDataUrl = this.getDataUrl;

            /* Gọi Api phương thức GET */
            $.ajax({
                type: "get",
                url: me.host + me.apiRouter,
                async: true,
                success: function (response) {
                    if (response.length > 0) {
                        $.each(response, function (index, obj) {
                            var tr = $(`<tr></tr>`);
                            $(tr).data('recordId', obj[me.PrimaryKey]);
                            $.each(columns, function (index, column) {
                                var td = $(`<td></td>`);
                                var fieldName = $(column).attr('fieldName');
                                var value = obj[fieldName];
                                var formatType = $(column).attr('formatType');
                                switch (formatType) {
                                    case "ddMMyyyy":
                                        value = CommonJS.formatDate(value);
                                        td.addClass("m-text-center");
                                        break;
                                    case "currency":
                                        value = CommonJS.formatMoney(value);
                                        td.addClass("m-text-right");
                                        break;
                                    default:
                                        break;
                                }
                                td.append(value);
                                $(tr).append(td);
                            });
                            $('table tbody').append(tr);
                        });
                    }
                    hideIconLoading();
                }, error: function (res) {
                    console.log(res);
                    hideIconLoading();
                    showToastMsg('#toastError');
                }
            });

        } catch (error) {
            hideIconLoading();
            alert("Có lỗi sảy ra khi tải dữ liệu");
        }
    }

    /**
     * Load dữ liệu cho combobox
     * createdBy: QuangDuy (19/11/2021)
     */
    loadComboboxData() {
        var me = this;
        var selects = $('div[displayValues]');

        $.each(selects, function (index, select) {
            // lấy thuộc tính "api"
            var api = $(select).attr('api');
            // lấy thuộc tính "fieldname"
            var fieldName = $(select).attr('fieldName');
            // lấy thuộc tính "displayValues"
            var displayValues = $(select).attr('displayValues');
            if (api) {
                $.ajax({
                    type: "get",
                    url: me.host + api,
                    async: false,
                    success: function (response) {
                        if (response) {
                            $.each(response, function (index, obj) {
                                let optionHTML = `<div class="m-combobox-item" value="${obj[fieldName]}">${obj[displayValues]}</div>`;
                                $(select).children('.m-combobox-data').append(optionHTML);
                            });
                        }
                    }
                });
            }
        });
    }

    /**
     * Hàm xử lý khi bấm vào nút thêm mới
     * createdBy: QuangDuy 
     */
    btnAddOnClick() {
        try {
            var me = this;
            me.FormMode = Enum.FormMode.Add;
            this.loadComboboxData();
            // gọi api NewEmployeeCode để tự động sinh ra mã nhân viên
            $.ajax({
                type: "get",
                url: "http://cukcuk.manhnv.net/api/v1/Employees/NewEmployeeCode",
                success: function (response) {
                    $('#txtEmployeeCode').val(response);
                    $('#txtEmployeeCode').focus();
                }
            });
            $('#addEmployeedialog').show();
            $('#overlay').show();
        } catch (error) {
            console.log(error);
            alert("Có lỗi sảy ra khi thực hiện thao tác này");
            $('#addEmployeedialog').hide();
            $('#overlay').hide();
        }
    }

    /**
    * Double click vào từng bản ghi, hiện nên form chi tiết --> chỉnh sửa nhân viên
    * createdBy: QuangDuy 
    */
    trOndblClick(sender) {
        try {
            var me = this;
            me.FormMode = Enum.FormMode.Update;
            let currentRow = sender.currentTarget;
            var recordId = $(currentRow).data('recordId');
            me.recordId = recordId;
            $('#addEmployeedialog').show();
            $('#overlay').show();

            $(currentRow).find('td').addClass('selected-row');
            me.loadComboboxData();

            // load dữ liệu cho ô input
            // gọi api get employee theo id
            $.ajax({
                type: "get",
                url: me.host + me.apiRouter + `/${recordId}`,
                success: function (response) {
                    // binding dữ liệu
                    var inputs = $('input[fieldName], div[fieldName]');
                    $.each(inputs, function (index, input) {
                        var propertyName = $(this).attr('fieldName');
                        var displayValues = $(this).attr('displayvalues');
                        if (displayValues != null) {
                            var comboboxData = $(this).children('div.m-combobox-data');
                            console.log(this);
                            var comboboxItems = comboboxData.children();
                            console.log(comboboxData);
                            console.log(comboboxData.parent());
                            $.each(comboboxItems, function (index, comboboxItem) {
                                if (comboboxItem.getAttribute('value') == response[propertyName]) {
                                    var textContent = this.textContent;
                                    comboboxData.siblings('input').val(textContent);
                                    let parentComboboxData = comboboxData.parent();
                                    parentComboboxData.data('value', response[propertyName]);
                                }
                            });
                            $(this).attr('value', response[propertyName]);
                        }
                        else {
                            var value = response[propertyName];
                            if (propertyName == "Salary") {
                                var value = CommonJS.formatMoney(response[propertyName]);
                            }
                            $(this).val(value);
                            if (this.type == "date" && value != null) {
                                var dateValue = value.substring(0, 10);
                                $(this).val(dateValue);
                            }
                        }
                    });
                }
            });
        } catch (error) {
            console.log(error);
            alert("Có lỗi sảy ra khi tải dữ liệu");
        }
    }

    /**
    * Click chọn một bản ghi
    * createdBy: QuangDuy 
    */
    rowOnClick(sender) {
        var currentRow = sender.currentTarget;
        var recordId = $(currentRow).data('recordId');
        this.selectedRecordId = recordId;
        $(currentRow).siblings().removeClass('m-row-selected');
        $(currentRow).addClass('m-row-selected');
    }

    /**
     * Lưu một bản ghi
     * createdBy: QuangDuy
     */
    btnSaveOnClick() {
        try {

            var me = this;
            // validate dữ liệu
            var inputValidates = $('input[required], input[type="email"]');
            $.each(inputValidates, function (index, input) {
                $(input).trigger('blur');
            });
            var inputNotValids = $('input[validate="false"]');
            if (inputNotValids && inputNotValids.length > 0) {
                alert('Dữ liệu không hợp lệ vui lòng kiểm tra lại');
                inputNotValids[0].focus();
                return;
            }

            var inputs = $('input[fieldName], div[fieldName]');

            var obj = {};
            $.each(inputs, function (index, input) {
                var propertyName = $(this).attr('fieldName');

                var value = $(this).val();

                if (propertyName == "Salary") {
                    value = Number(value.replaceAll(".", ""));
                }

                var displayValues = $(this).attr('displayValues');

                if (displayValues != null) {
                    value = $(this).data('value');
                    var nameSelectedItem = $(this).attr('nameSelectedItem');
                    obj[displayValues] = nameSelectedItem;
                    obj[propertyName] = value;
                }
                else {
                    obj[propertyName] = value;
                }
            });

            var method = null;
            var url = null;
            if (me.FormMode == Enum.FormMode.Update) {
                method = "PUT";
                obj[me.PrimaryKey] = me.recordId;
                url = me.host + me.apiRouter + `/${obj[me.PrimaryKey]}`;
            }
            else {
                method = "POST";
                url = me.host + me.apiRouter;
            }
            $.ajax({
                type: method,
                url: url,
                data: JSON.stringify(obj),
                dataType: "json",
                contentType: "application/json",
                success: function (response) {
                    console.log(response);
                    if (me.FormMode == Enum.FormMode.Update) {
                        showToastMsg('#toastUpdate');
                    }
                    else {
                        showToastMsg('#toastAdd');
                    }
                    me.loadData();
                },
                error: function (res) {
                    console.log(res);
                    showToastMsg('#toastError');
                }
            });
            me.btnCancelOnClick();
        } catch (error) {
            console.log(error);
            alert("Có lỗi khi tải dữ liệu");
        }
    }

    /**
     * Ấn vào đóng hoặc cancel form chi tiết nhân viên
     * createdBy: QuangDuy
     */
    btnCancelOnClick() {
        $("#addEmployeedialog input").val("");
        $("#addEmployeedialog input").removeClass('m-input-error');
        $('div[api]').children('.m-combobox-data').empty();
        $('div[api]').data('value', null);
        $('#addEmployeedialog').hide();
        $('#overlay').hide();
    }

    /**
    * Ấn xác nhận xoá ghi dialog hiện lên
    * createdBy: QuangDuy
    */
    btnDeleteOnClick() {
        try {
            var me = this;
            var selectedRecordId = me.selectedRecordId;
            $.ajax({
                type: "delete",
                url: me.host + me.apiRouter + `/${selectedRecordId}`,
                success: function (response) {
                    showToastMsg('#toastDelete');
                    me.loadData();
                }
            });
            $('#dlgPopup').hide();
        } catch (error) {
            console.log(error);
            alert("Có lỗi sảy ra khi thực hiện thao tác này !")
        }
    }
}