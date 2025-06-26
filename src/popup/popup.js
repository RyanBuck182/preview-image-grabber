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

const retrievePreviewImage = async () => {
    const link = linkInput.value;
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
        } else {
            fetchStatus.innerText = "No preview image found.";
        }
    } catch (err) {
        fetchStatus.innerText = "Unknown error."
    }
}

fetchButton.addEventListener("click", retrievePreviewImage);
