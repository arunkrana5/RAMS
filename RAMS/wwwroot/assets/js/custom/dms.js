function Base64ToBytes(base64) {

    var s = window.atob(base64);
    var bytes = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) {
        bytes[i] = s.charCodeAt(i);
    }
    return bytes;
};

function DownloadFile(filename, ExportedFileName = "MyFile", filetype = "Default") {

    $.ajax({
        type: "POST",
        url: "/Common/UploadDownload/ProcessDownload",
        data: Object.assign({ id: filename, filetype: filetype, ExportedFileName: ExportedFileName }),
        dataType: "text",
        success: function (r) {
            var filename = r.split("####")[1];
            var bytesName = r.split("####")[0];
            //Convert Base64 string to Byte Array.
            var bytes = Base64ToBytes(bytesName);
            //Convert Byte Array to BLOB.
            var blob = new Blob([bytes], { type: "application/octetstream" });
            //Check the Browser type and download the File.
            var isIE = false || !!document.documentMode;
            if (isIE) {
                window.navigator.msSaveBlob(blob, filename);
            } else {
                var url = window.URL || window.webkitURL;
                link = url.createObjectURL(blob);
                var a = $("<a />");
                a.attr("download", filename);
                a.attr("href", link);
                $("body").append(a);
                a[0].click();
                $("body").remove(a);
            }

        },
        error: function (response) {
            toastr.error('Error occur while downloading. Contact administrator.');
        }
    });

}


///***Common Document Upload ****///

function ViewDocument(docid, filename) {

    $.ajax({
        url: '/SecureZone/UploadDownload/VerifyDocument',
        method: 'POST',
        dataType: 'JSON',
        data: { id: docid },
        beforeSend: function () {
            loader_show();
        },
        success: function (res) {
            loader_hide();
            let iframe = '';
            if (res.data == '') {
                iframe = `<iframe style="height:80vh;width:100%" id="DocumentIframe" src="/SecureZone/UploadDownload/ViewDocument?id=` + docid + `"  frameborder="1"></iframe>`;

                let str = ` 
                    <div class="modal fade" id="DocModalView" tabindex="-1" role="dialog" aria-labelledby="DocModalViewLabel" aria-hidden="true">
                      <div class="modal-dialog modal-xl" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                                    <div class="col-md-6">
                                        <h5 class="modal-title" id="DocModalViewLabel">Document Viewer</h5>
                                    </div>
                                    <div class="col-md-6 d-flex justify-content-end">
                                        <button class="btn btn-success btn-sm" onclick="DownloadFile(` + docid + `,'` + filename + `')"><i class="fa fa-download"></i> Download</button>
                                        <button type="button" class="btn btn-danger btn-sm" data-bs-dismiss="modal" aria-label="Close" style="margin-left:5px;">
                                          <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>  
                          </div>
                          <div class="modal-body">
                            `+ iframe + `
                          </div>
                          <div class="modal-footer">
                            <button class="btn btn-success btn-sm" onclick="DownloadFile(` + docid + `,'` + filename + `')"><i class="fa fa-download"></i> Download</button>
                            <button type="button" class="btn btn-danger btn-sm" data-bs-dismiss="modal">Close</button> 
                          </div>
                        </div>
                      </div>
                    </div>

                `;



                $('body').append(str);

                $('#DocModalView').modal({
                    show: 'true',
                    backdrop: 'static'
                });

                $('#DocModalView').modal('show');

                $('#DocModalView').on('hidden.bs.modal', function () {

                    $('#DocModalView').remove();
                });

            } else {
                var reader = new FileReader();
                reader.onloadend = function (event) {
                    var arrayBuffer = reader.result;


                    var options = { type: 'array' };
                    var workbook = XLSX.read(arrayBuffer, options);

                    var sheetName = workbook.SheetNames
                    var sheet = workbook.Sheets[sheetName]
                    iframe = XLSX.utils.sheet_to_html(sheet);
                    let str = ` 
                        <div class="modal fade" id="DocModalView" tabindex="-1" role="dialog" aria-labelledby="DocModalViewLabel" aria-hidden="true">
                          <div class="modal-dialog modal-xl" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <div class="col-md-6">
                                        <h5 class="modal-title" id="DocModalViewLabel">Document Viewer</h5>
                                    </div>
                                    <div class="col-md-6 d-flex justify-content-end">
                                        <button class="btn btn--success btn-sm" onclick="DownloadFile(` + docid + `,'` + filename + `')"><i class="fa fa-download"></i> Download</button>
                                        <button type="button" class="btn btn-outline-secondary btn-sm ml-2" data-bs-dismiss="modal" aria-label="Close">
                                          <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>  
                              </div>
                              <div class="modal-body" id="DocumentPreviewerModal">
                                <div class="row">
                                    <div class="col-md-12 table-responsive">`+ iframe + `</div>
                                </div>
                                
                              </div>
                              <div class="modal-footer">
                                <button class="btn btn--success btn-sm" onclick="DownloadFile(` + docid + `,'` + filename + `')"><i class="fa fa-download"></i> Download</button>
                                <button type="button" class="btn btn-secondary btn-sm ml-2" data-bs-dismiss="modal">Close</button> 
                              </div>
                            </div>
                          </div>
                        </div>

                    `;



                    $('body').append(str);

                    $('#DocModalView').modal({
                        show: 'true',
                        backdrop: 'static'
                    });

                    $('#DocumentPreviewerModal table').addClass('table');

                    $('#DocModalView').modal('show');

                    $('#DocModalView').on('hidden.bs.modal', function () {

                        $('#DocModalView').remove();
                    });
                };

                var bytes = Base64ToBytes(res.data);
                //Convert Byte Array to BLOB.
                var blob = new Blob([bytes], { type: "application/octetstream" });
                reader.readAsArrayBuffer(blob);
            }

        }
    });


}

let doc = function () {
    AttachmentCounter = 0;
    let doc_obj = {

        init: function (FormID, ModuleCode, div_id, isEditMode = 0, enableDelete = 1, ReferenceID = '', previousDoc = {}) {
            if (typeof FormID != 'undefined' && !isNaN(FormID) && typeof ModuleCode != 'undefined') {
                FormID = parseInt(FormID);
                doc_obj.ModuleCode = ModuleCode;
                doc_obj.FormID = FormID;
                doc_obj.ModuleCodeM = ModuleCode;

                doc_obj.getDocumentList();
                doc_obj.AttachmentID = 0;
                doc_obj.previousDoc = previousDoc;
                let str = `
                          <div class="table-responsive" style="overflow-x:auto;overflow-y:auto">
                            <table class="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th style="width: 5%;">#</th>
                                        <th>Document Type<b style="color:red">*</b></th>
                                        <th>Browse<b style="color:red">*</b></th>
                                        <th>Preview</th>
                                        <th>Remarks</th>
                                    </tr>
                                </thead>
                                    <tbody id="Partial_`+ doc_obj.ModuleCodeM + `_tbody_Attachemnt"></tbody>`;

                if (enableDelete == 1) {

                    str += `
                                <tfoot>
                                    <tr>
                                        <td colspan="5">
                                                <a href="javascript:void(0);" id="Partial_`+ doc_obj.ModuleCodeM + `_a_AddnewAttachement"><i class="fa fa-plus-circle"></i> Add New Attachement</a>
                                        </td>
                                    </tr>
                                </tfoot>`;
                }
                str += `
                            </table>
                        </div>`;

                $('#' + div_id).html(str);


                $('#Partial_' + doc_obj.ModuleCodeM + '_tbody_Attachemnt').on('change', '.file', function () {
                    var id = this.id.slice(14);
                    var id_arr = this.id.split('_');
                    var id = id_arr[id_arr.length - 1];
                    if (this.files[0].type == 'image/jpeg') {
                        $('#Partial_' + doc_obj.ModuleCodeM + '_div_Preview_' + id).html('<a href="' + window.URL.createObjectURL(this.files[0]) + '" target="blank"><img width="50" src="' + window.URL.createObjectURL(this.files[0]) + '" /></a>');
                    }
                    else {
                        $('#Partial_' + doc_obj.ModuleCodeM + '_div_Preview_' + id).html('<a href="' + window.URL.createObjectURL(this.files[0]) + '" target="blank"><i class="fa fa-paperclip"></i></a>');
                    }
                });
                if (enableDelete == 1) {
                    $("#Partial_" + doc_obj.ModuleCodeM + "_a_AddnewAttachement").click(function () {
                        var isValid = doc_obj.AttachmentValidationAfterTakeValue();
                        if (isValid) {
                            doc_obj.AddNewAttachment(1, 0, null);
                        }
                    });

                }

                if (isEditMode == 1) {

                    let params = {};
                    params.ReferenceID = ReferenceID;
                    params.FormID = FormID;
                    params.ModuleName = ModuleCode;
                    $.ajax({
                        url: '/SecureZone/UploadDownload/GetPreviousUploadedDocList',
                        method: 'POST',
                        dataType: 'JSON',
                        data: params,
                        async: false,
                        beforeSend: function () {
                            doc_obj.previousDoc = {};
                            loader_show();
                        },
                        success: function (res) {
                            loader_hide();
                            if (res.data.length != 0) {
                                doc_obj.previousDoc = res.data;
                                doc_obj.AddNewAttachment(enableDelete, 1, doc_obj.previousDoc);
                            }
                        }

                    });
                }

            } else {
                console.error('Unable to Locate FormID OR ModuleCode in Initializer');
            }
            $('#btnUploadFiles').on('click', function (e) {
                e.preventDefault();
                doc_obj.init_upload();
            });
        },
        getDocumentList: function () {
            let params = {
                FormID: doc_obj.FormID,
                ModuleCode: doc_obj.ModuleCode
            }
            $.ajax({
                url: '/SecureZone/UploadDownload/GetDocumentConfigByFormID',
                method: 'POST',
                dataType: 'JSON',
                beforeSend: function () {
                    doc_obj.DocListObj = {};
                    loader_show();
                },
                data: params,
                success: function (res) {
                    loader_hide();
                    if (res.data.length != 0) {
                        doc_obj.DocList = res.data;
                        $.each(res.data, function (k, v) {
                            doc_obj.DocListObj[v.documentID] = v;
                        });
                    } else {
                        toastr.error('Unable to find related Documents');
                    }
                }
            });
        },
        AddNewAttachment: function (isButtonClick, IsEditMode, data) {
            AttachmentCounter = AttachmentCounter + 1;
            var k = AttachmentCounter;
            var deleteButton = '<a href="javascript:void(0)" class="remove" id="remove_' + k + '" data-id="' + k + '"><i style="color:red;" class="fa fa-minus-circle"></i></a>';
            if (isButtonClick == 0) {
                deleteButton = '';
            }
            if (IsEditMode == 0) {
                AttachmentDOM = '<tr class="Partial_' + doc_obj.ModuleCodeM + '_tr_AttachmentItem Partial_' + doc_obj.ModuleCodeM + '_documentList" data-rid="' + k + '"><td>' + deleteButton + '</td><td><input type="hidden" class="Partial_' + doc_obj.ModuleCodeM + '_hd-AttachmentID" id="Partial_' + doc_obj.ModuleCodeM + '_hd_AttachmentID_' + k + '" value="0"/><input type="hidden" class="Partial_' + doc_obj.ModuleCodeM + '_hd-document-type" id="Partial_' + doc_obj.ModuleCodeM + '_hd_document_type_' + k + '" value="0" /><select id="Partial_' + doc_obj.ModuleCodeM + '_ddl_documenttype_' + k + '" class="form-control Partial_' + doc_obj.ModuleCodeM + '_DocumentType"><option value="0">Document Type</option></select><span class="text-danger" id="Partial_' + doc_obj.ModuleCodeM + '_metadata_' + k + '"></span></td><td><input id="Partial_' + doc_obj.ModuleCodeM + '_txtfileUpload_' + k + '" type="file" class="form-control file" multiple/></td><td><div id="Partial_' + doc_obj.ModuleCodeM + '_div_Preview_' + k + '"></div></td><td><input id="Partial_' + doc_obj.ModuleCodeM + '_txtRemarks_' + k + '" type="test" class="form-control" /></td></tr>';
                $('#Partial_' + doc_obj.ModuleCodeM + '_tbody_Attachemnt').append(AttachmentDOM);
                //getDocumentType(k);
                $("#Partial_" + doc_obj.ModuleCodeM + "_ddl_documenttype_" + k).html('<option value="0">--Select--</option>');
                $.each(doc_obj.DocList, function (i, keyvalue) {
                    $("#Partial_" + doc_obj.ModuleCodeM + "_ddl_documenttype_" + k).append('<option value="' + keyvalue.documentID + '">' + keyvalue.documentName + '</option> ');
                });
                $('#Partial_' + doc_obj.ModuleCodeM + '_ddl_documenttype_' + k).on('change', function () {
                    let val = $('#Partial_' + doc_obj.ModuleCodeM + '_ddl_documenttype_' + k).val();
                    doc_obj.populateLabelsForDocument(val, k);
                });
            }
            if (IsEditMode == 1) {
                var tempdeleteButton = deleteButton;
                deleteButton = '';

                if (data.length > 0) {
                    $.each(data, function (j, keyvalue) {
                        AttachmentCounter = j + 1;
                        k = AttachmentCounter;
                        AttachmentDOM = '<tr class="Partial_' + doc_obj.ModuleCodeM + '_tr_AttachmentItemEdit" data-rid="' + k + '"><td>' + tempdeleteButton + '</td><td><input type="hidden" class="Partial_' + doc_obj.ModuleCodeM + '_hd-AttachmentID" id="Partial_' + doc_obj.ModuleCodeM + '_hd_AttachmentID_' + k + '" value="' + keyvalue.id + '"/><input type="hidden" class="Partial_' + doc_obj.ModuleCodeM + '_hd - document - type" id="Partial_' + doc_obj.ModuleCodeM + '_hd_document_type_' + k + '" value="' + keyvalue.documentID + '" /><select id="Partial_' + doc_obj.ModuleCodeM + '_ddl_documenttype_' + k + '" class="form-control Partial_' + doc_obj.ModuleCodeM + '_DocumentType" style="padding: 0px; margin: 0px; display:none" ><option value="0">Document Type</option></select><span>' + keyvalue.documentName + '</span></td><td><input style="display:none" id="Partial_' + doc_obj.ModuleCodeM + '_txtfileUpload_' + k + '" type="file" class="form - control" multiple /></td><td><div id="Partial_' + doc_obj.ModuleCodeM + '_div_Preview_' + k + '"><a data-here="DownloadFile(' + keyvalue.id + ',\'' + keyvalue.documentName + '_' + keyvalue.fileName + '\')" onclick="ViewDocument(' + keyvalue.id + ',\'' + keyvalue.documentName + '_' + keyvalue.fileName + '\')" href="javascript:void(0)"><i class="fa fa-paperclip"></i></a></div></td><td><input style="display:none" id="Partial_' + doc_obj.ModuleCodeM + '_txtRemarks_' + k + '" type="test" class="form - control" value="' + keyvalue.remarks + '" /><span>' + keyvalue.remarks + '</span></td></tr>';

                        doc_obj.uploaded_docs.push(keyvalue.documentID);
                        $('#Partial_' + doc_obj.ModuleCodeM + '_tbody_Attachemnt').append(AttachmentDOM);
                        //getDocumentType(k);
                        $("#Partial_" + doc_obj.ModuleCodeM + "_ddl_documenttype_" + k).html('<option value="0">--Select--</option>');
                        $.each(doc_obj.DocList, function (i, keyvalue) {
                            $("#Partial_" + doc_obj.ModuleCodeM + "_ddl_documenttype_" + k).append('<option value="' + keyvalue.id + '">' + keyvalue.documentName + '</option> ');
                        });
                        $('#Partial_' + doc_obj.ModuleCodeM + '_ddl_documenttype_' + k).on('change', function () {
                            let val = $('#Partial_' + doc_obj.ModuleCodeM + '_ddl_documenttype_' + k).val();
                            doc_obj.populateLabelsForDocument(val, k);
                        });
                    });

                }
            }
            if (isButtonClick != 0) {
                $('.remove').on('click', function () {
                    //let $this = $(this).parents('tr')[0];
                    let $this = $('#remove_' + k).parents('tr')[0];
                    var id = $(this).data('id');

                    $.confirm({
                        title: 'Confirm!',
                        content: 'Are you sure! You want to Delete Document?',
                        buttons: {
                            Yes: {
                                text: 'Yes',
                                btnClass: 'btn-green',
                                keys: ['enter', 'y'],
                                action: function () {

                                    if (IsEditMode == 1) {

                                        if ($('#Partial_' + doc_obj.ModuleCodeM + '_hd_AttachmentID_' + id).val() > 0) {
                                            let attID = $('#Partial_' + doc_obj.ModuleCodeM + '_hd_AttachmentID_' + id).val();
                                            $.ajax({
                                                url: '/SecureZone/UploadDownload/ProcessDelete',
                                                method: 'POST',
                                                dataType: 'JSON',
                                                data: { AttachmentID: attID },

                                                beforeSend: function () {
                                                    loader_show();
                                                },
                                                success: function (res) {
                                                    console.log(res);
                                                    loader_hide();
                                                    if (res.data == 4) {
                                                        Swal.fire({
                                                            text: res.message,
                                                            icon: "success", buttonsStyling: !1,
                                                            confirmButtonText: "Ok, got it!",
                                                            customClass: { confirmButton: "btn btn-primary" }
                                                        }).then((function (t) {
                                                            if (t.isConfirmed) {
                                                                location.reload();
                                                            }
                                                        }));
                                                        $this.remove();
                                                    } else {
                                                        Swal.fire({
                                                            text: res.message,
                                                            icon: "error", buttonsStyling: !1,
                                                            confirmButtonText: "Ok, got it!",
                                                            customClass: { confirmButton: "btn btn-primary" }
                                                        }).then((function (t) {
                                                            if (t.isConfirmed) {
                                                                location.reload();
                                                            }
                                                        }));
                                                    }
                                                }
                                            });
                                        }

                                    }

                                    if (IsEditMode == 0) {
                                        $this.remove();
                                    }

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


                });
            }
        },
        AttachmentValidationAfterTakeValue: function () {
            var isValid = 1;
            $('#Partial_' + doc_obj.ModuleCodeM + '_tbody_Attachemnt .Partial_' + doc_obj.ModuleCodeM + '_tr_AttachmentItem').each(function (index, tr) {
                var attachemntID = 0;
                var documentTypeID = 0;
                var fileUpload = '';
                var remarks = '';

                $(tr).find('td').each(function (td_index, td) {

                    if (td_index == 1) {
                        doc_obj.AttachmentID = $(td).find(".Partial_" + doc_obj.ModuleCodeM + "_hd-AttachmentID").val();
                        documentTypeID = $(td).find(".form-control").val();
                        if (attachemntID == 0) {
                            if (documentTypeID == 0) {
                                isValid = 0;
                                $(td).find(".form-control").addClass('border-color-red');
                                toastr.error("Please Select Document Type");
                                $(td).find(".form-control").focus();
                                return false;
                            }
                            else {
                                isValid = 1;
                                $(td).find(".form-control").removeClass('border-color-red');
                            }
                        }
                        else {
                            isValid = 1;
                        }
                    }
                    if (doc_obj.AttachmentID == 0) {
                        if (td_index == 2) {
                            if (isValid == 1) {
                                fileUpload = $(td).find(".form-control").val();
                                if (fileUpload == '' || fileUpload == undefined || fileUpload == NaN) {
                                    isValid = 0;
                                    $(td).find(".form-control").addClass('border-color-red');
                                    toastr.error("Please Upload the document");
                                    $(td).find(".form-control").focus();
                                    return false;
                                }
                                else {
                                    isValid = 1;
                                    $(td).find(".form-control").removeClass('border-color-red');
                                }
                            }
                        }
                        if (td_index == 3) {
                            Remarks = $(td).find(".form-control").val();
                        }
                    }
                    else {
                        isValid = 1;
                    }
                })
            })
            if (isValid == 1) {
                return true;
            }
            else {
                return false;
            }
        },
        populateLabelsForDocument: function (val, rowid) {
            let spanid = 'Partial_' + doc_obj.ModuleCodeM + '_metadata_' + rowid;
            let text = '';
            $('#' + spanid).html(text);
            if (val in doc_obj.DocListObj) {
                //Populate Maximum File Size Allowed Info
                text = 'Max File Size Allowed: ' + doc_obj.DocListObj[val].documentSize + ' MB';
                $('#' + spanid).html(text);
            }
        },
        check_if_document_present: function () {
            let doc_present = false;
            let isValid = 1;
            $('.Partial_' + doc_obj.ModuleCodeM + '_documentList').each(function (k, v) {
                let rowid = $(this).data('rid');
                if (isValid == 1) {

                    let documentid = $('#Partial_' + doc_obj.ModuleCodeM + '_ddl_documenttype_' + rowid).val();
                    if (documentid == 0) {
                        isValid = 0;
                        toastr.error('Please Select Document Type');
                        $('#Partial_' + doc_obj.ModuleCodeM + '_ddl_documenttype_' + rowid).focus();
                    }
                    let file = $('input[id="Partial_' + doc_obj.ModuleCodeM + '_txtfileUpload_' + rowid + '"]')[0].files[0];

                    if (typeof file == 'undefined' && isValid == 1) {
                        isValid = 0;
                        toastr.error('Please Select File to Upload');
                        $('input[id="Partial_' + doc_obj.ModuleCodeM + '_txtfileUpload_' + rowid + '"]').focus();
                    }

                    if (isValid == 1) {
                        doc_present = true;
                        isValid = 0;
                    }

                }
            });

            return doc_present;

        },
        init_upload: function (ReferenceID) {
            if (typeof ReferenceID != 'undefined') {
                let params = [];
                let i = 0;
                let isValid = 1;
                $('.Partial_' + doc_obj.ModuleCodeM + '_documentList').each(function (k, v) {
                    let rowid = $(this).data('rid');
                    if (isValid == 1) {

                        let documentid = $('#Partial_' + doc_obj.ModuleCodeM + '_ddl_documenttype_' + rowid).val();
                        if (documentid == 0) {
                            isValid = 0;
                            toastr.error('Please Select Document Type');
                            $('#Partial_' + doc_obj.ModuleCodeM + '_ddl_documenttype_' + rowid).focus();
                        }
                        let file = $('input[id="Partial_' + doc_obj.ModuleCodeM + '_txtfileUpload_' + rowid + '"]')[0].files[0];

                        if (typeof file == 'undefined' && isValid == 1) {
                            isValid = 0;
                            toastr.error('Please Select File to Upload');
                            $('input[id="Partial_' + doc_obj.ModuleCodeM + '_txtfileUpload_' + rowid + '"]').focus();
                        }

                        let remarks = $('#Partial_' + doc_obj.ModuleCodeM + '_txtRemarks_' + rowid).val();


                        let temp = {};
                        temp.file = file;
                        temp.documentid = documentid;
                        temp.remarks = remarks;
                        params.push(temp);

                    }
                });

                let formdata = new FormData();

                $.each(params, function (k, v) {
                    formdata.append('file_' + k, v.file);
                    formdata.append('documentID_' + k, v.documentid);
                    formdata.append('remarks_' + k, v.remarks);
                });
                formdata.append('ReferenceID', ReferenceID);
                formdata.append('FormID', doc_obj.FormID);
                formdata.append('ModuleCode', doc_obj.ModuleCode);

                let req = $.ajax({
                    url: '/SecureZone/UploadDownload/ProcessUpload',
                    method: 'POST',
                    dataType: 'JSON',
                    data: formdata,
                    async: false,
                    processData: false,
                    contentType: false,
                    beforeSend: function () {
                        loader_show();
                    },
                    success: function (res) {
                        loader_hide();

                    }
                });
                let ret_var = false;
                req.done(function (res) {

                    if (res.status == true) {
                        $('#Partial_' + doc_obj.ModuleCodeM + '_tbody_Attachemnt').html('');
                        if (res.message != '') {
                            Swal.fire({
                                text: res.message,
                                icon: "success", buttonsStyling: !1,
                                confirmButtonText: "Ok, got it!",
                                customClass: { confirmButton: "btn btn-primary" }
                            }).then((function (t) {
                                if (t.isConfirmed) {
                                    location.reload();
                                }
                            }));
                        }
                        ret_var = true;
                        return ret_var;
                    } else if (res.status == false) {
                        Swal.fire({
                            text: res.message,
                            icon: "error", buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: { confirmButton: "btn btn-primary" }
                        }).then((function (t) {
                            if (t.isConfirmed) {
                                location.reload();
                            }
                        }));
                    }

                });

                return ret_var;

            } else {
                console.error('Unable to Locate ReferenceID in Upload Call');
            }
        },

    }

    doc_obj.uploaded_docs = [];

    //return doc_obj.init();
    return doc_obj;

}

///***Common Upload Module ***///