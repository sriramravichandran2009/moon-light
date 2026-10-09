
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/PASTE_YOUR_MODEL_ID_HERE/';

let classifier, video, label = "Loading...", confidence = 0.0;

function setup() {
  createCanvas(640, 520);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  classifier = ml5.imageClassifier(imageModelURL + 'model.json', video, () => classifyVideo());
}

function classifyVideo() {
  classifier.classify(gotResult);
}

function gotResult(err, res) {
  if (!err && res.length > 0) {
    label = res[0].label;
    confidence = res[0].confidence;
  }
  classifyVideo();
}

function draw() {
  background(25);
  push(); translate(width, 0); scale(-1, 1);
  image(video, 0, 0, width, 440);
  pop();

  fill(35); noStroke(); rect(0, 440, width, 80);
  fill(255); textSize(20); textAlign(LEFT, CENTER);
  text("Status: " + label, 20, 480);
  textAlign(RIGHT, CENTER);
  text("Confidence: " + floor(confidence * 100) + "%", width - 20, 480);

  if (confidence > 0.80) {
    let cur = label.toLowerCase();
    textAlign(CENTER, CENTER);
    if (cur.includes("phone")) {
      fill(255, 0, 0, 160); rect(0, 0, width, 440);
      fill(255); textSize(32); text("📱 PUT AWAY YOUR PHONE!", width / 2, 220);
    } else if (cur.includes("distracted")) {
      fill(255, 140, 0, 150); rect(0, 0, width, 440);
      fill(255); textSize(32); text("👀 EYES BACK ON THE SCREEN", width / 2, 220);
    } else if (cur.includes("focused")) {
      fill(0, 200, 100, 120); rect(0, 0, width, 50);
      fill(255); textSize(22); text("✅ GOOD STUDY POSTURE", width / 2, 25);
    }
  }
}

