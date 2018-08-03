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
          console.log(arr[i])
        }
    }
    return unique_array
}

function buildBoxHtml(boxId) {
  var html = '';

  boxObjects = boxes[boxId].objects;
  console.log(boxId);
  boxObjects = removeDuplicates(boxObjects)
  boxObjects.forEach((objectId, index) => {
    html += buildObjectHtml(objectId)
  });
  return html;
}

function buildObjectHtml(objectId) {
  var html = '<div class="row">'
  html += '<div class="col-6 mb-3"><img  class="img-fluid img-thumbnail" src="img/objects/' + objects[objectId].filename + '"></div>';
  html += '<div class="col-6">' + objects[objectId].filename + '</div>';
  html += '</div>';
  return html
}
