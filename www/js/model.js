function RoseList(){
    this.audio = [];
};

RoseList.prototype.getElement = function(id){
    var audio;
    var i;
    for(i=0; i<this.audio.length; i++){
        audio = this.audio[i];
        if(audio.id == id){
            return(audio);
        }
    }
};

RoseList.prototype.serverURL = "http://leiner.cs-i.brandeis.edu:9000/";

RoseList.prototype.loadModel = function() {
    var myList = this;
    
    // send request to the server for the items in the list
    $.ajax({
        type: "GET",
        url: myList.serverURL + "audios",
    }).done(function(audio) {
        myList.audio = audio;
        audio.map(function(x){x.id=x["_id"];});
        console.log(JSON.stringify(myList.audio));
    });
};

RoseList.prototype.getID = function(title) {
	$.ajax({
		type: "GET",
		url: myList.serverURL + "audios",
	}).done(function(audios) {
		audios.forEach(function(clip) {
			console.log(clip.name);
			if (clip.name == title) {
				console.log("CLIP"+clip._id);
			}
		});
	});

}


RoseList.prototype.getUrl = function(id, to_load, ta){
    var myList = this;
    saveThis = "";
    $.ajax({
        type: "GET",
        url: myList.serverURL + "audios/" + id,
    }).done(function(audio){    
        myList.audio = audio;
        saveThing = JSON.stringify(myList.audio.url);
        console.log(saveThing);
        if (to_load)
        {
             ta.loadAudio(saveThing);
        }
    });
}


/*var testApp = (function($){
    var myList = new RoseList();
    function start(){
        myList.loadModel();
        myList.getID("Thing");
        
     //   url = "53c7e08c50dab16733318fd2";
      //  myList.getUrl(url, true, this);
        //loadAudio(showThis[0]);
    }
    
    /* function playmusic(){
      myList.loadModel();
      var firstFile = myList.audios[0];
      var file = $("#audioPlayer").html(firstFile);
      console.log(firstFile);
    } 


    function loadAudio(saveThis){
        console.log(saveThis);
        saveThis = saveThis.substr(1, saveThis.length-2);
        var ia = document.getElementById("inneraudio");
        var oa = document.getElementById("outeraudio");
        ia.src = saveThis;
        oa.load();
    }

    function accessElement(element){
        var itemTitle = element;
        item = myList.getElement()
    }

    testApp = {
        start: start,
        loadAudio: loadAudio
    }
    return (testApp);
}(jQuery)); */
