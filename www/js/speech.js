
var sp = {

recognize: function(){
        navigator.speechrecognizer.recognize(successCallback, failCallback, 1, "Cordova Speech Recognizer Plugin");
    
        function successCallback(results){
            var result = JSON.stringify(results)
            result = result.substring(2, result.length - 2);
            alert("marked " + results);
            handler.load(result);
        }
    
        function failCallback(error){
            alert("NO!!");
            console.log("Error: " + error);
        }
    }

}
