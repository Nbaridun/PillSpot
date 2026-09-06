// ===================== DOM ELEMENTS =====================

const uploadBtn = document.getElementById("uploadBtn");
const imageInput = document.getElementById("imageInput");
const optionCards = document.querySelectorAll(".option-card");
const signupBtn = document.querySelector(".signup-btn");
const searchBtn = document.querySelectorAll(".outline-btn")[0];
const historyBtn = document.querySelectorAll(".outline-btn")[1];

// ===================== CREATE IMAGE PREVIEW =====================

const preview = document.createElement("img");
preview.style.width = "180px";
preview.style.marginTop = "15px";
preview.style.borderRadius = "12px";
preview.style.display = "none";

document.querySelector(".option-card").appendChild(preview);

// ===================== UPLOAD BUTTON =====================

uploadBtn.addEventListener("click", () => {
    imageInput.click();
});

// ===================== IMAGE SELECTED =====================

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    // Show filename
    uploadBtn.textContent = file.name;

    // Preview image
    const reader = new FileReader();

    reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = "block";

        // Save history
        let history = JSON.parse(localStorage.getItem("pillHistory")) || [];
        history.push({
            name: file.name,
            image: e.target.result,
            date: new Date().toLocaleString()
        });

        localStorage.setItem("pillHistory", JSON.stringify(history));
    };

    reader.readAsDataURL(file);

    // Simulate identification
    setTimeout(() => {
        alert("Image uploaded successfully!\nIdentification feature coming soon.");
    }, 500);

});


// ===================== OPTION CARD ACTIVE =====================

optionCards.forEach(card => {

    card.addEventListener("click", () => {

        optionCards.forEach(c => c.classList.remove("active"));

        card.classList.add("active");

    });

});


// ===================== SEARCH BY DETAILS =====================

searchBtn.addEventListener("click", () => {

    // Create modal
    const modal = document.createElement("div");
    modal.className = "search-modal";

    modal.innerHTML = `
        <div class="search-modal-box">

            <button class="close-modal">&times;</button>

            <h2>Search by Details</h2>
            <p class="modal-subtitle">
                Enter the details of your pill
            </p>

            <div class="form-group">
                <label for="pillColor">Pill Color</label>
                <input
                    type="text"
                    id="pillColor"
                    placeholder="e.g. White, Blue, Pink"
                >
            </div>

            <div class="form-group">
                <label for="pillShape">Pill Shape</label>
                <input
                    type="text"
                    id="pillShape"
                    placeholder="e.g. Round, Oval, Capsule"
                >
            </div>

            <div class="form-group">
                <label for="pillImprint">Pill Imprint</label>
                <input
                    type="text"
                    id="pillImprint"
                    placeholder="e.g. 10, A123, RX"
                >
            </div>

            <button class="modal-search-btn">
                Search Pill
            </button>

        </div>
    `;

    document.body.appendChild(modal);

    // Close button
    const closeBtn = modal.querySelector(".close-modal");

    closeBtn.addEventListener("click", () => {
        modal.remove();
    });

    // Search button
    const modalSearchBtn = modal.querySelector(".modal-search-btn");

    modalSearchBtn.addEventListener("click", () => {

        const color = modal.querySelector("#pillColor").value.trim();
        const shape = modal.querySelector("#pillShape").value.trim();
        const imprint = modal.querySelector("#pillImprint").value.trim();

        // Check if all fields are filled
        if (!color || !shape || !imprint) {
            alert("Please enter color, shape and imprint.");
            return;
        }

        // Save search details
        localStorage.setItem(
            "pillSearchDetails",
            JSON.stringify({
                color: color,
                shape: shape,
                imprint: imprint
            })
        );

        // Go to results page
        window.location.href = "results.html";
    });

});

