module.export = $(document).ready(function() {
	var elem, elem_item;
	$('#review .selector').length === 0 ? elem = $('#edit .selector') : elem = $('#review .selector');
	$('#review .selector .item').length === 0 ? elem_item = $('#edit .selector .item') : elem_item = $('#review .selector .item');

	/**
	 * 下拉菜单的控制		
	 */
	 elem.on('click', function(event) {
	 	event.stopPropagation(); 
	 	if($(this).parent().hasClass('active') === false){
	 		$(this).parent().addClass('active');
	 		$(this).children('.lists').addClass('active')
	 	}else {
	 		$(this).parent().removeClass('active');
	 		$(this).children('.lists').removeClass('active')
	 	}

	 });

	 $(window).on('click', function(event) {
	 	if(elem.parent().hasClass('active') === true){
	 		elem.parent().removeClass('active');
	 		elem.children('.lists').removeClass('active')
	 	}
	 });

	/**
	 * 下拉菜单的选择
	 */
	 elem_item.on('click', function(event) {
	 	$(this).parent().siblings('input').val($(this).html())
	 	$(this).parent().siblings('input').attr('data-id', $(this).attr('data-id'));
	 });

	});