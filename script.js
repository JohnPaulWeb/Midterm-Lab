function isValidName(value) {
    if (typeof value !== "string") {
        return false;
    }

    return /^[A-Za-z ]{3,}$/.test(value.trim());
}

function isValidEmail(value) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (typeof value !== "string") {
        return false;
    }

    return emailPattern.test(value.trim());
}

function isValidDescription(value) {
    return typeof value === "string" && value.trim().length >= 5;
}

if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", function () {
        var form = document.getElementById("lostItemForm");
        var reporterName = document.getElementById("reporterName");
        var reporterEmail = document.getElementById("reporterEmail");
        var itemDescription = document.getElementById("itemDescription");
        var lostLocation = document.getElementById("lostLocation");
        var reporterNameError = document.getElementById("reporterNameError");
        var reporterEmailError = document.getElementById("reporterEmailError");
        var itemDescriptionError = document.getElementById("itemDescriptionError");
        var lostLocationError = document.getElementById("lostLocationError");
        var confirmInfoError = document.getElementById("confirmInfoError");
        var resultHeading = document.getElementById("resultHeading");
        var resultDetails = document.getElementById("resultDetails");
        var resultSection = document.getElementById("resultSection");
        var confirmInfo = document.getElementById("confirmInfo");
        var clearBtn = document.getElementById("clearBtn");

        resultSection.style.display = "none";

        form.addEventListener("submit", function (event) {
            var nameOk;
            var emailOk;
            var descriptionOk;
            var locationValue;
            var locationOk;
            var confirmOk;

            event.preventDefault();

            nameOk = isValidName(reporterName.value);
            emailOk = isValidEmail(reporterEmail.value);
            descriptionOk = isValidDescription(itemDescription.value);

            locationValue = lostLocation.value;
            locationOk = locationValue !== "";

            confirmOk = confirmInfo.checked;

            reporterNameError.textContent = nameOk ? "" : "Enter a valid name.";
            reporterEmailError.textContent = emailOk ? "" : "Enter a valid email address.";
            itemDescriptionError.textContent = descriptionOk ? "" : "Enter at least 5 characters.";
            lostLocationError.textContent = locationOk ? "" : "Select where the item was lost.";
            confirmInfoError.textContent = confirmOk ? "" : "Confirm that the information is correct.";

            if (nameOk && emailOk && descriptionOk && locationOk && confirmOk) {
                resultHeading.textContent = "Lost Item Report Submitted";
                resultDetails.textContent =
                    "Thank you, " + reporterName.value.trim() + ". Your report has been recorded.";
                resultSection.style.display = "block";
                return;
            }

            resultHeading.textContent = "Submission failed";
            resultDetails.textContent = "The report could not be saved.";
            resultSection.style.display = "block";
        });
        clearBtn.addEventListener("click", function () {
        clearBtn.addEventListener("click", function () {
            reporterName.value = "";
            reporterEmail.value = "";
            lostLocation.selectedIndex = 0;
            confirmInfo.checked = false;
            confirmInfo.checked = false;

            reporterNameError.textContent = "";
            reporterEmailError.textContent = "";
            itemDescriptionError.textContent = "";
            lostLocationError.textContent = "";
            confirmInfoError.textContent = "";
            resultHeading.textContent = "";
            resultDetails.textContent = "";
            resultSection.style.display = "none";
        });
    });
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        isValidName: isValidName,
        isValidEmail: isValidEmail,
        isValidDescription: isValidDescription
    };
}