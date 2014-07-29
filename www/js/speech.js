
var sp = {

recognize: function(){
        navigator.speechrecognizer.recognize(successCallback, failCallback, 1, "Cordova Speech Recognizer Plugin");
    
        function successCallback(results){
            var result = JSON.stringify(results)
            result = result.substring(2, result.length - 2);
            alert("marked " + results);
            if (result.match("continue") == "continue" || result.match("more")=="more" or result.match("go on") == "go on")
            {
				handler.setContinuePlaying(true);
			}
			else if (result.match("stop") == "stop" || result.match("enough") == "enough" || result.match("pause") == "pause")
			{
				handler.setContinuePlaying(false);
			}
			else
			{
				handler.load(result);
			}
            window.open(url);
        }
    
        function failCallback(error){
            alert("NO!!");
            console.log("Error: " + error);
        }
    }

}
