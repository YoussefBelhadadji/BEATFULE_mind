(function($) {
	"use strict"
	
	// Preloader
	$(window).on('load', function() {
		$("#preloader").delay(600).fadeOut();

		// Course Navigation
		const coursesPerPage = 6;
		let currentPage = 1;
		const $courses = $('.course');
		const totalPages = Math.ceil($courses.length / coursesPerPage);

		function showPage(page) {
			const start = (page - 1) * coursesPerPage;
			const end = start + coursesPerPage;

			$courses.hide();
			$courses.slice(start, end).fadeIn();

			// Update navigation buttons
			$('#prev-courses').prop('disabled', page === 1);
			$('#next-courses').prop('disabled', page === totalPages);
		}

		// Initial page load
		showPage(currentPage);

		// Navigation click handlers
		$('#prev-courses').on('click', function(e) {
			e.preventDefault();
			if (currentPage > 1) {
				currentPage--;
				showPage(currentPage);
				$('html, body').animate({
					scrollTop: $('#courses').offset().top - 100
				}, 500);
			}
		});

		$('#next-courses').on('click', function(e) {
			e.preventDefault();
			if (currentPage < totalPages) {
				currentPage++;
				showPage(currentPage);
				$('html, body').animate({
					scrollTop: $('#courses').offset().top - 100
				}, 500);
			}
		});
	    // Course Filter Functionality
    $('.course-filter li a').on('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all main filter items
        $('.course-filter li a').removeClass('active');
        // Add active class to clicked item
        $(this).addClass('active');
        
        var filter = $(this).data('filter');
        
        // Hide all sub-filters first
        $('.course-sub-filter').addClass('hidden');
        
        // Show relevant sub-filter if therapy or tests is selected
        if (filter === '.therapy') {
            $('.therapy-filter').removeClass('hidden');
        } else if (filter === '.tests') {
            $('.tests-filter').removeClass('hidden');
        }
        
        // Filter courses
        if (filter === '*') {
            $('.course').fadeIn();
            adjustLayout($('.course:visible').length);
        } else {
            $('.course').hide();
            $('.course' + filter).fadeIn();
            adjustLayout($('.course' + filter).length);
        }

        function adjustLayout(visibleCount) {
            const $container = $('.courses-container');
            
            if (visibleCount <= 3) {
                $container.removeClass('large-grid').addClass('small-grid');
            } else {
                $container.removeClass('small-grid').addClass('large-grid');
            }
        }
    });
    
    // Sub-filter Functionality
    $('.course-sub-filter li a').on('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all sub-filter items in the same category
        $(this).closest('.course-sub-filter').find('a').removeClass('active');
        // Add active class to clicked item
        $(this).addClass('active');
        
        var filter = $(this).data('filter');
        
        // Filter courses
        $('.course').hide();
        $('.course' + filter).fadeIn();
    });
});

	// Mobile Toggle Btn
	$('.navbar-toggle').on('click',function(){
		$('#header').toggleClass('nav-collapse')
	});
	
})(jQuery);