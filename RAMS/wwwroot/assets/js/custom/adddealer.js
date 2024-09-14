$(document).ready(function () {
    if ($('#hd_DealerID').val() > 0) {
        GetDealerByID($('#hd_DealerID').val());
    }
    let regddl = GetDropDownList('', 'AllRegion');
    $('#ddlRegion').html(regddl);
    $('#ddlRegion').on('change', function () {
        if ($('#ddlRegion').val() > 0) {
            let stateddl = GetDropDownList($('#ddlRegion').val(), 'State');
            $('#ddlState').html(stateddl);
        }
        else {
            $('#ddlState').html('<option value="0">-- Select --</option>');
            $('#ddlCity').html('<option value="0">-- Select --</option>');
            $('#ddlArea').html('<option value="0">-- Select --</option>');
        }
    });

    $('#ddlState').on('change', function () {
        if ($('#ddlState').val() > 0) {
            let cityddl = GetDropDownList($('#ddlState').val(), 'City');
            $('#ddlCity').html(cityddl);
        }
        else {
            $('#ddlCity').html('<option value="0">-- Select --</option>');
            $('#ddlArea').html('<option value="0">-- Select --</option>');
        }
    });
    $('#ddlCity').on('change', function () {
        if ($('#ddlCity').val() > 0) {
            let areaddl = GetDropDownList($('#ddlCity').val(), 'Area');
            $('#ddlArea').html(areaddl);
        }
        else {
            $('#ddlArea').html('<option value="0">-- Select --</option>');
        }
    });
    let dtype = GetDropDownList('', 'DealerType');
    $('#ddlDealerType').html(dtype);
    let dcat = GetDropDownList('', 'DealerCategory');
    $('#ddlDealerCategory').html(dcat);
    let empddl = GetMultipleSelectDropDownList('', 'Employee');
    $('#ddlUserID').html(empddl);
    $('.applyselect').select2();
    $('#btn_Submit').on('click', function () {
        ExecuteDealer();
    });
    loader_hide();
});
function ExecuteDealer() {
    let obj = {};
    obj.DealerID = $('#hd_DealerID').val();
    obj.DealerCode = $('#txtDealerCode').val();
    obj.DealerName = $('#txtDealerName').val();
    obj.DealerTypeID = $('#ddlDealerType').val();
    obj.DealerCategoryID = $('#ddlDealerCategory').val();
    obj.RegionID = $('#ddlRegion').val();
    obj.StateID = $('#ddlState').val();
    obj.CityID = $('#ddlCity').val();
    obj.AreaID = $('#ddlArea').val();
    obj.PinCode = $('#txtPinCode').val();
    obj.EmailID = $('#txtEmailID').val();
    obj.Phone = $('#txtPhone').val();
    obj.Latitude = $('#txtLatitude').val();
    obj.Longitude = $('#txtLongitude').val();
    obj.BillingCode = $('#txtBillingCode').val();
    obj.BillingName = $('#txtBillingName').val();
    obj.Address = $('#txtAddress').val();
    obj.UserID = $('#ddlUserID').val();
    obj.Proc = "spu_SetPJP_Plan";
    let isValid = 1;
    isValid = elmToastValidate('txtDealerCode', 'text', 'Please Enter Dealer Code');
    if (isValid == 1) {
        isValid = elmToastValidate('txtDealerName', 'text', 'Please Enter Dealer Name');
    }
    if (isValid == 1) {
        isValid = elmToastValidate('ddlDealerType', 'select', 'Please Select Dealer Type');
    }
    if (isValid == 1) {
        isValid = elmToastValidate('ddlDealerCategory', 'select', 'Please Select Dealer Category');
    }
    if (isValid == 1) {
        isValid = elmToastValidate('ddlRegion', 'select', 'Please Select Region');
    }
    if (isValid == 1) {
        isValid = elmToastValidate('ddlState', 'select', 'Please Select State');
    }
    if (isValid == 1) {
        isValid = elmToastValidate('ddlCity', 'select', 'Please Select City');
    }
    if (isValid == 1) {
        isValid = elmToastValidate('ddlArea', 'select', 'Please Select Area');
    }
    if (isValid == 1) {
        isValid = elmToastValidate('txtPinCode', 'text', 'Please Enter Pin Code');
    }
    if (isValid == 1) {
        isValid = elmToastValidate('txtEmailID', 'text', 'Please Enter Email');
    }
    if (isValid == 1) {
        isValid = elmToastValidate('txtPhone', 'text', 'Please Enter Email');
    }
    if (isValid == 1) {
        isValid = elmToastValidate('txtLatitude', 'text', 'Please Enter Email');
    }
    if (isValid == 1) {
        isValid = elmToastValidate('txtLongitude', 'text', 'Please Enter Email');
    }
    if (isValid == 1) {
        isValid = elmToastValidate('txtBillingCode', 'text', 'Please Enter Email');
    }
    if (isValid == 1) {
        isValid = elmToastValidate('txtBillingName', 'text', 'Please Enter Email');
    }
    if (isValid == 1) {
        isValid = elmToastValidate('txtAddress', 'text', 'Please Enter Email');
    }
    if (isValid == 1) {
        isValid = elmToastValidate('ddlUserID', 'select', 'Please Select Employee');
        if (isValid == 0) {
            $('#ddlUserID').select2('open');
        }
    }
    if (isValid == 1) {
        console.log(obj);
        $.ajax({
            url: '/SecureZone/Master/ExecuteDealers',
            type: 'POST',
            dataType: 'JSON',
            data: { model: obj },
            beforeSend: function () {
                loader_show();
            },
            success: function (res) {
                loader_hide();
                console.log(res);
                if (res != null) {
                    if (res.data.statusCode == -1) {
                        toastr.error(res.data.successMessage);
                    }
                    else {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            // title: '',
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            html: ` 
                                <div>
                                  <h2>`+ res.data.successMessage + `</h2>
                                    <button class="btn btn-primary" onclick="onSwalBtnClicked('list')">
                                    <i class="fa fa-back"></i>Go To List</button>
                                </div>
                            `
                        });
                    }
                }
                else {
                    toastr.error("Something went wrong !");
                }
            }
        });
    }
}
function onSwalBtnClicked(btnId) {
    // Swal.close
    switch (btnId) {
        case 'refresh':
            window.location.reload();
            break;
        case 'list':
            window.location.href = "/SecureZone/Master/Dealers";
            break;
        default:
    }
};
function GetDealerByID(id) {
    let obj = {};
    obj.Proc = "spu_GetDealer";
    obj.ID = id;
    console.log(obj);
    $.ajax({
        url: '/SecureZone/Master/GetDealerByID',
        type: 'POST',
        dataType: 'JSON',
        data: { objModel: obj },
        beforeSend: function () {
            loader_show();
        },
        success: function (res) {
            loader_hide();
            if (res != null) {
                console.log(res);
                $('.applyselect').select2("destroy");
                $('#txtDealerCode').val(res.DealerCode);
                $('#txtDealerName').val(res.DealerName);
                $('#ddlDealerType').val(res.DealerTypeID);
                $('#ddlDealerCategory').val(res.DealerCategoryID);
                $('#ddlRegion').val(res.RegionID);
                $('#ddlRegion').trigger('change');
                $('#ddlState').val(res.StateID);
                $('#ddlState').trigger('change');
                $('#ddlCity').val(res.CityID);
                $('#ddlCity').trigger('change');
                $('#ddlArea').val(res.AreaID);
                $('#txtPinCode').val(res.PinCode);
                $('#txtEmailID').val(res.EmailID);
                $('#txtPhone').val(res.Phone);
                $('#txtLatitude').val(res.Latitude);
                $('#txtLongitude').val(res.Longitude);
                $('#txtBillingCode').val(res.BillingCode);
                $('#txtBillingName').val(res.BillingName);
                $('#txtAddress').val(res.Address);
                $('#ddlUserID').val(res.EMP);
                $('.applyselect').select2();
                $('#headerTitle').html("Update Dealer");
                $('#footer').html(`<button class="btn btn--success" id="btn_Update">Update</button>
    <a class="btn btn--danger" href="/SecureZone/Dashboard/Index">Cancel</a>`);
                $('.applyselect').select2();
                $('#btn_Update').on('click', function () {
                    ExecuteDealer();
                });
            }
        }
    });
}