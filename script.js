let customers = [
    {
        name: "Favour Stephen",
        email: "favour@gmail.com",
        phone: "08012345678",
        status: "active"
    },
    {
        name: "Olatinwa Williams",
        email: "olatinwa@gmail.com",
        phone: "08123456789",
        status: "inactive"
    },
    {
        name: "Precious Stephen",
        email: "precious@gmail.com",
        phone: "09012345678",
        status: "active"
    },
    {
        name: "Rita Stephen",
        email: "rita@gmail.com",
        phone: "07012345678",
        status: "inactive"
    },
    {
        name: "Fikayomi Stephen",
        email: "fikayomi@gmail.com",
        phone: "08198765432",
        status: "active"
    }
];

let customerList = document.getElementById("customerList");
let customerDetails = document.getElementById("customerDetails");


// CUSTOMER DETAILS
function showCustomerDetails(customerName) {
    let customer = customers.find(function(customer) {
        return customer.name === customerName;
    });

    if (customer) {
        customerDetails.innerHTML = `
            <h2>Customer Details</h2>
            <p><strong>Name:</strong> ${customer.name}</p>
            <p><strong>Email:</strong> ${customer.email}</p>
            <p><strong>Phone:</strong> ${customer.phone}</p>
            <p><strong>Status:</strong> ${customer.status}</p>
        `;
    }
}


// DISPLAY CUSTOMERS
function displayCustomers(customerArray) {
    customerList.innerHTML = "";

    customerArray.map(function(customer) {
        customerList.innerHTML += `
            <div class="customer" onclick="showCustomerDetails('${customer.name}')">
                <h3>${customer.name}</h3>
                <p>Email: ${customer.email}</p>
                <p>Phone: ${customer.phone}</p>
                <p>Status: ${customer.status}</p>
            </div>
        `;
    });
}

displayCustomers(customers);

// SEARCH AND STATUS FILTER
let searchInput = document.getElementById("searchInput");
let statusFilter = document.getElementById("statusFilter");

function filterCustomers() {
    let searchText = searchInput.value.toLowerCase();
    let selectedStatus = statusFilter.value;

    let filteredCustomers = customers.filter(function(customer) {
        let matchesSearch = customer.name.toLowerCase().includes(searchText);

        let matchesStatus =
            selectedStatus === "all" ||
            customer.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    displayCustomers(filteredCustomers);
}

searchInput.addEventListener("input", filterCustomers);

statusFilter.addEventListener("change", filterCustomers);

// ADD NEW CUSTOMER
let customerForm = document.getElementById("customerForm");

customerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let status = document.getElementById("status").value;

    // VALIDATION
    if (name === "" || email === "" || phone === "" || status === "") {
        alert("Please fill in all the fields.");
        return;
    }

    let newCustomer = {
        name: name,
        email: email,
        phone: phone,
        status: status
    };

    customers.push(newCustomer);

displayCustomers(customers);

    customerForm.reset();

    alert("Customer added successfully!");
});

// GET CUSTOMERS FROM API
async function loadCustomersFromAPI() {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/users");

        let data = await response.json();

        console.log(data);

        data.forEach(function(customer) {
            customers.push({
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                status: "active"
            });
        });

        displayCustomers(customers);

    } catch (error) {
        console.log("Error loading customers:", error);
    }
}

loadCustomersFromAPI();