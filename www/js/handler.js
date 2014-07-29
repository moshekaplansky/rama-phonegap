
function hideDivs(){
	var string = "_categories";
	var array = ["paintings", "original", "artist", "piece"];
	array.forEach(function(category){
		document.getElementById(category+string).style.display = "none";
	});
}



function showDiv(div_to_show)
{
	document.getElementById(div_to_show+"_categories").style.display = "block";
}

function piece() {
	this.piece_basics = {title:"", year:"", artist:"", dimensions:"", image:""};
    this.categories = ["about the artist", "about the piece"];
    this.artist_details = {audio_on_load:"", biography:"", career:""};
    this.piece_details = {audio_on_load:"", medium:"", style:"", summary:""}; 
}
function reload(){
	current_piece = "";
}
//{categories: ["about the artist", "about the piece"], piece_basics: {title:"Blue-White", year:1960, artist:"Lichtenstein"}, piece_details:{audio_on_load:"hi.wav", medium:"oil", style:"modenist", summary:"yeah"},artist_details:{audio_on_load:"hi.wav",biography:"life.wav", career:"life.wav"}

var current_piece = new piece();



var handler = {



load: function(result)
{
            result = result.toLowerCase();
            var pieces = [];
            serverURL = "http://leiner.cs-i.brandeis.edu:9000";
			

            //load database pieces into variable pieces
    		$.ajax({
        		type: "GET",
        		url: serverURL + "/pieces",
    		}).done(function(db_pieces) {
    				//each item is a piece
    				db_pieces.forEach(function(item) {
    					pieces[pieces.length] = item;
    				});
				if (document.getElementById("paintings_categories").style.display != "none")
				{
					pieces.forEach(function(piece) {
						var name = piece.piece_basics.title.toLowerCase();
						if (result.search(name) > -1)
						{
							new_name = name.replace(" ", "");
							document.getElementById("current").style.display = "block";
							document.getElementById("current_painting").src = current_piece.picture;
							document.getElementById("current_title").innerHTML = name;
							//change div back to original_categories
							hideDivs();
							showDiv("original");
							alert(JSON.stringify(piece)+JSON.stringify(current_piece);
							current_piece = piece;
							alert("AFTER");
							alert(JSON.stringify(piece)+JSON.stringify(current_piece);

						}
					});
				}
				else if (document.getElementById("original_categories").style.display != "none")
				{
					current_piece.categories.forEach(function(category) {
						category = category.toLowerCase();
						if (result.search(category) > -1)
						{
							hideDivs();
							if (result.match(category) == "about the artist"){
								document.getElementById("audio-player").src = current_piece.artist_details.audio_on_load;
								showDiv("artist");
								document.getElementById("audio-player").play();
							}
							else if (result.match(category) == "about the piece") {
								document.getElementById("audio-player").src = current_piece.piece_details.audio_on_load;
								showDiv("piece");
								document.getElementById("audio-player").play();

							}
						}
					});
				}
				else if (document.getElementById("artist_categories").style.display != "none")
				{
					for (prop in current_piece.artist_details) {
						if (result.search(prop) > -1)
						{							
							if (result.match(prop) == "biography"){
								document.getElementById("audio-player").src = current_piece.artist_details.biography;
								document.getElementById("audio-player").play();
							}
							else if (result.match(prop) == "career") {
								document.getElementById("audio-player").src = current_piece.artist_details.career;
								document.getElementById("audio-player").play();
							}
						}
					}
				}
				else if (document.getElementById("piece_categories").style.display != "none")
				{
				
					for (prop in current_piece.piece_details) {
						if (result.search(prop) > -1)
						{
							if (result.match(prop) == "style"){
								document.getElementById("audio-player").src = current_piece.piece_details.style;
								document.getElementById("audio-player").play();
							}
							else if (result.match(prop) == "medium") {
								document.getElementById("audio-player").src = current_piece.piece_details.medium;
								document.getElementById("audio-player").play();
							}						
						}
					}
				}		
			});					
		}
	

}
