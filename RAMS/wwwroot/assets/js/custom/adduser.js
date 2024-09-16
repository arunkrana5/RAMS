let userdoc = doc();
$(document).ready(function () {
    if ($('#hd_ID').val() > 0) {
        GetUserByID($('#hd_ID').val());
    }
    let countryddl = GetDropDownList('', 'AllCountry');
    $('#ddlCountry').html(countryddl);
    $('#ddlCountry').on('change', function () {
        if ($('#ddlCountry').val() > 0) {
            let regionddl = GetDropDownList($('#ddlCountry').val(), 'Region');
            $('#ddlRegion').html(regionddl);
        }
        else {
            $('#ddlRegion').html('<option value="0">-- Select --</option>');
            $('#ddlState').html('<option value="0">-- Select --</option>');
            $('#ddlCity').html('<option value="0">-- Select --</option>');
        }
    });
    $('#ddlRegion').on('change', function () {
        if ($('#ddlRegion').val() > 0) {
            let stateddl = GetDropDownList($('#ddlRegion').val(), 'State');
            $('#ddlState').html(stateddl);
        }
        else {
            $('#ddlState').html('<option value="0">-- Select --</option>');
            $('#ddlCity').html('<option value="0">-- Select --</option>');
        }
    });

    $('#ddlState').on('change', function () {
        if ($('#ddlState').val() > 0) {
            let cityddl = GetDropDownList($('#ddlState').val(), 'City');
            $('#ddlCity').html(cityddl);
        }
        else {
            $('#ddlCity').html('<option value="0">-- Select --</option>');
        }
    });

    let roleddl = GetDropDownList('', 'Role');
    $('#ddlRole').html(roleddl);

    let designationddl = GetDropDownList('', 'Designation');
    $('#ddlDesignation').html(designationddl);
    let deptddl = GetDropDownList('', 'Department');
    $('#ddlDepartment').html(deptddl);

    let dealerddl = GetDropDownList('','Dealer');
    $('#ddlDealer').html(dealerddl);
    $('.applyselect').select2();
    //userdoc.init(1, 'VENDOR_CREATION', 'tbl_UsersDoc', 0, 1, '');
    $('#expandAll').on('click', function () {
        $('.tabAll').removeClass('collapsed');
        $('.bodyAll').addClass('show');
    });
    $('#collapseAll').on('click', function () {
        $('.tabAll').addClass('collapsed');
        $('.bodyAll').removeClass('show');
    });
    $('#btn_Submit').on('click', function () {
        ExecuteUser("spu_SetEMP");
    });
    loader_hide();
});
function ExecuteUser(proc) {
    let isValid = 1;
    //isValid = elmToastValidate('txtEmployeeCode', 'text', 'Please Enter Employee Code');
    isValid = elmToastValidate('txtEmployeeName', 'text', 'Please Enter Employee Name');
    //if (isValid == 1) {
    //    isValid = elmToastValidate('txtEmployeeName', 'text', 'Please Enter Employee Name');
    //}
    if (isValid == 1) {
        isValid = elmToastValidate('txtUserName', 'text', 'Please Enter User Name');
    }
    if (isValid == 1) {
        isValid = elmToastValidate('txtPassword', 'text', 'Please Enter Password');
    }
    if (isValid == 1) {
        isValid = elmToastValidate('ddlRole', 'select', 'Please Select Role');
    }
    //if (isValid == 1) {
    //    isValid = elmToastValidate('txtFatherName', 'text', 'Please Enter Father Name');
    //}
    //if (isValid == 1) {
    //    isValid = elmToastValidate('txtDOB', 'text', 'Please Enter DOB');
    //}
    //if (isValid == 1) {
    //    isValid = elmToastValidate('ddlGender', 'select', 'Please Select Gender');
    //}
    //if (isValid == 1) {
    //    isValid = elmToastValidate('ddlDesignation', 'select', 'Please Select Designation');
    //}
    //if (isValid == 1) {
    //    isValid = elmToastValidate('ddlDepartment', 'select', 'Please Select Department');
    //}
    //if (isValid == 1) {
    //    isValid = elmToastValidate('txtDOJ', 'text', 'Please Enter Date of Joining');
    //}
    //if (isValid == 1) {
    //    isValid = elmToastValidate('txtAddress', 'text', 'Please Enter Address');
    //}
    //if (isValid == 1) {
    //    isValid = elmToastValidate('txtPAN', 'text', 'Please Enter PAN');
    //}
    if (isValid == 1) {
        isValid = elmToastValidate('txtEmailID', 'text', 'Please Enter Email');
    }
    if (isValid == 1) {
        isValid = elmToastValidate('txtPhone', 'text', 'Please Enter Phone');
    }
    //if (isValid == 1) {
    //    isValid = elmToastValidate('txtUAN', 'text', 'Please Enter UAN');
    //}
    //if (isValid == 1) {
    //    isValid = elmToastValidate('txtESICNo', 'text', 'Please Enter ESIC');
    //}
    //if (isValid == 1) {
    //    isValid = elmToastValidate('txtLocation', 'text', 'Please Enter Location');
    //    if (isValid == 0) {
    //        $('#addressTab').removeClass('collapsed');
    //        $('#AddressTab').addClass('show');
    //    }
    //}
    if (isValid == 1) {
        let obj = {};
        obj.ID = $('#hd_ID').val();
        obj.EmployeeCode = $('#txtEmployeeCode').val();
        obj.EmployeeName = $('#txtEmployeeName').val();
        obj.UserName = $('#txtUserName').val();
        obj.Password = $('#txtPassword').val();
        obj.RoleID = $('#ddlRole').val();
        obj.DealerID = $('#ddlDealer').val();
        obj.FatherName = $('#txtFatherName').val();
        obj.DOB = $('#txtDOB').val();
        if ($('#ddlGender').val() > 0) {
            if ($('#ddlGender').val() == 1) {
                obj.Gender = "Male";
            }
            else if ($('#ddlGender').val() == 2) {
                obj.Gender = "FeMale";
            }
            else {
                obj.Gender = "Other";
            }
        }
        obj.DesignationID = $('#ddlDesignation').val();
        obj.DepartmentID = $('#ddlDepartment').val();
        obj.DOJ = $('#txtDOJ').val();
        obj.PAN = $('#txtPAN').val();
        obj.EmailID = $('#txtEmailID').val();
        obj.Phone = $('#txtPhone').val();
        obj.UAN = $('#txtUAN').val();
        obj.ESIC = $('#txtESICNo').val();
        obj.IsPJPAutoAssign = $('#chkIsPJPAutoAssign').prop('checked');
        obj.CountryID = $('#ddlCountry').val();
        obj.RegionID = $('#ddlRegion').val();
        obj.StateID = $('#ddlState').val();
        obj.CityID = $('#ddlCity').val();
        obj.Location = $('#txtLocation').val();
        obj.PinCode = $('#txtPinCode').val();
        obj.AddressLine1 = $('#txtAddressLine1').val();
        obj.AddressLine2 = $('#txtAddressLine2').val();
        obj.BranchName = $('#txtBranchName').val();
        obj.BankName = $('#txtBankName').val();
        obj.AccountNumber = $('#txtAccountNumber').val();
        obj.IFSC = $('#txtIFSC').val();
        obj.Proc = proc;
        console.log(obj);
        $.ajax({
            url: '/SecureZone/Master/ExecuteUser',
            type: 'POST',
            dataType: 'JSON',
            data: { objModel: obj },
            beforeSend: function () {
                loader_show();
            },
            success: function (res) {
                loader_hide();
                console.log(res);
                //userdoc.init_upload(res.Table[0].ID); 
                if (res != null) {
                    if (res.Table[0].Status == 1) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
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
                    else {
                        toastr.error("Something went wrong");
                    }
                }
                else {
                    toastr.error("Something went wrong");
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
            window.location.href = "/SecureZone/Master/Users";
            break;
        default:
    }
};
function GetUserByID(id) {
    let obj = {};
    obj.Proc = "spu_GetEmployee";
    obj.ID = id;
    console.log(obj);
    $.ajax({
        url: '/SecureZone/Master/GetEmployeeByID',
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
                let state = res.Table5;
                let city = res.Table6;
                console.log(res);
                $('.applyselect').select2("destroy");
                $('#txtEmployeeCode').val(data.EMPCode);
                $('#txtEmployeeName').val(data.EMPName);
                $('#txtUserName').val(data.UserID);
                //$('#txtPassword').val(data.Password);
                $('#ddlRole').val(data.RoleID);
                $('#ddlDealer').val(data.DealerID);
                $('#txtFatherName').val(data.FatherName);
                $('#txtDOB').val(data.DOB);
                if (data.Gender.toUpperCase() == "MALE") {
                    $('#ddlGender').val(1);
                }
                else if (data.Gender.toUpperCase() == "FEMALE") {
                    $('#ddlGender').val(2);
                }
                else {
                    $('#ddlGender').val(3);
                }
                $('#ddlDesignation').val(data.DesignID);
                $('#ddlDepartment').val(data.DepartID);
                $('#txtDOJ').val(data.DOJ);
                $('#txtPAN').val(data.PAN);
                $('#txtEmailID').val(data.EmailID);
                $('#txtPhone').val(data.Phone);
                $('#txtUAN').val(data.UAN);
                $('#txtESICNo').val(data.ESIC);
                $('#chkIsPJPAutoAssign').prop('checked', data.IsPJPAutoAssign)
                $('#ddlCountry').val(data.CountryID);
                $('#ddlCountry').trigger('change');
                $('#ddlRegion').val(data.RegionID);
                $('#ddlRegion').trigger('change');
                $('#ddlState').val(data.StateID);
                $('#ddlState').trigger('change');
                $('#ddlCity').val(data.CityID);
                $('#txtLocation').val(data.Location);
                $('#txtPinCode').val(data.ZipCOde);
                $('#txtAddressLine1').val(data.Address1);
                $('#txtAddressLine2').val(data.Address2);
                $('#txtBranchName').val(data.BankBranch);
                $('#txtBankName').val(data.BankName);
                $('#txtAccountNumber').val(data.AccountNo);
                $('#txtIFSC').val(data.IFSCCode);
                $('#headerTitle').html("Update User");
                $('#footer').html(`<button class="btn btn--success" id="btn_Update">Update</button>
    <a class="btn btn--danger" href="/SecureZone/Dashboard/Index">Cancel</a>`);
                $('.applyselect').select2();
                $('#btn_Update').on('click', function () {
                    ExecuteUser("spu_SetEMP");
                });
            }
            else {
                toastr.error("Something went wrong");
            }
        }
    })
}