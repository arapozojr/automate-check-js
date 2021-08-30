javascript:

var TABLE_ID = "MainContent_divResposta";
var table = document.getElementById(TABLE_ID);
var headerHTML = table.getElementsByTagName('thead')[0].rows[0].cells;
var rowsHTML = table.getElementsByTagName('tbody')[0].rows;

var headerArray = []
for (var i = 0; i < headerHTML.length; i++) {
  headerArray.push(headerHTML[i].innerText);
}

var rowsArray = [ headerArray ];
var cellArray = []

var i = 0;
var firstValue = ''
while (i < rowsHTML.length - 1) {
  firstValue = rowsHTML[i].cells[0].innerText;
  if (!isNaN(firstValue)) { //Linha de dados
    resultText = rowsHTML[i+1].cells[0].innerText;
    if (resultText.trim().toLowerCase() === 'REGISTRO AR - ASSINA'.trim().toLowerCase()){
      cellArray = [];
      for (j = 0; j< rowsHTML[i].cells.length; j++)
        cellArray.push(rowsHTML[i].cells[j].innerText);
      cellArray.push(resultText);
      rowsArray.push(cellArray);
    }
  }
  i++;
}

var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

newdate = year + "-" + month + "-" + day;

var csvContent = "data:text/csv;charset=utf-8,"
  + rowsArray.map(e => e.join(";")).join("\n");
var encodedUri = encodeURI(csvContent);
var link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", "NDS_bloqueadas_" + newdate + ".csv");
document.body.appendChild(link);

link.click();