/*!
 * jQuery Uploader
 *
 * Copyright 2010 Kevin Sylvestre
 */

(function ($) {

  $.fn.uploader = function(options) {

    var settings = {
      url: '/',
      path: ':identifier:extension',
      files: null,
      method: 'POST',
      events: { 
        error: null, 
        progress: null, 
      },
    };
    
    if (options) ($.extend(settings, options));
    
    const XMLHttpFactories = [
      function () { return new XDomainRequest(); },
      function () { return new XMLHttpRequest(); },
      function () { return new ActiveXObject("Msxml2.XMLHTTP"); },
      function () { return new ActiveXObject("Msxml3.XMLHTTP"); },
      function () { return new ActiveXObject("Microsoft.XMLHTTP"); },
    ];
    
    var xhr = null;
    
    for (var i = 0; i < XMLHttpFactories.length; i++) {
      try { xhr = XMLHttpFactories[i](); break; } catch (exception) { continue; }
    }
    
    if (!(xhr && ('upload' in xhr) && ('onprogress' in xhr.upload))) return;
    
    xhr.upload.addEventListener('progress', settings.events.progress, false);
    
    var path = settings.path;
    
    for (var i = 0; i < settings.files.length; i++) {
      
      var file = settings.files[i];
      
      var formdata = new FormData();
      formdata.append('file', file);
      formdata.append('path', path);
      
      xhr.open(settings.method, settings.url, true);
      xhr.send(formdata);
      
    }

  };
  
}) (jQuery);