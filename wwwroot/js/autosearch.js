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
function filterTabless(jsonDataString) {
    // Parse the JSON string back into a JavaScript object/array
    var jsonData = JSON.parse(jsonDataString);

    var searchValue = document.getElementById('searchInput').value.toLowerCase();

    // Filter the JSON data based on the search value
    var filteredData = jsonData.filter(function (item) {
        var itemString = Object.values(item).join(" ").toLowerCase();
        return itemString.includes(searchValue);
    });

    // Return the filtered data as a JSON string
    return JSON.stringify(filteredData);
}



function exportTableToExcel(dataJson) {
    var table = document.getElementById('invoiceTables');
    var workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    var worksheet = workbook.Sheets['Sheet1'];

    // Optional: Adding styles to the workbook
    worksheet['!cols'] = [
        { wpx: 150 }, // Adjust column width if needed
        { wpx: 100 },
        { wpx: 120 }
    ];

    // Add styling to the cells
    var range = XLSX.utils.decode_range(worksheet['!ref']);
    for (var R = range.s.r; R <= range.e.r; ++R) {
        for (var C = range.s.c; C <= range.e.c; ++C) {
            var cell_address = { c: C, r: R };
            var cell_ref = XLSX.utils.encode_cell(cell_address);
            if (!worksheet[cell_ref]) continue;

            worksheet[cell_ref].s = {
                alignment: {
                    vertical: 'center',
                    horizontal: 'center'
                }
            };
        }
    }

    var wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    var today = new Date();
    var formattedDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD

    var filename = 'Driver-Shortage-Summary-' + formattedDate + '.xlsx';
    var blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


function copyTableToClipboard() {
    try {
        var table = document.getElementById('invoiceTables');
        var textContent = '';

        // Extract and format the table header
        var headerRow = table.querySelector('thead tr');
        if (headerRow) {
            var headerText = [];
            headerRow.querySelectorAll('th').forEach(function (cell) {
                headerText.push(cell.textContent.trim());
            });
            textContent += headerText.join('\t') + '\n'; // Add header row text
        }

        // Extract and format each row of the table body
        table.querySelectorAll('tbody tr').forEach(function (row) {
            var rowText = [];
            row.querySelectorAll('td').forEach(function (cell) {
                rowText.push(cell.textContent.trim());
            });
            textContent += rowText.join('\t') + '\n'; // Add body row text
        });

        // Create a temporary textarea element
        var textarea = document.createElement('textarea');
        textarea.value = textContent;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        alert('Copied to Clipboard');
    } catch (error) {
        console.error('Failed to copy table text: ', error);
        alert('An error occurred while copying the table text.');
    }
}





window.addKeyboardShortcut = () => {
    let isFilterVisible = false; // Track the visibility state

    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.shiftKey && event.code === 'KeyL') {
            isFilterVisible = !isFilterVisible; // Toggle visibility state
            const filterInputs = document.querySelectorAll('.filter-input');

            filterInputs.forEach(input => {
                input.style.display = isFilterVisible ? 'block' : 'none';
                if (isFilterVisible) {
                    input.focus();
                }
            });
        }
    });
};



function openInNewTab2(url) {
    window.open(url, '_blank');
}

function exportTablessToExcel(tableId, filenames) {
    var table = document.getElementById(tableId);
    if (!table) {
        console.error(`Table with ID ${tableId} not found.`);
        return;
    }

    var workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    var worksheet = workbook.Sheets['Sheet1'];

    // Optional: Adding styles to the workbook
    worksheet['!cols'] = [
        { wpx: 150 }, // Adjust column width if needed
        { wpx: 100 },
        { wpx: 120 },
        { wpx: 200 }  // Assuming the last column needs more width for the link
    ];

    // Add styling to the cells
    var range = XLSX.utils.decode_range(worksheet['!ref']);
    for (var R = range.s.r; R <= range.e.r; ++R) {
        for (var C = range.s.c; C <= range.e.c; ++C) {
            var cell_address = { c: C, r: R };
            var cell_ref = XLSX.utils.encode_cell(cell_address);
            if (!worksheet[cell_ref]) continue;

            worksheet[cell_ref].s = {
                alignment: {
                    vertical: 'center',
                    horizontal: 'center'
                }
            };
        }
    }

    // Add links to the last column
    for (var i = 1; i < table.rows.length; i++) {  // Start from 1 to skip the header
        var row = table.rows[i];
        var lastCell = row.cells[row.cells.length - 1]; // Get last cell (assuming this is where the link is)
        var link = lastCell.querySelector('a'); // Find <a> tag

        if (link) {
            var linkUrl = link.href; // Get href attribute
            var cellAddress = XLSX.utils.encode_cell({ c: row.cells.length - 1, r: i }); // Excel cell reference
            worksheet[cellAddress] = { t: 's', v: linkUrl }; // Set the cell value as plain text
        }
    }

    var wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    var today = new Date();
    var formattedDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD

    var filename = filenames + formattedDate + '.xlsx';
    var blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
function closeCurrentTab() {
    window.close();
}
//function exportTablessToExcel(tableId,filenames) {
//    var table = document.getElementById(tableId);
//    if (!table) {
//        console.error(`Table with ID ${tableId} not found.`);
//        return;
//    }

//    var workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
//    var worksheet = workbook.Sheets['Sheet1'];

//    // Optional: Adding styles to the workbook
//    worksheet['!cols'] = [
//        { wpx: 150 }, // Adjust column width if needed
//        { wpx: 100 },
//        { wpx: 120 }
//    ];

//    // Add styling to the cells
//    var range = XLSX.utils.decode_range(worksheet['!ref']);
//    for (var R = range.s.r; R <= range.e.r; ++R) {
//        for (var C = range.s.c; C <= range.e.c; ++C) {
//            var cell_address = { c: C, r: R };
//            var cell_ref = XLSX.utils.encode_cell(cell_address);
//            if (!worksheet[cell_ref]) continue;

//            worksheet[cell_ref].s = {
//                alignment: {
//                    vertical: 'center',
//                    horizontal: 'center'
//                }
//            };
//        }
//    }

//    var wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

//    function s2ab(s) {
//        var buf = new ArrayBuffer(s.length);
//        var view = new Uint8Array(buf);
//        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
//        return buf;
//    }

//    var today = new Date();
//    var formattedDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD

//    var filename = filenames + formattedDate + '.xlsx';
//    var blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
//    var link = document.createElement('a');
//    link.href = URL.createObjectURL(blob);
//    link.download = filename;
//    document.body.appendChild(link);
//    link.click();
//    document.body.removeChild(link);
//}
