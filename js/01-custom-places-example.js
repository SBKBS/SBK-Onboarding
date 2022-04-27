function runExample3() {
    $("#custom-places").mapsed({
		showOnLoad: 	
		[
			{
				// flag that this place should have the tooltip shown when the map is first loaded
				autoShow: true,
				// flags the user can edit this place
				lat: -23.599637985229492,
				lng: -46.67966842651367,
				name: "Docly",
				street: "R. Gomes de Carvalho, 1306 - Vila Olímpia",
			//s	userData: 99
			},

		]
		
	});									
}


$(document).ready(function() {
	runExample3();
});


