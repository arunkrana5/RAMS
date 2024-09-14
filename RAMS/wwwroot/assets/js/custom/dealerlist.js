$(document).ready(function () {
    GetDealerList();
    loader_hide();
});
function GetDealerList() {
    $('#tbl_Dealer').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "/SecureZone/Master/GetDealerList",  // URL to your server-side script
            "type": "POST",
            "data": {}
        },
        "columns": [
            {
                data: "dealerID",
                render: function (data, type, row) {

                    console.log(data, type, row);
                    if (type == 'display') {
                        let html = '';
                        if (row.isActive == true) {
                            html += `<a onclick="ChangeStatus(` + row.dealerID + `,'Master_Dealer')"><i style="color:lightseagreen; cursor:pointer;" class="fa fa-check-circle"></i></a>&nbsp;<a href="/SecureZone/Master/AddDealer?id=` + row.dealerID + `"><i class="fa fa-edit"></i></a>`;
                        }
                        else {
                            html += `<td><a onclick="ChangeStatus(` + row.dealerID + `,'Master_Dealer')"><i style="color:red; cursor:pointer;" class="fa fa-check-circle"></i></a>&nbsp;<a href="/SecureZone/Master/AddDealer?id=` + row.dealerID + `"><i class="fa fa-edit"></i></a>`;
                        }
                        return html;
                    }
                    return data;
                }
            },
            { "data": "dealerName" },
            { "data": "dealerCode" },
            { "data": "dealerType" },
            { "data": "dealerCategory" },
            { "data": "regionName" },
            { "data": "stateName" },
            { "data": "cityName" },
            { "data": "areaName" },
            { "data": "address" },
            { "data": "latitude" },
            { "data": "longitude" },
            { "data": "billingName" },
            { "data": "billingCode" },
            { "data": "createdDate" },
            { "data": "createdBy" },
            { "data": "modifiedDate" },
            { "data": "modifiedBy" },
            { "data": "ipAddress" },
        ]
    });
}
function onSwalBtnClicked(btnId) {
    // Swal.close
    switch (btnId) {
        case 'refresh':
            window.location.reload();
            break;
        case 'list':
            window.location.href = "/SecureZone/Master/Dealers";
            break;
        default:
    }
};