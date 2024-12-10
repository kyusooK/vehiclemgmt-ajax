let rowData = [];
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
            {"Header": "requesterName", "Name": "requesterName", "Type": "Text", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "organization", "Name": "organization", "Type": "Text", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "employeeNumber", "Name": "employeeNumber", "Type": "Text", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "officeNumber", "Name": "officeNumber", "Type": "Text", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "mobileNumber", "Name": "mobileNumber", "Type": "Text", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "requestDate", "Name": "requestDate", "Type": "Date","Format": "yyyy-MM-dd", "EmptyValue": "날짜를 입력해주세요", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "approverInfo", "Name": "approverInfo", "Type": "Text", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "approverPosition", "Name": "approverPosition", "Type": "Text", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "usagePurpose", "Name": "usagePurpose", "Type": "Text", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "numberOfPassengers", "Name": "numberOfPassengers", "Type": "Text", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "routeSetting", "Name": "routeSetting", "Type": "Text", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "remarks", "Name": "remarks", "Type": "Text", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "passengerContact", "Name": "passengerContact", "Type": "Text", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "attachedDocuments", "Name": "attachedDocuments", "Type": "Text", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "cancellationReason", "Name": "cancellationReason", "Type": "Text", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "usageCategory", "Name": "usageCategory", "Type": "Enum", "Enum": "|BusinessSupport|ExternalActivity", "EnumKeys": "|BusinessSupport|ExternalActivity", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "carType", "Name": "carType", "Type": "Enum", "Enum": "|Sedan|Van|Truck", "EnumKeys": "|Sedan|Van|Truck", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "mainDepartment", "Name": "mainDepartment", "Type": "Enum", "Enum": "|Seoul|Pohang|Gwangyang", "EnumKeys": "|Seoul|Pohang|Gwangyang", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "operationSection", "Name": "operationSection", "Type": "Enum", "Enum": "|City|Suburb", "EnumKeys": "|City|Suburb", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "operationType", "Name": "operationType", "Type": "Enum", "Enum": "|OneWay|RoundTrip", "EnumKeys": "|OneWay|RoundTrip", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "includeDriver", "Name": "includeDriver", "Type": "Enum", "Enum": "|Yes|No", "EnumKeys": "|Yes|No", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "progressStage", "Name": "progressStage", "Type": "Enum", "Enum": "|All|Received|Rejected|AssignmentCompleted|AssignmentCancelled", "EnumKeys": "|All|Received|Rejected|AssignmentCompleted|AssignmentCancelled", "Align": "Center", "Width":140, "CanEdit":1},  
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
    fetch("/carAssignments", {
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
            
                if (json[i].Period) {
                    json[i].from = json[i].Period.from.split('T')[0];
json[i].to = json[i].Period.to.split('T')[0]
                }
                

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
        url: "/carAssignments",
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

        
                if (rows[i].from && rows[i].to) {
                    rows[i].Period = {
                        from: rows[i].from,
to: rows[i].to
                    };
                    delete rows[i].from;
delete rows[i].to
                }
                
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
                    url: `/carAssignments/${id}`,
                    method: "PATCH",
                    contentType: "application/json",
                    data: JSON.stringify(changedData)
                });
                break;
            case "Deleted":
                var id = rows[i].id
                $.ajax({
                    url: `/carAssignments/${id}`,
                    method: "DELETE",
                });
                break;
        }     
    }           
}
function searchResult(params) {
    const allEmpty = !params.requesterName &&!params.employeeNumber &&!params.approverPosition ;
    
    if (allEmpty) {
        alert("검색할 내용을 입력하세요.");
        return;
    }
    const queryParams = new URLSearchParams(params).toString();

    $.ajax({
        url: `/carAssignments?${queryParams}`,
        method: 'GET',
        headers: {
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
            "Content-Type": "application/json"
        },
        success: function(results) {
            if (results.length > 0) {
                sheet.loadSearchData(results);
            } else {
                alert("해당 조건에 대한 결과가 없습니다.");
            }
        },
        error: function(xhr, status, error) {
            console.error("에러", error);
            alert("데이터를 가져오는 중 오류가 발생했습니다.");
        }
    });
}
