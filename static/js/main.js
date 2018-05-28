jQuery(document).ready(function () {
  

  // style form
  $('button[value="add"]').empty();
  $('button[value="add"]').prepend('<i class="fas fa-plus"></i>');

  $('button[value="search"]').empty();
  $('button[value="search"]').prepend('<i class="fas fa-search"></i>');

  // autoresize textarea
  $('textarea').each(function () {
    this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
  }).on('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });

  // change background according to URL
  var loc = window.location.href; // returns the full URL
  if(/results/.test(loc)) {
    $('.background').addClass('no-bck');
    $('body').addClass('no-bck');
    $('.background').css('position','relative');
    $('.background').css('height','25%');
    $('header').css('position','fixed');
    $('header').css('background-color','white');
    $('header').css('width','100%');
    $('h1').css('height','3.5em');
    $('header h1 span').css('color','#696969');
  }

  // style references text area
  // $('#references').attr('rows', '10');
  $('#references').attr('cols', '50');

  // save edits and update the table for export
  $(".save").click(function() {

    
    $(this).attr('value','done!');
    // export 2nd column of the table
    var table = TableExport(document.getElementById("results-table"), {
      headings: false,                       
      footers: false, 
      formats: ["xls", "csv", "txt"],        
      fileName: "results",                         
      bootstrap: true,                     
      position: "top",                   
      ignoreRows: null,                 
      ignoreCols: [0,2],                 
      ignoreCSS: ".tableexport-ignore",       
      emptyCSS: ".tableexport-empty",      
      trimWhitespace: true          
    });

    var tableUpd = $("#results-table").html();
    $("#results-table").html(tableUpd); 
    table.reset();    
    table.getExportData();
  });


  // DOES NOT WORK highlight references in the textarea for double check
  // $("textarea").markRegExp('(.+?)(\n|$)+');

  // accept / modify buttons
  $("button.accept").click(function() {
    var area = $(this).prev('textarea:first').text();
    var text = $(this).prevAll('textarea:first').html();
    $(this).prevAll('textarea:first').html(text); 
    console.log(area);
    ////////////////////
    // placeholder to change the call
    ////////////////////
    // var request = new XMLHttpRequest();
    // request.open('GET', 'http://search.crossref.org/dois?q=hallo', true);
    // console.log(request.response);
    // request.send();

    $("button.modify").click(function() {
      $(this).prevAll('p:first').attr("contenteditable", 'true');
      var area = $(this).prevAll('p:first').text();
      console.log(area);

      $('button.accept').click(function() {
        $(this).prevAll('p:first').attr("contenteditable", 'false');
        var text = $(this).prevAll('p:first').html();
        $(this).prevAll('p:first').html(text); 
        console.log(area);
        
        ////////////////////
        // placeholder to change the call
        ////////////////////
        // var request = new XMLHttpRequest();
        // request.open('GET', 'http://search.crossref.org/dois?q=hallo', true);
        // console.log(request.response);
        // request.send(); 
      });
  });

  });

  $("button.modify").click(function() {
      $(this).prevAll('p:first').attr("contenteditable", 'true');
      var area = $(this).prevAll('p:first').text();
      console.log(area);

      $('button.accept').click(function() {
        $(this).prevAll('p:first').attr("contenteditable", 'false');
        var text = $(this).prevAll('p:first').html();
        $(this).prevAll('p:first').html(text); 
        console.log(area);
        
        ////////////////////
        // placeholder to change the call
        ////////////////////
        // var request = new XMLHttpRequest();
        // request.open('GET', 'http://search.crossref.org/dois?q=hallo', true);
        // console.log(request.response);
        // request.send(); 
      });
  });

});


