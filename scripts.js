let products = [];
let productId = 1;
let selectProduct = [];
const productsForm = document.getElementById("productForm");
productsForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productImage = document.getElementById("image").value;

    const newProduct = {
        id:productId++,
        image:productImage,
        name:productName,
        price:productPrice
    };

    if (!isImgUrl(productImage)) {
		alert("Please enter a valid Image URL")
		return;
	}

    if (isNaN(productPrice) || productPrice.trim() === "") {
        alert("Price must be a valid number.");
        return;
    }

    products.push(newProduct);
    displayProduct(newProduct);
    
})

function displayProduct(product){
    const productList = document.getElementById("productList");

    const  productItem =document.createElement("li");
    productItem.className = "flex bg-slate-100 ";

    const productCheckbox = document.createElement("input");
    productCheckbox.type="checkbox";
    productCheckbox.id = `productId${product.id}`;
    productCheckbox.className ="mr-6"
    productCheckbox.addEventListener("change", function(event){
        const isCheck = event.target.checked
        if(isCheck){
            selectProduct.push({
                id:product.id,
                image:product.image,
                name:product.name,
                price:parseFloat(product.price),
            });
        }else{
            selectProduct = selectProduct.filter(p => p.id !== product.id);
        }
    });}