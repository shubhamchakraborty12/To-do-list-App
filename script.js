const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("Type something!!!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        // Cross (Delete) Button
        let span = document.createElement("span");
        span.classList.add("cross");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        // Edit Button
        let span2 = document.createElement("span");
        span2.classList.add("edit");
        span2.innerHTML = "\u270e";
        li.appendChild(span2);
    }
    inputBox.value = "";
    saveData();
}

const addBtn = document.getElementById("ok");
addBtn.addEventListener('click', () => {
    addTask();
});

inputBox.addEventListener('keyup', (event) => {
    if (event.which === 13) {
        addTask();
    }
});

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.className === "cross") {
        e.target.parentElement.remove();
        saveData();
    } else if (e.target.className === "edit") {
        // Edit button functionality
        const li = e.target.parentElement;
        const currentText = li.childNodes[0].nodeValue.trim();

        // Create input field for editing
        const input = document.createElement("input");
        input.type = "text";
        input.value = currentText;
        input.classList.add("edit-input");

        // Replace the text with the input field
        li.childNodes[0].nodeValue = ""; // Clear text
        li.insertBefore(input, e.target); // Add input before the edit button

        // Add an event listener for when editing is complete
        input.addEventListener("blur", () => {
            const updatedText = input.value.trim();
            if (updatedText) {
                li.childNodes[0].nodeValue = updatedText + " ";
                input.remove(); // Remove the input field
                saveData();
            } else {
                alert("Task cannot be empty!");
                input.focus();
            }
        });

        input.focus(); // Automatically focus on the input field
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
