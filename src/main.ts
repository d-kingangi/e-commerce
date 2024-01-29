document.addEventListener('DOMContentLoaded', () => {
let productForm = document.querySelector('#productForm') as HTMLFormElement;

let productname = document.querySelector('#name') as HTMLInputElement;
let productimage = document.querySelector('#image') as HTMLInputElement;
let desc = document.querySelector('#desc') as HTMLInputElement;
let price = document.querySelector('#price') as HTMLInputElement;
let discount = document.querySelector('#discount') as HTMLInputElement;

let productsTable: Element | null = document.querySelector('.productsTable');
let productsGrids = document.querySelector('.productsView') as HTMLDivElement;

let currentIndex:number;

interface product {
    name: string;
    image: string;
    desc: string;
    price: string;
    discount: string;
}

let products : product[] = [] 

productForm.addEventListener("submit", (e)=>{
    e.preventDefault()

    let isProductValid = productname.value.trim() !== "" && productimage.value.trim() != "" && desc.value.trim() != "" && price.value.trim() != "" && discount.value.trim() !=""

    if(isProductValid){
        let newproduct = {
            id: products.length + 1,
            name: productname.value.trim(),
            image: productimage.value.trim(),
            desc: desc.value.trim(),
            price: price.value.trim(),
            discount: discount.value.trim(),
        }

        if(currentIndex !== undefined){
            products.splice(currentIndex, 1, newproduct)    
        }else{
            products.push(newproduct)

            localStorage.setItem("products", JSON.stringify(products))
        }

        // console.log(newproduct);
        // products.push(newproduct);

        instance.displayproducts()

        productname.value=""
        productimage.value=""
        desc.value=""
        price.value=""
        discount.value=""

        productForm.reset(); //should clear the form
    } 
        
})

class productActions{

    displayproducts(){
        let productsTable = document.querySelector('.products tbody') as HTMLTableSectionElement
        productsTable.innerHTML = '';

        // let productsTable = document.querySelectorAll('.products .product') as NodeListOf<HTMLDivElement>

        // let getproducts: product [] JSON.parse(localStorage.getItem('products') || '[]');

        products.forEach((product:  product, index:number)=>{

            let tableRow = document.createElement('tr') as HTMLTableRowElement

            let numbering = document.createElement('td') as HTMLTableCellElement
            numbering.textContent = `${index + 1}`

            let name = document.createElement('td') as HTMLTableCellElement
            name.textContent = product.name
            
            let image_url = document.createElement('td') as HTMLTableCellElement
            image_url.setAttribute("src", product.image)
            image_url.className = "imageUrl"

            let desc = document.createElement('td') as HTMLTableCellElement
            desc.textContent = product.desc

            let price = document.createElement('td') as HTMLTableCellElement
            price.textContent = product.price

            let discount = document.createElement('td') as HTMLTableCellElement
            discount.textContent = product.discount
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
        })       
    }

    deleteproduct(index: number){
        products.splice(index, 1)

        this.displayproducts()
    }

    //VIEW PRODUCT
    // viewproduct(index.number){
    //     products.view(index, 1)

    //     this.viewproduct()
    // }

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
//diplaying products to users
class ProductsGrids{

    displayProducts(){

        let existingProductsGrid = document.querySelectorAll('.products') as NodeListOf<HTMLDivElement>;

        for (let productElement of existingProductsGrid) {
            if (productElement instanceof HTMLDivElement){
                productElement.innerHTML = '';
            }
        }

        let storedProducts: product[] = JSON.parse(localStorage.getItem('products') || '[]');

        // getproducts.forEach((product: products, index: number) =>{
        //     let allproducts = document.createElement('div')
        // })

        let productsGrid = document.querySelector('.products') as HTMLDivElement;

        storedProducts.forEach((product, index)=> {
            let productElement = document.createElement('div');
            productElement.classList.add('product')

            productElement.innerHTML=`
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
let productsGridInstance = new productActions()

instance.displayproducts();
productsGridInstance.displayproducts();

});