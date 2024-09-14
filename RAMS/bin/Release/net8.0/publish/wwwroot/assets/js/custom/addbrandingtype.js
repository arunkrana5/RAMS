$(document).ready(function () {
    $('#btn_Submit').on('click', function () {
        ExecuteBrandingType("Spu_SetBrandingType");
    });
    if ($('#hd_BrandingTypeID').val() > 0) {
        GetBrandingTypeByID();
    }
});
function ExecuteBrandingType(proc) {
    let isValid = 1;
    isValid = elmToastValidate('txtCode', 'text', 'Please Enter Branding Type Code');
    if (isValid == 1) {
        isValid = elmToastValidate('txtName', 'text', 'Please Enter Branding Type Name');
    }
    if (isValid == 1) {
        let obj = {};
        obj.ID = $('#hd_BrandingTypeID').val();
        obj.TableName = "BrandingType";
        obj.Code = $('#txtCode').val();
        obj.Name = $('#txtName').val();
        obj.Specification = $('#txtSpecification').val();
        obj.Rate = $('#txtRate').val();
        obj.Priority = $('#txtPriority').val();
        obj.GroupID = 0;
        obj.IsActive = 1;
        obj.Proc = proc;
        $.ajax({
            url: '/SecureZone/Master/ExecuteBrandingType',
            type: 'POST',
            dataType: 'JSON',
            data: { objModel: obj },
            success: function (res) {
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
                          <h2>`+ res.Table[0].Message + `</h2>
                            <button class="btn btn-primary" onclick="onSwalBtnClicked('list')">
                            <i class="fa fa-back"></i>Go To List</button>
                        </div>
                    `
                    });
                }
                else {
                    toastr.error("Something went wrong");
                }
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
            window.location.href = "/SecureZone/Master/BrandingType";
            break;
        default:
    }
};
function GetBrandingTypeByID() {
    let obj = {};
    obj.Proc = "Spu_GetBrandingType";
    obj.ID = $('#hd_BrandingTypeID').val();
    console.log(obj);
    $.ajax({
        url: '/SecureZone/Master/ExecuteBrandingType',
        type: 'POST',
        dataType: 'JSON',
        data: { objModel: obj },
        success: function (res) {
            let data = res.Table[0];
            console.log(data);
            $('.applyselect').select2("destroy");
            $('#txtCode').val(data.Code);
            $('#txtName').val(data.Name);
            $('#txtSpecification').val(data.Specification);
            $('#txtRate').val(data.RatePerSQFeet);
            $('#txtPriority').val(data.Priority);
            $('#headerTitle').html("Update BrandingType");
            $('#footer').html(`<button class="btn btn--success" id="btn_Update">Update</button>
    <a class="btn btn--danger" href="/SecureZone/Dashboard/Index">Cancel</a>`);
            $('#btn_Update').on('click', function () {
                ExecuteBrandingType("Spu_SetBrandingType");
            });
        }
    });
}