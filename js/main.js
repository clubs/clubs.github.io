$(document).ready(function() {
  $('.test, .nav-link, .navbar-brand, .new-button').click(function() {
    var sectionTo = $(this).attr('href');
    $('html, body').animate({scrollTop: $(sectionTo).offset().top - 90}, 700);
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
var objectScenes;

$.getJSON('data/boxes.json', function(data) {
  // data is the JSON string
  boxes = data.boxes;
});

$.getJSON('data/objects.json', function(data) {
  // data is the JSON string
  objects = data.objects;
});

$.getJSON('data/object_scenes.json', function(data) {
  // data is the JSON string
  objectScenes = data.object_scenes;
});

function popupObjectList() {
  var objectListHtml = buildObjectListHtml()
  $('#objectListPopupBody').html(objectListHtml);
  $('#objectListModal').modal();
}

function buildObjectListHtml() {
  var html = '<table class="table table-sm table-hover">'
  html += '<thead> <tr>';
  html += '<th scope="col"><span><center>id</center></span></th>';
  html += '<th scope="col"><span><center>Image</center></span></th>';
  html += '<th scope="col"><span><center>Class</center></span></th>';
  html += '<th scope="col"><span><center>Sub-class</center></span></th>';
  html += '<th scope="col"><span><center>Sub-sub-class</center></span></th>';
  html += '<th scope="col"><span><center>Shape</center></span></th>';
  html += '<th scope="col"><span><center>Rigidity</center></span></th>';
  html += '<th scope="col"><span><center>Download</center></span></th>';
  html += '</tr> </thead> <tbody>';

  objectScenes.forEach(
      (objectScene, index) => {html += buildObjectSceneHtml(objectScene)});


  html += '</tbody> </table>';
  return html;
}

function buildObjectSceneHtml(objectScene) {
  console.log(objectScene)
  var html = '<tr>';
  html += '<th scope="row"><span><center>' + objectScene.id.toString() +
      '</center></span></th>';
  html += '<td><img class="img-fluid img-fluid" src="img/objects/' +
      objects[objectScene.id].filename + '"></td>';
  html += '<td><span><center>' + objectScene.category + '</center></span></td>';
  html +=
      '<td><span><center>' + objectScene.sub_category + '</center></span></td>';
  html += '<td><span><center>' + objectScene.sub_sub_category +
      '</center></span></td>';
  html += '<td><span><center>' + objectScene.shape + '</center></span></td>';
  html += '<td><span><center>' + objectScene.rigidity + '</center></span></td>';
  html += '<td><span><center>' +
      'TODO' +
      '</center></span></td>';
  html += '</tr>';
  return html;
}

function popup(id) {
  boxId = parseInt(id.slice(4));
  var boxHtml = buildBoxHtml(boxId);
  $('#boxPopupBody').html(boxHtml);
  $('#boxPopupTitle').html('Box ' + boxId);
  $('#boxPopup').modal();
}

function removeDuplicates(arr) {
  let unique_array = [];
  for (let i = 0; i < arr.length; i++) {
    if (unique_array.indexOf(arr[i]) == -1) {
      unique_array.push(arr[i]);
    } else {
      console.log('Duplicate object in box : ' + arr[i]);
    }
  }
  return unique_array;
}

function buildBoxHtml(boxId) {
  boxFeatures = boxes[boxId].features;

  var html = '<div class="container"><div class="row">';
  html +=
      '<div class="col-6 mb-1 p-1"><center><img class="img-fluid" src="gif/box_' +
      boxId.toString().padStart(3, '0') +
      '.gif" alt=""></center><div class="pt-2"><b>Box features:</b><ul>';
  boxFeatures.forEach((feature, index) => {
    html += '<li type="circle">' + feature.toString() + '</li>';
  });
  html += '</ul></div></div>';
  html +=
      '<div class="col-6 mb-1 p-1"><center><img class="img-fluid" src="img/plots/box_' +
      boxId.toString() + '.png" alt=""></center></div>';
  html += '</div></div><div class="row">';
  html +=
      '<div pt-20>Object contained in this box: </div></div><div class="row">';

  boxObjects = boxes[boxId].objects;
  boxObjects = removeDuplicates(boxObjects);
  boxObjects.forEach((objectId, index) => {
    html += buildObjectHtml(objectId);
  });

  html += '</div></div>';
  return html;
}

function buildObjectHtml(objectId) {
  id = objects[objectId].filename.slice(1, 3);
  var html =
      '<div class="col-2 px-2 pb-2"><img  class="img-fluid img-fluid" src="img/objects/' +
      objects[objectId].filename + '"><span><center>' + id +
      '</center></span></div>';
  return html;
}
