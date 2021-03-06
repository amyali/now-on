$(document).ready(function () {
  
  $.ajax({
      type: "GET",
      url: "http://www.espn.com/espn/rss/news",
      dataType: "xml",
      success: xmlParser
     });
  $.ajax({
      type: "GET",
      url: "https://vimeo.com/channels/staffpicks/videos/rss",
      dataType: 'XML',
      jsonpCallback: 'xmlParserVimeo'
     });

  $.ajax({
      type: "GET",
      url: "http://pitchfork.com/rss/news/",
      dataType: 'XML',
      jsonpCallback: 'xmlParserPitchfork'
     });
  });

  function xmlParser(xml) {

  $('#load').fadeOut();
  var $index = 0;

  $(xml).find("item").each(function () {


      $(".book").fadeIn(1000);
      $(".main").append('<div class="espn '+$index+ '"><div class="title">' + $(this).find("description").text() + '<div class="title">' + $(this).find("link").text() +'</div>'+ '<br /></div></div>');
      // ADD PICTURE


          $index++;
              $.ajax({
                 url: $(this).find("link").text(),
                 success: function(data) {
                  // console.log($(data).find("picture:first").find("source:first").attr("srcset"));
                          var img = $('<img id="dynamic">'); //Equivalent: $(document.createElement('img'))
                                          img.attr('src', $(data).find("picture:first").find("source:first").attr("srcset"));
                                          $(".main").append(img);
                 }
              });

   });
  };

  //VIMEO
  function xmlParserVimeo(xml) {

  $('#load').fadeOut();

  $(xml).find("item").each(function () {
      $(".main").append('<div class="Vimeo"><div class="title">' + $(this).find("title").text() + '<div class="title">' + $(this).find("description").text() +'</div>'+ '<div class="pic">' + $(this).find("description:iframe src").text() +'</div>'+'<br /></div></div>');
      var video = $('<video />', {
          id: 'video',
          src: $(this).find("description:iframe src").text(),
          type: 'video/mp4',
          controls: true
          });
              video.appendTo($('.main'));
   });
  };

  //Pitchfork
  function xmlParserPitchfork(xml) {

  $('#load').fadeOut();

  $(xml).find("item").each(function () {
      $(".main").append('<div class="Vimeo"><div class="title">' + $(this).find("title").text() + '<div class="title">' + $(this).find("description").text() +'</div>'+ '<div class="pic">' + $(this).find("enclourse:url").text() +'</div>'+'<br /></div></div>');

  });
    
}
