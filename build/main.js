jQuery(document).ready(function () {
    
    jQuery('a[data-scroll="true"]').on('click', function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = jQuery(this.hash);
            target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                jQuery('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
    
    jQuery('.jump-to').on('click', function(){
        var parentLi = jQuery(this).closest('li');
        var target = jQuery(this.hash);
        target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
        if (target.length) {
            jQuery(".jump-list li").removeClass("active");
            jQuery(parentLi).addClass("active");
            jQuery('html,body').animate({
                scrollTop: target.offset().top
        }, 1000);
                return false;
        }
    });
    
    function initLoad () {
    jQuery(window).load(function() {

      var jQuerygrid = jQuery('#works-grid').isotope({
        itemSelector: '.work-item'
      });

      jQuerygrid.on('layoutComplete', function(event) {
        jQuery(window).trigger('resize');
        fixScroll();
      });

    });
  }
    
    function initPhotoGallery () {
      
    var gallery = jQuery('#portfolio');
    var galleryElements = gallery.find('img');
    
    console.log(galleryElements.length);
    
    if (galleryElements.length > 0) {
        jQuery('.gallery-launch').addClass('active');
    }

    var imagesArray = [];

    jQuery('.gallery-launch').on('click', function(event) {
      event.preventDefault();
      
      var curIndex = jQuery(this).data('index');
      
      //console.log(curIndex);

      for (var i = 0; i < galleryElements.length; i++) {
        imagesArray.push(jQuery(galleryElements[i]).attr('src'));
      };

      var template = '<div id="gallery-modal">';
      template += '<div class="centrize">';
      template += '<div class="v-center">';
      template += '<div class="gallery-image">';
      template += '<a href="#" id="gallery-close"><i class="fas fa-times"></i></a>';
      template += '<a href="#" class="gallery-control gallery-prev"><i class="fas fa-arrow-left"></i></a>';
      template += '<img src="'+imagesArray[curIndex]+'" alt="">';
      template += '<a href="#" class="gallery-control gallery-next"><i class="fas fa-arrow-right"></i></a>';
      template += '</div>';
      template += '</div>';
      template += '</div>';
      template += '</div>';

      jQuery('body').append(template);
      jQuery('body').addClass('modal-open');

      jQuery('#gallery-modal').fadeIn(300);

    });

    jQuery('body').on('click', '.gallery-control', function(event) {
      event.preventDefault();
      event.stopPropagation();

      var currentImage = jQuery('.gallery-image').find('img');

      if (jQuery(this).hasClass('gallery-next')) {
        if (imagesArray.indexOf(currentImage.attr('src')) >= (imagesArray.length - 1)) {
          return false;
        }

        currentImage.fadeOut(300, function() {
          var nextImage = imagesArray[imagesArray.indexOf(currentImage.attr('src')) + 1]
          jQuery(currentImage).attr('src', nextImage);
        }).fadeIn(300);
      }

      else if (jQuery(this).hasClass('gallery-prev')) {
        if (imagesArray.indexOf(currentImage.attr('src')) < 1) {
          return false;
        }

        currentImage.fadeOut(300, function() {
          var nextImage = imagesArray[imagesArray.indexOf(currentImage.attr('src')) - 1]
          jQuery(currentImage).attr('src', nextImage);
        }).fadeIn(300);

      }

    });

    jQuery('body').on('click', '#gallery-close', function(event) {
      event.preventDefault();
      jQuery('#gallery-modal').fadeOut(300, function() {
        jQuery('#gallery-modal').remove();
        imagesArray = [];
      });
      jQuery('body').removeClass('modal-open');
    });

    jQuery('body').on('click', '.gallery-image', function(event) {
      event.stopPropagation();
    });

    jQuery('body').on('click', '#gallery-modal', function(event) {
      jQuery('#gallery-close').trigger('click');
    });

    jQuery(document).keyup(function(e) {
      if (e.keyCode == 27) {
        jQuery('#gallery-close').trigger('click');
      }
      if (e.keyCode == 37) {
        jQuery('.gallery-control.gallery-prev').trigger('click');
      }
      if (e.keyCode == 39) {
        jQuery('.gallery-control.gallery-next').trigger('click');
      }
    });
  }
  
  initLoad();
  initPhotoGallery();
    
});
