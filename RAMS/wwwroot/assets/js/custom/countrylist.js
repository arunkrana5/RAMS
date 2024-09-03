$(document).ready(function () {
    GetCountryList();
});
function GetCountryList() {
    let obj = {};
    obj.Proc = "Spu_GetMasters";
    obj.TableName = "Country";
    obj.GroupID = 0;
    console.log(obj);
    $.ajax({
        url: '/SecureZone/Master/ExecuteMaster',
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
                       <td><a href="/SecureZone/Master/AddCountry?id=`+ v.MasterID + `"><i class="fa fa-edit"></i></a>&nbsp;<a onclick="DeleteCountry(` + v.MasterID + `)" style="cursor:pointer;"><i class="fa fa-trash" style="color:red;"></i></a></td>
                       <td>`+ v.Value + `</td>
                       <td>`+ v.Name + `</td>
                       <td>`+ v.Status + `</td>
                       <td>`+ v.CreatedDate + `</td>
                       <td>`+ v.CreatedDate + `</td>
                    </tr>
                 `;
            });
            $('#tbody_Country').html(html);

            new DataTable('#tbl_Country');
        }
    })
}
function DeleteCountry(id) {
    console.log(id);
    let obj = {};
    obj.Mode = "DELETE_COUNTRY";
    obj.MasterID = id;
    obj.Proc = "Spu_DeleteCountry";
    obj.TableName = "Country";
    obj.GroupID = 0;
    $.confirm({
        title: 'Confirm!',
        content: 'Are you sure! You want to Delete Country?',
        buttons: {
            Yes: {
                text: 'Yes',
                btnClass: 'btn-green',
                keys: ['enter', 'y'],
                action: function () {
                    $.ajax({
                        url: '/SecureZone/Master/ExecuteMaster',
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