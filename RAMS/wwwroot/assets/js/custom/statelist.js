$(document).ready(function () {
    GetStateList();
    loader_hide();
});
function GetStateList() {
    let obj = {};
    obj.Proc = "Spu_GetMasters";
    obj.TableName = "State";
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
                            html += `<td><a onclick="ChangeStatus(` + v.MasterID + `)"><i style="color:lightseagreen; cursor:pointer;" class="fa fa-check-circle"></i></a>&nbsp;<a href="/SecureZone/Master/AddState?id=` + v.MasterID + `"><i class="fa fa-edit"></i></a>&nbsp;<a onclick="DeleteState(` + v.MasterID + `)" style="cursor:pointer;"><i class="fa fa-trash" style="color:red;"></i></a></td>`;
                        }
                        else {
                            html += `<td><a onclick="ChangeStatus(` + v.MasterID + `)"><i style="color:red; cursor:pointer;" class="fa fa-check-circle"></i></a>&nbsp;<a href="/SecureZone/Master/AddState?id=` + v.MasterID + `"><i class="fa fa-edit"></i></a>&nbsp;<a onclick="DeleteState(` + v.MasterID + `)" style="cursor:pointer;"><i class="fa fa-trash" style="color:red;"></i></a></td>`;
                        }

                        html += `<td>` + v.Value + `</td>
                       <td>`+ v.Name + `</td>
                       <td>`+ v.Status + `</td>
                       <td>`+ v.CreatedBy + `</td>
                       <td>`+ v.CreatedDate + `</td>
                    </tr>
                 `;
                    });
                    $('#tbody_State').html(html);
                }
                else {
                    $('#tbody_State').html(``);
                }
            }
            else {
                toastr.error("Something went wrong !");
            }
            new DataTable('#tbl_State');
        }
    })
}
function DeleteState(id) {
    console.log(id);
    let obj = {};
    obj.Mode = "DELETE_COUNTRY";
    obj.ID = id;
    obj.Proc = "Spu_DeleteMaster";
    obj.TableName = "State";
    obj.GroupID = 0;
    $.confirm({
        title: 'Confirm!',
        content: 'Are you sure! You want to Delete State?',
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

function ChangeStatus(id) {
    console.log(id);
    let obj = {};
    obj.ID = id;
    obj.Proc = "Spu_ChangeStatusMaster";
    obj.TableName = "State";
    obj.GroupID = 0;
    $.confirm({
        title: 'Confirm!',
        content: 'Are you sure! You want to Change Status?',
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
            window.location.href = "/SecureZone/Master/State";
            break;
        default:
    }
};