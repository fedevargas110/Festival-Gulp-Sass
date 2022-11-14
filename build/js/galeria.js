document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    crearGaleria();
}

function crearGaleria(){ // Generando la galeria con puro java script
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= 12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML=`
            <source srcset="build/imgs/thumb/${i}.webp" type="imagen/webp">
            <source srcset="build/imgs/thumb/${i}.jpg" type="imagen/jpg">

            <img  loading="lazy" src="build/imgs/thumb/${i}.webp" alt="imagen galeria">
        `;

        imagen.onclick = function(){ //igual a un callback
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id){
    const imagen = document.createElement('picture');
    imagen.innerHTML=`
        <source srcset="build/imgs/grande/${id}.webp" type="imagen/webp">
        <source srcset="build/imgs/grande/${id}.jpg" type="imagen/jpg">

        <img  loading="lazy" src="build/imgs/grande/${id}.webp" alt="imagen galeria">
    `;
    //Crea el overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');//Que me deje hacer scroll despues de cerrar la foto
        overlay.remove();
    }

    //Añadiendo boton de cerrar imagen
    const cerrarFoto = document.createElement('P');
    cerrarFoto.textContent = 'X';
    cerrarFoto.classList.add('btn-cerrar');
    cerrarFoto.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');//Que me deje hacer scroll despues de cerrar la foto
        overlay.remove();
        
    }
    overlay.appendChild(cerrarFoto);

    //Añadirlo al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body'); //Creando para q no se mueva la pagina cuando estamos en la foto
}