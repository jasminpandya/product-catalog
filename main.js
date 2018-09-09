app = {};

includeFiles = [
    'js/view.js',
    'js/data.js',
    'js/productlist.js',
    'js/carousel.js'
]

for(let i=0; i< includeFiles.length; i++){
    const element = document.createElement('script');
    element.src=includeFiles[i];
    document.head.appendChild(element);
}

window.onload = function(){
    // app.showCarousel();
    app.showProductList();
}