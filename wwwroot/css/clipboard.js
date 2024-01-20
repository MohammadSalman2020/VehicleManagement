window.clipboardInterop = {
    requestClipboardPermission: async function () {
        try {
            await navigator.clipboard.writeText(''); // Writing empty text to trigger clipboard permission prompt
        } catch (error) {
            console.error('Error requesting clipboard permission:', error);
        }
    },
    getText: async function () {
        try {
            return await navigator.clipboard.readText();
        } catch (error) {
            console.error('Error reading clipboard text:', error);
            return '';
        }
    }
};
