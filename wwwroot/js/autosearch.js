//function filterTable(searchValue) {
//    var table = document.getElementById("invoiceTable");
//    var rows = table.querySelectorAll("tbody tr");

//    rows.forEach(function (row) {
//        var cells = row.getElementsByTagName("td");
//        var found = false;

//        Array.from(cells).forEach(function (cell) {
//            if (cell.textContent.indexOf(searchValue) > -1) {
//                found = true;
//            }
//        });

//        row.style.display = found ? "" : "none";
//    });
//}



  let sortOrder = 1; // 1 for ascending, -1 for descending

    function sortTable(n) {
        const table = document.getElementById("invoiceTable");
        let rows, switching, i, x, y, shouldSwitch;
        switching = true;
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                if (sortOrder == 1) {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (sortOrder == -1) {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
        sortOrder = -sortOrder; // Toggle sort order
    }
 function filterTable() {
    const inputElement = document.getElementById('filterInput');
    const columnElement = document.getElementById('filterColumn');
    const conditionElement = document.getElementById('filterCondition');
    
    if (!inputElement || !columnElement || !conditionElement) {
        console.error("One or more filter elements are missing.");
        return;
    }

    const input = inputElement.value.toUpperCase();
    const filterColumn = parseInt(columnElement.value);
    const filterCondition = conditionElement.value;

    if (isNaN(filterColumn)) {
        console.error("Filter column value is not a valid number.");
        return;
    }

    const table = document.getElementById('invoiceTable');
    if (!table) {
        console.error("Table element with ID 'invoiceTable' is missing.");
        return;
    }

    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];

        // Look for records inside rows with the class 'tbl-accordion-body'
        if (row.classList.contains('tbl-accordion-header')) {
            // This row is inside an accordion body, handle it accordingly
            const td = row.getElementsByTagName('td')[filterColumn];
            if (td) {
                const txtValue = td.textContent || td.innerText || '';
                if (applyCondition(txtValue.toUpperCase(), input, filterCondition, filterColumn)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        } else {
            // Handle regular rows
            const td = row.getElementsByTagName('td')[filterColumn];
            if (td) {
                const txtValue = td.textContent || td.innerText || '';
                if (applyCondition(txtValue.toUpperCase(), input, filterCondition, filterColumn)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        }
    }
}



    function applyCondition(value, filter, condition, column) {
      
        switch (condition) {
            case 'contains':
                return value.includes(filter);
            case 'equals':
                return value === filter;
            case 'notEquals':
                return value !== filter;
            case 'greaterThan':
                if (column === 0 || column === 6) { // Invoice # or Liters column
                    return parseFloat(value) > parseFloat(filter);
                }
                return value > filter;
            case 'lessThan':
                if (column === 0 || column === 6) { // Invoice # or Liters column
                    return parseFloat(value) < parseFloat(filter);
                }
                return value < filter;
            default:
                return false;
        }
    }
    function openInNewTab(url) {
        window.open(url, '_blank');
    }



    
  
            // Define the filter function
                function filterTabless() {
            var searchValue = document.getElementById('searchInput').value.toLowerCase();
            var table = document.getElementById("invoiceTables");
            var rows = table.querySelectorAll("tbody tr");

            rows.forEach(function(row) {
                var cells = row.getElementsByTagName("td");
                var found = false;

                Array.from(cells).forEach(function(cell) {
                    if (cell.textContent.toLowerCase().includes(searchValue)) {
                        found = true;
                    }
                });

                row.style.display = found ? "" : "none";
            });
        }

              function exportTableToExcel() {
            var table = document.getElementById('invoiceTables');
            var workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
            var wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
            
            function s2ab(s) {
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
            }

            var filename = 'table-data.xlsx';
            var blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
            var link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
           
       function copyTableToClipboard() {
        var table = document.getElementById('invoiceTables');
        var textContent = '';

        // Extract and format the table header
        var headerRow = table.querySelector('thead tr');
        if (headerRow) {
            var headerText = [];
            headerRow.querySelectorAll('th').forEach(function(cell) {
                headerText.push(cell.textContent.trim());
            });
            textContent += headerText.join('\t') + '\n'; // Add header row text
        }

        // Extract and format each row of the table body
        table.querySelectorAll('tbody tr').forEach(function(row) {
            var rowText = [];
            row.querySelectorAll('td').forEach(function(cell) {
                rowText.push(cell.textContent.trim());
            });
            textContent += rowText.join('\t') + '\n'; // Add body row text
        });

        // Use the Clipboard API to copy the text content
        navigator.clipboard.writeText(textContent).then(function() {
            alert('Table text copied to clipboard successfully.');
        }, function(err) {
            alert('Failed to copy table text: ', err);
        });
    }


