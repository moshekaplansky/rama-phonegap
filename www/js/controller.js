/**
 demo.js
 This provides the model and controller for the rose list app!
 It is written entirely in JavaScript with no use of AngularJS
 but it does just jQuery to handle the ajax calls in a browser independent manner...
 and it uses jQuery to access and modify the HTML file index.html
 
 VERSION 1.0.1 -- here is where we start adding some functionality
 **/

var roseApp = (function($) {


    // first create the model
    var myList = new RoseList();
    
    var showView = function(selected) {
      window.location.hash = '#' + selected; //this is just for the user to know where they are
      $('.view').hide().filter('#' + selected + '-view').show();
      //or
      //$('.view').hide();
      //$("#" + selected + '-view').show();
    };

    function playmusic(){
      myList.loadModelAudio();
      var firstFile = myList.audios[0];
      var file = $("#audioPlayer").html(firstFile);
      console.log(firstFile);
    } 
    
    function refreshView(){
      roseView.refreshView(myList);
    }

    function reloadModel(){
      myList.loadModel();
      myList.loadModelAudio(); //new
      refreshView();
    }

    function initEventListeners(){
        $(window).on('hashchange', function(event){
          var view = (window.location.hash || '').replace(/^#/, '');
          if ($('#' + view + '-view').length) {
            showView(view);
          }
        });
    }

    function start() {
        myList.loadModel();
        roseView.refreshView(myList);
        showView("welcome");
        console.log("myList = " + JSON.stringify(myList));


    }

    // here is were we decide what is visible to the outside!
    roseApp = {
        start: start,
        showView: showView,
        reloadModel: reloadModel,
        refreshView: refreshView
    }

    return (roseApp);

}(jQuery));



