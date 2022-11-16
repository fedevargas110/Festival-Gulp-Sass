document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    navegacionFija();// Definimos la funcion para fijar el scroll
    crearGaleria();
    scrollNav()
}

function navegacionFija(){
    const barra = document.querySelector('header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');//Para hacerlo mas fluido al fijar header


    window.addEventListener('scroll', function(){
        if(sobreFestival.getBoundingClientRect().bottom < 0){
            barra.classList.add('fijo');
            body.classList.add('body-scroll')
        }else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
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

function scrollNav (){ //Definiendo la funcion de smooth control
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e){
            e.preventDefault();//Para prevenir la accion de que te lleve de golpe.
            const seccionScroll = e.target.attributes.href.value; //Te traiga el href de cada a
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior:'smooth'}); //Añadimos la animacion smooth
        });
    });
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