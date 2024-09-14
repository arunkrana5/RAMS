let vendordoc = doc();
$(document).ready(function () {
    let stateddl = GetDropDownList('', 'AllState');
    let brandingtypeddl = GetDropDownList('', 'BrandingType');
    $('#ddlServiceableState').html(stateddl);
    $('#ddlBrandingType').html(brandingtypeddl);
    $('.applyselect').select2();
    elmToastValidate('','NumericOnly');
    elmToastValidate('','GSTINFormat');
    elmToastValidate('','MobileFormat');
    elmToastValidate('','UpperCase');
    elmToastValidate('','IFSCFormat');
    $('#btn_Submit').on('click', function () {
        ExecuteVendor("Insert");
    });
    if ($('#hd_VendorID').val() > 0) {
        GetVendorByID();
        $('.applyselect').select2();
    }
    else {
        vendordoc.init(1, 'VENDOR_CREATION', 'tbl_VendorDoc', 0, 1, '');
        if ("geolocation" in navigator) {
            // Prompt user for permission to access their location
            navigator.geolocation.getCurrentPosition(
                // Success callback function
                (position) => {
                    // Get the user's latitude and longitude coordinates
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    $('#txtLatitude').val(lat);
                    $('#txtLongitude').val(lng);
                    // Do something with the location data, e.g. display on a map
                    //console.log(`Latitude: ${lat}, longitude: ${lng}`);
                },
                // Error callback function
                (error) => {
                    // Handle errors, e.g. user denied location sharing permissions
                    alert("Error getting user location:", error);
                }
            );
        } else {
            // Geolocation is not supported by the browser
            alert("Geolocation is not supported by this browser.");
        }
    }
});
function ExecuteVendor(mode) {
    let isvalid = 1;
    isvalid = elmToastValidate('txtFirmName', 'text', 'Please Enter Firm Name');
    if (isvalid == 1) {
        isvalid = elmToastValidate('ddlFirmType', 'select', 'Please Select Firm Type');
    }
    if (isvalid == 1) {
        isvalid = elmToastValidate('txtGSTNumber', 'text', 'Please Enter GST Number');
    }
    if (isvalid == 1) {
        isvalid = elmToastValidate('txtGSTRegDate', 'text', 'Please Select GST Registration Date');
    }
    if (isvalid == 1) {
        isvalid = elmToastValidate('txtOwnerName', 'text', 'Please text Enter Owner Name');
    }
    if (isvalid == 1) {
        isvalid = elmToastValidate('txtAddress', 'text', 'Please Enter Address');
    }
    if (isvalid == 1) {
        isvalid = elmToastValidate('txtFactoryAddress', 'text', 'Please Enter Factory Address');
    }
    if (isvalid == 1) {
        isvalid = elmToastValidate('ddlServiceableState', 'select', 'Please Select Serviceable State');
    }
    if (isvalid == 1) {
        isvalid = elmToastValidate('ddlBrandingType', 'select', 'Please Select Branding Type');
    }
    if (isvalid == 1) {
        isvalid = elmToastValidate('txtManagerDetails', 'text', 'Please Enter Manager Details');
    }
    if (isvalid == 1) {
        isvalid = elmToastValidate('txtContactNumber', 'text', 'Please Enter Contact Number');
    }
    if (isvalid == 1) {
        isvalid = elmToastValidate('txtCity', 'text', 'Please Enter City');
    }
    if (isvalid == 1) {
        isvalid = elmToastValidate('txtPinCode', 'text', 'Please Enter Pin Code');
        if (isvalid == 1) {
            isvalid = elmToastValidate('txtPinCode', 'min', 'Minimum 6 digit', '6');
        }
        if (isvalid == 1) {
            isvalid = elmToastValidate('txtPinCode', 'max', 'Maximum 6 digit', '', '6');
        }
    }
    if (isvalid == 1) {
        isvalid = elmToastValidate('txtNameAsPerBank', 'text', 'Please Enter Name As Per Bank');
    }
    if (isvalid == 1) {
        isvalid = elmToastValidate('txtAccountNumber', 'text', 'Please Enter Account Number');
    }
    if (isvalid == 1) {
        isvalid = elmToastValidate('txtIFSC', 'text', 'Please Enter IFSC');
    }
    if (isvalid == 1) {
        isvalid = elmToastValidate('txtBankBranch', 'text', 'Please Enter Bank Branch');
    }
    if (isvalid == 1) {
        isvalid = elmToastValidate('txtMSMENumber', 'text', 'Please Enter MSME Number');
    }
    if (isvalid==1) {
        if ($('#IsTermsConditionChecked').prop('checked') == true) {
            isvalid = 1;
        }
        else {
            isvalid = 0;
            toastr.error('Please Accept the Terms and Conditions.');
            return false;
        }
    }
    if (isvalid == 1) {
        let obj = {};
        obj.ID = $('#hd_VendorID').val();
        obj.FirmName = $('#txtFirmName').val();
        obj.FirmTypeID = $('#ddlFirmType').val();
        obj.GSTNumber = $('#txtGSTNumber').val();
        obj.GSTRegDate = $('#txtGSTRegDate').val();
        obj.OwnerName = $('#txtOwnerName').val();
        obj.Address = $('#txtAddress').val();
        obj.FactoryAddress = $('#txtFactoryAddress').val();
        obj.ServiceableStateID = $('#ddlServiceableState').val();
        obj.BrandingTypeID = $('#ddlBrandingType').val();
        obj.ManagerDetails = $('#txtManagerDetails').val();
        obj.ContactNumber = $('#txtContactNumber').val();
        obj.City = $('#txtCity').val();
        obj.PinCode = $('#txtPinCode').val();
        obj.Latitude = $('#txtLatitude').val();
        obj.Longitude = $('#txtLongitude').val();
        obj.NameAsPerBank = $('#txtNameAsPerBank').val();
        obj.AccountNumber = $('#txtAccountNumber').val();
        obj.IFSC = $('#txtIFSC').val();
        obj.BankBranch = $('#txtBankBranch').val();
        obj.MSMENumber = $('#txtMSMENumber').val();
        obj.IsTermsConditionChecked = $('#IsTermsConditionChecked').prop('checked');
        obj.Mode = mode;
        console.log(obj);
        $.ajax({
            url: '/SecureZone/Transaction/ExecuteVendor',
            type: 'POST',
            dataType: 'JSON',
            data: { objModel: obj },
            success: function (res) {
                console.log(res);
                vendordoc.init_upload(res.Table[0].ID);

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
        })
    }
}
function GetVendorByID() {
    let obj = {};
    obj.Mode = "Get_Vendor_By_ID";
    obj.ID = $('#hd_VendorID').val();
    console.log(obj);
    $.ajax({
        url: '/SecureZone/Transaction/ExecuteVendor',
        type: 'POST',
        dataType: 'JSON',
        data: { objModel: obj },
        success: function (res) {
            let data = res.Table[0];
            $('.applyselect').select2("destroy");
            $('#txtFirmName').val(data.FirmName);
            $('#ddlFirmType').val(data.FirmTypeID);
            $('#txtGSTNumber').val(data.GSTNumber);
            $('#txtGSTRegDate').val(data.GSTRegDate);
            $('#txtOwnerName').val(data.OwnerName);
            $('#txtAddress').val(data.Address);
            $('#txtFactoryAddress').val(data.FactoryAddress);
            $('#ddlServiceableState').val(data.ServiceableStateID);
            $('#ddlBrandingType').val(data.BrandingTypeID);
            $('#txtManagerDetails').val(data.ManagerDetails);
            $('#txtContactNumber').val(data.ContactNumber);
            $('#txtCity').val(data.City);
            $('#txtPinCode').val(data.PinCode);
            $('#txtLatitude').val(data.Latitude);
            $('#txtLongitude').val(data.Longitude);
            $('#txtNameAsPerBank').val(data.NameAsPerBank);
            $('#txtAccountNumber').val(data.AccountNumber);
            $('#txtIFSC').val(data.IFSC);
            $('#txtBankBranch').val(data.BankBranch);
            $('#txtMSMENumber').val(data.MSMENumber);
            $('#hd_VendorID').val(data.ID);
            $(".applyselect").select2();
            if (data.IsTermsConditionChecked == 1) {
                obj.IsTermsConditionChecked = $('#IsTermsConditionChecked').prop('checked', true);
            }
            else {
                obj.IsTermsConditionChecked = $('#IsTermsConditionChecked').prop('checked', false);
            }
            $('#headerTitle').html("Update Vendor");
            $('#footer').html(`<button class="btn btn--success" id="btn_Update">Update</button>
    <a class="btn btn--danger" href="/SecureZone/Dashboard/Index">Cancel</a>`);

            vendordoc.init(1, 'VENDOR_CREATION', 'tbl_VendorDoc', 1, 1, $('#hd_VendorID').val());
            $('#btn_Update').on('click', function () {
                ExecuteVendor("Update");
            });
        }
    });
}

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