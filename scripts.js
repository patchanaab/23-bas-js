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
    productItem.className = "flex bg-slate-100 pb-2 w-[100%] border-2 ";

    const productCheckbox = document.createElement("input");
    productCheckbox.type="checkbox";
    productCheckbox.id = `productId${product.id}`;
    productCheckbox.className ="mr-6 "
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
    });
    
    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.className =" w-[20%] object-cover";
    const productName = document.createElement("p");
    productName.textContent = product.name;
    productName.className ="w-[40%] font-bold text-center text-3xl content-center";
    const productPrice = document.createElement("span");
    productPrice.textContent = `Price: ${product.price} $`;
    productPrice.className = "w-[40%] font-bold text-center text-3xl content-center";

    productItem.appendChild(productCheckbox);
    productItem.appendChild(productImage);
    productItem.appendChild(productName);
    productItem.appendChild(productPrice);
    productList.appendChild(productItem);
    
};

function updateCart(){
    const cartList = document.getElementById("cartList");
    cartList.innerHTML="";
    const checkoutButton = document.createElement("button");
    checkoutButton.textContent = "CHECKOUT"
    checkoutButton.className = "justify-center bg-slate-100 w-[100%] font-bold text-2xl border-2 border-black rounded "
    checkoutButton.addEventListener("click",checkOut);

    for(const newProduct of selectProduct){
        const cartItem = document.createElement("li");
        cartItem.className = "flex bg-rose-500  pl-8 pb-2 w-[100%] border-2";
        const cartItemImage = document.createElement("img");
        cartItemImage.src = newProduct.image;
        cartItemImage.className = "w-[20%]";
        const cartItemName = document.createElement("p");
        cartItemName.textContent = newProduct.name;
        cartItemName.className = "w-[45%] font-bold text-center text-3xl content-center";
        const cartItemPrice = document.createElement("span")
        cartItemPrice.textContent = `Price: ${newProduct.price} $`;
        cartItemPrice.className = "w-[45%] font-bold text-center text-3xl content-center";
        const removeButton = document.createElement("button");
        removeButton.textContent = "REMOVE";
        removeButton.className = "w-[10%] bg-red-700 font-bold border-2 border-black";
        removeButton.addEventListener("click",removeItem);

        cartItem.appendChild(cartItemImage);
        cartItem.appendChild(cartItemName);
        cartItem.appendChild(cartItemPrice);
        cartItem.appendChild(removeButton);
        cartList.appendChild(cartItem);
        cartList.appendChild(checkoutButton);
    };
};
function addToCart(){
    updateCart();
};

function checkOut(){
    let totalPrice = 0;
    for (const newProduct of selectProduct) {
        totalPrice += newProduct.price;
    }
    alert(`Total Price: ${totalPrice} $`);
}

function removeItem() {
};

function isImgUrl(productImage) {
	const input = new URL(productImage);
	return /\.(jpg|png|gif)$/.test(input.pathname);
};