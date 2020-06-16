if(process.argv.length < 4) {
    throw "Provide folder names"
}
const fs = require("fs")
const folder = process.argv[2];
const outputfolder = process.argv[3];
const existingFolders = {}
const isWindows = process.platform === "win32";
console.log(isWindows ? "using windows" : "using linux")
const spacing = isWindows ? "\\" : "/";
console.log("creating output folder...")
if(!fs.existsSync(outputfolder)){
    fs.mkdirSync(outputfolder);
}else{
    throw "Please empty output directory and delete the folder"
}
console.log("reading content of input folder...")
fs.readdir(folder, (err, files) => {
    console.log("organisizing files in memory...")
    files = files.map(fileName => {
      return {
        name: fileName,
        time: fs.statSync(folder + spacing + fileName).mtime.getTime()
      };
    })
    .sort((a, b) => {
        return a.time - b.time;
    })
    .map(v => {
        return v.name;
    });
    let idx = 0;
    let taskNumber = 0;
    while(idx < files.length){
        taskNumber++;
        console.log("READING task " + (taskNumber))
        console.log ("  reading metadata")
        const metadata = JSON.parse(
            fs.readFileSync(
                folder + spacing + files[idx++],
                {encoding:'utf8', flag:'r'}
            )
        );
        console.log("   got metadata for " + metadata.title)
        console.log("   reading amount of uploads for task...")
        metadata.files = []
        const count = Number(
            fs.readFileSync(
                folder + spacing + files[idx++],
                {encoding:'utf8', flag:'r'}
            )
        )
        console.log("   creating output folders for task...")
        const temp = outputfolder + spacing + metadata.team.replace(spacing,"").replace(":","") + spacing + metadata.title.replace(spacing,"").replace(":","");
        if(existingFolders[metadata.team] == undefined){
            fs.mkdirSync(outputfolder + spacing + metadata.team);
            existingFolders[metadata.team] = {}
            fs.mkdirSync(temp);
            existingFolders[metadata.team][metadata.title] = true;
        }else if(existingFolders[metadata.team][metadata.title] == undefined){
            fs.mkdirSync(temp);
            existingFolders[metadata.team][metadata.title] = true;
        }
        for(let i = 0; i < count; i++){
            console.log("   reading file: " + files[idx])
            metadata.files.push(files[idx]);
            fs.copyFileSync(
                folder + spacing + files[idx],
                temp + spacing + files[idx]      
            )
            idx++;
        }
        console.log("   writing metadata to output folder...")
        fs.writeFileSync(temp + spacing + 'metadata.json', JSON.stringify(metadata), 'utf8')
        console.log("FINISHED task " + (taskNumber))
    }
});
console.log("DONE. Navigate to: " + outputfolder)
