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
  // boxId = 4;
  var boxHtml = buildBoxHtml(boxId)
  $('#boxPopupBody').html(boxHtml);
  $('#boxPopupTitle').html('Box ' + boxId);
  $('#boxPopup').modal();
}

function buildBoxHtml(boxId) {
  var html = '';

  boxObjects = boxes[boxId].objects;
  boxObjects.forEach((objectId, index) => {
    html += buildObjectHtml(objectId)
  });
  return html;
}

function buildObjectHtml(objectId) {
  console.log(objects);
  var html = '<div class="row">'
  html += '<div class="col-6 mb-3"><img  class="img-fluid img-thumbnail" src="img/objects/' + objects[objectId].filename + '"></div>';
  html += '<div class="col-6">' + objects[objectId].filename + '</div>';
  html += '</div>';
  return html
}
