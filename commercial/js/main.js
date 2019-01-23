$(document).ready(function() {
    $("a.scrollto").click(function () {
        var elementClick = '#'+$(this).attr("href").split("#")[1]
        var destination = $(elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 800);
        return false;
    });
});

$(function () {
	$('button.btn-lg').click(function() {
		var parent = $(this).attr('data-parent');
		var modal = $(this).attr('data-target')
		$(modal).find('input[name=target]').val('parent');
	})
});


$(document).ready(function(){
	$('[data-submit]').on('click', function(e){
	    e.preventDefault();
		$(this).parent('form').submit();
	})
	$.validator.addMethod(
	        "regex",
	        function(value, element, regexp) {
	            var re = new RegExp(regexp);
	            return this.optional(element) || re.test(value);
	        },
	        "Please check your input."
			);
	function valEl(el){
		 
          el.validate({
        rules:{
          tel:{
            required:true,
            regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
          },
          name:{
            required:true
          },
          email:{
          	required:true,
            email:true
          }
        },
          messages:{
            tel:{
              	required:'Поле обязательно для заполнения',
              	regex:'Телефон может содержать символы + - ()'
            },
            name:{
              	required:'Поле обязательно для заполнения',
            },
            email:{
            	required:'Поле обязательно для заполнения',	
            	email:'Неверный формат E-mail'
            }
        },            
        submitHandler: function (form) {
        	$('#loader').fadeIn();
	        var $form = $(form);
	        var $formId = $(form).attr('id');
	        switch($formId){
	          case'goToNewPage':
	            $.ajax({
	                  type: 'POST',
	                  url: $form.attr('action'),
	                  data: $form.serialize(),
	                })
	                .always(function (response) {  
	                    //ссылка на страницу "спасибо" - редирект
	                    location.href='http://profish24.ru/files/7 oshibok zarubleniy vodoema.pdf';
	                    //отправка целей в Я.Метрику и Google Analytics
	                    ga('send', 'event', 'masterklass7', 'register');
			    yaCounter27714603.reachGoal('lm17lead');
	            });
	        break;        
	        case'popupResult':
            $.ajax({
                  type: 'POST',
                  url: $form.attr('action'),
                  data: $form.serialize(),
                })
                .always(function (response) {                    
                setTimeout(function (){
                 $('#loader').fadeOut();
                },800);
                setTimeout(function (){
                  $('#overlay').fadeIn();
                  $form.trigger('reset');
                  //строки для остлеживания целей в Я.Метрике и Google Analytics
                },1100);
                $('#overlay').on('click', function(e) {
  			$('#overlay').fadeOut();
		});
                    
            });
        break;          
        }       
return false; 
    }                           
  })
        }                        
     
              $('.js-form').each(function() {
                valEl($(this)); 
              });
		$('[data-scroll]').on('click', function(){
			$('html, body').animate({
		        scrollTop: $( $.attr(this, 'data-scroll') ).offset().top
		    }, 2000);
		    event.preventDefault();
		})              
   })

// Модальное окно

// открыть по кнопке
$('.js-button-campaign').click(function() { 
  
  $('.js-overlay-campaign').fadeIn();
  $('.js-overlay-campaign').addClass('disabled');
});

// закрыть на крестик
$('.js-close-campaign').click(function() { 
  $('.js-overlay-campaign').fadeOut();
  
});

// закрыть по клику вне окна
$(document).mouseup(function (e) { 
  var popup = $('.js-popup-campaign');
  if (e.target!=popup[0]&&popup.has(e.target).length === 0){
    $('.js-overlay-campaign').fadeOut();
    
  }
});

// открыть по таймеру 
// $(window).on('load', function () { 
//   setTimeout(function(){
//     if($('.js-overlay-campaign').hasClass('disabled')) {
//       return false;
//     } else {
      
//       $(".js-overlay-campaign").fadeIn();
//     }
//   }, 15000);
// });

// Модальное окно

// открыть по кнопке
$('.js-button-phone').click(function() { 
  
  $('.js-overlay-callback').fadeIn();
  $('.js-overlay-callback').addClass('disabled');
});

// закрыть на крестик
$('.js-close-callback').click(function() { 
  $('.js-overlay-callback').fadeOut();
  
});

// закрыть по клику вне окна
$(document).mouseup(function (e) { 
  var popup = $('.js-popup-callback');
  if (e.target!=popup[0]&&popup.has(e.target).length === 0){
    $('.js-overlay-callback').fadeOut();
    
  }
});