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
            {"Header": "No", "Name": "No", "Type": "Text", "Align": "Center", "Width":140, "CanEdit":0},
            {"Header": "vehicleNumber", "Name": "vehicleNumber", "Type": "Text", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "registrationDate", "Name": "registrationDate", "Type": "Date","Format": "yyyy-MM-dd", "EmptyValue": "날짜를 입력해주세요", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "departure", "Name": "departure", "Type": "Text", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "departureTime", "Name": "departureTime", "Type": "Text", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "accumulatedDistanceBefore", "Name": "accumulatedDistanceBefore", "Type": "", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "destination", "Name": "destination", "Type": "Text", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "arrivalTime", "Name": "arrivalTime", "Type": "Text", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "accumulatedDistanceAfter", "Name": "accumulatedDistanceAfter", "Type": "", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "drivingDistance", "Name": "drivingDistance", "Type": "Int", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "purpose", "Name": "purpose", "Type": "Enum", "Enum": "|DepartmentWork|BusinessTrip|Commute|Event", "EnumKeys": "|DepartmentWork|BusinessTrip|Commute|Event", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "test", "Name": "test", "Type": "Enum", "Enum": "|A|B", "EnumKeys": "|A|B", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": ["Period", "from"], "Name": "from", "Type": "Date", "Format": "yyyy-MM-dd", "EmptyValue": "날짜를 입력해주세요", "Width": 140},
{"Header": ["Period", "to"], "Name": "to", "Type": "Date", "Format": "yyyy-MM-dd", "EmptyValue": "날짜를 입력해주세요", "Width": 140}
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
    fetch("/vehiclePerformances", {
        method: 'GET',
        headers: {
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
            "Content-Type": "application/json"
        }
    }).then(res => {
        return res.json();
    }).then(json => {
        json.forEach(row => {
            row.No = row.registrationId
        
                if (row.Period) {
                    row.from = row.Period.from;
row.to = row.Period.to
                }
                
        });
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
        url: "/vehiclePerformances",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(rows)
    });
    retrieve();

}

function saveRow(){
    var rows = sheet.getSaveJson()?.data;
    rows.forEach(row => {
        rows.registrationId = rows.No
        delete rows.No
    
                if (row.from && row.to) {
                    row.Period = {
                        from: row.from,
to: row.to
                    };
                    delete row.from;
delete row.to
                }
                
    });
    rowData = rows;

    for(var i=0; i<rows.length;i++){
        if(rows[i].id.includes("AR")){
            rows[i].id = rows[i].id.replace(/AR/g, "");
        }
        switch(rows[i].STATUS){
            case "Changed":
                var rowObj = sheet.getRowById(rows[i].id);
                var changedData = JSON.parse(sheet.getChangedData(rowObj))["Changes"][0];
                var id = rows[i].seq;
                $.ajax({
                    url: `/vehiclePerformances/${id}`,
                    method: "PATCH",
                    contentType: "application/json",
                    data: JSON.stringify(changedData)
                });
                break;
            case "Deleted":
                var id = rows[i].seq;
                $.ajax({
                    url: `/vehiclePerformances/${id}`,
                    method: "DELETE",
                });
                break;
        }     
    }           
}
function submitRegisterDrivingLog(data){
    const registrationId = data.registrationId;
    fetch(`http://localhost:8088/vehiclePerformances/registerDrivingLog/{registrationId}`, {
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
