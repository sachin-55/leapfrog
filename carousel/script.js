var container = document.getElementById('container');
var wrapper = document.getElementById('wrapper');
var images = Array.from(wrapper.getElementsByTagName('img'));
var position = document.getElementById('image-position');


images.forEach(function(image,index) {
    image.style.left=index*image.width+'px';    
    var list = document.createElement('li');
    list.style.backgroundColor='rgb(63, 46, 46)';

    list.setAttribute('value',index);
    list.setAttribute('onclick','showImage(this)');
    position.appendChild(list);
});

var counter=0;
var list = Array.from(position.getElementsByTagName('li'));
list[0].style.backgroundColor='red';

function imagePosition(){
  list.forEach(function(li){
            if(li.value===counter){
                li.style.backgroundColor='red';
            }
            else{
                li.style.backgroundColor='rgb(63, 46, 46)';
            }
        });
}

function showImage(image){
counter=image.value;
 images.forEach(function(image,index) {
        image.style.left=(index-counter)*image.width+'px';  
        image.style.transition='all 1s ease';
    });
    imagePosition();   
}


function next(){

    images.forEach(function(image,index) {
        image.style.left=(index-counter)*image.width+'px';  
        image.style.transition='all 1s ease';
    });

       imagePosition();   


    counter++;
    
    if(counter>images.length-1){
        counter=0;
    }

}

function prev(){
    images.forEach(function(image,index) {
        image.style.left=(index-counter)*image.width+'px';    
        image.style.transition='all 1s ease';
    });

        imagePosition();   


    counter--;

    if(counter<0){
        counter=images.length-1; 
    }
   
}

 setInterval(next,2000);

document.getElementById('next').addEventListener('click',next);

document.getElementById('previous').addEventListener('click',prev);