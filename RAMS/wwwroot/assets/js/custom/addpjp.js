$(document).ready(function () {
    //dropdown binding
    let userddl = GetDropDownList('', 'Employee');
    $('#ddlUserID').html(userddl);
    //let regionddl = GetDropDownList('3', 'Region');
    //$('#ddlRegionID').html(regionddl);
    //$('#ddlRegionID').on('change', function () {
    //    if ($('#ddlRegionID').val() > 0) {
    //        let stateddl = GetDropDownList($('#ddlRegionID').val(), 'State');
    //        $('#ddlStateID').html(stateddl);
    //    }
    //    else {
    //        $('#ddlStateID').html(`<option>-- Select --</option>`);
    //        $('#ddlCityID').html(`<option>-- Select --</option>`);
    //        $('#ddlAreaID').html(`<option>-- Select --</option>`);
    //    }
    //});
    //$('#ddlStateID').on('change', function () {
    //    if ($('#ddlStateID').val() > 0) {
    //        let cityddl = GetDropDownList($('#ddlStateID').val(), 'City');
    //        $('#ddlCityID').html(cityddl);
    //    }
    //    else {
    //        $('#ddlCityID').html(`<option>-- Select --</option>`);
    //        $('#ddlAreaID').html(`<option>-- Select --</option>`);
    //    }
    //});
    //$('#ddlCityID').on('change', function () {
    //    if ($('#ddlCityID').val() > 0) {
    //        let areaddl = GetDropDownList($('#ddlCityID').val(), 'Area');
    //        $('#ddlAreaID').html(areaddl);
    //    }
    //    else {
    //        $('#ddlAreaID').html(`<option>-- Select --</option>`);
    //    }
    //});
    let routeddl = GetDropDownList('', 'RouteNumber');
    $('#ddlRouteNumber').html(routeddl);
    $('#ddlRouteNumber').on('change', function () {
        $('#ddlVendorID').html('');
        if ($('#ddlRouteNumber').val() > 0) {
            let vendorddl = GetMultipleSelectDropDownList($('#ddlRouteNumber').val(), 'VendorByRouteNumber');
            $('#ddlVendorID').html(vendorddl);
        }
        else {
            $('#ddlVendorID').html(``);
        }
    });
    //let vendortypeddl = GetDropDownList('', 'VendorType');
    //$('#ddlVendorTypeID').html(vendortypeddl);
    //$('#ddlVendorTypeID').on('change', function () {
    //    if ($('#ddlVendorTypeID').val() > 0) {
    //        let vendorcatddl = GetDropDownList($('#ddlVendorTypeID').val(), 'VendorCategory');
    //        $('#ddlVendorCategoryID').html(vendorcatddl);
    //    }
    //    else {
    //        $('#ddlVendorCategoryID').html(`<option>-- Select --</option>`);
    //    }
    //});
    $('.select2').select2();
    // end of dropdown binding
    $('#btn_Submit').on('click', function () {
        ExecutePJP();
    });
    loader_hide();
});
function ExecutePJP() {
    let obj = {};
    obj.ID = $('#hd_PJPID').val();
    obj.UserID = $('#ddlUserID').val();
    obj.RouteNumber = $('#ddlRouteNumber').val();
    obj.VendorID = $('#ddlVendorID').val();
    obj.VisitDate = $('#txtDate').val();
    obj.Proc = "spu_SetPJP_Plan";
    let isValid = 1;
    isValid = elmToastValidate('ddlUserID', 'select', 'Please Select Employee');
    if (isValid != 1) {
        $('#ddlUserID').select2('open');
    }
    if (isValid == 1) {
        isValid = elmToastValidate('ddlRouteNumber', 'select', 'Please Select Route Number');
        if (isValid == 0) {
            $('#ddlRouteNumber').select2('open');
        }
    }
    if (isValid == 1) {
        isValid = elmToastValidate('ddlVendorID', 'select', 'Please Select Vendors');
        if (isValid == 0) {
            $('#ddlVendorID').select2('open');
        }
    }
    if (isValid == 1) {
        isValid = elmToastValidate('txtDate', 'text', 'Please Select Date');
    }
    if (isValid == 1) {
        console.log(obj);
        $.ajax({
            url: '/SecureZone/Transaction/ExecutePJPPlan',
            type: 'POST',
            dataType: 'JSON',
            data: { objModel: obj },
            beforeSend: function () {
                loader_show();
            },
            success: function (res) {
                loader_hide();
                console.log(res);
                if (res != null) {
                    if (res.Table1[0].Status == -1) {
                        toastr.error(res.Table1[0].Message);
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
                                  <h2>`+ res.Table1[0].Message + `</h2>
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
            window.location.href = "/SecureZone/Transaction/PJPPlanList";
            break;
        default:
    }
};