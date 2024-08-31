let vendordoc = doc();
$(document).ready(function () {
    $('#btn_Submit').on('click', function () {
        ExecuteVendor("Insert");
    });
    if ($('#hd_VendorID').val() > 0) {
        GetVendorByID();
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
                text: res.Table[0].msg,
                icon: "success", buttonsStyling: !1,
                confirmButtonText: "Ok, got it!",
                customClass: { confirmButton: "btn btn-primary" }
            }).then((function (t) {
                if (t.isConfirmed) {
                    location.href = "/SecureZone/Dashboard/index";
                }
            }));
        }
    })
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
            if (data.IsTermsConditionChecked == 1) {
                obj.IsTermsConditionChecked = $('#IsTermsConditionChecked').prop('checked', true);
            }
            else {
                obj.IsTermsConditionChecked = $('#IsTermsConditionChecked').prop('checked', false);
            }
            $('#headerTitle').html("Update Vendor");
            $('#footer').html(`<button class="btn btn-success" id="btn_Update">Update</button>
    <a class="btn btn-danger" href="/SecureZone/Dashboard/Index">Cancel</a>`);

            vendordoc.init(1, 'VENDOR_CREATION', 'tbl_VendorDoc', 1, 1, $('#hd_VendorID').val());
            $('#btn_Update').on('click', function () {
                ExecuteVendor("Update");
            });
        }
    });
} 