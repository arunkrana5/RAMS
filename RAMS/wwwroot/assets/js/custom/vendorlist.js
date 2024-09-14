$(document).ready(function () {
    loader_hide();
    GetVendorList();
});
function GetVendorList() {
    let obj = {};
    obj.Mode = "Get_Vendor_List";
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
                    let data = res.Table;
                    let html = ``;
                    $.each(data, function (k, v) {
                        html += `
                            <tr>
                                <td><a href="/SecureZone/Transaction/NewVendor?id=`+ v.ID + `"><i class="fa fa-edit"></i></a>&nbsp;<a onclick="DeleteVendor(` + v.ID + `)" style="cursor:pointer;"><i class="fa fa-trash" style="color:red;"></i></a>&nbsp;<a href="javascript:void(0);" onclick="ShowVendorModal(` + v.ID + `)" title="Show Details"><i class="fa fa-eye"></i></a></td>
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
                    $('#tbody_Vendors').html(html);
                }
                else {
                    $('#tbody_Vendors').html(``);
                }
            }
            else {
                toastr.error("Something went wrong !");
            }
            new DataTable('#tbl_Vendor');
        }
    })
}
function DeleteVendor(id) {
    console.log(id);
    let obj = {};
    obj.Mode = "DELETE_VENDOR";
    obj.ID = id;
    $.confirm({
        title: 'Confirm!',
        content: 'Are you sure! You want to Delete Vendor?',
        buttons: {
            Yes: {
                text: 'Yes',
                btnClass: 'btn-green',
                keys: ['enter', 'y'],
                action: function () {
                    $.ajax({
                        url: '/SecureZone/Transaction/ExecuteVendor',
                        method: 'POST',
                        dataType: 'JSON',
                        data: { objModel: obj },
                        beforeSend: function () {
                            loader_show();
                        },
                        success: function (res) {
                            loader_hide();
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
            },
            No: {
                text: 'No',
                btnClass: 'btn-red',
                keys: ['esc', 'n'],
                action: function () {
                }
            },
        }
    });
};
function onSwalBtnClicked(btnId) {
    // Swal.close
    switch (btnId) {
        case 'refresh':
            window.location.reload();
            break;
        case 'list':
            window.location.href = "/SecureZone/Transaction/VendorList";
            break;
        default:
    }
};