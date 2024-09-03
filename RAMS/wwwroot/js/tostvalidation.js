function elmToastValidate(elm, elmType, msgError, min, max) {
    var val;
    if (elmType == "text") {
        val = $('#' + elm).val();
        if (val == '' || val == undefined || val.trim() == '') {
            $('#' + elm).focus();
            $('#' + elm).addClass('border-color-red');
            toastr.error(msgError);
            return 0;
        }
        else {
            $('#' + elm).removeClass('border-color-red');
            return 1;

        }
    }
    else if (elmType == "number") {
        val = $('#' + elm).val();
        if (val == '' || val == undefined || val.trim() == '' || val.trim() <= 0) {
            $('#' + elm).focus();
            $('#' + elm).addClass('border-color-red');
            toastr.error(msgError);
            return 0;
        }
        else {
            $('#' + elm).removeClass('border-color-red');
            return 1;
        }
    }
    else if (elmType == "select") {
        val = $('#' + elm).val();
        if (val == 0) {
            $('#' + elm).focus();
            $('#' + elm).addClass('border-color-red');
            toastr.error(msgError);
            return 0;
        }
        else {
            $('#' + elm).removeClass('border-color-red');
            return 1;
        }
    }
    else if (elmType == "min") {
        val = $('#' + elm).val().length;
        if (val < min) {
            $('#' + elm).focus();
            $('#' + elm).addClass('border-color-red');
            toastr.error(msgError);
            return 0;
        }
        else {
            $('#' + elm).removeClass('border-color-red');
            return 1;
        }
    }
    else if (elmType == "max") {
        val = $('#' + elm).val().length;
        if (val > max) {
            $('#' + elm).focus();
            $('#' + elm).addClass('border-color-red');
            toastr.error(msgError);
            return 0;
        }
        else {
            $('#' + elm).removeClass('border-color-red');
            return 1;
        }
    }
    else if (elmType == "PANFormat") {
        $('.PANFormat').focusout(function () {
            if ($(this)[0].value.length > 0) {
                var id = $(this)[0].id;
                var PANNumber = $('#' + id).val();
                var regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
                if (regex.test(PANNumber)) {
                    //toastr.success('PAN Format Valid');
                }
                else {
                    $('#' + id).val('');
                    toastr.warning('Invalid PAN Format');
                }
            }

        });
    }
    else if (elmType == "Alphabets") {
        $('.Alphabets').focusout(function () {
            if ($(this)[0].value.length > 0) {
                var id = $(this)[0].id;
                var ifsc = $('#' + id).val();
                var regex = /^[a-zA-Z]*$/;
                if (regex.test(ifsc)) true;
                else {
                    $('#' + id).val('');
                    toastr.error("Only Alphabets without space Allowed.");
                }
            }

        });
    }
    else if (elmType == "AlphabetsWithSpace") {
        $('.AlphabetsWithSpace').focusout(function () {
            if ($(this)[0].value.length > 0) {
                var id = $(this)[0].id;
                var ifsc = $('#' + id).val();
                var regex = /^[a-zA-Z ]*$/;
                if (regex.test(ifsc)) true;
                else {
                    $('#' + id).val('');
                    toastr.error("Only Alphabets with Space Allowed.");
                }
            }

        });
    }
    else if (elmType == "IFSCFormat") {
        $('.IFSCFormat').focusout(function () {
            if ($(this)[0].value.length > 0) {
                var id = $(this)[0].id;
                var ifsc = $('#' + id).val();
                var regex = /^[A-Z]{4}[0][A-Z0-9]{6}$/;
                if (regex.test(ifsc)) true;
                else {
                    $('#' + id).val('');
                    toastr.error("Enter Valid IFSC code");
                }
            }

        });
    }

    else if (elmType == "GSTINFormat") {
        $('.GSTINFormat').focusout(function () {
            if ($(this)[0].value.length == 15) {
                //  if ($(this)[0].value.length > 0) {
                var id = $(this)[0].id;

                var GSTNumber = $('#' + id).val();
                var regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/;
                if (regex.test(GSTNumber)) true;
                else {
                    $('#' + id).val(''); //kash29122021
                    toastr.error("Enter Valid GSTIN");
                    //"The first 2 digits denote the State Code (01 - 37) as defined in the Code List for Land Regions." +
                    //"The next 10 characters pertain to PAN Number in AAAAA9999X format." +
                    //"13th character indicates the number of registrations an entity has within a state for the same PAN." +
                    //"14th character is currently defaulted to 'Z'" +
                    //"15th character is a checksum digit", "warning");
                }
            } else {
                var id = $(this)[0].id;
                $('#' + id).val(''); //kash29122021
                toastr.error("Enter Valid GSTIN");
            }

        });
    }
    else if (elmType == "EmailFormat") {
        $('.EmailFormat').focusout(function () {
            if ($(this)[0].value.length > 0) {
                var id = $(this)[0].id;
                var PANNumber = $('#' + id).val();
                var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (regex.test(PANNumber)) {
                    //toastr.success('Email Format Valid');
                }
                else {
                    $('#' + id).val('');
                    toastr.warning('Invalid Email Format');
                }
            }

        });
    }
    else if (elmType == "MobileFormat") {
        $('.MobileFormat').focusout(function () {
            if ($(this)[0].value.length > 0) {
                var id = $(this)[0].id;
                var PANNumber = $('#' + id).val();
                var regex = /^[0-9]{10}$/;
                if (regex.test(PANNumber)) {
                    //toastr.success('Mobile No Format Valid');
                }
                else {
                    $('#' + id).val('');
                    toastr.warning('Invalid Mobile No. Format');
                }
            }

        });

        $('.MobileFormat').keypress(function (event) {
            return isNumber(event, this)
        });

        function isNumber(evt, element) {
            var charCode = (evt.which) ? evt.which : event.keyCode
            if (
                //(charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
                //(charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
                (charCode < 48 || charCode > 57))
                return false;
            return true;
        }
    }

    else if (elmType == "MICRFormat") {
        $('.MICRFormat').focusout(function () {
            if ($(this)[0].value.length > 0) {
                var id = $(this)[0].id;
                var MICR = $('#' + id).val();
                var regex = /^[0-9]{9}$/;
                if (regex.test(MICR)) {
                }
                else {
                    $('#' + id).val('');
                    toastr.warning('Invalid MICR Format');
                }
            }

        });

        $('.MobileFormat').keypress(function (event) {
            return isNumber(event, this)
        });

        function isNumber(evt, element) {
            var charCode = (evt.which) ? evt.which : event.keyCode
            if (
                //(charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
                //(charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
                (charCode < 48 || charCode > 57))
                return false;
            return true;
        }
    }

    else if (elmType == "UpperCase") {
        $('.UpperCase').keyup(function () {
            $(this).val($(this).val().toUpperCase());
        });
    }
    else if (elmType == "NumericOnly") {
        $('.NumericOnly').keypress(function (event) {
            return isNumber(event, this)
        });

        function isNumber(evt, element) {
            var charCode = (evt.which) ? evt.which : event.keyCode
            if ((charCode < 48 || charCode > 57))
                return false;
            return true;
        }
    }
    else if (elmType == "NumericWithDecimalOnly") {
        $('.NumericWithDecimalOnly').keypress(function (event) {
            return isNumber(event, this)
        });

        function isNumber(evt, element) {
            var charCode = (evt.which) ? evt.which : event.keyCode
            if (
                //(charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
                (charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
                (charCode < 48 || charCode > 57)) {
                return false;
            } else {

                return true;
            }
        }
    }
    else if (elmType == "OnFocusBlank") {
        $('.OnFocusBlank').focus(function (event) {
            if (this.value > 0) {

            }
            else {
                this.value = "";
            }
        });


    }
    else if (elmType == "AfterDecimal2DigitOnly") {
        $('.AfterDecimal2DigitOnly').focusout(function (event) {
            if (this.value > 0) {

                this.value = parseFloat(this.value).toFixed(2);
            }

        });


    }

    else if (elmType == "msg") {

        toastr.success(msgError);
        return 0;

    }
    else if (elmType == "errormsg") {

        toastr.error(msgError);
        return 0;

    }
    else if (elmType == "warningmsg") {

        toastr.warning(msgError);
        return 0;

    }
    else {
        return 0;
    }
    return 1;
}