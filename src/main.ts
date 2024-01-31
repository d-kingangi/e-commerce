document.addEventListener('DOMContentLoaded', () => {
let productForm = document.querySelector('#productForm') as HTMLFormElement || null;

let productname = document.querySelector('#name') as HTMLInputElement;
let productimage = document.querySelector('#image') as HTMLInputElement;
let desc = document.querySelector('#desc') as HTMLInputElement;
let price = document.querySelector('#price') as HTMLInputElement;
let discount = document.querySelector('#discount') as HTMLInputElement;

let productsTable = document.querySelector('.productsTable') as HTMLTableElement;


let currentIndex: number;

interface product {
    name: string;
    image: string;
    desc: string;
    price: string;
    discount: string;
}

let products : product[] = [] 

if(window.location.pathname.includes('create.html')){
productForm.addEventListener("submit", (e)=>{
    e.preventDefault()

    let product = productname.value.trim() !== "" && productimage.value.trim() != "" && desc.value.trim() != "" && price.value.trim() != "" && discount.value.trim() !=""

    if(product){
        let newProduct = {
            id: products.length + 1,
            name: productname.value.trim(),
            image: productimage.value.trim(),
            desc: desc.value.trim(),
            price: price.value.trim(),
            discount: discount.value.trim(),
        }

        if(currentIndex !== undefined){
            products.splice(currentIndex, 1, newProduct)    
        }else{
            products.push(newProduct)
            localStorage.setItem("products", JSON.stringify(products))
        }

        productname.value=""
        productimage.value=""
        desc.value=""
        price.value=""
        discount.value=""

        if(window.location.pathname.includes('home.html')){
            instance.displayproducts();
        }
    } 
        
})
}

class ProductActions{

    displayproducts(){
        
        let getproducts: product [] = JSON.parse(localStorage.getItem('products') || '[]');

        getproducts.forEach((product:  product, index:number)=>{

            let tableRow = document.createElement('tr') as HTMLTableRowElement

            let numbering = document.createElement('td') as HTMLTableCellElement
            numbering.textContent = `${index + 1}`

            let name = document.createElement('td') as HTMLTableCellElement
            name.textContent = product.name
            
            let image_url = document.createElement('td') as HTMLTableCellElement
            image_url.innerHTML = '<img src="${products.image}" alt="" class="imageUrl"></img>'

            let desc = document.createElement('td') as HTMLTableCellElement
            desc.textContent = product.desc

            let price = document.createElement('td') as HTMLTableCellElement
            price.textContent = product.price

            let discount = document.createElement('td') as HTMLTableCellElement
            discount.textContent = product.discount

            let deletebtn= document.createElement('button') as HTMLButtonElement
            deletebtn.textContent = "Delete"
            deletebtn.style.backfaceVisibility = 'red'
            deletebtn.addEventListener('click', ()=>{
                this.deleteproduct(index)
            })

            let updateBtn = document.createElement('button') as HTMLButtonElement;
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
        })       
    }

    deleteproduct(index: number){
        products.splice(index, 1);
        this.displayproducts();
    }

    updateproduct(index:number){
        currentIndex = index

        console.log(currentIndex);

        productForm.style.display = 'flex'

        let product = products[index]

        productname.value = product.name
        productimage.value = product.image
        desc.value = product.desc
        price.value = product.price
        discount.value = product.discount      
    }
}


// diplaying products to users

class productsGrids{

    displayProducts(){

        let getproducts: product[] = JSON.parse(localStorage.getItem('products') || '[]');

        let productsGrid = document.querySelector('.productsGrid') as HTMLDivElement;

        getproducts.forEach((product, index)=> {

            let productElement = document.createElement('div') as HTMLDivElement;
            productElement.classList.add('product')

            productElement.innerHTML=`
            <img src="${product.image}" alt="${product.name}" />
            <div>
            <p><b>Brand: </b>${product.name}</p>
            <p><b>Description: </b>${product.desc}</p>
            <p><b>Price: </b>${product.price}</p>
            <p><b>Discount: </b>${product.discount}</p>
            <button class="view-btn"> View </button>
            </div>
            `;


            let viewBtn = productElement.querySelector('.view-btn') as HTMLButtonElement;

            viewBtn.addEventListener('click', () => {

                let modal = document.createElement('div') as HTMLDivElement;

                modal.classList.add('modal');

                modal.innerHTML=`
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

                let addToCartBtn = modal.querySelector('.add-to-cart-btn') as HTMLButtonElement;
                addToCartBtn.addEventListener('click', () => {
                    let productToAdd = {
                        name: product.name,
                        image: product.image,
                        desc: product.desc,
                        price: product.price,
                        discount: product.discount,
                    };

                    let cart = JSON.parse(localStorage.getItem('cart') || '[]') as product[];

                    cart.push(productToAdd);

                    localStorage.setItem('cart', JSON.stringify(cart));

                    modal.style.display = 'none';
                });

                let cancelBtn = modal.querySelector('.cancel-btn') as HTMLButtonElement;
                cancelBtn.addEventListener('click', () => {
                    modal.style.display = 'none';
                });

                let closeBtn = modal.querySelector('.close') as HTMLElement;
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
        let cartItems: product[] = JSON.parse(localStorage.getItem('cart') || '[]');

        let modal = document.createElement('div') as HTMLDivElement;
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

        let closeBtn = modal.querySelector('.close') as HTMLElement;
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        let checkoutBtns = modal.querySelectorAll('.checkout-btn') as NodeListOf<HTMLButtonElement>;
        checkoutBtns.forEach(checkoutBtn => {
            checkoutBtn.addEventListener('click', () => {
                let productId = checkoutBtn.getAttribute('data-product-id');
                console.log(`Checkout button clicked for product ID: ${productId}`);
            });
        });

        let dropProductBtns = modal.querySelectorAll('.drop-product-btn') as NodeListOf<HTMLButtonElement>;
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
if(window.location.pathname.includes('/home.html')){
    instance.displayproducts();
}

let productsGridInstance = new productsGrids();
productsGridInstance.displayProducts();

});