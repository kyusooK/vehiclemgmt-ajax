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
            {"Header": "name", "Name": "name", "Type": "Text", "Align": "Center", "Width":140, "CanEdit":1},  
            {"Header": "email", "Name": "email", "Type": "Text", "Align": "Center", "Width":140, "CanEdit":1},  
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
    fetch("/users", {
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
            row.No = row.id
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
        url: "/users",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(rows)
    });
    retrieve();

}

function saveRow(){
    var rows = sheet.getSaveJson()?.data;
    rows.forEach(row => {
        rows.id = rows.No
        delete rows.No
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
                    url: `/users/${id}`,
                    method: "PATCH",
                    contentType: "application/json",
                    data: JSON.stringify(changedData)
                });
                break;
            case "Deleted":
                var id = rows[i].seq;
                $.ajax({
                    url: `/users/${id}`,
                    method: "DELETE",
                });
                break;
        }     
    }           
}
