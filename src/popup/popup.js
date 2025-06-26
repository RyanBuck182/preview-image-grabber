/** @type {DOMParser} */
const domParser = new DOMParser();

/** @type {HTMLInputElement} */
const linkInput = document.getElementById("linkInput");

/** @type {HTMLButtonElement} */
const fetchButton = document.getElementById("fetchButton");

/** @type {HTMLParagraphElement} */
const fetchStatus = document.getElementById("fetchStatus");

/** @type {HTMLAnchorElement} */
const outputLink = document.getElementById("outputLink");

/** @type {HTMLImageElement} */
const outputImage = document.getElementById("outputImage");

const cleanLink = (link) => {
    return link.trim()
}

const validateLink = (link) => {
    if (!link)
        fetchStatus.innerText = "Please enter a link.";
}

const retrievePreviewImage = async () => {
    const rawInput = linkInput.value
    const link = cleanLink(rawInput);
    const linkIsValid = validateLink(link);

    // Quit if link is invalid
    if (!linkIsValid)
        return;

    fetchStatus.innerText = "Fetching...";

    try {
        // Grab the page at the link and parse it
        const response = await fetch(link);
        const responseText = await response.text();
        const responseHtml = domParser.parseFromString(responseText, "text/html");
        
        // Retrieve the preview image
        const previewImage = responseHtml.querySelector('meta[property="og:image"]')?.content;

        if (previewImage) {
            outputLink.href = previewImage;
            outputLink.innerText = previewImage;
            outputImage.src = previewImage;
            fetchStatus.innerText = "";
        } else {
            fetchStatus.innerText = "No preview image found.";
        }
    } catch (err) {
        fetchStatus.innerText = "Unknown error."
    }
}

fetchButton.addEventListener("click", retrievePreviewImage);
