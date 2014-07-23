function hideDivs(){
	var string = "_categories";
	var array = ["paintings", "original", "artist", "piece"];
	array.forEach(function(category){
		document.getElementById(category+string).style.visibility = "hidden";
	});
}



function showDiv(div_to_show)
{
	document.getElementById(div_to_show+"_categories").style.visibility = "visible";
}

function piece(title, audio_on_load, image_on_load) {
	this.title = title;
	this.artist = artist;
    this.audio_on_load = audio_on_load;
    this.image_on_load = image_on_load;
    categories = ["about the artist", "about the piece"];
    artist_info = {audio_on_load:"", biography:"", career:""};
    piece_info = {audio_on_load:"", title:"", medium:"", style:"", year:"", dimensions:"", summary:""}; 
}

var current_piece = new piece("", "", "");



var handler = {



load: function(result)
{
	
            result = result.toLowerCase();
            var pieces = [];

            //load database pieces into variable pieces
    		$.ajax({
        		type: "GET",
        		url: "/model/rose",
    		}).done(function(db_pieces) {
    				//each item is a piece
    				db_pieces.forEach(function(item) {
    					pieces[pieces.length] = item;
    				});
					
				if (document.getElementById("paintings_categories").style.visibility != "hidden")
				{
					pieces.forEach(function(piece) {
						var name = piece.title.toLowerCase();
						if (result.search(name) > -1)
						{
							alert(name);
							new_name = name.replace(" ", "_");
							document.getElementById("current").style.visibility = "visible";
							document.getElementById("current_painting").src = new_name+".jpg";
							document.getElementById("current_title").innerHTML = name;
							//change div back to original_categories
							hideDivs();
							showDiv("original");
							current_piece = piece;
						}
					});
				}
				else if (document.getElementById("original_categories").style.visibility != "hidden")
				{
					current_piece.categories.forEach(function(utterance) {
						utterance = utterance.toLowerCase();
						if (result.search(utterance) > -1)
						{
							hideDivs();
							if (result.match(utterance) == "about the artist"){
								document.getElementById("about-the-artist").src = current_piece.artist.audio_on_load;
								showDiv("artist");
								document.getElementById("career").src = current_piece.artist_info.career;								document.getElementById("biography").src = current_piece.artist_info.biography;
								document.getElementById("biography").src = current_piece.artist_info.biography;
								document.getElementById("about-the-artist").play();

							}
							else if (result.match(utterance) == "about the piece") {
								document.getElementById("about-the-piece").src = current_piece.piece_info.audio_on_load;
								showDiv("piece");
								document.getElementById("style").src = current_piece.piece_info.style;
								document.getElementById("medium").src = current_piece.piece_info.medium;
								document.getElementById("about-the-piece").play();

							}
						}
					});
				}
				else if (document.getElementById("artist_categories").style.visibility != "hidden")
				{
					for (prop in current_piece.artist_info) {
						alert(prop);
						if (result.search(prop) > -1)
						{
							
							if (result.match(prop) == "biography"){
								document.getElementById("biography").play();
							}
							else if (result.match(prop) == "career") {
								document.getElementById("career").play();
							}
						}
					}
				}
				else if (document.getElementById("piece_categories").style.visibility != "hidden")
				{
				
					for (prop in current_piece.piece_info) {
						if (result.search(prop) > -1)
						{
							if (result.match(prop) == "style"){
								document.getElementById("style").play();
							}
							else if (result.match(prop) == "medium") {
								alert(utterance);
								document.getElementById("medium").play();
							}
							/*else if (result.match(prop) == "year") {
								alert(utterance);
								document.getElementById("subcategory").src = current_piece.piece_info.year;
								document.getElementById("subcategory").play();
							}
							else if (result.match(prop) == "dimensions") {
								alert(utterance);
								document.getElementById("subcategory").src = current_piece.piece_info.dimensions;
								document.getElementById("subcategory").play();
							}
							else if (result.match(prop) == "summary") {
								alert(utterance);
								document.getElementById("subcategory").src = current_piece.piece_info.summary;
								document.getElementById("subcategory").play();
							}
							else if (result.match(prop) == "title") {
								alert(utterance);
								document.getElementById("subcategory").src = current_piece.piece_info.title;
								document.getElementById("subcategory").play();
							}*/
						
							
						}
					}
				}		
			});					
		}
	

}
