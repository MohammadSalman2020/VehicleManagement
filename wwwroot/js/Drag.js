function initializeDropzone() {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');
    const preview = document.getElementById('preview');

    // Highlight dropzone when file is dragged over it
    //dropzone.addEventListener('dragover', (e) => {
    //    e.preventDefault();
    //    dropzone.classList.add('hovered');
    //});

    //// Remove highlight from dropzone when file is dragged away
    //dropzone.addEventListener('dragleave', () => {
    //    dropzone.classList.remove('hovered');
    //});

    //// Handle file drop
    //dropzone.addEventListener('drop', (e) => {
    //    e.preventDefault();
    //    dropzone.classList.remove('hovered');
    //    const files = e.dataTransfer.files;
    //    handleFiles(files);
    //});

    // Open file dialog when dropzone is clicked
    dropzone.addEventListener('click', () => {
        fileInput.click();
    });

    // Handle files selected through file dialog
    fileInput.addEventListener('change', () => {
        const files = fileInput.files;
       // handleFiles(files);
    });

    // Handle the files
    function handleFiles(files) {
        preview.innerHTML = '';
        for (const file of files) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.display = 'block';
                    preview.appendChild(img);
                };
            } else {
                alert('Please upload an image file.');
            }
        }
    }
}

function showImageFromPath(imagePath) {
    const preview = document.getElementById('preview');
    if (imagePath && !preview.querySelector('img')) {
        const img = document.createElement('img');
        img.src = imagePath;
        img.style.display = 'block';
        preview.appendChild(img);
    }
}
