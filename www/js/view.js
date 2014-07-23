/**
 The roseView is responsible for updating all of the HTML
 It is called by the roseApp only and the only thing it calls is jQuery
**/

var roseView = (function($){
    
    function refreshView(myData){

        //refreshTable(myData.items);
        console.log(myData.items);
    }
    
    
    // redraw the table using the current model
    /*function refreshTable(myItems){  
                var rows = "";
                var len = myItems.length;
                console.log("length = "+len);
                for(var n=0; n<len; n++){ 
                    var item = myItems[n];
                    rows = rows + itemToRow(item);
                }

                var itemTableBody = $("#itemTableBody").html(rows);

    } */

    // convert an item into an HTML tr element
    function itemToRow(item){
        var row = 
        "<tr><td>"+item.title+ " " +
        "</td><td>"+ 
            item.artist+ " " +
        "</td><td>"+
            item.period+ " " +
        "</td><td>" +
            item.created+ " " +
        "</td><td>" +
            item.genre+ " " +
        "</td></tr>";
        return row;
    } 
    

    
    
    roseView={
        refreshView: refreshView,

        itemToRow: itemToRow
    };
    
    return(roseView);
    
}(jQuery));