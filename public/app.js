
$(".scrape-new").on("click", function(){
	alert("added 20 new articls");
	$.ajax({
		method: "GET",
		url: "/saved.html",
	}).done(function(data){
		console.log(data)
		window.location = "/"
	})
});


