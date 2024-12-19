const propertiesContainer = document.getElementById('properties');
const addPropertyButton = document.getElementById('addProperty');
const showFormButton = document.getElementById('showFormButton');
const closeFormButton = document.getElementById('closeFormButton');
const addForm = document.getElementById('addForm');

// Show the form when "Add Property" button is clicked
showFormButton.addEventListener('click', () => {
    console.log('Show form button clicked'); // Debug log
    addForm.style.display = 'block';
});

// Close the form when "Close" button is clicked
closeFormButton.addEventListener('click', () => {
    console.log('Close form button clicked'); // Debug log
    addForm.style.display = 'none';
});

// Add property when "Add Property" button is clicked
addPropertyButton.addEventListener('click', () => {
    console.log('Add property button clicked'); // Debug log
    const propertyName = document.getElementById('propertyName').value;
    const monthlyRent = document.getElementById('monthlyRent').value;

    if (propertyName.trim() === '' || monthlyRent.trim() === '') {
        alert('Please fill out both fields.');
        return;
    }

    console.log(`Property Name: ${propertyName}, Monthly Rent: ${monthlyRent}`); // Debug log

    // Create the property card
    const propertyDiv = document.createElement('div');
    propertyDiv.className = 'property';

    const propertyDetails = document.createElement('span');
    propertyDetails.textContent = `${propertyName} - Rent: $${monthlyRent}`;

    const statusButton = document.createElement('button');
    statusButton.className = 'status-button status-available';
    statusButton.title = 'Available';

    statusButton.addEventListener('click', () => {
        if (statusButton.classList.contains('status-available')) {
            statusButton.classList.remove('status-available');
            statusButton.classList.add('status-rented');
            statusButton.title = 'Rented';
        } else {
            statusButton.classList.remove('status-rented');
            statusButton.classList.add('status-available');
            statusButton.title = 'Available';
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        console.log(`Deleting property: ${propertyName}`); // Debug log
        propertiesContainer.removeChild(propertyDiv);
    });

    propertyDiv.appendChild(propertyDetails);
    propertyDiv.appendChild(statusButton);
    propertyDiv.appendChild(deleteButton);

    propertiesContainer.appendChild(propertyDiv);

    // Clear the input fields
    document.getElementById('propertyName').value = '';
    document.getElementById('monthlyRent').value = '';

    // Hide the form
    addForm.style.display = 'none';
});
