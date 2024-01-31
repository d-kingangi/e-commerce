"use strict";
document.addEventListener('DOMContentLoaded', () => {
    let productForm = document.querySelector('#productForm') || null;
    let productname = document.querySelector('#name');
    let productimage = document.querySelector('#image');
    let desc = document.querySelector('#desc');
    let price = document.querySelector('#price');
    let discount = document.querySelector('#discount');
    let productsTable = document.querySelector('.productsTable');
    let currentIndex;
    let products = [];
    if (window.location.pathname.includes('create.html')) {
        productForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let product = productname.value.trim() !== "" && productimage.value.trim() != "" && desc.value.trim() != "" && price.value.trim() != "" && discount.value.trim() != "";
            if (product) {
                let newProduct = {
                    id: products.length + 1,
                    name: productname.value.trim(),
                    image: productimage.value.trim(),
                    desc: desc.value.trim(),
                    price: price.value.trim(),
                    discount: discount.value.trim(),
                };
                if (currentIndex !== undefined) {
                    products.splice(currentIndex, 1, newProduct);
                }
                else {
                    products.push(newProduct);
                    localStorage.setItem("products", JSON.stringify(products));
                }
                productname.value = "";
                productimage.value = "";
                desc.value = "";
                price.value = "";
                discount.value = "";
                if (window.location.pathname.includes('home.html')) {
                    instance.displayproducts();
                }
            }
        });
    }
    class ProductActions {
        displayproducts() {
            let getproducts = JSON.parse(localStorage.getItem('products') || '[]');
            getproducts.forEach((product, index) => {
                let tableRow = document.createElement('tr');
                let numbering = document.createElement('td');
                numbering.textContent = `${index + 1}`;
                let name = document.createElement('td');
                name.textContent = product.name;
                let image_url = document.createElement('td');
                image_url.innerHTML = '<img src="${products.image}" alt="" class="imageUrl"></img>';
                let desc = document.createElement('td');
                desc.textContent = product.desc;
                let price = document.createElement('td');
                price.textContent = product.price;
                let discount = document.createElement('td');
                discount.textContent = product.discount;
                let deletebtn = document.createElement('button');
                deletebtn.textContent = "Delete";
                deletebtn.style.backfaceVisibility = 'red';
                deletebtn.addEventListener('click', () => {
                    this.deleteproduct(index);
                });
                let updateBtn = document.createElement('button');
                updateBtn.textContent = 'Update';
                updateBtn.addEventListener('click', () => {
                    this.updateproduct(index);
                });
                tableRow.appendChild(numbering);
                tableRow.appendChild(name);
                tableRow.appendChild(image_url);
                tableRow.appendChild(desc);
                tableRow.appendChild(price);
                tableRow.appendChild(discount);
                tableRow.appendChild(deletebtn);
                tableRow.appendChild(updateBtn);
                productsTable.appendChild(tableRow);
            });
        }
        deleteproduct(index) {
            products.splice(index, 1);
            this.displayproducts();
        }
        updateproduct(index) {
            currentIndex = index;
            console.log(currentIndex);
            productForm.style.display = 'flex';
            let product = products[index];
            productname.value = product.name;
            productimage.value = product.image;
            desc.value = product.desc;
            price.value = product.price;
            discount.value = product.discount;
        }
    }
    // diplaying products to users
    class productsGrids {
        displayProducts() {
            let getproducts = JSON.parse(localStorage.getItem('products') || '[]');
            let productsGrid = document.querySelector('.productsGrid');
            getproducts.forEach((product, index) => {
                let productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <div>
            <p><b>Brand: </b>${product.name}</p>
            <p><b>Description: </b>${product.desc}</p>
            <p><b>Price: </b>${product.price}</p>
            <p><b>Discount: </b>${product.discount}</p>
            <button class="view-btn"> View </button>
            </div>
            `;
                let viewBtn = productElement.querySelector('.view-btn');
                viewBtn.addEventListener('click', () => {
                    let modal = document.createElement('div');
                    modal.classList.add('modal');
                    modal.innerHTML = `
                <div class="modal-content">
                <div class="left-section">
                <span class="close">&times;</span>
                <img src="${product.image}" alt="${product.name}" />
                </div>
                <div class="right-section">
                    <p><b>Brand: </b> ${product.name}</p>
                    <p><b>Description: </b> ${product.desc}</p>
                    <p><b>Price: </b> ${product.price}</p>
                    <p><b>Discount: </b> ${product.discount}</p>
                    <div class="buttons">
                        <button class="add-to-cart-btn"> Add to Cart </button>
                        <button class="cancel-btn"> Cancel </button>
                    </div>
                </div>
                </div>            
                `;
                    let addToCartBtn = modal.querySelector('.add-to-cart-btn');
                    addToCartBtn.addEventListener('click', () => {
                        let productToAdd = {
                            name: product.name,
                            image: product.image,
                            desc: product.desc,
                            price: product.price,
                            discount: product.discount,
                        };
                        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
                        cart.push(productToAdd);
                        localStorage.setItem('cart', JSON.stringify(cart));
                        modal.style.display = 'none';
                    });
                    let cancelBtn = modal.querySelector('.cancel-btn');
                    cancelBtn.addEventListener('click', () => {
                        modal.style.display = 'none';
                    });
                    let closeBtn = modal.querySelector('.close');
                    closeBtn.addEventListener('click', () => {
                        modal.style.display = 'none';
                    });
                    document.body.appendChild(modal);
                    modal.style.display = 'block';
                });
                productsGrid.appendChild(productElement);
            });
        }
    }
    //view cart
    class CartModal {
        display() {
            let cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
            let modal = document.createElement('div');
            modal.classList.add('cart-modal');
            modal.innerHTML = `
           <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Your Cart</h2>
                <ul>
                    ${cartItems.map(item => `
                        <li>
                            <div>
                                <p>${item.name} - ${item.price}</p>
                                <button class="checkout-btn" data-product-id="${item.id}">Checkout</button>
                                <button class="drop-product-btn" data-product-id="${item.id}">Drop Product</button>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            </div> 
        `;
            let closeBtn = modal.querySelector('.close');
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
            let checkoutBtns = modal.querySelectorAll('.checkout-btn');
            checkoutBtns.forEach(checkoutBtn => {
                checkoutBtn.addEventListener('click', () => {
                    let productId = checkoutBtn.getAttribute('data-product-id');
                    console.log(`Checkout button clicked for product ID: ${productId}`);
                });
            });
            let dropProductBtns = modal.querySelectorAll('.drop-product-btn');
            dropProductBtns.forEach(dropProductBtn => {
                dropProductBtn.addEventListener('click', () => {
                    let productId = dropProductBtn.getAttribute('data-product-id');
                    console.log(`Drop Product button clicked for product ID: ${productId}`);
                });
            });
            document.body.appendChild(modal);
            modal.style.display = 'block';
        }
    }
    let cartIcon = document.getElementById('cartIcon');
    if (cartIcon instanceof HTMLElement) {
        cartIcon.addEventListener('click', () => {
            const cartModal = new CartModal();
            cartModal.display();
        });
    }
    let instance = new ProductActions();
    console.log(window.location.pathname);
    if (window.location.pathname.includes('/home.html')) {
        instance.displayproducts();
    }
    let productsGridInstance = new productsGrids();
    productsGridInstance.displayProducts();
});
