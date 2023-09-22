function updateFileName(input) {
  const fileLabel = document.getElementById("fileLabel");
  if (input.files.length > 0) {
    fileLabel.textContent = input.files[0].name;
  } else {
    fileLabel.textContent = "Choose file";
  }
}
