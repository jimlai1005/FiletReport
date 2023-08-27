
jQuery(document).ready(function() {
	
    /*
        Fullscreen background
    */
    $.backstretch("assets/img/backgrounds/bg.jpg");
    
    /*
        Wow
    */
    new WOW().init();
    
    /*
	    Countdown initializer
	*/

	var now = new Date();
	//var countTo = 178 * 24 * 60 * 60 * 1000 + now.valueOf(); 
	var pre =  new Date(Date.now()).getTime();
	var post = new Date('2021/03/01 00:00:00').getTime();
	var countTo = post-pre+ now.valueOf();
   
	$('.timer').countdown(countTo, function(event) {
		$(this).find('.days').text(event.offset.totalDays);
		$(this).find('.hours').text(event.offset.hours);
		$(this).find('.minutes').text(event.offset.minutes);
		$(this).find('.seconds').text(event.offset.seconds);
	});
	
	/*
	     
	*/
	$('.report-success-message').show();
	$('.report-error-message').show();
	$('#report').show();

// Report API
	$('.report form').submit(function(e) {
		e.preventDefault();
		$('.btn').attr("disabled", true);
	    var postdata = $('.report form').serialize();
	    var requestData = {
            auth: $('.report_code').val().trim(),
            startTime: $('.report_start_date').val().trim(),
            endTime: $('.report_end_date').val().trim(),
            email: $('.report_email').val().trim()
        };
	    $.ajax({
	        type: 'POST',
	        contentType: 'application/json',
	        url: 'https://thiv1xxsjc.execute-api.ap-southeast-1.amazonaws.com/prod/generatereport',
	        headers: {},
	        data: JSON.stringify(requestData),
	        dataType: 'json',
	        success: function(json) {
	        	if (json){
		        	$('.report-success-message').html(JSON.stringify(json.data));
		        	$('.report-success-message').fadeIn();
		        }
		        else{
		        	jsonErrors = jQuery.parseJSON(json.errors);
		        	$('.report-success-message').html(jsonErrors.code);
		        	$('.report-success-message').fadeIn();
		        	$('.report-error-message').html(jsonErrors.message);
		        	$('.report-error-message').fadeIn();
		        }

		        // Enable the button back
            	$('.btn').attr('disabled', false);
	        },
	        error: function() {
	            $('.btn').attr('disabled', false);
	        }
	    });
	});
});

