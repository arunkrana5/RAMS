﻿$(document).ready(function () {
    $('#btn_Submit').on('click', function () {
        ExecuteRole("Spu_SetMasters");
    });
    if ($('#hd_RoleID').val() > 0) {
        GetRoleByID();
    }
    loader_hide();
});
function ExecuteRole(proc) {
    let isValid = 1;
    isValid = elmToastValidate('txtCode', 'text', 'Please Enter Role Code');
    if (isValid == 1) {
        isValid = elmToastValidate('txtName', 'text', 'Please Enter Role Name');
    }
    if (isValid == 1) {
        let obj = {};
        obj.ID = $('#hd_RoleID').val();
        obj.TableName = "Role";
        obj.Code = $('#txtCode').val();
        obj.Name = $('#txtName').val();
        obj.Priority = $('#txtPriority').val();
        obj.GroupID = 0;
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
            window.location.href = "/SecureZone/Master/Role";
            break;
        default:
    }
};
function GetRoleByID() {
    let obj = {};
    obj.Proc = "spu_GetMasters";
    obj.TableName = "Role";
    obj.ID = $('#hd_RoleID').val();
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
                    $('#headerTitle').html("Update Role");
                    $('#footer').html(`<button class="btn btn--success" id="btn_Update">Update</button>
    <a class="btn btn--danger" href="/SecureZone/Dashboard/Index">Cancel</a>`);
                    $('#btn_Update').on('click', function () {
                        ExecuteRole("Spu_SetMasters");
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