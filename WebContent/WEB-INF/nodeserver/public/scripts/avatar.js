jQuery.event.props.push('dataTransfer');
(function() {

  var num = 0;
  var filecount = 0;
  var s;
  
  var texts = [];
  var filename = [];


  var Avatar = {

    settings: {
      bod: $("body"),
      img: $("#profile-avatar"),
      fileInput: $("#uploader")
    },

    init: function() {
      s = Avatar.settings;
      Avatar.bindUIActions();
    },

    bindUIActions: function() {

      var timer;




      s.bod.on("dragover", function(event) {
$(".profile-avatar-wrap").css("background", "rgba(0, 0, 0, 0.06)").css("color", "rgba(48, 48, 48, 0.4)").css("outline", "5px dashed rgba(48, 48, 48, 0.4)");
        clearTimeout(timer);
       if (event.currentTarget == s.bod[0]) {
          Avatar.showDroppableArea();
        }

    
        return false;
      });

      s.bod.on('dragleave', function(event) {
        if (event.currentTarget == s.bod[0]) {
$(".profile-avatar-wrap").css("background", "#fff").css("color", "#D5D5D5").css("outline", "5px dashed #D5D5D5")
          // Flicker protection
          timer = setTimeout(function() {
            Avatar.hideDroppableArea();
          }, 200);
        }
      });

      s.bod.on('drop', function(event) {
        // Or else the browser will open the file
        event.preventDefault();

        Avatar.handleDrop(event.dataTransfer.files);
      });

      s.fileInput.on('change', function(event) {
        Avatar.handleDrop(event.target.files);
      });
    },

    showDroppableArea: function() {
      s.bod.addClass("droppable");
    },

    hideDroppableArea: function() {
      s.bod.removeClass("droppable");
    },

    handleDrop: function(files) {

      Avatar.hideDroppableArea();

      // Multiple files can be dropped. Lets only deal with the "first" one.
      var file = files[0];

      if (typeof file !== 'undefined' && file.type.match('image.*')) {
                alert('This is image file...');
 location.reload();

      }else if(typeof file !== 'undefined'){ 
        var reader = new FileReader();
        reader.readAsText(file, "shift-jis");
        reader.onload = function(evt){
            var name = file.name;
            var type = name.split('.').pop();
            if(type == 'ccb'){   
                          $('#dropa').css('background', 'rgb(218, 109, 143)').css('color', 'rgba(255, 255, 255, 0.98)').css('outline', 'rgba(99, 3, 3, 0.83) dashed 5px').text('Uploading... "'+name+'"'); 
                          $('#cobolname').text(name);     
                          $('#cobols').text(evt.target.result);       
                          $('#cobolsub').click();
            }else{
                           alert('This is not .ccb file...');
                            location.reload();
            }
      

          


          }
        reader.onerror = function(evt){
        alert("Error!:"+evt.target.error.code);
        }



      }else {

       alert("Please redrop .ccb file...");
   location.reload();

      }

    },

    resizeImage: function(file, size, callback) {

      var fileTracker = new FileReader;
      fileTracker.onload = function() {
        Resample(
         this.result,
         size,
         size,
         callback
       );
      }
      fileTracker.readAsDataURL(file);

      fileTracker.onabort = function() {
        alert("The upload was aborted.");
      }
      fileTracker.onerror = function() {
        alert("An error occured while reading the file.");
      }

    },

    placeImage: function(data) {
      s.img.attr("src", data);
    }

  }

  Avatar.init();


  $('#mleft, #aleft').click(function(){
    location.reload();
  });

  $('#mright').click(function(){
        for ($("#drs").text("Result Screen"), $("#before").hide(), $("#after").fadeIn(), i = 0; i < r.length; i++);
  });

})();
