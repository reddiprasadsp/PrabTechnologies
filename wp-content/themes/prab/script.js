(function($) {
	var siteHeaderHeight = $('header').outerHeight(true);
	var pagesArray = [];
	var winHeight = ($(window).height()/100)*30;
	var scrollMaxLength = 2400;
	
	function getUrlVars() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
		function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	}
	var pageVal = getUrlVars()["section"];
	
	function getUrlVarsHref(a) {
		var vars1 = {};
		var parts1 = a.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
		function(m,key,value) {
			vars1[key] = value;
		});
		return vars1;
	}
	
	$(window).load(function(){
		winHeight = ($(window).height()/100)*30;
		//alert(winHeight);
		if($(window).width() >= 1025){
			setTimeout(function(){
				$('.journey-bg-outer').height($('.journey-bg').outerHeight(true)+scrollMaxLength);
				$('.pages').each(function(index, element) {
					if(index == 0){
						pagesArray.push([Math.round($(this).offset().top),Math.round($(this).outerHeight(true)-siteHeaderHeight-1),index+1,$(this).attr('id')]);
						$(this).attr('offset-top',Math.round($(this).offset().top));
					}else {
						pagesArray.push([Math.round($(this).offset().top-siteHeaderHeight),Math.round($(this).offset().top-siteHeaderHeight+$(this).outerHeight(true)-1),index+1,$(this).attr('id')]);
						$(this).attr('offset-top',Math.round($(this).offset().top-siteHeaderHeight));
					}
				});
				//console.log(pagesArray);
				$('.left-nav').css({'opacity':1});
				$('.left-nav .max-page').html(0+$('.pages').length.toString());
				$('.pages').each(function(index, element) {
					var getIndex = index+1;
					$('.left-nav .nav-sec-number').append('<div class="scroll-link" rel="'+$(this).attr('id')+'">'+0+getIndex.toString()+'<span>'+$(this).attr('page-name')+'</span></div>');
				});
				setPages();
				
				if(pageVal){
					var scrollPosition = $('#'+pageVal).attr('offset-top');
					var body = $("html, body");
					body.stop().animate({scrollTop:scrollPosition}, 1000, 'swing', function() { 
				
					});
				}
				$('.journey-bg-outer').attr('offset-top-max',parseInt($('#content-journey').attr('offset-top'))+scrollMaxLength);

				/*if($('.first-fold-fixed').length == 1){

					$('<div class="second-fold-fixed"></div>').insertAfter( ".first-fold-fixed" );
					$('.second-fold-fixed').css({'height':$('.first-fold-fixed').outerHeight(true)});
					$('.first-fold-fixed').addClass('freez');
				}*/

			}, 1000);
		}
		
		setHeader();
		if($(window).width() >= 1025){
			setSliders();
			setContentJourneyAnim();
		}else {
			setSlidersMobile();
		}
	});
	
	
	$(window).scroll(function(){
		setHeader();
		
		if($(window).width() >= 1025){
			setPages();
			setContentJourneyAnim();
		}
	});
	var scrollDetectVal = 'down';
	function setContentJourneyAnim(){
		if($(window).scrollTop() <= $('.journey-bg-outer').attr('offset-top')){
			$('.bar-1 span, .bar-2 span, .bar-3 span, .bar-4 span, .bar-5 span, .bar-6 span').css({'width':'0%'});
			$('.bar-1-wrap, .bar-2-wrap, .bar-3-wrap, .bar-4-wrap, .bar-5-wrap, .bar-6-wrap').removeClass('active');
			$('.bar-1, .bar-2, .bar-3, .bar-4, .bar-5, .bar-6').removeClass('active');
		}
		if($(window).scrollTop() >= $('.journey-bg-outer').attr('offset-top-max')){
			$('.bar-1 span, .bar-2 span, .bar-3 span, .bar-4 span, .bar-5 span, .bar-6 span').css({'width':'100%'});
			$('.bar-1-wrap, .bar-2-wrap, .bar-3-wrap, .bar-4-wrap, .bar-5-wrap, .bar-6-wrap').addClass('active');
			$('.bar-1, .bar-2, .bar-3, .bar-4, .bar-5, .bar-6').addClass('active');
		}
		if(scrollDetectVal == 'down'){ 
			if($(window).scrollTop() >= $('.journey-bg-outer').attr('offset-top')){
				$('.journey-bg').addClass('freez');
				
			}
			if($(window).scrollTop() >= $('.journey-bg-outer').attr('offset-top-max')){
				$('.journey-bg').addClass('sticky');
			}
			if($(window).scrollTop() > $('.journey-bg-outer').attr('offset-top') && $(window).scrollTop() < $('.journey-bg-outer').attr('offset-top-max') ){
				setJourneyBar(Math.round(($(window).scrollTop()-parseInt($('.journey-bg-outer').attr('offset-top')))/4));	
			}
		}
		if(scrollDetectVal == 'up'){ 
			if($(window).scrollTop() <= $('.journey-bg-outer').attr('offset-top-max')){
				$('.journey-bg').removeClass('sticky');
			}
			if($(window).scrollTop() <= $('.journey-bg-outer').attr('offset-top')){
				$('.journey-bg').removeClass('freez');
			}
			if($(window).scrollTop() > $('.journey-bg-outer').attr('offset-top') && $(window).scrollTop() < $('.journey-bg-outer').attr('offset-top-max') ){
				setJourneyBar(Math.round(($(window).scrollTop()-parseInt($('.journey-bg-outer').attr('offset-top')))/4));	
			}
		}
		
	}
	function setJourneyBar(val){
		if(val <10){
			$('.bar-2-wrap').removeClass('active');
			$('.bar-1 span').css({'width':'0%'});
		}
		if(val >0 && val <25){
			$('.bar-1-wrap').addClass('active');
			$('.bar-1 span').css({'width':'25%'});
		}
		if(val >26 && val <50){
			$('.bar-1 span').css({'width':'50%'});
		}
		if(val >51 && val <75){
			$('.bar-1').removeClass('active');
			$('.bar-2-wrap').removeClass('active');
			$('.bar-1 span').css({'width':'75%'});
			$('.bar-2 span').css({'width':'0%'});
		}
		if(val >76 && val <100){
			$('.bar-1').addClass('active');
			$('.bar-2-wrap').removeClass('active');
			$('.bar-1 span').css({'width':'100%'});
			$('.bar-2 span').css({'width':'0%'});
		}
		if(val >101 && val <125){
			$('.bar-2-wrap').addClass('active');
			$('.bar-1 span').css({'width':'100%'});
			$('.bar-2 span').css({'width':'25%'});
		}
		if(val >126 && val <150){
			$('.bar-2 span').css({'width':'50%'});
		}
		if(val >151 && val <175){
			$('.bar-2').removeClass('active');
			$('.bar-3-wrap').removeClass('active');
			$('.bar-2 span').css({'width':'75%'});
			$('.bar-3 span').css({'width':'0%'});
		}
		if(val >176 && val <200){
			$('.bar-2').addClass('active');
			$('.bar-3-wrap').removeClass('active');
			$('.bar-2 span').css({'width':'100%'});
			$('.bar-3 span').css({'width':'0%'});
		}
		if(val >201 && val <225){
			$('.bar-3-wrap').addClass('active');
			$('.bar-2 span').css({'width':'100%'});
			$('.bar-3 span').css({'width':'25%'});
		}
		if(val >226 && val <250){
			$('.bar-3 span').css({'width':'50%'});
		}
		if(val >251 && val <275){
			$('.bar-3').removeClass('active');
			$('.bar-4-wrap').removeClass('active');
			$('.bar-3 span').css({'width':'75%'});
			$('.bar-4 span').css({'width':'0%'});
		}
		if(val >276 && val <300){
			$('.bar-3').addClass('active');
			$('.bar-4-wrap').removeClass('active');
			$('.bar-3 span').css({'width':'100%'});
			$('.bar-4 span').css({'width':'0%'});
		}
		if(val >301 && val <325){
			$('.bar-4-wrap').addClass('active');
			$('.bar-3 span').css({'width':'100%'});
			$('.bar-4 span').css({'width':'25%'});
		}
		if(val >326 && val <350){
			$('.bar-4 span').css({'width':'50%'});
		}
		if(val >351 && val <375){
			$('.bar-4').removeClass('active');
			$('.bar-5-wrap').removeClass('active');
			$('.bar-4 span').css({'width':'75%'});
			$('.bar-5 span').css({'width':'0%'});
		}
		if(val >376 && val <400){
			$('.bar-4').addClass('active');
			$('.bar-5-wrap').removeClass('active');
			$('.bar-4 span').css({'width':'100%'});
			$('.bar-5 span').css({'width':'0%'});
		}
		if(val >401 && val <425){
			$('.bar-5-wrap').addClass('active');
			$('.bar-4 span').css({'width':'100%'});
			$('.bar-5 span').css({'width':'25%'});
		}
		if(val >426 && val <450){
			$('.bar-5 span').css({'width':'50%'});
		}
		if(val >451 && val <475){
			$('.bar-5').removeClass('active');
			$('.bar-6-wrap').removeClass('active');
			$('.bar-5 span').css({'width':'75%'});
			$('.bar-6 span').css({'width':'0%'});
		}
		if(val >476 && val <500){
			$('.bar-5').addClass('active');
			$('.bar-6-wrap').removeClass('active');
			$('.bar-5 span').css({'width':'100%'});
			$('.bar-6 span').css({'width':'0%'});
		}
		if(val >501 && val <525){
			$('.bar-6-wrap').addClass('active');
			$('.bar-5 span').css({'width':'100%'});
			$('.bar-6 span').css({'width':'25%'});
		}
		if(val >526 && val <550){
			$('.bar-6 span').css({'width':'50%'});
		}
		if(val >551 && val <575){
			$('.bar-6').removeClass('active');
			$('.bar-6 span').css({'width':'75%'});
		}
		if(val >576 && val <600){
			$('.bar-6').addClass('active');
			$('.bar-6 span').css({'width':'100%'});
		}
	}
	function scrollDetect(){
	  var lastScroll = 0;
	
	  window.onscroll = function() {
		  var currentScroll = document.documentElement.scrollTop || document.body.scrollTop; // Get Current Scroll Value
	
		  if (currentScroll > 0 && lastScroll <= currentScroll){
			lastScroll = currentScroll;
			scrollDetectVal = 'down'; 
			//console.log("Scrolling DOWN");
		  }else{
			lastScroll = currentScroll;
			scrollDetectVal = 'up';
			//console.log("Scrolling UP");
		  }
	  };
	}
	
	
	scrollDetect();


	$(window).resize(function(){
		setHeader();
		if($(window).width() >= 1025){
			setPages();
		}
	});
	function setHeader(){
		if($(window).scrollTop() >= 10){
			$('header').addClass('freez');
		}else {
			$('header').removeClass('freez');
		}	
	}
	var oldPushState = '';
	function setPages(){

		for(i=0;i<pagesArray.length;i++){
		
			if($(window).scrollTop() >= pagesArray[i][0]-winHeight && $(window).scrollTop() <= pagesArray[i][1]-winHeight){
	
				$('.page-no').html(0+pagesArray[i][2].toString());
				if(pagesArray[i][3]!= 'home-first-fold'){
					if(oldPushState != pagesArray[i][3]){
						//setTimeout(function(){  
							window.history.pushState("data","Title",'?section='+pagesArray[i][3]);
							oldPushState = pagesArray[i][3];
						//}, 1000);
					}
				}else {
					var url=document.location.href;
					var urlparts= url.split('?');
					if (urlparts.length>=2)	{
						var urlBase=urlparts.shift(); 
						if(oldPushState != urlBase){
							//setTimeout(function(){  
								window.history.pushState('',document.title,urlBase);
								oldPushState = urlBase;
							//}, 1000);
						}
					}
				}
			}
		}
	}
	/*function setContentJourneyAnim(){
		if($(window).scrollTop() >= $('#content-journey').attr('offset-top')){
			if(!$('.fade-outer-wrap').hasClass('active')){
				$('.fade-outer-wrap').addClass('active');
			}
		}else if($(window).scrollTop() <= $('#content-journey').attr('offset-top')-400){
			if($('.fade-outer-wrap').hasClass('active')){
				$('.fade-outer-wrap').removeClass('active');
			}
		}
	}*/

	$( document ).delegate( ".left-nav .scroll-link", "click", function(e) {
		e.preventDefault();
		
		if($('.menu-toggle').hasClass('toggled-on')){
				$('.menu-toggle').trigger('click');
		}
		var scrollPosition = $('#'+$(this).attr('rel')).attr('offset-top');
		var body = $("html, body");
		body.stop().animate({scrollTop:scrollPosition}, 1000, 'swing', function() { 
	
		});
	});
	/*$( document ).delegate( ".site-header-menu .scroll-link a", "click", function(e) {
		e.preventDefault();
		var linkhref = $(this).attr('href');
		if($(this).parent('li').parent('ul').parent('li').hasClass('current_page_item')){
			
			if($('.menu-toggle').hasClass('toggled-on')){
				$('.menu-toggle').trigger('click');
			}
			var scrollPosition = $('#'+getUrlVarsHref(linkhref)["section"]).attr('offset-top');
			var body = $("html, body");
			body.stop().animate({scrollTop:scrollPosition}, 1000, 'swing', function() { });					
		}else {
			window.location.assign(linkhref);
		}
	});
	$( document ).delegate( ".site-header-menu .nav-heading > a", "click", function(e) {
		e.preventDefault();
		var linkhref = $(this).attr('href');
		if($(this).parent('li').hasClass('current_page_item')){
			
			if($('.menu-toggle').hasClass('toggled-on')){
				$('.menu-toggle').trigger('click');
			}
			var scrollPosition = 0;
			var body = $("html, body");
			body.stop().animate({scrollTop:scrollPosition}, 1000, 'swing', function() { });					
		}else {
			window.location.assign(linkhref);	
		}
	});*/
	$('.menu-toggle').click(function(e) {
		if($(this).hasClass('toggled-on')){
			$('header').removeClass('sticky');
		}else {
			$('header').addClass('sticky');
		}
	});
	function setSliders(){
	/*	$('.slider-wrap, .gallery-slider-wrap').cycle('destory');
		$('.slider-wrap, .slider-wrap li, .gallery-slider-wrap, .gallery-slider-wrap li').removeAttr('style');
	*/
		
		$('.testi-slider').cycle({ 
			fx:      'scrollHorz', 
			speed:    1000, 
			timeout:  0,
			prev: '.testi-prev',
			next: '.testi-next' 
		});
		
		$('#blog-slider').multislider({
			interval: 0,
			slideAll: false,
			duration: 1000
		});
	//	$('.slider-wrap').height($('.slider-wrap li').height());
	//	$('.gallery-slider-wrap').height($('.gallery-slider-wrap li').height());
	}
	function setSlidersMobile(){
		$('.MS-content').width($('.MS-content .item').length*$('.MS-content .item').width());
		$('.testi-slider').width($('.testi-slider li').length*$('.testi-slider li').width());
	}
	// Detect browser 'back' button clicked
	(function() {
		if (window.history && window.history.pushState) {
			$(window).on('popstate', function() {
			 // alert('Back button was pressed.');
				 window.location.assign(document.location.href);
			});
		}
	})();
	if($(window).width() <= 1024){
		$('.mobile-menu').click(function(e) {
            $('.sub-menu').removeClass('active');
			$(this).find('.sub-menu').addClass('active');
        });
	}
	
	
})(jQuery);