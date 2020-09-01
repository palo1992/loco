(function($){

	$(document).on('click', '[data-toggle="lightbox"]', function(event) {
		event.preventDefault();

		$('#ac-lightbox').remove();
		var index = $(this).index('.gallery-item'),
			prevImg = $(this).parent().find(('.gallery-item')).eq(index - 1),
			nextImg = $(this).parent().find(('.gallery-item')).eq(index + 1);

		var lightbox = '<div id="ac-lightbox"></div>';
		$('body').append(lightbox);

		var imgSrc = $(this).attr('href'),
			img  = '<div class="lightbox-img-box">';

		if (index > 0) {
			img += '<div class="lightbox-img-prev gallery-controller" data-index="' + (+index - 1) + '"> < </div>';
		}
		img += '<img class="lightbox-img" src="' + imgSrc + '">';
		if (nextImg.length) {
			img += '<div class="lightbox-img-next gallery-controller" data-index="' + (+index + 1) + '"> > </div>';
		}
		img += '</div>';


		$('#ac-lightbox').append(img);
	});

	$(document).on('click', '.gallery-controller', function() {
		$('.gallery-item').eq($(this).attr('data-index')).click();
	});

	$(document).on('click', '#ac-lightbox', function(data, handler) {
		if (data.target == this) {
			$(this).remove();
		}
	});

	$('.mailform').on('submit', function(e) {
		e.preventDefault();
		var form = $(this);

		var request = $.ajax({
			url :  form.attr('action'),
			type    : 'POST',
			data: form.serialize()
		});
		request.always(function(response) {
			if (response == 'MF000') {
				//OK
				form.find('input').val('');
				form.find('textarea').text('');
				form.parent().prepend($('<h3 class="message-sent-success">Ďakujeme, Vaša správa bola odoslaná</h3>'));
				form.remove();
			}
			if (response == 'MF003') {
				// Mail
				form.prepend($('<h3 class="message-sent-error">E-mail je povinný</h3>'));
			}
			console.log( response );
		});
	});

	$('#menu-expand').on('click', function() {
		$(this).siblings('ul').slideToggle(400);
		console.log( 1 );
	});

	$(window).on('load', function() {
		$('body').css('visibility', 'visible');
	});

})(jQuery);