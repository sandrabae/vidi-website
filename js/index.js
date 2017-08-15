var Imgs = {
    "values": [
      { "importance": 1, "src": '../img/1.jpg' },
      { "importance": 2, "src": '../img/2.jpg' },
      { "importance": 3, "src": '../img/3.jpg' },
      { "importance": 4, "src": '../img/4.jpg' },
      { "importance": 5, "src": '../img/5.jpg' },
      { "importance": 1, "src": '../img/6.jpg' },
      { "importance": 1, "src": '../img/7.jpg' },
      { "importance": 2, "src": '../img/8.jpg' },
      { "importance": 2, "src": '../img/9.jpg' },
      { "importance": 5, "src": '../img/10.jpg' },
      { "importance": 3, "src": '../img/11.jpg' },
      { "importance": 2, "src": '../img/12.jpg' },
      { "importance": 2, "src": '../img/13.jpg' },
    ]
}
 console.log(Imgs.values[1].src);


$.fn.masonryImagesReveal = function($items) {
  var msnry = this.data('masonry');
  var itemSelector = msnry.options.itemSelector;
  // hide by default
  $items.hide();
  // append to container
  this.append($items);
  $items.imagesLoaded().progress(function(imgLoad, image) {
    // get item
    // image is imagesLoaded class, not <img>, <img> is image.img
    var $item = $(image.img).parents(itemSelector);
    // un-hide item
    $item.show();
    // masonry does its thing
    msnry.appended($item);
  });

  return this;
};

function randomInt(min, max) {
  return Math.floor(Math.random() * max + min);
}

function getItem(i) {
  
  var width = randomInt(150, 400);
  var height = randomInt(150, 400);
  var imgCategories = ['nature', 'sports', 'food'];
  var index =  Math.floor(Math.random() * imgCategories.length);
  // var item = '<div class="item"><div><div><div>' + '<img src="http://lorempixel.com/' + width + '/' + height + '/' + imgCategories[index] + '"/></div></div></div></div>';
    
  var item = '<div class="item'+Imgs.values[i].importance+'"><div><div><div>' + '<img src="'+Imgs.values[i].src+'"/></div></div></div></div>';
  console.log(item);

  return item;
};


function getItems() {
  var items = '';
  for (var i = 0; i < 13; i++) {
    items += getItem(i);
  }
  // return jQuery object
  return $(items);
}

$(function() {
  var $container = $('#container').masonry({
    itemSelector: '.item1, .item2, .item3, .item4, .item5', 
    columnWidth: 300
  });

  // SimpleInfiniteScroll
  function Infinite(e) {
    if ((e.type == 'scroll') || e.type == 'click') {
      var doc = document.documentElement;
      var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
      var bottom = top + $(window).height();
      var docBottom = $(document).height();

      if (bottom + 200 >= docBottom) {
        console.log("are you ever in me");
        var items = getItems();
        $container.masonryImagesReveal(items);
      }
    }
  }

  $(window).scroll(Infinite);

  var items = getItems();
  $container.masonryImagesReveal(items);
});