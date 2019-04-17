$(".btn btn-danger scrape-new").on("click", function(){
	$.ajax({
		method: "GET",
		url: "/saved.html",
	}).done(function(data){
		console.log(data)
		window.location = "/"
	})
});


