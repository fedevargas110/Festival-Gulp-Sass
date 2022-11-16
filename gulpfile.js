//function tarea(done){
//    console.log('Mi primer tarea');
//    done();
//}

//exports.primerTarea = tarea;


const {src, dest, watch, parallel} = require('gulp'); //src para identificar un archivo, dest para guardarlo
//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber =  require('gulp-plumber'); // Es para que no pare de correr el dev y me muestre los errores
const cssnano = require('cssnano');//Estos tres ayudan a una ves terminado el proyecto minimizar y comprimir el archivo css
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');


//Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

function css(done){
    //Identificar el archivo SASS
    //src('src/scss/app.scss') forma para identificar un solo archivo
    src('src/scss/**/*.scss')//forma de compliar todos los archivos con la extencios scss
    //Compilarlo
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
    //Almacenarla en el disco duro
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))

    done();// Callback que avisa a gulp cuando llegamos al final
}

function imagenes(done){
    const opciones={
        optimizationLevel: 3
    }
    src('src/img/**/*.{jpg,png}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/imgs'))

    done();
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

function javaScript(done){
    src('src/js/**/*.js')
        .pipe(dest('build/js'));

    done();
}


function dev(done){ //Creamos esta funcion para no modificar la principal
    //watch('src/scss/app.scss', css) forma de escuchar un solo archivo
    watch('src/scss/**/*.scss', css) //forma de escuchar todos los archivos .scss
    watch('src/js/**/*.js', javaScript) //forma de escuchar todos los archivos .js

    done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.dev = parallel(imagenes, versionWebp, javaScript, css, dev);