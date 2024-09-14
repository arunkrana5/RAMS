$(document).ready(function () {
    GetPJPPlanList();
    loader_hide();
});
function GetPJPPlanList() {
    let obj = {};
    obj.Proc = "Spu_GetPJP_Plan";
    $.ajax({
        url: '/SecureZone/Transaction/ExecutePJPPlan',
        type: 'POST',
        dataType: 'JSON',
        data: { objModel: obj },
        beforeSend: function () {
            loader_show();
        },
        success: function (res) {
            loader_hide();
            console.log(res);
            if (res != null) {
                if (res.Table.length > 0) {
                    let data = res.Table;
                    let html = ``;
                    $.each(data, function (k, v) {
                        html += `
                            <tr>
                                <td><a onclick="DeletePJPPLan(` + v.ID + `)" style="cursor:pointer;"><i class="fa fa-trash" style="color:red;"></i></a></td>
                                <td>` + v.PlanDate + `</td>
                                <td>` + v.VisitDate + `</td>
                                <td>` + v.EmployeeName + `</td>
                                <td>` + v.RouteNumber + `</td>
                                <td>` + v.RouteType + `</td>
                                <td>` + v.VendorName + `</td>
                                <td>` + v.CreatedBy + `</td>
                                <td>` + v.CreatedDate + `</td>
                                <td>` + v.ModifiedBy + `</td>
                                <td>` + v.ModifiedDate + `</td>
                                <td>` + v.IPAddress + `</td>
                            </tr>
                        `;
                    });
                    $('#tbody_PJPPlan').html(html);
                }
                else {
                    $('#tbody_PJPPlan').html(``);
                }
            }
            else {
                toastr.error("Something went wrong !");
            }
            new DataTable('#tbl_PJPPlan');
        }
    });
}