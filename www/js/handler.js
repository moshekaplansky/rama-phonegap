
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

function piece() {
	this.piece_basics = {title:"", year:"", artist:"", dimensions:"", image:""};
    this.categories = ["about the artist", "about the piece"];
    this.artist_details = {audio_on_load:"", biography:"", career:""};
    this.piece_details = {audio_on_load:"", medium:"", style:"", summary:""}; 
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
    			
				if (document.getElementById("paintings_categories").style.visibility != "hidden")
				{
					pieces.forEach(function(piece) {
						var name = piece.piece_basics.title.toLowerCase();
						if (result.search(name) > -1)
						{
							alert(JSON.stringify(piece)+"="+result);
							new_name = name.replace(" ", "");
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
					alert(current_piece.categories);
					current_piece.categories.forEach(function(category) {
						category = category.toLowerCase();
						if (result.search(category) > -1)
						{
							alert("hide");
							
							hideDivs();
							if (result.match(category) == "about the artist"){
								alert("show artist");
								document.getElementById("about-the-artist").src = current_piece.artist_details.audio_on_load;
								showDiv("artist");
								alert(current_piece.artist_details);
								document.getElementById("career").src = current_piece.artist_details.career;								
								document.getElementById("biography").src = current_piece.artist_details.biography;
								document.getElementById("about-the-artist").play();

							}
							else if (result.match(category) == "about the piece") {
								alert("show piece");
								document.getElementById("about-the-piece").src = current_piece.piece_details.audio_on_load;
								showDiv("piece");
								document.getElementById("style").src = current_piece.piece_details.style;
								document.getElementById("medium").src = current_piece.piece_details.medium;
								document.getElementById("summary").src = current_piece.piece_details.summary;
								document.getElementById("about-the-piece").play();

							}
						}
					});
				}
				else if (document.getElementById("artist_categories").style.visibility != "hidden")
				{
					for (prop in current_piece.artist_details) {
						alert("prop:"+prop+" "+result);
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
				
					for (prop in current_piece.piece_details) {
						if (result.search(prop) > -1)
						{
							if (result.match(prop) == "style"){
								document.getElementById("style").play();
							}
							else if (result.match(prop) == "medium") {
								document.getElementById("medium").play();
							}
							else if (result.match(prop) == "summary") {
								document.getElementById("summary").play();
							}							
						}
					}
				}		
			});					
		}
	

}
