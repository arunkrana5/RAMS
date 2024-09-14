$(document).ready(function () {
    let stateddl = GetDropDownList('', 'AllState');
    $('#ddlState').html(stateddl);
    $('.applyselect').select2();
    $('#btn_Submit').on('click', function () {
        ExecuteCity("Spu_SetMasters");
    });

    if ($('#hd_CityID').val() > 0) {
        GetCityByID();
    }
});
function ExecuteCity(proc) {
    let isValid = 1;
    isValid = elmToastValidate('txtCode', 'text', 'Please Enter City Code');
    if (isValid == 1) {
        isValid = elmToastValidate('txtName', 'text', 'Please Enter City Name');
    }
    if (isValid == 1) {
        let obj = {};
        obj.ID = $('#hd_CityID').val();
        obj.TableName = "City";
        obj.Code = $('#txtCode').val();
        obj.Name = $('#txtName').val();
        obj.Priority = $('#txtPriority').val();
        obj.GroupID = $('#ddlState').val();
        obj.IsActive = 1;
        obj.Proc = proc;
        $.ajax({
            url: '/SecureZone/Master/ExecuteMaster',
            type: 'POST',
            dataType: 'JSON',
            data: { objModel: obj },
            success: function (res) {
                console.log(res);
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
            window.location.href = "/SecureZone/Master/City";
            break;
        default:
    }
};
function GetCityByID() {
    let obj = {};
    obj.Proc = "spu_GetMasters";
    obj.TableName = "City";
    obj.ID = $('#hd_CityID').val();
    console.log(obj);
    $.ajax({
        url: '/SecureZone/Master/ExecuteMaster',
        type: 'POST',
        dataType: 'JSON',
        data: { objModel: obj },
        success: function (res) {
            let data = res.Table[0];
            console.log(data);
            $('.applyselect').select2("destroy");
            $('#txtCode').val(data.Value);
            $('#txtName').val(data.Name);
            $('#txtPriority').val(data.Priority);
            $('#ddlState').val(data.GroupID );
            $('#headerTitle').html("Update Region");
            $('#footer').html(`<button class="btn btn--success" id="btn_Update">Update</button>
    <a class="btn btn--danger" href="/SecureZone/Dashboard/Index">Cancel</a>`);
            $('#btn_Update').on('click', function () {
                ExecuteCity("Spu_SetMasters");
            });
        }
    });
}