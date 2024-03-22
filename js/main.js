/*const video = document.getElementById("video");
const audio = document.getElementById("audio");
const audioSource = document.getElementById("audio-source");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const isScreenSmall = window.matchMedia("(max-width: 700px)");
let predictedAges = [];
let currentEmotion = null;
let audioPlaying = false;

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models"),
  faceapi.nets.ageGenderNet.loadFromUri("/models")
]).then(startVideo);

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    (stream) => (video.srcObject = stream),
    (err) => console.error(err)
  );
}

function screenResize(isScreenSmall) {
  if (isScreenSmall.matches) {
    video.style.width = "320px";
  } else {
    video.style.width = "500px";
  }
}

screenResize(isScreenSmall);
isScreenSmall.addListener(screenResize);

video.addEventListener("playing", () => {
  console.log("playing called");
  const canvas = faceapi.createCanvasFromMedia(video);
  let container = document.querySelector(".container");
  container.append(canvas);

  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    const detections = await faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender();

    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    console.log(resizedDetections);

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

    if (resizedDetections && Object.keys(resizedDetections).length > 0) {
      const age = resizedDetections.age;
      const interpolatedAge = interpolateAgePredictions(age);
      const gender = resizedDetections.gender;
      const expressions = resizedDetections.expressions;
      const maxValue = Math.max(...Object.values(expressions));
      const emotion = Object.keys(expressions).filter(
        item => expressions[item] === maxValue
      );// Get the detected emotion

        document.getElementById("age").innerText = `Age - ${interpolatedAge}`;
      document.getElementById("gender").innerText = `Gender - ${gender}`;
        document.getElementById("emotion").innerText = `Emotion - ${emotion}`;
        playAudioBasedOnEmotion(emotion);
      }
  },10);
});
function interpolateAgePredictions(age) {
  predictedAges = [age].concat(predictedAges).slice(0, 30);
  const avgPredictedAge =
    predictedAges.reduce((total, a) => total + a) / predictedAges.length;
  return avgPredictedAge;
}


function playAudioBasedOnEmotion(emotion) {
  const audioSources = {
    happy: "music/happy.mp3",
    sad: "music/sad.mp3",
    angry: "music/angry.mp3",
  };

  if (audioSources.hasOwnProperty(emotion)) {
    const audioFile = audioSources[emotion];
    audioSource.src = audioFile;
    audio.load();
    audio.play();
    audioPlaying = true;
    playButton.disabled = true; // Disable the play button
    pauseButton.disabled = false; // Enable the pause button
  } else {
    // Default audio or silence when no emotion is detected
    audio.pause();
    audioPlaying = false;
    playButton.disabled = false; // Enable the play button
    pauseButton.disabled = true; // Disable the pause button
  }
}

// Play button click event
playButton.addEventListener("click", () => {
  audio.play();
  audioPlaying = true;
  playButton.disabled = true;
  pauseButton.disabled = false;
});

// Pause button click event
pauseButton.addEventListener("click", () => {
  audio.pause();
  audioPlaying = false;
  playButton.disabled = false;
  pauseButton.disabled = true;
});
*/
const video = document.getElementById("video");
const audio = document.getElementById("musicPlayer");
const audioSource = document.getElementById("audio-source");
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const isScreenSmall = window.matchMedia("(max-width: 700px)");
let predictedAges = [];
let currentEmotion = null;
let audioPlaying = false;

const audioSources = {
  happy: "music/happy.mp3",
  sad: "music/sad.mp3",
  angry: "music/angry.mp3",
  // Add more emotions and their corresponding music sources here
};

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models"),
  faceapi.nets.ageGenderNet.loadFromUri("/models")
]).then(startVideo);

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    (stream) => (video.srcObject = stream),
    (err) => console.error(err)
  );
}

function screenResize(isScreenSmall) {
  if (isScreenSmall.matches) {
    video.style.width = "320px";
  } else {
    video.style.width = "500px";
  }
}

screenResize(isScreenSmall);
isScreenSmall.addListener(screenResize);

video.addEventListener("playing", () => {
  console.log("playing called");
  const canvas = faceapi.createCanvasFromMedia(video);
  let container = document.querySelector(".container");
  container.append(canvas);

  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    const detections = await faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender();

    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    console.log(resizedDetections);

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

    if (resizedDetections && Object.keys(resizedDetections).length > 0) {
      const age = resizedDetections.age;
      const interpolatedAge = interpolateAgePredictions(age);
      const expressions = resizedDetections.expressions;
      const maxValue = Math.max(...Object.values(expressions));
      const emotion = Object.keys(expressions).filter(
        item => expressions[item] === maxValue
      )[0]; // Get the detected emotion

      document.getElementById("age").innerText = `Age - ${interpolatedAge}`;
      document.getElementById("gender").innerText = `Gender - ${resizedDetections.gender}`;
      document.getElementById("emotion").innerText = `Emotion - ${emotion}`;
      playAudioBasedOnEmotion(emotion);
    }
  }, 10);
});

function interpolateAgePredictions(age) {
  predictedAges = [age].concat(predictedAges).slice(0, 30);
  const avgPredictedAge =
    predictedAges.reduce((total, a) => total + a) / predictedAges.length;
  return avgPredictedAge;
}

function playAudioBasedOnEmotion(emotion) {
  if (audioSources.hasOwnProperty(emotion)) {
    const audioFile = audioSources[emotion];
    audioSource.src = audioFile;
    audio.load();
    audio.play();
    audioPlaying = true;
    playButton.disabled = true; // Disable the play button
    pauseButton.disabled = false; // Enable the pause button
  } else {
    // Default audio or silence when no emotion is detected
    audio.pause();
    audioPlaying = false;
    playButton.disabled = false; // Enable the play button
    pauseButton.disabled = true; // Disable the pause button
  }
}

// Play button click event
playButton.addEventListener("click", () => {
  audio.play();
  audioPlaying = true;
  playButton.disabled = true;
  pauseButton.disabled = false;
});

// Pause button click event
pauseButton.addEventListener("click", () => {
  audio.pause();
  audioPlaying = false;
  playButton.disabled = false;
  pauseButton.disabled = true;
});
