$(document).ready(function () {
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
        success: function (res) {
            console.log(res);
            let data = res.Table;
            let html = ``;
            $.each(data, function (k, v) {
                html += `
                            <tr>
                                <td><a href="/SecureZone/Transaction/NewVendor?id=`+ v.ID + `"><i class="fa fa-edit"></i></a>&nbsp;<a onclick="DeleteVendor(` + v.ID + `)" style="cursor:pointer;"><i class="fa fa-trash" style="color:red;"></i></a></td>
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
                                <td>`+ v.CreatedBy + `</td>
                                <td>`+ v.CreatedDate + `</td>
                            </tr>
                        `;
            });
            $('#tbody_Vendors').html(html);

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
        content: 'Are you sure! You want to Delete Document?',
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
                        success: function (res) {
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