var work = function() {

    console.log("working hard!");

};

var doWork = function(f) {

    console.log("Starting");
    try {
        f();
    } catch(ex) {
        console.log(ex);
    }

    console.log("Ending");

}

doWork(work);