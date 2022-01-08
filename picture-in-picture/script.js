const video = document.querySelector("#video");
const button = document.querySelector("#button");

async function selectMediaStream() {
  try {
    const mediaStram = await navigator.mediaDevices.getDisplayMedia();
    video.srcObject = mediaStram;
  } catch (error) {}
}

video.addEventListener("loadedmetadata", () => {
  video.play();
});

button.addEventListener("click", async () => {
  button.disabled = true;
  await video.requestPictureInPicture();
});

selectMediaStream();
