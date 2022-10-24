//function tarea(done){
//    console.log('Mi primer tarea');
//    done();
//}

//exports.primerTarea = tarea;


const {src, dest, watch} = require('gulp'); //src para identificar un archivo, dest para guardarlo
const sass = require('gulp-sass')(require('sass'));

function css(done){
    //Identificar el archivo SASS
    //src('src/scss/app.scss') forma para identificar un solo archivo
    src('src/scss/**/*.scss')//forma de compliar todos los archivos con la extencios scss
    //Compilarlo
        .pipe(sass())
    //Almacenarla en el disco duro
        .pipe(dest('build/css'))

    done();// Callback que avisa a gulp cuando llegamos al final
}

function dev(done){ //Creamos esta funcion para no modificar la principal
    //watch('src/scss/app.scss', css) forma de escuchar un solo archivo
    watch('src/scss/**/*.scss', css) //forma de escuchar todos los archivos .scss

    done();
}

exports.css = css;
exports.dev = dev;