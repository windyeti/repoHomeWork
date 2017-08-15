// ---------------------- TABS --------------------------
$(function() {
	// стартовая точка: выставлем первый видимым
	$('.tabs-tab:first-child, .tabs-field:first-child').addClass('active');
	// навешивем обработчики
	$('.tabs-menu').on('click', '.tabs-tab', function(e) {
		$this = $(this);
		// сбрасываем предыдущие активные элементы
		$('.tabs-tab, .tabs-field').each(function() {
			$self = $(this);
			$self.removeClass('active');
		});
		$this.addClass('active');
		var indexTab = $('.tabs-tab').index($this);
		$('.tabs-field').eq(indexTab).addClass('active');
	});
	$('.tabs-menu').on('mousedown', '.tabs-tab', function(e) {
		e.preventDefault();
	});
});
// ---------------------- END TABS --------------------------
// ------------------------- FORM ----------------------------var sendForm = (function() {
var sendForm = (function() {
	var form = document.getElementsByTagName('form')[0];
	var inputs = form.getElementsByTagName('input');

	var methodsValidation = {
		'name' : function(elem) {
			var reg = /(^[A-Z]{1}[a-z]+)|(^[А-Я]{1}[а-я]+)/;
			return reg.test(elem.value);
		},
		'phone' : function(elem) {
			var reg = /\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}/;
			return reg.test(elem.value);
		},
		'email' : function(elem) {
			var reg = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
			console.log(reg.test(elem.value))
			return reg.test(elem.value);
		}
	};
	function sendDataToServer(e) {
		for(var i = 0; i < inputs.length; i++) {
			inputs[i].classList.remove('error');
		}
		e.preventDefault();
		if( validation() ) {
			console.log('все ушло')
			var succses = document.createElement('div');
			var succsesText = document.createTextNode('все ушло');
			succses.appendChild(succsesText);
			document.body.appendChild(succses);
		} else {
			console.log('что-то не так')
			var err = document.createElement('div');
			var errorText = document.createTextNode('что-то не так');
			err.appendChild(errorText);
			document.body.appendChild(err);
		}
	}
	function validation() {
		for(var i = 0; i < inputs.length; i++) {
			var inputCurrent = inputs[i];
			if( !methodsValidation[ inputCurrent.name ](inputCurrent) ) {
				errorAlarm( inputCurrent );
				return false
			}
		}
		return true
	}
	function errorAlarm(elem) {
		elem.classList.add('error');
	}
	return {
		init : function() {
			form.addEventListener('submit', sendDataToServer, false);
		}
	}
})();
// document.getElementsByTagName('form') && sendForm.init();
sendForm.init();
// ------------------------- END FORM ----------------------------
// ----------------------- City --------------------------
$(function() {
	var $input = $('form input[name="city"]');
	var listCity = '';
	var $resultInput = $('<div id="resultInput" class="resultInput">');

	$.ajax({
		url : 'listCity.json',
		dataType : 'json',
		success : function(data) {
			listCity = data.nameCity;
			init();
		}
	});
	function init() {	
		$input.on('input', function() {
			if($input.val().length < 3) {
				$resultInput.addClass('zeroHeight');
				$resultInput.empty();
			}
			if($input.val().length >= 3) {
				$resultInput.removeClass('zeroHeight');
				var resultСomparison = (function() {
					var result = [];
					for(var i = 0; i < listCity.length; i++) {
							if( listCity[i].toLowerCase().indexOf( $input.val().toLowerCase() ) > -1 ) {
									result.push( listCity[i] );
								}
						}
				return result;
				})();	
				var $currentList = (function() {

					$resultInput.empty();

					 $.each(resultСomparison, function(key, value) {
					 	$resultInput.append( $('<div>').addClass('city').html(value) );
					})
					return $resultInput;
				})();
				$currentList.css({
					'top' : $input.offset().top + $input.height()+ 10,
					'left' : $input.offset().left,
					'width' : $input.width()
				});
				$('body').append( $currentList );
			}

			$resultInput.on('click', '.city', function() {
				$input.val( $(this).text() );
				$resultInput.empty();
			});
			$resultInput.on('mouseover', '.city', function() {
				$(this).addClass('draken');
			})
			$resultInput.on('mouseout', '.city', function() {
				$(this).removeClass('draken');
			})
		});
	}
})
// ----------------------- END City --------------------------
// //= _partials/palindrom.js
// //= _partials/generatorJson.js
//# sourceMappingURL=main.js.map
