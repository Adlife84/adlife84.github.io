


$(window).load(function() { ///При загрузке окна. Нахоодит элемент i внутри #before-load
  //скрывает его, через секунду скрывет #before-load  за 600 миллисекунд
  $('#cube-loader').find('.caption').fadeOut().end().delay(1000).fadeOut('slow');
});

$(document).ready(function(){
    $(".aboutnav__link").click(function(){ //При нажатии на элемент с классом aboutnav__link
		    $(".aboutnav__link").removeClass("aboutnav__active");//Удаляет класс aboutnav__active у всех
		    $(this).addClass("aboutnav__active")//добавляет нажатому элементу
		});

///Services.html  при нажатии на меню услуг. у соответствующих элементов удаляем клас d-none,
//остальным элементам вкладок добавляем класс d-none
    $("a[href='#accounting']").click(function(){       
             
               		$(".cconsulting").addClass("d-none");
               		$(".clegal").addClass("d-none");
               		$(".caccounting").removeClass("d-none")           
    });
    $("a[href='#legal']").click(function(){	 
              
               		$(".cconsulting").addClass("d-none");
               		$(".clegal").removeClass("d-none");
               		$(".caccounting").addClass("d-none")           
    });
    $("a[href='#consulting']").click(function(){
                
               		$(".cconsulting").removeClass("d-none");
               		$(".clegal").addClass("d-none");
               		$(".caccounting").addClass("d-none")
     });


//Прокрутка к секции по ссылке

    $('a[href^="#"], *[data-href^="#"]').on('click', function(e){ //ссылки на якорь и элементы с атрибутом
      //data-href с ссылкой
        
        e.preventDefault(); //удаляется изначальное событие
        if ($(this).hasClass("noscroll") == false){ //если нету класса noscroll
          var t = 1000; //скорость прокрутки
          var topX = 0;//расстояние до верха экрана (при наличии фиксированного меню)
          var d = $(this).attr('data-href') ? $(this).attr('data-href') : $(this).attr('href');
          $('html,body').stop().animate({ scrollTop: $(d).offset().top - topX }, t); //перемещение на позицию якоря
        }
    });
//Главное меню
    $(".menu__open").click(function(){ //При клике на гамбургер-меню
		    $(".menu").toggleClass("d-none");//добавляется и удаляется класс d-none к меню
    });
	   $('.menu__open').click(function(){
        $(this).toggleClass('open');
    });

  //при нажатию на любую кнопку, имеющую data-target или ссылку #myModal
  $('a[href="#myModal"], [data-target="#myModal"]').click(function() {
    //открыть модальное окно с id="myModal"
    $("#myModal").modal('show');
  });
  // Form send
        $('[data-submit]').on('click', function(e){
            e.preventDefault();
            $(this).parent('form').submit();
             $("#myModal").modal('hide');
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
                   $('#cube-loader').find('.caption').fadeIn().end().delay(0).fadeIn('slow');
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
                                    location.href='https://wayup.in/lm/landing-page-marathon/success';
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
                                        $('#cube-loader').find('.caption').fadeOut().end().delay(1).fadeOut('slow');
                                    },4000);
                                    setTimeout(function (){
                                        $('#overlay').fadeIn();
                                        $form.trigger('reset');
                                        //строки для остлеживания целей в Я.Метрике и Google Analytics
                                    },800);
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




});

//Инициализация яндекс-карты
ymaps.ready(init);
    var myMap,
    myPlacemark;
    function init() {
        myMap = new ymaps.Map("map", {
                center: [46.474178, 30.749008],//Изначальные координаты центра карты
                //controls: [],  //Отключение стандартных элементов управления         
                zoom: [16]
        });
        var koordinats = [46.474278, 30.746008];//Изначальные координаты маркера                
        //Изначальные настройки балуна и хинта
         myPlacemark =  new ymaps.Placemark(koordinats, {
        hintContent: '<div class="locator">Базарная вул., 36</div>',
        balloonContent: '\
        <div class="balloon"><div class="balloon__wrapper">\
          <div class="balloon1 d-flex justify-content-between">\
            <h4>LAB Consulting</h4>\
            <div class="map__buttons mapsoc__buttons d-flex align-items-center">\
              <i class="fa fa-facebook"></i><i class="fa fa-twitter"></i><i class="fa fa-telegram"></i>\
            </div>\
          </div>\
          <div class="map__detales d-flex">\
            <div class="map__contacts d-block">\
              <p class="map__contact">\
                <i class="fa fa-phone"></i>\
                +38 (048) 756-23-54\
              </p>\
              <p class="map__contact">\
                <i class="fa fa-phone"></i>\
                +38 (048) 756-23-54\
              </p>\
              <p class="map__contact odessa-l">\
                <i class="fa fa-location-arrow"></i>\
                65000,<br> Украина, г. Одесса <br>\
                Ул Базарная, 36\
              </p>\
              <p class="map__contact kiev-l d-none">\
                <i class="fa fa-location-arrow"></i>\
                65000,<br> Украина, г. Киев <br>\
                Ул Идзиковских, 41\
              </p>\
              <p class="map__contact kharkiv-l d-none">\
                <i class="fa fa-location-arrow"></i>\
                65000,<br> Украина, г. Харьков <br>\
                Ул Грибальди, 11\
              </p>\
              <p class="map__contact">\
                <a href="#" class="map__anchor">\
                <i class="fa fa-envelope"></i>\
                info@lab-consult.com\
                </a>\
              </p>\
            </div>\
            <div class="maps__text d-none d-sm-block">\
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>\
              <p>Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\
            </div>\
          </div>\
        </div></div>' },   
         {  iconLayout: 'default#image',
          iconImageHref: 'img/locator64.png', // картинка иконки
          iconImageSize: [50, 50], // размер иконки
          iconImageOffset: [-32, -64], // позиция иконки
          balloonContentSize: [10,10], // размер кастомного балуна в пикселях
          balloonLayout: "default#imageWithContent", // указываем что содержимое балуна кастомная херь
          balloonImageHref: '', // Картинка заднего фона балуна
          balloonImageOffset: [100, -229], // смещание балуна, надо подогнать под стрелочку
          balloonImageSize: [10, 10], // размер картинки-бэкграунда балуна
          balloonShadow: false,//тень балуна
          hideIconOnBalloonOpen: false,
        });
               
         $(".kiev").click(function(){   //Создание маркера по клику изменение балуна и хинта            
                    
            myPlacemark.properties.set({
            hintContent: '<div class="locator">Ул Идзиковских, 41</div>',
                balloonContent: '\
                    <div class="balloon"><div class="balloon__wrapper">\
                      <div class="balloon1 d-flex align-items-center">\
                        <h4>LAB Consulting</h4>\
                        <div class="map__buttons mapsoc__buttons d-flex align-items-center ml-auto">\
                          <i class="fa fa-facebook"></i><i class="fa fa-twitter"></i><i class="fa fa-telegram"></i>\
                        </div>\
                      </div>\
                      <div class="map__detales d-flex">\
                        <div class="map__contacts d-block">\
                          <p class="map__contact">\
                            <i class="fa fa-phone"></i>\
                            +38 (048) 756-23-54\
                          </p>\
                          <p class="map__contact">\
                            <i class="fa fa-phone"></i>\
                            +38 (048) 756-23-54\
                          </p>\
                          <p class="map__contact kharkiv-l">\
                            <i class="fa fa-location-arrow"></i>\
                            65000,<br> Украина, г. Киев <br>\
                            Ул Идзиковских, 41\
                          </p>\
                          <p class="map__contact">\
                            <a href="#" class="map__anchor">\
                            <i class="fa fa-envelope"></i>\
                            info@lab-consult.com\
                            </a>\
                          </p>\
                        </div>\
                        <div class="maps__text d-none d-sm-block">\
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>\
                          <p>Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\
                        </div>\
                      </div>\
                    </div></div>'
            });
            myPlacemark.geometry.setCoordinates([50.426162, 30.448657]);//изменение координат маркера
            myMap.setCenter([50.426762, 30.451657], 16);//Изменение центра карты
        });
        $(".kharkiv").click(function(){ //Создание маркера по клику изменение настроек балуна и хинта
                  
          myPlacemark.properties.set({
          hintContent: '<div class="locator">Ул Грибальди, 11</div>',
              balloonContent: '\
                  <div class="balloon"><div class="balloon__wrapper">\
                    <div class="balloon1 d-flex align-items-center">\
                      <h4>LAB Consulting</h4>\
                      <div class="map__buttons mapsoc__buttons d-flex align-items-center ml-auto">\
                        <i class="fa fa-facebook"></i><i class="fa fa-twitter"></i><i class="fa fa-telegram"></i>\
                      </div>\
                    </div>\
                    <div class="map__detales d-flex">\
                      <div class="map__contacts d-block">\
                        <p class="map__contact">\
                          <i class="fa fa-phone"></i>\
                          +38 (048) 756-23-54\
                        </p>\
                        <p class="map__contact">\
                          <i class="fa fa-phone"></i>\
                          +38 (048) 756-23-54\
                        </p>\
                        <p class="map__contact kharkiv-l">\
                          <i class="fa fa-location-arrow"></i>\
                          65000,<br> Украина, г. Харьков <br>\
                          Ул Грибальди, 11\
                        </p>\
                        <p class="map__contact">\
                          <a href="#" class="map__anchor">\
                          <i class="fa fa-envelope"></i>\
                          info@lab-consult.com\
                          </a>\
                        </p>\
                      </div>\
                      <div class="maps__text d-none d-sm-block">\
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>\
                        <p>Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\
                      </div>\
                    </div>\
                  </div></div>'
          });
          
          
          myPlacemark.geometry.setCoordinates([50.007103, 36.354635]);//изменение координат маркера
          myMap.setCenter([50.007703, 36.357635], 16); //Изменение центра карты
          
        });
          $(".odessa").click(function(){ //Создание маркера по клику изменение балуна и хинта
                 
                  
          myPlacemark.properties.set({
          hintContent: '<div class="locator">Базарная вул., 36</div>',
          balloonContent: '\
                  <div class="balloon"><div class="balloon__wrapper">\
                    <div class="balloon1 d-flex align-items-center">\
                      <h4>LAB Consulting</h4>\
                      <div class="map__buttons mapsoc__buttons d-flex align-items-center ml-auto">\
                        <i class="fa fa-facebook"></i><i class="fa fa-twitter"></i><i class="fa fa-telegram"></i>\
                      </div>\
                    </div>\
                    <div class="map__detales d-flex">\
                      <div class="map__contacts d-block">\
                        <p class="map__contact">\
                          <i class="fa fa-phone"></i>\
                          +38 (048) 756-23-54\
                        </p>\
                        <p class="map__contact">\
                          <i class="fa fa-phone"></i>\
                          +38 (048) 756-23-54\
                        </p>\
                        <p class="map__contact kharkiv-l">\
                          <i class="fa fa-location-arrow"></i>\
                          65000,<br> Украина, г. Одесса <br>\
                          Ул Базарная, 36\
                        </p>\
                        <p class="map__contact">\
                          <a href="#" class="map__anchor">\
                          <i class="fa fa-envelope"></i>\
                          info@lab-consult.com\
                          </a>\
                        </p>\
                      </div>\
                      <div class="maps__text d-none d-sm-block">\
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>\
                        <p>Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\
                      </div>\
                    </div>\
                  </div></div>'
          });
          myPlacemark.geometry.setCoordinates([46.474228, 30.746008]);//изменение координат маркера
          myMap.setCenter([46.474828, 30.749008], 16);//Изменение центра карты

        });

                 myMap.geoObjects.add(myPlacemark); //добавление нового маркера
                 myPlacemark.balloon.open(); //Отрытие балуна
};
            
            
















