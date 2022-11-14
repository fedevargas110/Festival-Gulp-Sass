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

        galeria.appendChild(imagen);
    }
}