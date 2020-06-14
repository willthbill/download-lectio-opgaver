const fetch = require("node-fetch")
const FormData = require('form-data');
const fs = require("fs")
const login = () => {
    const form = new FormData();
    form.append('m$Content$username2', "17l28");
    form.append('m$Content$passwordHidden', "Vejrmagerenwbm.");
    return fetch("https://www.lectio.dk/lectio/518/login.aspx", {
        method : "POST",
        body : form
    }).then(res => {
        console.log(res)
    })
}
const fetchTask = () => {
    return fetch(
        "https://lectio.dk/lectio/518/ExerciseFileGet.aspx?type=elevopgave&entryid=23136273788"
    ).then(res => {
        const fileStream = fs.createWriteStream('./test');
        res.body.pipe(fileStream);
        res.body.on("error", (err) => {
            fileStream.close();
        });
        fileStream.on("finish", function() {
            fileStream.close();
        });
    })
}

const fetchTasks = async () => {
    await login();
    //fetchTask();
}

fetchTasks();