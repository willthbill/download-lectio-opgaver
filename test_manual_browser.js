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
            console.log("going back")
            window.history.back();
        }
    }
}, 1000);

const amountOfTasks = () => {
    return Array.prototype.slice.call(document.getElementById("s_m_Content_Content_ExerciseGV")
    .children[0].children).slice(1).length;
}

const enterTask = () => {
    const tasks = 
        Array.prototype.slice.call(document.getElementById("s_m_Content_Content_ExerciseGV")
        .children[0].children).slice(1);
    const index = localStorage.getItem("downloader_index");
    tasks[index].children[2].children[0].children[0].click();
}

const downloadTask = async () => {
    const tasks = 
    Array.prototype.slice.call(document.getElementById("m_Content_RecipientGV")
    .children[0].children).slice(1);
    for(const task of tasks){
        console.log("start")
        const link = task.children[3].children[0].children[0];
        if(!link) continue;
        await new Promise((resolve, reject) => {
            link.click(),
            setTimeout(
                () => resolve(),
                2000
            )
        })
        console.log("end")
    }
}

const enableFirst = () => {
    document.getElementById("s_m_Content_Content_CurrentExerciseFilterCB").click()
}

const enableSecond = () => {
    document.getElementById("s_m_Content_Content_ShowThisTermOnlyCB").click()
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