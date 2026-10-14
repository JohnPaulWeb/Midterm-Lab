function isValidName(value) {
    if (typeof value !== "string") {
        return false;
    }

    var name = value.trim();

    if (name.length < 3) {
        return false;
    }

    for (var index = 0; index < name.length; index = index + 1) {
        var character = name.charAt(index);
        if (character >= "0" && character <= "9") {
            return false;
        }
    }

    return true;
}

function isValidEmail(value) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (typeof value !== "string") {
        return false;
    }

    return emailPattern.test(value);
}

function isValidDescription(value) {
    if (typeof value !== "string") {
        return false;
    }

    return value.trim().length >= 5;
}

if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", function () {
        var form = document.getElementById("lostItemForm");
        var reporterName = document.getElementById("reporterName");
        var reporterEmail = document.getElementById("reporterEmail");
        var itemDescription = document.getElementById("itemDescription");
        var lostLocation = document.getElementById("lostLocation");
        var confirmInfo = document.getElementById("confirmInfo");
        var submitBtn = document.getElementById("submitBtn");
        var clearBtn = document.getElementById("clearBtn");
        var resultSection = document.getElementById("resultSection");
        var resultHeading = document.getElementById("resultHeading");
        var resultDetails = document.getElementById("resultDetails");
        var reporterNameError = document.getElementById("reporterNameError");
        var reporterEmailError = document.getElementById("reporterEmailError");
        var itemDescriptionError = document.getElementById("itemDescriptionError");
        var lostLocationError = document.getElementById("lostLocationError");
        var confirmInfoError = document.getElementById("confirmInfoError");

        // Hide result section on initial load
        resultSection.style.display = "none";
        resultHeading.textContent = "";
        resultDetails.textContent = "";

        // Form submit handler
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            var isNameValid = isValidName(reporterName.value);
            var isEmailValid = isValidEmail(reporterEmail.value);
            var isDescriptionValid = isValidDescription(itemDescription.value);
            var isLocationValid = lostLocation.value !== "";
            var isConfirmValid = confirmInfo.checked;

            reporterNameError.textContent = isNameValid ? "" : "Enter a valid name.";
            reporterEmailError.textContent = isEmailValid ? "" : "Enter a valid email address.";
            itemDescriptionError.textContent = isDescriptionValid ? "" : "Enter at least 5 characters.";
            lostLocationError.textContent = isLocationValid ? "" : "Select where the item was lost.";
            confirmInfoError.textContent = isConfirmValid ? "" : "Confirm that the information is correct.";

            if (isNameValid && isEmailValid && isDescriptionValid && isLocationValid && isConfirmValid) {
                resultHeading.textContent = "Lost Item Report Submitted";
                resultDetails.textContent =
                    "Student Name: " + reporterName.value.trim() + "\n" +
                    "Email: " + reporterEmail.value.trim() + "\n" +
                    "Item Description: " + itemDescription.value.trim() + "\n" +
                    "Location: " + lostLocation.value;
                resultSection.style.display = "block";
            } else {
                resultHeading.textContent = "";
                resultDetails.textContent = "";
                resultSection.style.display = "none";
            }
        });

        // Clear button handler
        clearBtn.addEventListener("click", function () {
            reporterName.value = "";
            reporterEmail.value = "";
            itemDescription.value = "";

            lostLocation.selectedIndex = 0;
            lostLocation.value = "";

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