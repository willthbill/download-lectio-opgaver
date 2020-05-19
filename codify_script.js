setTimeout(async () => {
    if(localStorage.getItem("downloader_is_active")){
        const state = Number(localStorage.getItem("downloader_state"));
        localStorage.setItem("downloader_state", String((state + 1) % 4))
        console.log(state, localStorage.getItem("downloader_state"))
        if(state == 0){
            enableFirst();
        }else if(state == 1){
            enableSecond();
        }else if(state == 2){
            if(amountOfTasks() == Number(localStorage.getItem("downloader_index"))){
                localStorage.setItem("downloader_is_active", false);
            }else{
                enterTask();
            }
        }else{
            await downloadTask();
            localStorage.setItem("downloader_index", 
                Number(localStorage.getItem("downloader_index")) + 1
            )
            window.history.back();
        }
    }
}, 1000 + 1000 * Math.random());

const amountOfTasks = () => {
    return Array.prototype.slice.call(document.getElementById("s_m_Content_Content_ExerciseGV")
    .children[0].children).slice(1).length;
}

const enterTask = () => {
    const tasks = 
        Array.prototype.slice.call(document.getElementById("s_m_Content_Content_ExerciseGV")
        .children[0].children).slice(1);
    const index = localStorage.getItem("downloader_index");
    const team = tasks[index].children[1].children[0].innerHTML;
    const title = tasks[index].children[2].children[0].children[0].innerHTML;
    const deadline = tasks[index].children[3].innerHTML;
    const studentTime = tasks[index].children[4].innerHTML;
    const status = tasks[index].children[5].children.length == 1 ? tasks[index].children[5].children[0].innerHTML : tasks[index].children[5].innerHTML;
    const absence = tasks[index].children[6].innerHTML;
    const taskNote = tasks[index].children[8].innerHTML;
    const grade = tasks[index].children[9].innerText;
    const studentNote = tasks[index].children[10].innerHTML;
    const data = {
        team,title,deadline,studentTime,status,absence,taskNote,grade,studentNote
    }
    downloadCustomFile(`metadata-${index}.json`, JSON.stringify(data))
    tasks[index].children[2].children[0].children[0].click();
}

const downloadTask = async () => {
    const tasks = 
    Array.prototype.slice.call(document.getElementById("m_Content_RecipientGV")
    .children[0].children).slice(1);
    let count = 0;
    const index = localStorage.getItem("downloader_index");
    for(const task of tasks){
        const link = task.children[3].children[0].children[0];
        if(!link) continue;
        count++;
    }
    downloadCustomFile(`count-${index}.txt`, String(count));
    for(const task of tasks){
        const link = task.children[3].children[0].children[0];
        if(!link) continue;
        await new Promise((resolve, reject) => {
            link.click(),
            setTimeout(
                () => resolve(),
                2000 + 1000 * Math.random()
            )
        })
    }
}

const enableFirst = () => {
    document.getElementById("s_m_Content_Content_CurrentExerciseFilterCB").click()
}

const enableSecond = () => {
    document.getElementById("s_m_Content_Content_ShowThisTermOnlyCB").click()
}

const downloadCustomFile = (filename, text) => {
    const a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    a.setAttribute('download', filename);
    a.click();
}

const s = document.createElement('script');
s.setAttribute('type', 'text/javascript');
s.innerHTML = 
`window.downloadTasks = () => {
    localStorage.setItem("downloader_is_active", true)
    localStorage.setItem("downloader_index", 0)
    localStorage.setItem("downloader_state", 0)
    window.location.reload()
}`
document.body.appendChild(s);
console.log("loaded downloader")