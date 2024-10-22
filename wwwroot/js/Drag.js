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






