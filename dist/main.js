"use strict";
document.addEventListener('DOMContentLoaded', () => {
    let productForm = document.querySelector('#productForm');
    let productname = document.querySelector('#name');
    let productimage = document.querySelector('#image');
    let desc = document.querySelector('#desc');
    let price = document.querySelector('#price');
    let discount = document.querySelector('#discount');
    let productsTable = document.querySelector('.productsTable');
    let productsGrids = document.querySelector('.productsView');
    let currentIndex;
    let products = [];
    productForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let isProductValid = productname.value.trim() !== "" && productimage.value.trim() != "" && desc.value.trim() != "" && price.value.trim() != "" && discount.value.trim() != "";
        if (isProductValid) {
            let newproduct = {
                id: products.length + 1,
                name: productname.value.trim(),
                image: productimage.value.trim(),
                desc: desc.value.trim(),
                price: price.value.trim(),
                discount: discount.value.trim(),
            };
            if (currentIndex !== undefined) {
                products.splice(currentIndex, 1, newproduct);
            }
            else {
                products.push(newproduct);
                localStorage.setItem("products", JSON.stringify(products));
            }
            // console.log(newproduct);
            // products.push(newproduct);
            instance.displayproducts();
            productname.value = "";
            productimage.value = "";
            desc.value = "";
            price.value = "";
            discount.value = "";
            productForm.reset(); //should clear the form
        }
    });
    class productActions {
        displayproducts() {
            let productsTable = document.querySelector('.products tbody');
            productsTable.innerHTML = '';
            // let productsTable = document.querySelectorAll('.products .product') as NodeListOf<HTMLDivElement>
            // let getproducts: product [] JSON.parse(localStorage.getItem('products') || '[]');
            products.forEach((product, index) => {
                let tableRow = document.createElement('tr');
                let numbering = document.createElement('td');
                numbering.textContent = `${index + 1}`;
                let name = document.createElement('td');
                name.textContent = product.name;
                let image_url = document.createElement('td');
                image_url.setAttribute("src", product.image);
                image_url.className = "imageUrl";
                let desc = document.createElement('td');
                desc.textContent = product.desc;
                let price = document.createElement('td');
                price.textContent = product.price;
                let discount = document.createElement('td');
                discount.textContent = product.discount;
                //VIEW PRODUCT BUTTON
                // let viewbtn = document.createElement('button') as HTMLButtonElement
                // viewbtn.textContent = "View"
                // viewbtn.style.backfaceVisibility =""
                // viewbtn.addEventListener('click', ()=>{
                //     this.viewproduct(index)
                // })
                // let deletebtn= document.createElement('button') as HTMLButtonElement
                // deletebtn.textContent = "Delete"
                // deletebtn.style.backfaceVisibility = 'red'
                // deletebtn.addEventListener('click', ()=>{
                //     this.deleteproduct(index)
                // })
                tableRow.appendChild(numbering);
                tableRow.appendChild(productname);
                tableRow.appendChild(image_url);
                tableRow.appendChild(desc);
                tableRow.appendChild(price);
                tableRow.appendChild(discount);
                productsTable.appendChild(tableRow);
            });
        }
        deleteproduct(index) {
            products.splice(index, 1);
            this.displayproducts();
        }
        //VIEW PRODUCT
        // viewproduct(index.number){
        //     products.view(index, 1)
        //     this.viewproduct()
        // }
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
    //diplaying products to users
    class ProductsGrids {
        displayProducts() {
            let existingProductsGrid = document.querySelectorAll('.products');
            for (let productElement of existingProductsGrid) {
                if (productElement instanceof HTMLDivElement) {
                    productElement.innerHTML = '';
                }
            }
            let storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
            // getproducts.forEach((product: products, index: number) =>{
            //     let allproducts = document.createElement('div')
            // })
            let productsGrid = document.querySelector('.products');
            storedProducts.forEach((product, index) => {
                let productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}"/>
            <div>
            <p>${product.name}</p>
            <p>${product.desc}</p>
            <p>${product.price}</p>
            <p>${product.discount}</p>
            </div>
            `;
                productsGrid.appendChild(productElement);
                // if((index + 1) % 4 === 0){
                //     productElement.classList.add('new-row')
                // }
            });
        }
    }
    let instance = new productActions();
    let productsGridInstance = new productActions();
    instance.displayproducts();
    productsGridInstance.displayproducts();
});
