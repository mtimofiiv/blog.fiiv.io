(function() {
  var initSocialButtons = function(klass, onHover, onClick) {
    var el = document.getElementsByClassName(klass);
    for (var i = 0; i < el.length; i++) {
      el[i].addEventListener('mouseover', onHover);
      el[i].addEventListener('mouseout', removeShareHover);
      el[i].addEventListener('click', onClick);
    }
  };

  var shareHover = function(message) {
    var labels = document.getElementsByClassName('share-action');

    return function(e) {
      for (var i = 0; i < labels.length; i++) labels[i].innerHTML = message;
    }
  };

  var removeShareHover = function() {
    var labels = document.getElementsByClassName('share-action');
    for (var i = 0; i < labels.length; i++) labels[i].innerHTML = '&nbsp;';
  };

  var shareClickFacebook = function() {
    var uri = 'https://www.facebook.com/dialog/share?app_id=1516645525316623&display=popup'
    uri += '&href=' + encodeURIComponent(window.location.href);
    uri += '&redirect_uri=' + encodeURIComponent(window.location.origin + '/close.html');
    window.open(uri, 'Share on Facebook', 'menubar=0,scrollbars=0,location=0,width=600,height=400');
  };

  var shareClickTwitter = function() {
    var uri = 'https://twitter.com/intent/tweet?'
    uri += '&url=' + encodeURIComponent(window.location.href);
    uri += '&text=' + encodeURIComponent(window._page.title);
    window.open(uri, 'Share on Twitter', 'menubar=0,scrollbars=0,location=0,width=600,height=400');
  };

  var embedSizedImages = function() {
    var stem = window._page.imageServer;
    var images = document.getElementsByClassName('image');
    var backgrounds = document.getElementsByClassName('bg-image');

    for (var i = 0; i < backgrounds.length; i++) {
      if (backgrounds[i].dataset.bg && backgrounds[i].dataset.width) {
        var uri = stem + '/' + backgrounds[i].dataset.width;
        uri += '/' + window.btoa(backgrounds[i].dataset.bg);
        backgrounds[i].style.backgroundImage = 'url(' + uri + ')';
      }
    }

    for (var i = 0; i < images.length; i++) {
      if (images[i].dataset.src && images[i].dataset.width) {
        var uri = stem + '/' + images[i].dataset.width;
        uri += '/' + window.btoa(images[i].dataset.src);
        images[i].src = uri;
      }
    }
  };

  var initialize = function() {
    initSocialButtons('share-facebook', shareHover('Share on Facebook'), shareClickFacebook);
    initSocialButtons('share-twitter', shareHover('Share on Twitter'), shareClickTwitter);

    embedSizedImages();
  };

  initialize();
})();
