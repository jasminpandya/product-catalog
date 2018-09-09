console.log('carousel.js');

var Carousel = function(json){
    this.data = json
    this.generateIndicators = function(){
        var innerHTML = '';
        for(let i=0; i<this.data.images.length; i++){
            var activeCls = i===0 ? 'active' : ' '
            innerHTML += app.getView('CAROUSEL_INDICATOR',{target:'carousel1', slideTo: i, class: activeCls})
        }
        return innerHTML;
    }
    this.generateCarousel = function() {
        var innerHTML = '';        
        for(let i=0; i<this.data.images.length; i++){            
            var activeCls = i===0 ? 'active' : ' '
            innerHTML += app.getView('CAROUSEL_ELEMENT',{active: activeCls, ...this.data.images[i]})
        }
        return innerHTML;
    }
}

function test(){
    console.log(hello);
}

app.showCarousel = function(id){
    console.log('i am clicked' + id)
    var prod;
    for(let i=0; i<app.appData.groups.length; i++){
        if(app.appData.groups[i].id === id){
            prod = app.appData.groups[i];
        }
    }
    if(prod){
        var carousel = new Carousel(prod);
        var carouselInd = document.querySelector('#carousel1 ol.carousel-indicators');
        if(carouselInd){
            carouselInd.innerHTML = carousel.generateIndicators();
        }
        var carouselInner = document.querySelector('#carousel1 div.carousel-inner');
        if(carouselInner){
            carouselInner.innerHTML = carousel.generateCarousel();
        }
    }    
}