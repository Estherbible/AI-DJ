song1 = ""
song2 = ""

scoreleftwrist = 0
scorerightwrist = 0

function preload() {
    song1 = loadSound("Ayra.mp3")
    song2 = loadSound("Spyro.mp3")
}

function setup() {
    canvas = createCanvas(600, 500)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses)
}

function draw() {
    image(video, 0, 0, 600, 500)
    fill("red")
    stroke("red")

    if (scoreleftwrist > 0.2) {
        song1.play()
        song2.stop()
        document.getElementById("songName").innerHTML="songName=Rush "
    }

    if (scorerightwrist > 0.2) {
        song2.play()
        song1.stop()
        document.getElementById("songName").innerHTML="songName=Whos your guy "

    }
}

function playMusic() {
    song1.play()
    song.setVolume(1)
    song.rate(1)
}

function modelLoaded() {
    console.log("posenet is initionalized");
}

function gotPoses(result) {
    if (result.length > 0) {
        console.log(result);
        scorerightwrist = result[0].pose.keypoints[10].score
        scoreleftwrist = result[0].pose.keypoints[9].score

        // console.log("x= "+floor(leftwristX)+"\n y="+floor(leftwristY));
    }
}