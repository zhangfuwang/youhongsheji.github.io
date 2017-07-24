;"use strict";


	//public function
	var publicFn = {

		init : function(){
		},

		coverShade : function(){
			var shade = $('.st-cover-shade');
			var ico = $('.st-cover-menuico');
			var menu = $('.st-cover-menu');
			var vr=$('.st-cover-vr')

			ico.on('click',function(){
				if( shade.hasClass('active') ) {
					coverHide();
				} else {
					coverShow();
				}
			});

			var menu_a = menu.find('ul li a');

			menu_a.on('click',function(){
				var _ts = $(this);
				if( !_ts.hasClass('nohide') ) {
					coverHide();
				}else{
					vrShow();
				}
			});

			function coverHide() {
				shade.removeClass('active');
				setTimeout(function(){
					shade.removeClass('fixed');
				},300);
				menu.removeClass('active');
				setTimeout(function(){
					menu.hide(0);
				},200);
			}

			function coverShow() {
				shade.addClass('fixed').addClass('active');menu.show(0);
				setTimeout(function(){
					menu.addClass('active');
				},20);
			}
			function vrShow() {
				menu.hide(0);
				setTimeout(function(){
					menu.removeClass("active");
				},20)
				ico.hide();
				vr.show();
			}

		},

		hashScroller : function(){
			var tag_a = $('.st-hash');

			tag_a.click(function(ev){
				ev.preventDefault();

				var _ts = $(this);
				var targ = $(_ts.attr('href'));

				$('html,body').animate({
					scrollTop : targ.offset().top
				},1000);
			});
		}

	};


	//home function
	var homeFn = {

		init : function(){
			publicFn.coverShade();
			publicFn.hashScroller();

			this.erSwp();
		},

		erSwp : function(){
			var swp_er = new Swiper('#erSwp',{
				autoplay : 5000,
				autoplayDisableOnInteraction : false,
				speed : 800,
				loop : true,
				onSlideChangeStart : function() {
					pgntActive();
				}
			});

			var slides_len = swp_er.slides.length-2;
			var pgnt = $(swp_er.container).find('.st-pgnt');
			pgnt.empty();

			for( var a=0; a<slides_len; a++ ) {
				pgnt.append( '<span></span>' );
			}

			pgntActive();

			pgnt.find('span').on('mouseover click',function(){
				var _ts = $(this);
				swp_er.swipeTo(_ts.index(),800);
			});

			$(swp_er.container).hover(function(){
				swp_er.stopAutoplay();
			},function(){
				swp_er.startAutoplay();
			});

			function pgntActive() {
				pgnt.find('span').removeClass('active').eq(swp_er.activeLoopIndex).addClass('active');
			}

		}

	};

	$(function(){

		publicFn.init();

		switch( $('#scriptRequire').attr('data-page') ) {

			//home
			case 'home' : homeFn.init();
			break;

		}

	});



$(function(){

	//利用插件生成二维码,生成的二维码在canvas中
	$('#qrDiv').qrcode({
		width: 198,
		height:198,
		text: "https://www.baidu.com/"
	});

	//从canvas中提取图片image
	function convertCanvasToImage(canvas) {
		//新Image对象，可以理解为DOM
		var image = new Image();
		// canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
		// 指定格式PNG
		image.src = canvas.toDataURL("image/png");
		return image;
	}

	//获取网页中的canvas对象
	var mycanvas1=document.getElementsByTagName('canvas')[0];

	//将转换后的img标签插入到html中
	var img = convertCanvasToImage(mycanvas1);
	//img=img.addClass("qrcode");

	$('#imgDiv').append(img);//imgDiv表示你要插入的容器id


})
