function hideDivs() {
    var string = "_categories";
    var array = ["original", "artist", "piece", "archive"];
    array.forEach(function(category){
        document.getElementById(category+string).style.visibility = "hidden";
    });
}

function showDiv(div_to_show)
{
    document.getElementById(div_to_show+"_categories").style.visibility = "visible";
}


var handler = {



load: function(result)
{
            result = result.toLowerCase();

            var painting_names = ["blue white", "forget it forget me", "starry night"];

            var original = ["about the artist", "about the piece", "brandeis archives"];

            var piece = ["medium", "style"];
            
            var artist = ["biography", "career"];
            
            var archive = ["hear the artist"];

            painting_names.forEach(function(name) {
                    if (result.search(name) > -1)
                    {
                        alert("painting change to "+name);
                        new_title = name.split(' ')[0];
                        document.getElementById("current_painting").src = new_title+".jpg";
                        document.getElementById("current_title").innerHTML = new_title;
                        //change div back to original_categories
                        hideDivs();
                        showDiv("original");
                        return;
                    }
                });
            if (document.getElementById("original_categories").style.visibility != "hidden")
            {
                original.forEach(function(utterance) {
                    if (result.search(utterance) > -1)
                    {
                    	showDiv("artist");
                        hideDivs();
                        if (result.match(utterance) == "about the artist"){
                            document.getElementById("about-the-artist").load();
                                alert("ready state : "+document.getElementById('about-the-artist').readyState);
                            alert("current src"+document.getElementById('about-the-artist').currentSrc);
                            document.getElementById("about-the-artist").play();
                            showDiv("artist");
                        }
                        else if (result.match(utterance) == "about the piece") {
                            document.getElementById("about-the-piece").load();
                            document.getElementById("about-the-piece").play();
                            showDiv("piece");
                        }
                        else {
                            document.getElementById("brandeis-archives").load();
                            document.getElementById("brandeis-archives").play();
                            showDiv("archive");
                        }
                    }
                });
            }
            else if (document.getElementById("artist_categories").style.visibility != "hidden")
            {
                artist.forEach(function(utterance) {
                    if (result.search(utterance) > -1)
                    {
                        alert("this is utterance "+utterance);
                        if (result.match(utterance) == "biography"){
                            document.getElementById("subcategory").src = "https://s3.amazonaws.com/RamaAudio/aboutartist_born.wav";
                            document.getElementById("subcategory").load();
                            alert("ready state : "+document.getElementById('subcategory').readyState);
                            alert("current src"+document.getElementById('subcategory').currentSrc);
                            document.getElementById("subcategory").play();
                        }
                        else if (result.match(utterance) == "career") {
                            document.getElementById("subcategory").src = "https://s3.amazonaws.com/RamaAudio/aboutartist_fieldmovement.wav";
                            document.getElementById("subcategory").load();
                              alert("ready state : "+document.getElementById('subcategory').readyState);
                            alert("current src"+document.getElementById('subcategory').currentSrc);
                            document.getElementById("subcategory").play();
                        }
                    }
                });
            }
            else if (document.getElementById("piece_categories").style.visibility != "hidden")
            {
                piece.forEach(function(utterance) {

                    if (result.search(utterance) > -1)
                    {
                        if (result.match(utterance) == "style"){
                            alert("style should play now");
                            document.getElementById("subcategory").src = "https://s3.amazonaws.com/RamaAudio/aboutpiece_style.wav";
                            document.getElementById("subcategory").load();
                            alert("ready state : "+document.getElementById('subcategory').readyState);
                            alert("current src"+document.getElementById('subcategory').currentSrc);
                            document.getElementById("subcategory").play();
                        }
                        else if (result.match(utterance) == "medium") {
                            document.getElementById("subcategory").src = "https://s3.amazonaws.com/RamaAudio/aboutpiece_materialsdimensions.wav";
                            document.getElementById("subcategory").load();

                            document.getElementById("subcategory").play();
                        }
                    }
                });
            }
            else if (document.getElementById("archive_categories").style.visibility != "hidden")
            {
                archive.forEach(function(utterance) {
                    
                    if (result.search(utterance) > -1)
                    {
                        if (result.match(utterance) == "hear the artist"){
                            document.getElementById("subcategory").src = "quotes.wav"
                            document.getElementById("subcategory").load();

                            document.getElementById("subcategory").play();
                        }
                
                    }
                });
            }
}

}