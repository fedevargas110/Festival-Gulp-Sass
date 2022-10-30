//function tarea(done){
//    console.log('Mi primer tarea');
//    done();
//}

//exports.primerTarea = tarea;


const {src, dest, watch, parallel} = require('gulp'); //src para identificar un archivo, dest para guardarlo
//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber =  require('gulp-plumber'); // Es para que no pare de correr el dev y me muestre los errores

//Imagenes
const webp = require('gulp-webp');

function css(done){
    //Identificar el archivo SASS
    //src('src/scss/app.scss') forma para identificar un solo archivo
    src('src/scss/**/*.scss')//forma de compliar todos los archivos con la extencios scss
    //Compilarlo
        .pipe(plumber())
        .pipe(sass())
    //Almacenarla en el disco duro
        .pipe(dest('build/css'))

    done();// Callback que avisa a gulp cuando llegamos al final
}

function versionWebp(done){
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{jpg,png}')//cuando buscas mas de un formato se pone entre llaves.
        .pipe(webp(opciones))
        .pipe(dest('build/imgs'))

    done();
}


function dev(done){ //Creamos esta funcion para no modificar la principal
    //watch('src/scss/app.scss', css) forma de escuchar un solo archivo
    watch('src/scss/**/*.scss', css) //forma de escuchar todos los archivos .scss

    done();
}

exports.css = css;
exports.versionWebp = versionWebp;
exports.dev = parallel(versionWebp,dev);