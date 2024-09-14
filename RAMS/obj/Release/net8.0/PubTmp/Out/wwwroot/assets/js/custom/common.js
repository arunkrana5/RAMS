function GetDropDownList(ID, Doctype) {
    let ddlhtml = `<option value="0">-- Select --</option>`;
    var dataObject = {
        Values: ID,
        doctype: Doctype
    }
    var data = $.ajax({
        url: '/SecureZone/CommonAjax/GetDropDownListJson',
        dataType: "json",
        type: "Post",
        data: dataObject,
        async: false
    });

    $.each(data.responseJSON, function (k, v) {
        ddlhtml += `
             <option value="`+ v.id + `">` + v.name + `</option>
        `;
    });
    return ddlhtml;
}

function ShowVendorModal(id) {
    console.log(id);
    let vendordoc = doc();
    if (id > 0) {
        let obj = {};
        obj.ID = id;
        obj.Mode = "Get_Vendor_By_ID";
        $.ajax({
            url: '/SecureZone/Transaction/ExecuteVendor',
            type: 'POST',
            dataType: 'JSON',
            data: { objModel: obj },
            success: function (res) {
                let data = res.Table[0];
                console.log(data);
                let str = ` 
                    <div class="modal fade" id="ModalView" tabindex="-1" role="dialog" aria-labelledby="ModalViewLabel" aria-hidden="true">
                      <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                          <div class="modal-header">
                              <div class="col-md-6">
                                  <h5 class="modal-title" id="ModalViewLabel">Vendor Details</h5>
                              </div>
                              <div class="col-md-6 d-flex justify-content-end">
                                  <button type="button" class="btn btn-danger btn-sm" data-bs-dismiss="modal" aria-label="Close" style="margin-left:5px;">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                              </div>  
                          </div>
                          <div class="modal-body">
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Firm Name</label>
                                        <input type="text" class="form-control" value="`+ data.FirmName + `" disabled/>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Firm Type</label>
                                        <select class="form-control applyselect" id="ddlFirmType" required disabled>
                                            <option value="0">-- Select --</option>
                                            <option value="1">Pvt Ltd</option>
                                            <option value="2">Company</option>
                                            <option value="3">Proprietorships</option>
                                            <option value="4">Partnerships</option>
                                            <option value="5">Corporations</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>GST Number</label>
                                        <input type="text" class="form-control GSTINFormat" value="`+ data.GSTNumber + `" disabled/>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>GST Registration Date</label>
                                        <input type="date" class="form-control" id="txtGSTRegDate" value="`+ data.GSTRegDate + `" disabled/>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Owner Name</label>
                                        <input type="text" class="form-control" id="txtOwnerName" value="`+ data.OwnerName + `" disabled/>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Address</label>
                                        <input type="text" class="form-control" id="txtAddress" value="`+ data.Address + `" disabled/>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Factory Address</label>
                                        <input type="text" class="form-control" id="txtFactoryAddress" value="`+ data.FactoryAddress + `" disabled/>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Serviceable States</label>
                                        <select class="form-control" id="ddlServiceableState" required disabled>
                                            <option value="`+ data.ServiceableStateID + `">` + data.ServiceableState + `</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Branding Type</label>
                                        <select class="form-control applyselect" id="ddlBrandingType" required disabled>
                                            <option value="`+ data.BrandingTypeID + `">` + data.BrandingType + `</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Manager Details</label>
                                        <input type="text" class="form-control" id="txtManagerDetails" value="`+ data.ManagerDetails + `" required disabled/>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Contact Number</label>
                                        <input type="text" class="form-control MobileFormat" id="txtContactNumber" value="`+ data.ContactNumber + `" required disabled/>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>City</label>
                                        <input type="text" class="form-control" id="txtCity" value="`+ data.City + `" required disabled/>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Pin Code</label>
                                        <input type="text" class="form-control NumericOnly" id="txtPinCode" value="`+ data.PinCode + `" required disabled/>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Latitude</label>
                                        <input type="text" class="form-control" id="txtLatitude" value="`+ data.Latitude + `" required disabled/>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Longitude</label>
                                        <input type="text" class="form-control" id="txtLongitude" value="`+ data.Longitude + `" required disabled/>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Name as per Bank</label>
                                        <input type="text" class="form-control" id="txtNameAsPerBank" value="`+ data.NameAsPerBank + `" required disabled/>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Account Number</label>
                                        <input type="text" class="form-control" id="txtAccountNumber" value="`+ data.AccountNumber + `" required disabled/>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>IFSC</label>
                                        <input type="text" class="form-control UpperCase IFSCFormat" id="txtIFSC" value="`+ data.IFSC + `" required disabled/>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Bank Branch</label>
                                        <input type="text" class="form-control" id="txtBankBranch" value="`+ data.BankBranch + `" required disabled/>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>MSME Number</label>
                                        <input type="text" class="form-control" id="txtMSMENumber" value="`+ data.MSMENumber + `" required disabled/>
                                    </div>
                                </div>
                                </div>
                                <div class="row" id="tbl_VendorDoc"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                `;
                $('body').append(str);
                $('#ddlFirmType').val(data.FirmTypeID);
                vendordoc.init(1, 'VENDOR_CREATION', 'tbl_VendorDoc', 1, 0, data.ID);
                $('#ModalView').modal({
                    show: 'true',
                    backdrop: 'static'
                });
                $('#ModalView').modal('show');
                $('#ModalView').on('hidden.bs.modal', function () {

                    $('#ModalView').remove();
                });
            }
        });
    }


}

function loader_show() {
    $('.loader').show();
}

function loader_hide() {
    $('.loader').hide();
}