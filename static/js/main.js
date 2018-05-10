$(document).ready(function () {

  // save editing
  document.addEventListener('keydown', function (event) {
  var esc = event.which == 27,
      nl = event.which == 13,
      el = event.target,
      input = el.nodeName != 'INPUT' && el.nodeName != 'TEXTAREA',
      data = {};

  if (input) {
    if (esc) {
      // restore state
      document.execCommand('undo');
      el.blur();
    } else if (nl) {
      // save
      data[el.getAttribute('data-name')] = el.innerHTML;

      // we could send an ajax request to update the field
      
      $.ajax({
        url: window.location.toString(),
        data: data,
        type: 'post'
      });
      
      log(JSON.stringify(data));

      el.blur();
      event.preventDefault();
    }
  }
}, true);


  // export 2nd column of the table
  var table = TableExport(document.getElementById("results-table"), {
    headings: false,                       
    footers: false, 
    formats: ["xls", "csv", "txt"],        
    fileName: "results",                         
    bootstrap: true,                     
    position: "bottom",                   
    ignoreRows: null,                 
    ignoreCols: [0,2],                 
    ignoreCSS: ".tableexport-ignore",       
    emptyCSS: ".tableexport-empty",      
    trimWhitespace: true          
  });


  // save edits and update table
  $(".save").click(function() {
    var tableUpd = $("#results-table").html();
    $("#results-table").html(tableUpd); 
    table.reset();    
    table.getExportData();
  });
});


