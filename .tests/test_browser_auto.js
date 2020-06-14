const url = "https://lectio.dk/lectio/518/ExerciseFileGet.aspx?type=elevopgave&entryid=23136273788";
fetch(url)
  .then(res => res.blob()) // Gets the response and returns it as a blob
  .then(blob => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(blob)
    fileReader.addEventListener("load", function () {
        console.log(this.result)
      }, false);
});