$(document).ready(function () {
    GetUserList();
    loader_hide();
});
function GetUserList() {
    $('#user_table').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "/SecureZone/Master/GetEmployeeList",  // URL to your server-side script
            "type": "POST",
            "data": {}
        },
        "columns": [
            {
                className: 'Action',
                data: 'empid',
                render: function (data, type, row) {

                    console.log(data, type, row);
                    if (type == 'display') {
                        let html = '';
                        if (row.isActive == true) {
                            html += `<a onclick="ChangeStatus(` + row.empid + `,'Master_Emp')"><i style="color:lightseagreen; cursor:pointer;" class="fa fa-check-circle"></i></a>&nbsp;<a href="/SecureZone/Master/AddUser?id=` + row.empid + `"><i class="fa fa-edit"></i></a>`;
                        }
                        else {
                            html += `<td><a onclick="ChangeStatus(` + row.empid + `,'Master_Emp')"><i style="color:red; cursor:pointer;" class="fa fa-check-circle"></i></a>&nbsp;<a href="/SecureZone/Master/AddUser?id=` + row.empid + `"><i class="fa fa-edit"></i></a>`;
                        }
                        return html;
                    }
                    return data;
                }
            },
            { "data": "empCode" },
            { "data": "empName" },
            { "data": "dealerName" },
            { "data": "dealerCode" },
            { "data": "dolStatus" },
            { "data": "phone" },
            { "data": "emailID" },
            { "data": "fatherName" },
            { "data": "dob" },
            { "data": "gender" },
            { "data": "designName" },
            { "data": "deptName" },
        ]


        //let obj = {};
        //obj.Proc = "Spu_GetUsers";
        //obj.LoginID = 0;
        //console.log(obj);
        //$.ajax({
        //    url: '/SecureZone/Master/ExecuteUser',
        //    type: 'POST',
        //    dataType: 'JSON',
        //    data: { objModel: obj },
        //    beforeSend: function () {
        //        loader_show();
        //    },
        //    success: function (res) {
        //        loader_hide();
        //        console.log(res);
        //        if (res != null) {
        //            if (res.Table.length > 0) {
        //                let data = res.Table;
        //                let html = ``;
        //                $.each(data, function (k, v) {
        //                    html += `
        //                    <tr>
        //                        <td><a href="/SecureZone/Master/AddUser?id=`+ v.ID + `"><i class="fa fa-edit"></i></a>&nbsp;<a onclick="DeleteUser(` + v.ID + `)" style="cursor:pointer;"><i class="fa fa-trash" style="color:red;"></i></a></td>
        //                        <td>`+ v.Name + `</td>
        //                        <td>`+ v.UserID + `</td>
        //                        <td>`+ v.RoleName + `</td>
        //                        <td>`+ v.Email + `</td>
        //                    </tr>
        //                `;
        //                });
        //                $('#tbody_Users').html(html);
        //            }
        //            else {
        //                $('#tbody_Users').html(``);
        //            }
        //        }
        //        else {
        //            toastr.error("Something went wrong !");
        //        }

        //    }
        //})
    });
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
            window.location.href = "/SecureZone/Master/Users";
            break;
        default:
    }
};