/*
  Name: Bilal Zahid
  Date: 09.26.2024
  CSC 372-01

  This js is for the index page of assignment 3. It includes interactions
  for images within a flex container where when the user clicks on an image it
  will enlarge and display a description, and show the price. The js uses an
  object to store details of each dish and applies event listeners to each image
  for dynamic content handling on the client's side.
*/

document.addEventListener('DOMContentLoaded', function () {
    const dishDetails = {
        'hotChocolate': {
            description: 'Rich and creamy, made with real melted chocolate and topped with whipped cream.',
            price: '$3.50'
        },
        'icedHazelnutLatte': {
            description: 'Refreshing cold latte with a sweet hazelnut flavor, served with ice.',
            price: '$4.50'
        },
        'frenchVanillaRoast': {
            description: 'Smooth and aromatic French vanilla coffee, perfect for a morning boost.',
            price: '$4.00'
        },
        'udonNoodles': {
            description: 'Savory and hearty udon noodles stir-fried with beef and vegetables in a soy-based sauce.',
            price: '$8.99'
        },
        'tofuDumplings': {
            description: 'Soft tofu dumplings served with a dipping sauce, a vegetarian delight.',
            price: '$6.50'
        },
        'tteokbokki': {
            description: 'Spicy and chewy rice cakes cooked in a sweet red chili sauce.',
            price: '$7.00'
        },
        'blazingHotWings': {
            description: 'Super hot wings coated in their signature Blazin\' sauce.',
            price: '$6.99 for 6 wings'
        },
        'spicyGarlicWings': {
            description: 'Boneless wings with a bold garlic and spicy seasoning.',
            price: '$6.99 for 6 wings'
        },
        'lemonPepperWings': {
            description: 'Crispy wings seasoned with lemon and cracked black pepper.',
            price: '$6.99 for 6 wings'
        }
    };

    const images = document.querySelectorAll('.flex-container img');
    images.forEach(img => {
        img.addEventListener('click', function () {
            // Reset all images
            images.forEach(i => {
                i.style.width = '100px';
                i.style.height = '100px';
            });

            // Enlarge the clicked image
            this.style.width = '150px';
            this.style.height = '150px';

            // Fetch the dish details using id from the image
            const dishInfo = dishDetails[this.getAttribute('id')];

            // Update and show description
            const descriptionElem = this.closest('article').querySelector('.description');
            descriptionElem.textContent = dishInfo.description + " - Price: " + dishInfo.price;
            descriptionElem.style.display = 'block';
        });
    });
});

