document.querySelector('.order-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
  
    // Get form data
    const formData = {
      customerName: document.getElementById('name').value,
      email: document.getElementById('email').value,
      address: document.getElementById('address').value,
      product: document.getElementById('product').value
    };
  
    // Send data to backend via fetch (POST request)
    fetch('http://localhost:5000/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      alert(data); // Show success message
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error placing order');
    });
  });
  