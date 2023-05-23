 


var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productCateg = document.getElementById("productCateg")
var productDescription = document.getElementById("productDescription")
var productCount = document.getElementById("productCount")


var mood = "create"
var tmp ;
var productConatiner ;
if(localStorage.getItem("ourProduct") == null){
    productConatiner = [] ;
}
else{
    productConatiner = JSON.parse(localStorage.getItem("ourProduct"))
    displayProduct()
}


function addProduct() {
    var product = {
        name: productName.value,
        price: productPrice.value,
        categ: productCateg.value,
        desc: productDescription.value,
        count: productCount.value 
    }
    //count

    if(mood==="create"){
        if(product.count > 1){
            for(var i = 0 ; i < product.count  ; i++){
                productConatiner.push(product)
            }
        } else {
            productConatiner.push(product)
        }
    }else
      { productConatiner[tmp]= product
        mood = "create"
        submit.innerHTML="Add Product"
        document.getElementById("productCount").style.visibility="visible"

    }
    localStorage.setItem("ourProduct",JSON.stringify(productConatiner))    
        
    // 
    displayProduct()
    clearValue()
    
}

function displayProduct(){
    var sum = 0;
    var dataContainer = ""
    for (var i = 0; i < productConatiner.length; i++) {
        dataContainer += `
        <tr>
            <td>${i+1}</td>
            <td>${productConatiner[i].name}</td>
            <td>${productConatiner[i].price}</td>
            <td>${productConatiner[i].categ}</td> 
            <td>${productConatiner[i].desc}</td> 
        <td><button class="btn btn-warning" onclick="edit(${i})">Edit</button></td>
        <td> <button class="btn btn-danger" onclick="deleterow(${i})">Delete</button>
        </td>
        
        </tr> `

        sum += Number(productConatiner[i].price)
        
    }
    
    if(productConatiner.length>0){
        total.innerHTML = 'Total Price'
     }
     else{
        total.innerHTML = ''
        sum =''
     }

    document.getElementById("t_body").innerHTML = dataContainer
    document.getElementById("totalPrice").innerHTML = sum

    
}

// clear
function clearValue(){
    productName.value = ""
    productPrice.value = ""
    productCateg.value = ""
    productDescription.value = ""
    productCount.value = ""
}
//deleteAll
function deleteAll(){
    productConatiner.splice(0)
    localStorage.setItem("ourProduct",JSON.stringify(productConatiner))    
    displayProduct()
}
//deleterow
function deleterow(i){
    productConatiner.splice(i,1)
    localStorage.setItem("ourProduct",JSON.stringify(productConatiner))    
    displayProduct()
}


 //update

function edit(i){
    productName.value = productConatiner[i].name ;
    productPrice.value = productConatiner[i].price ;
    productCateg.value = productConatiner[i].categ ;
    productDescription.value = productConatiner[i].desc ;
    tmp = i ;
    mood = "update" ;
    submit.innerHTML='update'
    document.getElementById("productCount").style.visibility="hidden"
}



function searchProduct(byName){
    var sum = 0;
    var dataContainer2 = "";
    for(var i=0 ; i<productConatiner.length; i++){
        if(productConatiner[i].name.toLowerCase().includes(byName.toLowerCase().trim())){
            dataContainer2 += `
            <tr>
                <td>${i+1}</td>
                <td>${productConatiner[i].name}</td>
                <td>${productConatiner[i].price}</td>
                <td>${productConatiner[i].categ}</td> 
                <td>${productConatiner[i].desc}</td> 
            <td><button class="btn btn-warning" onclick="edit(${i})">Edit</button></td>
            <td> <button class="btn btn-danger" onclick="deleterow(${i})">Delete</button>
            </td>
            
            </tr> `
            sum += Number(productConatiner[i].price)

        }

    }
    if(productConatiner.length>0){
        total.innerHTML = 'Total Price'
     }
     else{
        total.innerHTML = ''
        sum =''
     }

    document.getElementById("totalPrice").innerHTML = sum
    document.getElementById("t_body").innerHTML = dataContainer2

}