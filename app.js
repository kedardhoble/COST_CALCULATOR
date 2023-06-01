// import { BatchSize} from "./constant"
let span1 = document.getElementsByClassName("totalSize")

const totalFiles = document.getElementById("files")
let avgSize = document.getElementById("avg")
console.log(avgSize)
const changeHandler = ()=>{
    console.log(avgSize.value)
    const total = +totalFiles.value
    const avg = +avgSize.value
    console.log(avgSize.value)

    if(avg != "" && total != ""){
        let totalSizeInGB = (total*avg/1024).toFixed(2)
    console.log("total :",totalSizeInGB)
    let outtag = document.getElementById("output_tag")
    outtag.innerHTML = totalSizeInGB
    console.log(avgSize.value)
    // console.log(BatchSize)

    }
}

let sizeInGB = document.getElementById("avg")
avgSize.addEventListener("input", changeHandler)
totalFiles.addEventListener("input", changeHandler)

totalSize