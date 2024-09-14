$(document).ready(function () {
    let cityddl = GetDropDownList('', 'AllCity');
    $('#ddlCity').html(cityddl);
    $('.applyselect').select2();
    $('#btn_Submit').on('click', function () {
        ExecuteArea("Spu_SetMasters");
    });

    if ($('#hd_AreaID').val() > 0) {
        GetAreaByID();
    }
});
function ExecuteArea(proc) {
    let isValid = 1;
    isValid = elmToastValidate('txtCode', 'text', 'Please Enter Area Code');
    if (isValid == 1) {
        isValid = elmToastValidate('txtName', 'text', 'Please Enter Area Name');
    }
    if (isValid == 1) {
        let obj = {};
        obj.ID = $('#hd_AreaID').val();
        obj.TableName = "Area";
        obj.Code = $('#txtCode').val();
        obj.Name = $('#txtName').val();
        obj.Priority = $('#txtPriority').val();
        obj.GroupID = $('#ddlCity').val();
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
                console.log(res);
                //loader_hide();
                //if (res != null) {
                //    if (res.Table[0].Status == -1) {
                //        toastr.error(res.Table[0].Message);
                //    }
                //    else {
                //        Swal.fire({
                //            position: 'center',
                //            icon: 'success',
                //            // title: '',
                //            showConfirmButton: false,
                //            allowOutsideClick: false,
                //            html: ` 
                //                <div>
                //                  <h2>`+ res.Table[0].Message + `</h2>
                //                    <button class="btn btn-primary" onclick="onSwalBtnClicked('list')">
                //                    <i class="fa fa-back"></i>Go To List</button>
                //                </div>
                //                `
                //        });
                //    }
                //}
                
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
            window.location.href = "/SecureZone/Master/Area";
            break;
        default:
    }
};
function GetAreaByID() {
    let obj = {};
    obj.Proc = "spu_GetMasters";
    obj.TableName = "Area";
    obj.ID = $('#hd_AreaID').val();
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
            let data = res.Table[0];
            console.log(data);
            $('.applyselect').select2("destroy");
            $('#txtCode').val(data.Value);
            $('#txtName').val(data.Name);
            $('#txtPriority').val(data.Priority);
            $('#ddlCity').val(data.GroupID);
            $('#headerTitle').html("Update City");
            $('#footer').html(`<button class="btn btn--success" id="btn_Update">Update</button>
    <a class="btn btn--danger" href="/SecureZone/Dashboard/Index">Cancel</a>`);
            $('#btn_Update').on('click', function () {
                ExecuteArea("Spu_SetMasters");
            });
        }
    });
}