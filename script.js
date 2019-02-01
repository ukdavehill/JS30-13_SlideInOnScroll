
// Debounce function to limit event firing on scrolling to every 20ms
// Below debounce function from Underscore.js
function debounce(func, wait = 20, immediate = true) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
    }
};

const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide(e){
    // Loop through each image when window scrolled 
    sliderImages.forEach(sliderImage => {
        // Get pixel distance at which image is half on screen from top of page
        const slideInAt = (window.scrollY + window.innerHeight) - (sliderImage.height / 2);
        
        // Get pixel distance from the bottom of image to top of page
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        
        // True when more than half of image shown
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        
        // True when the image has not been scrolled past yet (is below current page view)
        const isNotScrolledPast = window.scrollY < imageBottom;

        // Cause the class to be added (by transition) when half image becomes visible on page and removed when scrolled past
        if(isHalfShown && isNotScrolledPast){
            sliderImage.classList.add('active');
        } else {
            sliderImage.classList.remove('active');
        }
    })
}

// Liten for scroll event applying the debounce function to limit events being fired on scrolling
document.addEventListener('scroll', debounce(checkSlide));