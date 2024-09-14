$(document).ready(function () {
    GetUserList();
});
function GetUserList() {
    let obj = {};
    obj.Proc = "Spu_GetUsers";
    console.log(obj);
    $.ajax({
        url: '/SecureZone/Master/ExecuteUser',
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
                        <td><a href="/SecureZone/Master/AddUser?id=`+ v.LoginID + `"><i class="fa fa-edit"></i></a>&nbsp;<a onclick="DeleteUser(` + v.LoginID +`)" style="cursor:pointer;"><i class="fa fa-trash" style="color:red;"></i></a></td>
                        <td>`+ v.UserName + `</td>
                        <td>`+ v.EMPName + `</td>
                        <td>`+ v.RoleName + `</td>
                        <td>`+ v.Email + `</td>
                    </tr>
                `;
            });
            $('#tbody_Users').html(html);

            new DataTable('#user_table');
        }
    })
}
function DeleteUser(id) {
    console.log(id);
    let obj = {};
    obj.ID = id; 
    $.confirm({
        title: 'Confirm!',
        content: 'Are you sure! You want to Delete User?',
        buttons: {
            Yes: {
                text: 'Yes',
                btnClass: 'btn-green',
                keys: ['enter', 'y'],
                action: function () {
                    $.ajax({
                        url: '/SecureZone/Master/ExecuteUser',
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
            window.location.href = "/SecureZone/Transaction/UserList";
            break;
        default:
    }
};