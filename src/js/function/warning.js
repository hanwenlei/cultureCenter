module.exports = function warning(string){
	// console.log(string);
	$('#warning').removeClass('active');
	$('#warning').addClass('active').html(string);
	var timer = setTimeout(function(args) {
		$('#warning').removeClass('active');
		clearTimeout(timer);
	}, 2000)
}