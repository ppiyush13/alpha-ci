
function first() {
    try {
        console.log('first');
        throw new Error('Within first');
    }
    catch(ex) {
        console.log(ex);
    }
    finally {
        console.log('Within finally');
        throw new Error('Within finally');
    }
}
(() => {

    try {
        first();
    }
    catch(ex) {
        console.log(ex);
    }

})();