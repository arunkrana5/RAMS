$(document).ready(function () {
    loader_hide();
    GetRoleList();
});
function GetRoleList() {
    let obj = {};
    obj.Proc = "Spu_GetMasters";
    obj.TableName = "Role";
    obj.GroupID = 0;
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
            console.log(res);
            if (res != null) {
                if (res.Table.length > 0) {
                    let data = res.Table;
                    let html = ``;
                    $.each(data, function (k, v) {
                        html += `
                   <tr>`;
                        if (v.Status.toLowerCase() == "active") {
                            html += `<td><a onclick="ChangeStatus(` + v.MasterID + `,'Masters')"><i style="color:lightseagreen; cursor:pointer;" class="fa fa-check-circle"></i></a>&nbsp;<a href="/SecureZone/Master/AddRole?id=` + v.MasterID + `"><i class="fa fa-edit"></i></a>&nbsp;<a onclick="DeleteRole(` + v.MasterID + `)" style="cursor:pointer;"><i class="fa fa-trash" style="color:red;"></i></a></td>`;
                        }
                        else {
                            html += `<td><a onclick="ChangeStatus(` + v.MasterID + `,'Masters')"><i style="color:red; cursor:pointer;" class="fa fa-check-circle"></i></a>&nbsp;<a href="/SecureZone/Master/AddRole?id=` + v.MasterID + `"><i class="fa fa-edit"></i></a>&nbsp;<a onclick="DeleteRole(` + v.MasterID + `)" style="cursor:pointer;"><i class="fa fa-trash" style="color:red;"></i></a></td>`;
                        }

                        html += `<td>` + v.Value + `</td>
                       <td>`+ v.Name + `</td>
                       <td>`+ v.Status + `</td>
                       <td>`+ v.CreatedBy + `</td>
                       <td>`+ v.CreatedDate + `</td>
                    </tr>
                 `;
                    });
                    $('#tbody_Role').html(html);
                }
                else {
                    $('#tbody_Role').html(``);
                }
            }
            else {
                toastr.error("Something went wrong !");
            }
            new DataTable('#tbl_Role');
        }
    })
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