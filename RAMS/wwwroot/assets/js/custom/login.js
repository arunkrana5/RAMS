"use strict"; var KTSigninGeneral = function () {
    var e, t, i; return {
        init: function () {
            e = document.querySelector("#kt_sign_in_form"), t = document.querySelector("#kt_sign_in_submit"), i = FormValidation.formValidation(e, { fields: { username: { validators: { notEmpty: { message: "User Name is required" } } }, password: { validators: { notEmpty: { message: "The password is required" } } } }, plugins: { trigger: new FormValidation.plugins.Trigger, bootstrap: new FormValidation.plugins.Bootstrap5({ rowSelector: ".fv-row", eleInvalidClass: "", eleValidClass: "" }) } }), t.addEventListener("click", (function (n) {
                n.preventDefault(), i.validate().then((function (i) {
                    var x = false;
                    var SignInEntity = {};
                    SignInEntity.UserName = $('#id').val();
                    SignInEntity.Password = $('#pwd').val();
                    $.ajax({
                        type: 'POST',
                        url: '/Authentication/Account/Login',
                        dataType: 'json',
                        data: { Modal: SignInEntity, Command: "Submit" },
                        async: false,
                        //data: { countryID: $("#Country_CountryId").val() },
                        success: function (response) {
                            console.log(response);
                            x = response.status;
                        },
                        error: function (ex) {
                            // alert('Failed to retrieve states.' + ex);
                        }
                    });
                    if (x == true) {
                        "Valid" == i ? (t.setAttribute("data-kt-indicator", "on"), t.disabled = !0, setTimeout((function () {
                            t.removeAttribute("data-kt-indicator"), t.disabled = !1, Swal.fire({ text: "You have successfully logged in!", icon: "success", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn btn-primary" } }).then((function (t) {
                                if (t.isConfirmed) {
                                    e.querySelector('[name="username"]').value = "", e.querySelector('[name="password"]').value = "";
                                    location.href = "/SecureZone/Dashboard/index";
                                }
                            }))
                        }), 2e3)) : Swal.fire({ text: "Sorry, looks like there are some errors detected, please try again.", icon: "error", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn btn-primary" } })
                    }
                    else {
                        "Valid1" == i ? (t.setAttribute("data-kt-indicator", "on"), t.disabled = !0, setTimeout((function () {
                            t.removeAttribute("data-kt-indicator"), t.disabled = !1, Swal.fire({ text: "You have successfully logged in!", icon: "success", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn btn-primary" } }).then((function (t) {
                                if (t.isConfirmed) {
                                    e.querySelector('[name="username"]').value = "", e.querySelector('[name="password"]').value = "";
                                    // var i = e.getAttribute("data-kt-redirect-url");
                                    // i && (location.href = i)
                                    location.href = "/SecureZone/Dashboard/index";
                                }
                            }))
                        }), 2e3)) : Swal.fire({ text: "Sorry, looks like there are some errors detected, please try again.", icon: "error", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn btn-primary" } })

                    }
                }))
            }))
        }
    }
}(); KTUtil.onDOMContentLoaded((function () { KTSigninGeneral.init() }));