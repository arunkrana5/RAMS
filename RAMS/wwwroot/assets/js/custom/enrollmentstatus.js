$(document).ready(function () {
    loader_hide();
    GetVendorList();
});
function GetVendorList() {
    let obj = {};
    obj.Mode = "Get_Vendor_Enrollment_Status";
    console.log(obj);
    $.ajax({
        url: '/SecureZone/Transaction/ExecuteVendor',
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
                if (res.Table.length > 0) {
                    let pending = res.Table;
                    let html = ``;
                    $.each(pending, function (k, v) {
                        html += `
                           <tr>
                               <td><input class="form-check-input checkboxes" type="checkbox" name="chk" value="`+ v.ID + `">&nbsp;&nbsp;<a href="/SecureZone/Transaction/NewVendor?id=` + v.ID + `"><i class="fa fa-edit"></i></a>&nbsp;<a href="javascript:void(0);" onclick="ShowVendorModal(` + v.ID + `)" title="Show Details"><i class="fa fa-eye"></i></a></td>
                               <td>`+ v.FirmType + `</td>
                               <td>`+ v.GSTNumber + `</td>
                               <td>`+ v.GSTRegDate + `</td>
                               <td>`+ v.OwnerName + `</td>
                               <td>`+ v.Address + `</td>
                               <td>`+ v.FactoryAddress + `</td>
                               <td>`+ v.ServiceableState + `</td>
                               <td>`+ v.BrandingType + `</td>
                               <td>`+ v.ManagerDetails + `</td>
                               <td>`+ v.ContactNumber + `</td>
                               <td>`+ v.City + `</td>
                               <td>`+ v.PinCode + `</td>
                               <td>`+ v.Latitude + `</td>
                               <td>`+ v.Longitude + `</td>
                               <td>`+ v.NameAsPerBank + `</td>
                               <td>`+ v.AccountNumber + `</td>
                               <td>`+ v.IFSC + `</td>
                               <td>`+ v.BankBranch + `</td>
                               <td>`+ v.MSMENumber + `</td>
                               <td>`+ v.RouteNumber + `</td>
                               <td>`+ v.RouteType + `</td>
                               <td>`+ v.CreatedBy + `</td>
                               <td>`+ v.CreatedDate + `</td>
                           </tr>
                        `;
                    });
                    $('#tbody_pending').html(html);

                    new DataTable('#tbl_pending');
                    $('.checkAll').on('click', function () {
                        if (this.checked) {
                            $(".checkboxes").prop("checked", true);
                        } else {
                            $(".checkboxes").prop("checked", false);
                        }
                    });

                    $(".checkboxes").on('click', function () {
                        var numberOfCheckboxes = $(".checkboxes").length;
                        var numberOfCheckboxesChecked = $('.checkboxes:checked').length;
                        if (numberOfCheckboxes == numberOfCheckboxesChecked) {
                            $(".checkAll").prop("checked", true);
                        } else {
                            $(".checkAll").prop("checked", false);
                        }
                    });
                    $('#btn_Approve').on('click', function () {
                        ApproveReject('APPROVE');
                    });
                    $('#btn_Reject').on('click', function () {
                        ApproveReject('REJECT');
                    });
                }
                if (res.Table1.length > 0) {
                    let approved = res.Table1;
                    let approvedhtml = ``;
                    $.each(approved, function (k, v) {
                        approvedhtml += `
                          <tr>
                              <td><a href="javascript:void(0);" onclick="ShowVendorModal(` + v.ID + `)" title="Show Details"><i class="fa fa-eye"></i></a></td>
                              <td>`+ v.FirmType + `</td>
                              <td>`+ v.GSTNumber + `</td>
                              <td>`+ v.GSTRegDate + `</td>
                              <td>`+ v.OwnerName + `</td>
                              <td>`+ v.Address + `</td>
                              <td>`+ v.FactoryAddress + `</td>
                              <td>`+ v.ServiceableState + `</td>
                              <td>`+ v.BrandingType + `</td>
                              <td>`+ v.ManagerDetails + `</td>
                              <td>`+ v.ContactNumber + `</td>
                              <td>`+ v.City + `</td>
                              <td>`+ v.PinCode + `</td>
                              <td>`+ v.Latitude + `</td>
                              <td>`+ v.Longitude + `</td>
                              <td>`+ v.NameAsPerBank + `</td>
                              <td>`+ v.AccountNumber + `</td>
                              <td>`+ v.IFSC + `</td>
                              <td>`+ v.BankBranch + `</td>
                              <td>`+ v.MSMENumber + `</td>
                              <td>`+ v.RouteNumber + `</td>
                              <td>`+ v.RouteType + `</td>
                              <td>`+ v.CreatedBy + `</td>
                              <td>`+ v.CreatedDate + `</td>
                          </tr>
                        `;
                    });
                    $('#tbody_approved').html(approvedhtml);
                }
                new DataTable('#tbl_approved');
                if (res.Table2.length > 0) {
                    let rejected = res.Table2;
                    let rejectedhtml = ``;
                    $.each(rejected, function (k, v) {
                        rejectedhtml += `
                            <tr>
                                <td><a href="javascript:void(0);" onclick="ShowVendorModal(` + v.ID + `)" title="Show Details"><i class="fa fa-eye"></i></a></td>
                                <td>`+ v.FirmType + `</td>
                                <td>`+ v.GSTNumber + `</td>
                                <td>`+ v.GSTRegDate + `</td>
                                <td>`+ v.OwnerName + `</td>
                                <td>`+ v.Address + `</td>
                                <td>`+ v.FactoryAddress + `</td>
                                <td>`+ v.ServiceableState + `</td>
                                <td>`+ v.BrandingType + `</td>
                                <td>`+ v.ManagerDetails + `</td>
                                <td>`+ v.ContactNumber + `</td>
                                <td>`+ v.City + `</td>
                                <td>`+ v.PinCode + `</td>
                                <td>`+ v.Latitude + `</td>
                                <td>`+ v.Longitude + `</td>
                                <td>`+ v.NameAsPerBank + `</td>
                                <td>`+ v.AccountNumber + `</td>
                                <td>`+ v.IFSC + `</td>
                                <td>`+ v.BankBranch + `</td>
                                <td>`+ v.MSMENumber + `</td>
                                <td>`+ v.RouteNumber + `</td>
                                <td>`+ v.RouteType + `</td>
                                <td>`+ v.CreatedBy + `</td>
                                <td>`+ v.CreatedDate + `</td>
                            </tr>
                        `;
                    });
                    $('#tbody_rejected').html(rejectedhtml);
                }
            }
            new DataTable('#tbl_rejected');
        }
    })
}
function ApproveReject(Action) {
    if ($('.checkboxes:checked').length > 0) {
        var selected = new Array();

        //Reference the CheckBoxes and insert the checked CheckBox value in Array.
        $("#tbody_pending input[type=checkbox]:checked").each(function () {
            selected.push(this.value);
        });
        console.log(selected);
        let obj = {};
        obj.Mode = Action;
        obj.VendorID = selected;
        console.log(obj);
        $.ajax({
            url: '/SecureZone/Transaction/ExecuteVendor',
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
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        // title: '',
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        html: ` 
                            <div>
                              <h2>`+ res.Table[0].msg + `</h2>
                                <button class="btn btn-primary" onclick="onSwalBtnClicked('list')">
                                <i class="fa fa-back"></i>Go To List</button>
                            </div>
                        `
                    });
                }
                else {
                    toastr.error("Something went wrong !");
                }
            }
        });
    }
    else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            // title: '',
            showConfirmButton: false,
            allowOutsideClick: false,
            html: ` 
                <div>
                  <h2>Please Select atleast one !</h2>
                    <button class="btn btn-primary" onclick="onSwalBtnClicked('refresh')">
                    <i class="fa fa-back"></i>Back</button>
                </div>
            `
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
            window.location.href = "/SecureZone/Transaction/EnrollmentStatus";
            break;
        default:
    }
};