$(document).ready(function () {
  $('.img-thumbnail').click(function() {
    var id = $(this).attr('id');
    id = id.slice(10, 30);
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#" + id ).offset().top - 90
    }, 1000);
  });

  $('.box').each(function() {
    $(this).append($(this).attr('id'));
  });

});


function object(id, src) {
    this.id = id;
    this.src = src;
}

var objects;
var boxes;

$.getJSON('data/boxes.json', function(data) {
    //data is the JSON string
    boxes = data.boxes;
});

$.getJSON('data/objects.json', function(data) {
    //data is the JSON string
    objects = data.objects;
});

function popup(id) {
  boxId = parseInt(id.slice(4));
  var boxHtml = buildBoxHtml(boxId)
  $('#boxPopupBody').html(boxHtml);
  $('#boxPopupTitle').html('Box ' + boxId);
  $('#boxPopup').modal();
}

function removeDuplicates(arr){
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        } else {
          console.log("Duplicate object in box : " + arr[i])
        }
    }
    return unique_array
}

function buildBoxHtml(boxId) {
  var html = '<div class="row">'
  html += '<div class="col-12 mb-3"><img class="img-thumbnail" src="gif/box_' + boxId.toString().padStart(3, '0') + '.gif" alt=""></div>';


  boxObjects = boxes[boxId].objects;
  boxObjects = removeDuplicates(boxObjects)
  boxObjects.forEach((objectId, index) => {
    html += buildObjectHtml(objectId)
  });
  html += '</div>';
  return html;
}

function buildObjectHtml(objectId) {
  var html = '<div class="col-4 mb-3"><img  class="img-fluid img-thumbnail" src="img/objects/' + objects[objectId].filename + '">' + objects[objectId].filename + '</div>';
  return html
}
