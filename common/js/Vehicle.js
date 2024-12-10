$(document).ready(function(){
    var OPT = {
        "Cfg": {
            "SearchMode": 2,
            "HeaderMerge": 3,
            "MessageWidth": 300,
        },
        "Def": {
            "Row": {
            "CanFormula": true
            }
        },
        Cols:[
            {"Header": "No", "Name": "No", "Type": "Int", "Align": "Center", "Width":140, "CanEdit":0},
            {"Header": "status", "Name": "status", "Type": "", "Enum": "|AVAILABLE|IN_USE|UNDER_MAINTENANCE|DECOMMISSIONED", "EnumKeys": "|AVAILABLE|IN_USE|UNDER_MAINTENANCE|DECOMMISSIONED", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "registrationNumber", "Name": "registrationNumber", "Type": "Text", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "make", "Name": "make", "Type": "Text", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "model", "Name": "model", "Type": "Text", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "year", "Name": "year", "Type": "Int", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "driverDistance", "Name": "driverDistance", "Type": "Int", "Align": "Center", "Width":140, "CanEdit":1},  
        ],
        Events: {
            onClick: function(evtParam) {
                var originalRowData = rowData.find(item => item.No === evtParam.row.No);
                var detailData = [];
        
                detailSheet.loadSearchData(detailData);
            }
        }
    };
    
    var detailSheetOptions = {
        "Cfg": {
            "SearchMode": 2,
            "HeaderMerge": 3,
            "MessageWidth": 300,
        },
        Cols:[
        ]
    };

    IBSheet.create({
       id:"sheet",
       el:"sheet_DIV",
       options: OPT
    });
    
    IBSheet.create({
        id:"detailSheet",
        el:"detailSheet_DIV",
        options: detailSheetOptions
    });
   
});

function retrieve(){
    fetch("/vehicles", {
        method: 'GET',
        headers: {
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
            "Content-Type": "application/json"
        }
    }).then(res => {
        return res.json();
    }).then(json => {
        for(var i = 0; i < json.length; i++){
            json[i].No = json[i].id

        }
        
        rowData = json;
        sheet.loadSearchData(json)
    }).catch(error => {
        console.error("에러", error);
    });
}

function addData(){
   sheet.addRow();
}

function deleteData(){
    sheet.deleteRow(sheet.getFocusedRow());
}

function save(data){
    var rows = data;
    rows.id = rows.No
    delete rows.No

    $.ajax({
        url: "/vehicles",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(rows)
    });
    retrieve();

}

function saveRow(){
    var rows = sheet.getSaveJson()?.data;
    for(var i = 0; i < rows.length; i++){
        rows[i].id = rows[i].No
        delete rows[i].No

    }
    
    rowData = rows;

    for(var i=0; i<rows.length;i++){
        switch(rows[i].STATUS){
            case "Changed":
                var rowObj = sheet.getRowById(rows[i].id);
                var changedData = JSON.parse(sheet.getChangedData(rowObj))["Changes"][0];
                changedData.id = rows[i].id
                var id = changedData.id 
                $.ajax({
                    url: `/vehicles/${id}`,
                    method: "PATCH",
                    contentType: "application/json",
                    data: JSON.stringify(changedData)
                });
                break;
            case "Deleted":
                var id = rows[i].id
                $.ajax({
                    url: `/vehicles/${id}`,
                    method: "DELETE",
                });
                break;
        }     
    }           
}
function submitUpdateVehicleStatus(data){
    const id = data.id;
    fetch(`/vehicles/updateVehicleStatus/{id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
        alert(error);
    });
}           
