jQuery.event.props.push("dataTransfer"),function(){var e,r=[],a={settings:{bod:$("body"),img:$("#profile-avatar"),fileInput:$("#uploader")},init:function(){e=a.settings,a.bindUIActions()},bindUIActions:function(){var r;e.bod.on("dragover",function(o){return $(".profile-avatar-wrap").css("background","rgba(0, 0, 0, 0.06)").css("color","rgba(48, 48, 48, 0.4)").css("outline","5px dashed rgba(48, 48, 48, 0.4)"),clearTimeout(r),o.currentTarget==e.bod[0]&&a.showDroppableArea(),!1}),e.bod.on("dragleave",function(o){o.currentTarget==e.bod[0]&&($(".profile-avatar-wrap").css("background","#fff").css("color","#D5D5D5").css("outline","5px dashed #D5D5D5"),r=setTimeout(function(){a.hideDroppableArea()},200))}),e.bod.on("drop",function(e){e.preventDefault(),a.handleDrop(e.dataTransfer.files)}),e.fileInput.on("change",function(e){a.handleDrop(e.target.files)})},showDroppableArea:function(){e.bod.addClass("droppable")},hideDroppableArea:function(){e.bod.removeClass("droppable")},handleDrop:function(e){a.hideDroppableArea();var r=e[0];if("undefined"!=typeof r&&r.type.match("image.*"))alert("This is image file..."),location.reload();else if("undefined"!=typeof r){var o=new FileReader;o.readAsText(r,"shift-jis"),o.onload=function(){alert("test")},o.onerror=function(e){alert("Error!:"+e.target.error.code)}}else alert("Please redrop .ccb file...")},resizeImage:function(e,r,a){var o=new FileReader;o.onload=function(){Resample(this.result,r,r,a)},o.readAsDataURL(e),o.onabort=function(){alert("The upload was aborted.")},o.onerror=function(){alert("An error occured while reading the file.")}},placeImage:function(r){e.img.attr("src",r)}};a.init(),$("#mleft, #aleft").click(function(){location.reload()}),$("#mright").click(function(){for($("#drs").text("Result Screen"),$("#before").hide(),$("#after").fadeIn(),i=0;i<r.length;i++);})}();