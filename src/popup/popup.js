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
        const response = await fetch(link);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const ogImage = doc.querySelector('meta[property="og:image"]')?.content;

        if (ogImage) {
            outputLink.href = ogImage;
            outputLink.innerText = ogImage;
            outputImage.src = ogImage;
            fetchStatus.innerText = "";
        } else {
            fetchStatus.innerText = "No preview image found.";
        }
    } catch (err) {
        fetchStatus.innerText = "Unknown error."
    }
}

fetchButton.addEventListener("click", retrievePreviewImage);
