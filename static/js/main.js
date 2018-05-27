$(document).ready(function () {

  // save edits and update the table
  $(".save").click(function() {

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

  // style references text area
  $('#references').attr('rows', '20');
  $('#references').attr('cols', '120');

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
    var request = new XMLHttpRequest();
    request.open('GET', 'http://search.crossref.org/dois?q=hallo', true);
    console.log(request.response);
    request.send();

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
        var request = new XMLHttpRequest();
        request.open('GET', 'http://search.crossref.org/dois?q=hallo', true);
        console.log(request.response);
        request.send(); 
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
        var request = new XMLHttpRequest();
        request.open('GET', 'http://search.crossref.org/dois?q=hallo', true);
        console.log(request.response);
        request.send(); 
      });
  });

});


