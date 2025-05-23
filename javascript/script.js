function changeBg(bg) {
    const banner = document.querySelector('main');
    banner.style.backgroundImage = `url('images/${bg}')`;
    banner.style.backgroundSize = 'cover';
    banner.style.backgroundPosition = 'center 15%';
}

document.addEventListener('DOMContentLoaded', function() {

    const searchInput = document.querySelector('.searchbutton input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                const playerName = card.querySelector('h3').textContent.toLowerCase();
                if (playerName.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();

        const card = this.closest('.product-card') || this.closest('.poster');
        if (!card) return;

        const productName = card.querySelector('h3').textContent;
        const productPrice = card.querySelector('.price').textContent;
        const productImage = card.querySelector('.main-image').getAttribute('src').split('/').pop();

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ name: productName, price: productPrice, image: productImage });
        localStorage.setItem('cart', JSON.stringify(cart));

        showToast(`${productName} a été ajouté au panier !`);
    });
});


    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('add-to-cart')) {
                const productName = this.querySelector('h3').textContent;
                const productImage = this.querySelector('.main-image').getAttribute('src').split('/').pop();
                const productPrice = this.querySelector('.price').textContent;

                window.open(
                    `produitdetail.html?name=${encodeURIComponent(productName)}&image=${encodeURIComponent(productImage)}&price=${encodeURIComponent(productPrice)}`,
                    '_blank'
                );
            }
        });
    });
});

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}


