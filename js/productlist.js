console.log('productlist.js')

var ProductList = function(json){
    this.data = json;
    this.generateList = function(){
        var innerHTML = '';
        
        for(let i=0; i<this.data.length; i++){                        
            if((i+1)%3 === 1)
                innerHTML += '<div class="row">'
            innerHTML += app.getView('PRODUCT_LIST',this.data[i])
            if((i+1)%3 === 0 || i+1 === this.data.length)
                innerHTML += '</div>'
        }
        return innerHTML;
    }
}

app.showProductList = function(){
    var productList = new ProductList(app.appData.groups)
    var divToDisp = document.getElementById('mainDiv');
    if(divToDisp){
        divToDisp.innerHTML = productList.generateList();
    }

    // document.getElementsByClassName('product')
}