function removeImage() {
    const preview = document.getElementById('preview');
    preview.innerHTML = ''; // Remove all images from preview
}


function initializeDropzone() {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');
    const preview = document.getElementById('preview');

    // Open file dialog when dropzone is clicked
    dropzone.addEventListener('click', () => {
        fileInput.click();
    });

    // Handle files selected through file dialog
    fileInput.addEventListener('change', () => {
        const files = fileInput.files;
        handleFiles(files);
    });

    // Handle the files
    function handleFiles(files) {
        preview.innerHTML = ''; // Clear previous images
        for (const file of files) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.display = 'block';
                    img.id = 'myimage'; // Set ID for magnifying
                    img.style.width = '600px'; // Set fixed width
                    img.style.height = '600px'; // Set fixed height
                    preview.appendChild(img);

                    // Call magnify function
                    magnify('myimage', 3);
                };
            } else {
                alert('Please upload an image file.');
            }
        }
    }
}

function magnify(imgID, zoom) {
    var img, glass, w, h, bw;
    img = document.getElementById(imgID);
    /* create magnifier glass: */
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");
    /* insert magnifier glass: */
    img.parentElement.insertBefore(glass, img);
    /* set background properties for the magnifier glass: */
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;
    /* execute a function when someone moves the magnifier glass over the image: */
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
    /* and also for touch screens: */
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);

    function moveMagnifier(e) {
        var pos, x, y;
        /* prevent any other actions that may occur when moving over the image */
        e.preventDefault();
        /* get the cursor's x and y positions: */
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;
        /* prevent the magnifier glass from being positioned outside the image: */
        if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
        if (x < w / zoom) { x = w / zoom; }
        if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
        if (y < h / zoom) { y = h / zoom; }
        /* set the position of the magnifier glass: */
        glass.style.left = (x - w) + "px";
        glass.style.top = (y - h) + "px";
        /* display what the magnifier glass "sees": */
        glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }

    function getCursorPos(e) {
        var a, x = 0, y = 0;
        e = e || window.event;
        /* get the x and y positions of the image: */
        a = img.getBoundingClientRect();
        /* calculate the cursor's x and y coordinates, relative to the image: */
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /* consider any page scrolling: */
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }
}
// Show image from the provided path
function showImageFromPath(imagePath) {
    const preview = document.getElementById('preview');
    const existingImage = preview.querySelector('img');
    // Check if the preview element exists before proceeding
    if (!preview) {
        console.error("Element with ID 'preview' not found.");
        return; // Exit the function if preview is null
    }
    // Remove the existing image if it exists
    if (existingImage) {
        preview.removeChild(existingImage);
    }

    if (imagePath) {
        const img = document.createElement('img');
        img.src = imagePath;
        img.style.display = 'block';
        img.id = 'currentImage'; // Set a new ID for the current image
        img.style.maxWidth = '600px'; // Set fixed width
        img.style.height = '600px'; // Set fixed height
        preview.appendChild(img);

        // Call magnify function with the image element
        setTimeout(() => {
            applyMagnification(img, 3);
        }, 3000);
    }
}

// Magnify function implementation
const applyMagnification = (imgElement, zoom) => {
    var glass = document.querySelector('.img-magnifier-glass'); // Check if magnifier already exists

    // If no magnifier exists, create one
    if (!glass) {
        glass = document.createElement("DIV");
        glass.setAttribute("class", "img-magnifier-glass");
        imgElement.parentElement.insertBefore(glass, imgElement);
    }

    var w, h, bw;
    // Set background properties for the magnifier glass
    glass.style.backgroundImage = "url('" + imgElement.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (imgElement.width * zoom) + "px " + (imgElement.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;

    // Event listeners for moving the magnifier glass over the image
    glass.addEventListener("mousemove", (e) => {
        moveMagnifierGlass(e);
    });
    glass.addEventListener("touchmove", (e) => {
        e.preventDefault();
        moveMagnifierGlass(e);
    });
    imgElement.addEventListener("mousemove", (e) => {
        moveMagnifierGlass(e);
    });
    imgElement.addEventListener("touchmove", (e) => {
        e.preventDefault();
        moveMagnifierGlass(e);
    });

    const moveMagnifierGlass = (e) => {
        var pos, x, y;
        e.preventDefault();
        pos = getCursorPosition(e);
        x = pos.x;
        y = pos.y;

        if (x > imgElement.width - (w / zoom)) { x = imgElement.width - (w / zoom); }
        if (x < w / zoom) { x = w / zoom; }
        if (y > imgElement.height - (h / zoom)) { y = imgElement.height - (h / zoom); }
        if (y < h / zoom) { y = h / zoom; }
        glass.style.left = (x - w) + "px";
        glass.style.top = (y - h) + "px";
        glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    };

    const getCursorPosition = (e) => {
        var a, x = 0, y = 0;
        e = e || window.event;
        a = imgElement.getBoundingClientRect();
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    };
};





setTimeout(() => {
    const mainImage = document.getElementById('mainImage');
    let isZoomed = false;

    // Check if the main image is found before adding event listeners
    if (mainImage) {
        // Block the default action of F1 and use it to toggle zoom
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F1') {
                e.preventDefault(); // Prevent the default F1 action
                isZoomed = !isZoomed;
                mainImage.classList.toggle('zoomed', isZoomed);
            }
        });

        // Zoom in on mouse move within the zoomed area
        mainImage.addEventListener('mousemove', (e) => {
            if (isZoomed) {
                const rect = mainImage.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const xPercent = (x / rect.width) * 100;
                const yPercent = (y / rect.height) * 100;
                mainImage.style.transformOrigin = `${xPercent}% ${yPercent}%`;
            }
        });
    } else {
    }
}, 3000); // Delay of 3000 milliseconds

setTimeout(() => {
    const mainImage = document.getElementById('mainImage2');
    let isZoomed = false;

    // Check if the main image is found before adding event listeners
    if (mainImage) {
        // Block the default action of F1 and use it to toggle zoom
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F1') {
                e.preventDefault(); // Prevent the default F1 action
                isZoomed = !isZoomed;
                mainImage.classList.toggle('zoomed', isZoomed);
            }
        });

        // Zoom in on mouse move within the zoomed area
        mainImage.addEventListener('mousemove', (e) => {
            if (isZoomed) {
                const rect = mainImage.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const xPercent = (x / rect.width) * 100;
                const yPercent = (y / rect.height) * 100;
                mainImage.style.transformOrigin = `${xPercent}% ${yPercent}%`;
            }
        });
    } else {
    }
}, 8000); // Delay of 3000 milliseconds

function getUserSessionFromStorage() {
    const userSessionString = sessionStorage.getItem("UserSessionJson");

    if (userSessionString) {
        try {
            const userSession = JSON.parse(userSessionString);

            // Get the BusinessID and handle both single integer and comma-separated string
            let businessID = userSession;
            let businessIDArray = [];

            // Check if businessID is already a single integer or a string
            if (typeof businessID === 'string') {
                // If it's a string, split by commas and trim each value
                businessIDArray = businessID.split(",").map(id => id.trim());
            } else if (typeof businessID === 'number') {
                // If it's a single integer, wrap it in an array
                businessIDArray = [businessID.toString()];
            }

            // Return the array to use elsewhere

            return businessIDArray;

        } catch (error) {
            console.error("Error parsing UserSessionJson:", error);
        }
    } else {
        console.log("No UserSession found in sessionStorage");
    }
}

function toggleFilterPanel() {
    document.querySelector('.filter-slider-panel').classList.toggle('hidden-panel');
}
function initializeDotNetReference(dotNetHelper) {
    window.dotNetHelper = dotNetHelper;
}

//async function loadShortageReportbyMonth(selectedDate) {
//    try {
//        const Busid = getUserSessionFromStorage();

//        let totalRecords = 0; // Initialize totalRecords to 0 at the beginning
//        let recordsFound = false; // Flag to check if any records were processed
//        // Clear the table body before loading new data
//        const tbody = document.getElementById('dataContainer').querySelector('tbody');
//        tbody.innerHTML = '';  // This clears the existing table rows
//        const response = await fetch(`https://www.shakoorfms.com/Fleetiva/api/Invoice/LoadShortageReportByMonth?startDate=${selectedDate}`);
//        if (!response.ok) throw new Error('Network response was not ok');

//        const reader = response.body.getReader();
//        const decoder = new TextDecoder("utf-8");
//        let partialText = '';
//        while (true) {
//            const { done, value } = await reader.read();
//            if (done) break;

//            partialText += decoder.decode(value, { stream: true });
//            const lines = partialText.split('}{');

//            lines.slice(0, -1).forEach(line => {
//                const jsonLine = line.startsWith('{') ? line : '{' + line;
//                const item = JSON.parse(jsonLine + '}');
//                if (Busid.includes(String(item.BusinessID))) {
//                    updateUI(item); // Update the UI with the filtered item
//                    totalRecords++;
//                    recordsFound = true; // Set flag to true if any records are processed
//                }
//            });

//            partialText = lines[lines.length - 1];
//            if (!recordsFound) totalRecords = 0;

//            // Update the total records count display
//            document.getElementById('totalRecords').textContent = `${totalRecords} - Records`;
//        }
//    } catch (error) {
//        console.error('Failed to load data:', error);
//        document.getElementById('totalRecords').textContent = '0 - Records';
//    }
//}
//async function loadShortageReportbyMonth(selectedDate) {
//    try {
//        totalressss = 0;
//        const Busid = getUserSessionFromStorage();

//        let recordsFound = false; // Flag to check if any records were processed

//        // Clear the table body before loading new data
//        const tbody = document.getElementById('dataContainer').querySelector('tbody');
//        tbody.innerHTML = ''; // Clear existing table rows

//        const response = await fetch(`https://www.shakoorfms.com/Fleetiva/api/Invoice/LoadShortageReportByMonth?startDate=${selectedDate}`);
//        if (!response.ok) throw new Error('Network response was not ok');

//        const reader = response.body.getReader();
//        const decoder = new TextDecoder("utf-8");
//        let partialText = '';

//        while (true) {
//            const { done, value } = await reader.read();
//            if (done) break;

//            partialText += decoder.decode(value, { stream: true });

//            // Handle boundaries between JSON objects
//            let boundaryIndex;
//            while ((boundaryIndex = partialText.indexOf('}{')) !== -1) {
//                const jsonLine = partialText.slice(0, boundaryIndex + 1); // Extract complete JSON object
//                partialText = partialText.slice(boundaryIndex + 1); // Update remaining text
//                processRecord2(jsonLine, Busid); // Process each record
//                recordsFound = true; // Flag that records were processed
//            }
//            // Process the final partial JSON object if any
//            //if (partialText.trim()) {
//            //    processRecord2(partialText.trim(), Busid);
//            //    totalRecords++;
//            //    recordsFound = true;
//            //}


//            // Update the total records count display
//        }

      

//    } catch (error) {
//        console.error('Failed to load data:', error);
//        document.getElementById('totalRecords').textContent = '0 - Records';
//    }
//}

let totalressss = 0;

//function processRecord2(jsonLine, Busid) {
//    try {
       
//        const item = JSON.parse(jsonLine);

//        if (Busid.includes(String(item.BusinessID))) {
//            total++;
//            updateUI(item); // Update the UI with the filtered item
//            document.getElementById('totalRecords').textContent = `${totalressss} - Records`;

//        }
//    } catch (error) {
//    }
//}

async function loadShortageReportbyMonth(selectedDate) {
    try {
        console.log(selectedDate);
        totalressss = 0; // Reset total records count
        const Busid = getUserSessionFromStorage();

        let recordsFound = false; // Flag to check if any records were processed

        // Clear the table body before loading new data
        const tbody = document.getElementById('dataContainer').querySelector('tbody');
        tbody.innerHTML = ''; // Clear existing table rows

        const response = await fetch(`https://www.shakoorfms.com/Fleetiva/api/Invoice/LoadShortageReportByMonth?startDate=${selectedDate}`);
        if (!response.ok) throw new Error('Network response was not ok');

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let partialText = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            partialText += decoder.decode(value, { stream: true });

            // Handle boundaries between JSON objects
            let boundaryIndex;
            while ((boundaryIndex = partialText.indexOf('}{')) !== -1) {
                const jsonLine = partialText.slice(0, boundaryIndex + 1); // Extract complete JSON object
                partialText = partialText.slice(boundaryIndex + 1); // Update remaining text
                processRecord2(jsonLine, Busid); // Process each record
                recordsFound = true; // Flag that records were processed
            }
        }

        // Process any remaining text after the loop
        if (partialText.trim()) {
            processRecord2(partialText.trim(), Busid);
        }

        // If no records were processed
        if (!recordsFound) {
            document.getElementById('totalRecords').textContent = '0 - Records';
        }

    } catch (error) {
        console.error('Failed to load data:', error);
        document.getElementById('totalRecords').textContent = '0 - Records';
    }
}

function processRecord2(jsonLine, Busid) {
    try {
        const item = JSON.parse(jsonLine);

        // Check if BusinessID is in the Busid array
        if (Busid.includes(String(item.BusinessID))) {
            totalressss++; // Increment the total records count
            updateUI(item); // Update the UI with the filtered item

            // Update the total records count display
            document.getElementById('totalRecords').textContent = `${totalressss} - Records`;
        }
    } catch (error) {
        console.error('Error processing record:', error);
    }
}






function updateButtonState() {
    const loadDataButton = document.getElementById('loadDataButton');
    loadDataButton.innerHTML = isLoading
        ? `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Loading Data...`
        : `Load Data`;
}
let isLoading = false;
async function loadShortageReports() {
    try {
        const Busid = getUserSessionFromStorage();
        let totalRecords = 0; // Initialize totalRecords to 0 at the beginning
        let recordsFound = false; // Flag to check if any records were processed
        isLoading = true;
        updateButtonState();

        // Clear the table body before loading new data
        const tbody = document.getElementById('dataContainer').querySelector('tbody');
        tbody.innerHTML = '';  // Clears the existing table rows

        const currentDate = new Date().toISOString().split('T')[0];
        const response = await fetch(`https://www.shakoorfms.com/Fleetiva/api/Invoice/loadShortageReport?startDate=${currentDate}`);

        if (!response.ok) throw new Error('Network response was not ok');

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let partialText = '';  // Accumulate incomplete JSON objects

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;  // Exit when all data has been processed

            partialText += decoder.decode(value, { stream: true });

            // Process the data chunk into individual JSON objects
            let boundaryIndex;
            while ((boundaryIndex = partialText.indexOf('}{')) !== -1) {
                const jsonLine = partialText.slice(0, boundaryIndex + 1); // Extract complete JSON object
                partialText = partialText.slice(boundaryIndex + 1); // Update remaining text

                processRecord(jsonLine, Busid);  // Process the extracted record
                totalRecords++;  // Increment the totalRecords count
                recordsFound = true;  // Set flag to true if any records are processed
                
            }
            document.getElementById('totalRecords').textContent = `${totalRecords} - Records`;

           
        }

        // After reading all chunks, process the final partial record if exists
        //if (partialText.trim()) {
        //    processRecord(partialText.trim(), Busid);
        //    totalRecords++;
        //    recordsFound = true;
        //}

        // If no records found, set totalRecords to 0
        if (!recordsFound) totalRecords = 0;

        // Update the total records count display
        document.getElementById('totalRecords').textContent = `${totalRecords} - Records`;

    } catch (error) {
        console.error('Failed to load data:', error);
        document.getElementById('totalRecords').textContent = '0 - Records';

    } finally {
        // Set loading to false and update the button text after completion
        isLoading = false;
        updateButtonState();
    }
}

// Helper function to process each record
function processRecord(jsonLine, Busid) {
    try {
        const item = JSON.parse(jsonLine);
        if (Busid.includes(String(item.BusinessID))) {
            updateUI(item);  // Update the UI with the filtered item
        }
    } catch (error) {
    }
}

async function handleInvoiceClick(invoices) {
    try {
        // Serialize the model to JSON and pass it to the C# function
        // Step 1: Convert the JavaScript object to a JSON string
        const jsonString = JSON.stringify(invoices);

        // Parse the string into an object
        const invoice = JSON.parse(jsonString);

        // Step 1: Define the base URL
        const urlPrefix = "https://www.shakoorfms.com/img/";

        if (invoice.FileLocation == null) {
            invoice.FileLocation = "";
        }
        // Replace local path with URL prefix
        const newLocation = invoice.FileLocation.replace("C:\\ScannedDocs\\", urlPrefix);
     
        // Step 2: Handle based on InvoiceType
        let invoiceUrl = "";

        if (invoice.InvoiceType === "pk" && invoice.BusinessID == 1) {
            if (invoice.isInvoiceGenerated) {
                const InvoicesResponse = await fetch(`https://www.shakoorfms.com/Fleetiva/api/Invoice/GetInvoiceByID/${invoice.STO}`);

                if (!InvoicesResponse.ok) throw new Error('Network response was not ok');
                const Invoices = await InvoicesResponse.json(); // Parse the JSON response
                Invoices.IsFromDisplay = true;
                Invoices.IsView = "Update";

                // Serialize, Base64 encode, and URL-encode
                const base64EncodedJson = btoa(JSON.stringify(Invoices));
                const encodedJson = encodeURIComponent(base64EncodedJson);

                // Construct the URL
                invoiceUrl = `/invoice?Edit=${encodedJson}`;
            } else {
                const Invoice = {
                    Details: {
                        STONo: invoice.STO??"",
                        Product: invoice.Product??"",
                        TankLorryNO: invoice.Vehicle??"",
                        Date: invoice.InvoiceDate || new Date(0).toISOString(),
                        ReceivingLocation: invoice.ReceivingLocation??"",
                        SupplyPoint: invoice.ShippingLocation??"",
                        Contractor: "Shakoor & Co."
                    },
                    InvoiceFilePath: newLocation??"",
                    IsOCR: true,
                    ExtarctedID : invoice.OCRID??0
                };

                // Serialize, Base64 encode, and URL-encode
                const base64EncodedJson = btoa(JSON.stringify(Invoice));
                const encodedJson = encodeURIComponent(base64EncodedJson);

                // Construct the URL
                invoiceUrl = `/invoice?OCR=${encodedJson}`;
            }
        } else if (invoice.InvoiceType === "sc" && invoice.BusinessID == 1) {
            invoiceUrl = `/insertSec?View=${invoice.OCRID}`;
        }
        else if (invoice.BusinessID == 13) {
            const Invoice = {
                STONo: invoice.STO ?? "",
                Product: invoice.Product ?? "",
                VehicleNo: invoice.Vehicle ?? "",
                InvoiceDate: invoice.InvoiceDate ? new Date(invoice.InvoiceDate).toISOString() : new Date(0).toISOString(),
                ReceivingLoc: invoice.ReceivingLocation ?? "",
                ShippingLoc: invoice.ShippingLocation ?? "",
                Contractor: "Shakoor & Co.",
                FileLocation: newLocation ?? "",
                ExtractedID: invoice.OCRID ?? 0,
                BusinessID: invoice.BusinessID ?? 0,
                InvoiceType: invoice.InvoiceType ?? ""
            };

            // Serialize, Base64 encode, and URL-encode
            const base64EncodedJson = encodeToBase64Unicode(JSON.stringify(Invoice));
            const encodedJson = encodeURIComponent(base64EncodedJson);



            // Construct the URL
            invoiceUrl = `/AddEuroInvoice?OCR=${encodedJson}`;
        }

        else {
            invoiceUrl = newLocation;
        }

        // Step 3: Open the URL in a new tab
        if (invoiceUrl) {
            window.open(invoiceUrl, '_blank');
        }

    } catch (error) {
        console.error("Error in handleInvoiceClick:", error);
    }
}

function encodeToBase64Unicode(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

let componentInstance;

function registerComponentInstance(instance) {
    componentInstance = instance;
}



async function handleSecondaryClick(item) {

    if (componentInstance) {
        try {
            await componentInstance.invokeMethodAsync('AddSecondary', item);
        } catch (error) {
            console.error("Error calling AddSecondary:", error);
        }
    } else {
        alert("Component instance is not registered.");
    }
}



//async function handleSecondaryClick(item) {


//    if (componentInstance) {
//        try {
//            await componentInstance.invokeMethodAsync('AddSecondary', item, filteredItems);
//        } catch (error) {
//            console.error("Error calling ShowMessage2", error);
//        }
//    } else {
//        console.error("Component instance is not registered");
//    }



//    //try {
//    //    if (item.STO !== "Not Found" && item.STO !== "" && item.STO !== null &&
//    //        item.Vehicle !== "" && item.Vehicle !== null &&
//    //        item.InvoiceDate !== null) {

//    //        // Call the API endpoint to check if the STONO exists
//    //        const response = await fetch(`https://www.shakoorfms.com/Fleetiva/api/Invoice/DoesStonoExist?stono=${encodeURIComponent(item.STO)}`);
//    //        const stonoExists = await response.json();

//    //        if (stonoExists) {
//    //            const response2 = await fetch(`https://www.shakoorfms.com/Fleetiva/api/Invoice/GetTotalChamberQty?vehicleID=${encodeURIComponent(item.Vehicle)}`);
//    //            const totalchamberQty = await response2.json();


//    //            const response3 = await fetch(`https://www.shakoorfms.com/Fleetiva/api/Invoice/LoadChamberDetails?Vehicle=${encodeURIComponent(item.Vehicle)}&startDate=${encodeURIComponent(item.InvoiceDate)}`);
//    //            if (!response3.ok) throw new Error('Network response was not ok');

//    //            const reader = response3.body.getReader();
//    //            const decoder = new TextDecoder("utf-8");
//    //            let partialText = '';
//    //            while (true) {
//    //                const { done, value } = await reader.read();
//    //                if (done) break;

//    //                partialText += decoder.decode(value, { stream: true });
//    //                const lines = partialText.split('}{');

//    //                lines.slice(0, -1).forEach(line => {
//    //                    const jsonLine = line.startsWith('{') ? line : '{' + line;
//    //                    const item = JSON.parse(jsonLine + '}');
//    //                    console.log(item);

//    //                });

//    //                partialText = lines[lines.length - 1];

//    //            }




//    //        } else {
//    //            console.log("STONO does not exist.");
//    //        }

//    //    } else {
//    //        console.log("Conditions not met.");
//    //    }
//    //} catch (error) {
//    //    console.error("An error occurred:", error);
//    //}
//}

function updateUI(item) {
    const tbody = document.getElementById('dataContainer').querySelector('tbody');
    const row = document.createElement('tr');

    // Function to truncate long strings for fields like ShippingLocation
    const truncateString = (str, maxLength = 40) => {
        if (!str) return ''; // Return empty if the string is null or undefined
        return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
    };

    // Format the InvoiceDate to show only the date part (without time)
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);

        // Ensure the date is valid
        if (isNaN(date.getTime())) return '';

        // Extract month, day, and year
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();

        return `${month}-${day}-${year}`;
    };




    // Determine row style based on invoice status
    let rowStyle = '';

    if (item.isInvoiceAdded) {
        rowStyle = 'background: #00bcd4;';
    }

    else if (item.isInvoiceGenerated && item.InvoiceType == 'sc') {
        rowStyle = 'background: #caf588;'; // Green for generated invoices
    } else if (item.isInvoiceGenerated && item.InvoiceType == 'pk') {
        rowStyle = 'background-color: #DCDCDC;'; // Yellow for added invoices
    }

    row.className = 'tbl-accordion-header';
    row.setAttribute('style', rowStyle + 'transition: background-color 0.3s ease-in-out;font-size:13px;color:black;');

    // Build the row with dynamic content
    row.innerHTML = `
    <td class="align-middle text-center" style="border: #cccccc 1px solid;">${item.STO}</td>
    <td class="align-middle text-center" style="border: #cccccc 1px solid;">${item.Vehicle}</td>
    <td class="align-middle text-center" style="border: #cccccc 1px solid;">${item.BusinessName.toUpperCase()}</td>
    <td class="align-middle text-center" style="border: #cccccc 1px solid;">${formatDate(item.InvoiceDate)}</td>
    <td class="align-middle text-center" style="border: #cccccc 1px solid;">${truncateString(item.ShippingLocation)}</td>
    <td class="align-middle text-center" style="border: #cccccc 1px solid;">${truncateString(item.ReceivingLocation)}</td>
    <td class="align-middle text-center" style="border: #cccccc 1px solid;">
        ${item.InvoiceType === 'pk' ? 'Primary' : item.InvoiceType === 'sc' ? 'Secondary' : 'Unidentified'}
    </td>
    <td class="align-middle text-center" style="border: #cccccc 1px solid;">${item.Product}</td>
    <td class="align-middle text-center" style="border: #cccccc 1px solid;">
        <a class="view-button" style="cursor:pointer;">View</a>
    </td>
    ${item.InvoiceType === 'pk' ? `
        <td class="align-middle text-center" style="border: #cccccc 1px solid;">
            <a class="add-secondary-button" style="cursor:pointer;">Add Secondary</a>
        </td>` : ` <td class="align-middle text-center" style="border: #cccccc 1px solid;">
          
        </td>`}
`;

    // Attach the click event for the "Add Secondary" button if it exists
    if (item.InvoiceType === 'pk') {
        row.querySelector('.add-secondary-button').addEventListener('click', async (event) => {
            // Show loading spinner in the button
            const button = event.target;
            button.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Processing...`;
            button.style.pointerEvents = 'none'; // Disable further clicks while loading

            // Perform the "Add Secondary" action
            await handleSecondaryClick(item);

            // Restore the button text and re-enable clicks
            button.innerHTML = `Add Secondary`;
            button.style.pointerEvents = 'auto';
        });
    }


    row.querySelector('.view-button').addEventListener('click', () => handleInvoiceClick(item));
    // Add hover effect to the row for better user interaction
    //row.addEventListener('mouseover', function () {
    //    row.style.backgroundColor = '#f1f1f1'; // Light hover effect
    //    row.style.color = 'black';
    //});

    //row.addEventListener('mouseout', function () {
    //    row.style.backgroundColor = item.isInvoiceGenerated ? '#4CAF50' :
    //        item.isInvoiceAdded ? '#FFEB3B' : '#f9f9f9'; // Revert back to original
    //    row.style.color = 'black';
    //});

    // Append the new row to the table body
    tbody.appendChild(row);
}



//const filteredItems = [];
//function loadAll() {
//    filteredItems = [];
//    const response = await fetch(`https://www.shakoorfms.com/Fleetiva/api/Invoice/shortageReporting`);


//    if (!response.ok) throw new Error('Network response was not ok');

//    // Use a reader to process the response stream
//    const reader = response.body.getReader();
//    const decoder = new TextDecoder("utf-8");
//    let partialText = '';

//    // Read from the response stream
//    while (true) {
//        const { done, value } = await reader.read();
//        if (done) break;

//        // Decode the chunk and append it to partialText
//        partialText += decoder.decode(value, { stream: true });

//        // Split the text by `}{`, accounting for fragmented JSON objects
//        const lines = partialText.split(/(?<=})\s*(?={)/);

//        // Process all but the last element, which may be a partial JSON object
//        lines.slice(0, -1).forEach(line => {
//            try {
//                // Parse the JSON line and add to filteredItems
//                const item = JSON.parse(line);
//                filteredItems.push(item);
//            } catch (error) {
//                console.error("Error parsing JSON line:", line, error);
//            }
//        });

//        // Keep the last (possibly partial) item for the next chunk
//        partialText = lines[lines.length - 1];
//    }

//    // Attempt to parse any remaining JSON data in partialText after the stream ends
//    if (partialText.trim()) {
//        try {
//            const item = JSON.parse(partialText);
//            filteredItems.push(item);
//        } catch (error) {
//            console.error("Error parsing remaining JSON data:", partialText, error);
//        }
//    }

//}


function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('startDate').value = '';
    loadShortageReports();
}
function searchByMonth() {
    const selectedDate = document.getElementById('startDate').value;
    loadShortageReportbyMonth(selectedDate); // Calls filterTable with the selected date
}

function httpGet(theUrl) {
    console.log(theUrl);
    return new Promise((resolve, reject) => {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, true); // true for asynchronous request
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4) { // Check if the request is complete
                if (xmlHttp.status == 200) {
                    resolve(xmlHttp.responseText); // Resolve the Promise with the response
                } else {
                    reject(new Error('Network response was not ok'));
                }
            }
        };
        xmlHttp.send(null);
    });
}
async function filterInComplete(isPrimary) {
    try {
        const Busid = getUserSessionFromStorage();

        let totalRecords = 1; // Initialize totalRecords to 0 at the beginning
        let recordsFound = false; // Flag to check if any records were processed
        isLoading = true;
        updateButtonState();

        // Clear the table body before loading new data
        const tbody = document.getElementById('dataContainer').querySelector('tbody');
        tbody.innerHTML = '';  // Clears the existing table rows

        const response = await fetch(`https://www.shakoorfms.com/Fleetiva/api/Invoice/GetFilteredShortageReports`);
        if (!response.ok) throw new Error('Network response was not ok');

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let partialText = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            partialText += decoder.decode(value, { stream: true });
            const lines = partialText.split('}{');

            lines.slice(0, -1).forEach(line => {
                const jsonLine = line.startsWith('{') ? line : '{' + line;
                const item = JSON.parse(jsonLine + '}');

                // Check if the record matches the primary/secondary filter
                if ((isPrimary && item.InvoiceType === 'pk') || (!isPrimary && item.InvoiceType === 'sc')) {
                    if (Busid.includes(String(item.BusinessID))) {
                        updateUI(item); // Update the UI with the filtered item
                        totalRecords++;
                        recordsFound = true; // Set flag to true if any records are processed
                    }
                }
            });

            partialText = lines[lines.length - 1];
            // If no records found, set totalRecords to 0
            if (!recordsFound) totalRecords = 0;

            // Update the total records count display
            document.getElementById('totalRecords').textContent = `${totalRecords} - Records`;
        }
       


    } catch (error) {
        console.error('Failed to load data:', error);
        document.getElementById('totalRecords').textContent = '0 - Records';
    } finally {
        // Set loading to false and update the button text after completion
        isLoading = false;
        updateButtonState();
    }
}



// Main filter function for all types of filters
function filterSearch() {
    const tbody = document.getElementById('dataContainer').querySelector('tbody');
    const rows = tbody.getElementsByTagName('tr');
    const searchText = document.getElementById('searchInput').value.toLowerCase();

    Array.from(rows).forEach(row => {
        const sto = row.cells[0].textContent.toLowerCase();
        const vehicle = row.cells[1].textContent.toLowerCase();
        const business = row.cells[2].textContent.toLowerCase();
        const invoiceType = row.cells[6].textContent.toLowerCase();
        const ship = row.cells[4].textContent.toLowerCase();
        const recieve = row.cells[5].textContent.toLowerCase();
        const matchesSearchText = sto.includes(searchText) || vehicle.includes(searchText) || business.includes(searchText)
            || invoiceType.includes(searchText) || ship.includes(searchText) || recieve.includes(searchText);

        if (matchesSearchText) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });

    // Update the visible records count
    const visibleRowsCount = Array.from(rows).filter(row => row.style.display !== 'none').length;
    document.getElementById('totalRecords').textContent = `${visibleRowsCount} - Records`;
}


function altercolspan() {

}


function exportTableToExcelCon() {
    const table = document.getElementById('dataContainer');

    if (!table) {
        console.error('Table with id "dataContainer" not found');
        return;
    }

    const wb = XLSX.utils.table_to_book(table, { sheet: 'Sheet1' });
    XLSX.writeFile(wb, 'ShortageReport.xlsx');
}



