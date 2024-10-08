﻿$(document).ready(function () {
    let countryddl = GetDropDownList('', 'AllCountry');
    $('#ddlCountry').html(countryddl);
    $('.applyselect').select2();
    $('#btn_Submit').on('click', function () {
        ExecuteRegion("Spu_SetMasters");
    });

    if ($('#hd_RegionID').val() > 0) {
        GetRegionByID();
    }
    loader_hide();
});
function ExecuteRegion(proc) {
    let isValid = 1;
    isValid = elmToastValidate('ddlCountry', 'select', 'Please Select Country');
    if (isValid == 1) {
        isValid = elmToastValidate('txtCode', 'text', 'Please Enter Region Code');
    }
    if (isValid == 1) {
        isValid = elmToastValidate('txtName', 'text', 'Please Enter Region Name');
    }
    if (isValid == 1) {
        let obj = {};
        obj.ID = $('#hd_RegionID').val();
        obj.TableName = "Region";
        obj.Code = $('#txtCode').val();
        obj.Name = $('#txtName').val();
        obj.Priority = $('#txtPriority').val();
        obj.GroupID = $('#ddlCountry').val();
        obj.IsActive = 1;
        obj.Proc = proc;
        $.ajax({
            url: '/SecureZone/Master/ExecuteMaster',
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
                    if (res.Table[0].Status == -1) {
                        toastr.error(res.Table[0].Message);
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
                                  <h2>`+ res.Table[0].Message + `</h2>
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
        })
    }
}
function onSwalBtnClicked(btnId) {
    // Swal.close
    switch (btnId) {
        case 'refresh':
            window.location.reload();
            break;
        case 'list':
            window.location.href = "/SecureZone/Master/Region";
            break;
        default:
    }
};
function GetRegionByID() {
    let obj = {};
    obj.Proc = "spu_GetMasters";
    obj.TableName = "Region";
    obj.ID = $('#hd_RegionID').val();
    console.log(obj);
    $.ajax({
        url: '/SecureZone/Master/ExecuteMaster',
        type: 'POST',
        dataType: 'JSON',
        data: { objModel: obj },
        beforeSend: function () {
            loader_show();
        },
        success: function (res) {
            loader_hide();
            if (res != null) {
                let data = res.Table[0];
                if (data != null) {
                    console.log(data);
                    $('.applyselect').select2("destroy");
                    $('#txtCode').val(data.Value);
                    $('#txtName').val(data.Name);
                    $('#txtPriority').val(data.Priority);
                    $('#ddlCountry').val(data.GroupID);
                    $('#headerTitle').html("Update Region");
                    $('#footer').html(`<button class="btn btn--success" id="btn_Update">Update</button>
    <a class="btn btn--danger" href="/SecureZone/Dashboard/Index">Cancel</a>`);
                    $('#btn_Update').on('click', function () {
                        ExecuteRegion("Spu_SetMasters");
                    });

                } else {
                    toastr.error("Something went wrong");
                }
            }
            else {
                toastr.error("Something went wrong");
            }
        }
    });
}