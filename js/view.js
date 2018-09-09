console.log('view.js');

function getAllMatchingKeys(viewStr){
    var retVal = [],
        rs = /{{[\d\w]+[\.[\d\w]+]*}}/g;
    do{
        var m = rs.exec(viewStr);
        if(m){
            retVal.push(m[0]);
        }
    } while(m);    
    return retVal;
}

function processKeys(viewStr){
    var retVal = [];
    var keys = getAllMatchingKeys(viewStr);    
    for(let i=0; i<keys.length; i++){
        var obj = {};
        obj.name = keys[i];
        var rs = /[\d\w]+[\.[\d\w]+]*/
        var m = rs.exec(keys[i]);
        obj.exposed = m[0];
        obj.splitted = m[0].split('.');
        retVal.push(obj);
    }
    return retVal;
}

function getValueByKeyFromObj(obj,keyArr) {    
    var p = obj;
    for(let i=0; i<keyArr.length; i++){        
        if(p[keyArr[i]])
            p = p[keyArr[i]]        
        else {
            p = '';
            break;
        }
    }
    return p;
}

var views = {
    'CAROUSEL_INDICATOR':'<li data-target="#{{target}}" data-slide-to="{{slideTo}}" class="{{class}}"></li>',

    'CAROUSEL_ELEMENT':'<div class="carousel-item {{active}}">'
                        + '<img src="{{href}}" alt="{{alt}}">'
                        // + '<div class="carousel-caption">'
                        // + '  <h3>{{name}}</h3>'
                        // + '  <p>Price Range: ${{priceRange.selling.low}} - ${{priceRange.selling.high}}</p>'
                        // + '</div>'
                        + '</div>',

    'PRODUCT_LIST' : '<div class="col-sm-4 center" id="{{id}}" data-toggle="modal" data-target="#myModal" onclick="javascript:app.showCarousel(\'{{id}}\')">'
                        + '    <img width="90%" class="thumbnail" src="{{hero.href}}" alt="{{hero.alt}}">'
                        + '    <div width="90%" class="carousel-caption">'
                        + '        <h4>{{name}}</h4>'                    
                        + '        <p>Price: ${{priceRange.selling.low}} - ${{priceRange.selling.high}}</p>'
                        + '    </div>'
                        + '</div>'
}

app.getView = function(name ,data){
    var viewStr = '';
    if(name && views && views[name]){
        viewStr = views[name];
        var keys = processKeys(viewStr);
        if(data){
            for(let i=0; i<keys.length; i++){
                var replaceVal = getValueByKeyFromObj(data, keys[i].splitted)
                if(replaceVal){
                    viewStr = viewStr.replace(keys[i].name, replaceVal)
                }
            }        
        }        
    } else{
        console.log('View ' + name + 'does not exists');
    }    
    return viewStr;
}