img = ""
status = "";
objects = [];
song = "";

function preload(){
    img = loadImage('dog_cat.jpg')
    song = loadSound("the_scream")
}

function setup(){
    canvas = createCanvas(380, 380)
    canvas.center()
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Small Child"
}

function draw(){
    image(video, 0, 0, 380, 380)
    if(status !=""){
        objectDetector.detect(video,gotResults);
        for(i=0; i<objects.length; i++){
            r = random(255);
            g = random(255);
            b = random(255);
            fill(r,g,b);
            percent = floor(objects[i].confidence*100);
            text(objects [i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x -15, objects[i].y -15, objects[i].width, objects[i].height);
            
            if(objects[i].label == "person"){
                document.getElementById("status").innerHTML = "Status: Small Child Detected";
                song.stop();

            }
            else{
                document.getElementById("status").innerHTML = "Status: Small Child NOT Detected... TIME TO SCREAM";
                song.play();
            }
        }

        if(object.length == 0){
            document.getElementById("status").innerHTML = "Status: Baby NOT Detected... TIME TO SCREAM";
            song.play();
        }
    }
}

function modelLoaded(){
    console.log("Model Loaded")
    status = true;
    objectDetector.detect(video,gotResults);
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results)
    objects = results;
}