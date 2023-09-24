// ----------------------------------------------Product
const baoquan = document.querySelector(".Baoquan")
const chitiet = document.querySelector(".Chitiet")
if(baoquan){
    baoquan.addEventListener("click",function(){
        document.querySelector("product-content-right-bottom-content-Chitiet").style.display = "none"
        document.querySelector("product-content-right-bottom-content-Baoquan").style.display = "block"
    })
}
if(chitiet){
    chitiet.addEventListener("click",function(){
        document.querySelector("product-content-right-bottom-content-Baoquan").style.display = "none"
        document.querySelector("product-content-right-bottom-content-Chitiet").style.display = "block"
    })
}