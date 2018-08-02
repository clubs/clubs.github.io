function object(id, src) {
    this.id = id;
    this.src = src;
}

$.getJSON('', function(data) {
    //data is the JSON string
});

var boxObjectsDict = { 0: [1, 2, 3], 1: [1, 2, 3]};


function popup(id) {
  boxId = parseInt(id.slice(4));
  var boxHtml = buildBoxHtml(boxId)
  $('#boxPopupBody').html(boxHtml);
  $('#boxPopup').modal();
}

function buildBoxHtml(boxId) {
  var html = '';
  objects = boxObjectsDict[boxId];
  objects.forEach((objectId, index) => {
    html += buildObjectHtml(objectId)
  });
  return html;
}

function buildObjectHtml(objectId) {
  var html = objectId
  return html
}
