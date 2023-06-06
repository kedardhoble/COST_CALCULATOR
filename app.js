import { BatchSize, MemoryInGB, PerRequestCharge, StandardCost, ConvertFromMillisecondsToSeconds, DataProfilerAvgTimePerMB} from "./constant.js"


const noOfBuckets = document.getElementById("noOfBuckets")
const totalFiles = document.getElementById("files")
const avgSize = document.getElementById("avg")
var S3TotalOfTotalAWSCost;
var RDSTotalOfTotalAWSCost;
const changeHandlerS3 = () => {
    const buckets = +noOfBuckets.value
    const total = +totalFiles.value
    const avg = +avgSize.value

    if (avg != "" && total != "" && buckets != "") {
        let totalSizeInGB = (total * avg / 1024).toFixed(2)
        var S3DataProfilerLamCalls = Math.floor(Number(total / BatchSize))
        var S3AggregatorV2LamCalls = Math.round(Number(S3DataProfilerLamCalls/BatchSize))
        var S3AggregatorLamCalls = Math.round(Number(S3DataProfilerLamCalls/BatchSize))
        var S3AggregatorClassificationResultAggregationLamCalls = Number(buckets)
        var S3DiscoveryLamCalls = 1
        var S3TotalLamCalls = (1+S3DataProfilerLamCalls+S3AggregatorV2LamCalls+S3AggregatorLamCalls+S3AggregatorClassificationResultAggregationLamCalls)
        
        var S3DiscoveryAvgTimeInms = 900000
        var S3DataProfilerAvgTimeInms = Number((avg*BatchSize*DataProfilerAvgTimePerMB).toFixed(2))
        var S3AggregatorV2AvgTimeInms = 1680
        var S3AggregatorAvgTimeInms = 315
        var S3AggregatorClassificationResultAggregationAvgTimeInms = 900000
        var S3TotalAvgTimeInms = (S3DiscoveryAvgTimeInms+S3DataProfilerAvgTimeInms+S3AggregatorV2AvgTimeInms+S3AggregatorAvgTimeInms+S3AggregatorClassificationResultAggregationAvgTimeInms)
        var S3DiscoveryMonthComputeCharge = ((S3DiscoveryLamCalls+S3AggregatorClassificationResultAggregationLamCalls)*S3DiscoveryAvgTimeInms*MemoryInGB*ConvertFromMillisecondsToSeconds*StandardCost).toFixed(2)
        var S3DataProfilerMonthComputeCharge = (S3DataProfilerLamCalls*S3DataProfilerAvgTimeInms*MemoryInGB*ConvertFromMillisecondsToSeconds*StandardCost).toFixed(2)
        var S3AggregatorV2MonthComputeCharge = (S3AggregatorV2LamCalls*S3AggregatorV2AvgTimeInms*MemoryInGB*ConvertFromMillisecondsToSeconds*StandardCost).toFixed(2)
        var S3AggregatorMonthComputeCharge = (S3AggregatorLamCalls*S3AggregatorAvgTimeInms*MemoryInGB*ConvertFromMillisecondsToSeconds*StandardCost).toFixed(2)
        var S3DiscoveryMonthlyReqCharge = ((S3DiscoveryLamCalls+S3AggregatorClassificationResultAggregationLamCalls)*PerRequestCharge).toFixed(2)
        var S3DataProfilerMonthlyReqCharge = (S3DataProfilerLamCalls*PerRequestCharge).toFixed(2)
        var S3AggregatorV2MonthlyReqCharge = (S3AggregatorV2LamCalls*PerRequestCharge).toFixed(2)
        var S3AggregatorMonthlyReqCharge = (S3AggregatorLamCalls*PerRequestCharge).toFixed(2)
        var S3DiscoveryTotalAWSCost = (+S3DiscoveryMonthComputeCharge+(+S3DiscoveryMonthlyReqCharge))
        var S3DataProfilerTotalAWSCost = (+S3DataProfilerMonthComputeCharge+(+S3DataProfilerMonthlyReqCharge))
        var S3AggregatorV2TotalAWSCost = (+S3AggregatorV2MonthComputeCharge+(+S3AggregatorV2MonthlyReqCharge))
        var S3AggregatorTotalAWSCost = (+S3AggregatorMonthComputeCharge+(+S3AggregatorMonthlyReqCharge))
        S3TotalOfTotalAWSCost = (+S3DiscoveryTotalAWSCost+S3DataProfilerTotalAWSCost+S3AggregatorV2TotalAWSCost+S3AggregatorTotalAWSCost)

        // console.log("S3AggregatorMonthlyReqCharge: ", S3AggregatorMonthlyReqCharge)

        document.getElementById("S3DiscoveryLamCalls").innerHTML = 1
        document.getElementById("totalSize").innerHTML = totalSizeInGB
        document.getElementById('S3DataProfilerLamCalls').innerHTML = S3DataProfilerLamCalls
        document.getElementById("S3AggregatorV2LamCalls").innerHTML = S3AggregatorV2LamCalls
        document.getElementById("S3AggregatorLamCalls").innerHTML = S3AggregatorLamCalls
        document.getElementById("S3AggregatorClassificationResultAggregationLamCalls").innerHTML = S3AggregatorClassificationResultAggregationLamCalls
        document.getElementById("S3TotalLamCalls").innerHTML = S3TotalLamCalls
        document.getElementById("S3DiscoveryAvgTimeInms").innerHTML = 900000
        document.getElementById("S3DataProfilerAvgTimeInms").innerHTML = S3DataProfilerAvgTimeInms
        document.getElementById("S3AggregatorV2AvgTimeInms").innerHTML = 1680
        document.getElementById("S3AggregatorAvgTimeInms").innerHTML = 315
        document.getElementById("S3AggregatorClassificationResultAggregationAvgTimeInms").innerHTML = 900000
        document.getElementById("S3TotalAvgTimeInms").innerHTML = S3TotalAvgTimeInms
        document.getElementById("S3DiscoveryMonthComputeCharge").innerHTML = S3DiscoveryMonthComputeCharge
        document.getElementById("S3DataProfilerMonthComputeCharge").innerHTML = S3DataProfilerMonthComputeCharge
        document.getElementById("S3AggregatorV2MonthComputeCharge").innerHTML = S3AggregatorV2MonthComputeCharge
        document.getElementById("S3AggregatorMonthComputeCharge").innerHTML = S3AggregatorMonthComputeCharge
        document.getElementById("S3DiscoveryMonthlyReqCharge").innerHTML = S3DiscoveryMonthlyReqCharge
        document.getElementById("S3DataProfilerMonthlyReqCharge").innerHTML = S3DataProfilerMonthlyReqCharge
        document.getElementById("S3AggregatorV2MonthlyReqCharge").innerHTML = S3AggregatorV2MonthlyReqCharge
        document.getElementById("S3AggregatorMonthlyReqCharge").innerHTML = S3AggregatorMonthlyReqCharge
        document.getElementById("S3DiscoveryTotalAWSCost").innerHTML = S3DiscoveryTotalAWSCost
        document.getElementById("S3DataProfilerTotalAWSCost").innerHTML = S3DataProfilerTotalAWSCost
        document.getElementById("S3AggregatorV2TotalAWSCost").innerHTML = S3AggregatorV2TotalAWSCost
        document.getElementById("S3AggregatorTotalAWSCost").innerHTML = S3AggregatorTotalAWSCost
        document.getElementById("S3TotalOfTotalAWSCost").innerHTML = S3TotalOfTotalAWSCost


    }

}
avgSize.addEventListener("input", changeHandlerS3)
totalFiles.addEventListener("input", changeHandlerS3)
noOfBuckets.addEventListener("input", changeHandlerS3)

const noOfInstanceRDS = document.getElementById("NoOfRDSInstancesOrClusters")
const datasizeInGBRDS = document.getElementById("SizeOfDataInGB")
const noOfRDStables = document.getElementById("NumberOfTables")
const changeHandlerRDS = () => {
    const instanceRDS = +noOfInstanceRDS.value
    const sizeRDS = +datasizeInGBRDS.value
    const tablesRDS = +noOfRDStables.value

    if (instanceRDS != "" && sizeRDS != "" && tablesRDS != "") {
        
        var RDSSnapshotLamCalls = instanceRDS
        var RDSExportToS3LamCalls = RDSSnapshotLamCalls
        var RDSDataProfilerLamCalls = (tablesRDS)
        var RDSAggregatorV2LamCalls = RDSDataProfilerLamCalls/BatchSize
        var RDSAggregatorLamcalls = (+RDSAggregatorV2LamCalls)
        var RDSAggregatorClassificationResultAggregationLamcalls = RDSSnapshotLamCalls
        var RDSTotalLamcalls = (+RDSSnapshotLamCalls+RDSExportToS3LamCalls+RDSDataProfilerLamCalls+RDSAggregatorV2LamCalls+RDSAggregatorLamcalls+RDSAggregatorClassificationResultAggregationLamcalls).toFixed(2)
        var RDSSnapshotAvgTimeinmilliseconds = 1000
        var RDSExportToS3AvgTimeinmilliseconds = 1000
        var RDSDataProfilerAvgTimeinmilliseconds = 12000
        var RDSAggregatorV2AvgTimeinmilliseconds = 1700
        var RDSAggregatorAvgTimeinmilliseconds = 300
        var RDSAggregatorClassificationResultAggregationAvgTimeinmilliseconds = 900000
        var RDSTotalAvgTimeinmilliseconds = (+RDSSnapshotAvgTimeinmilliseconds+RDSExportToS3AvgTimeinmilliseconds+RDSDataProfilerAvgTimeinmilliseconds+RDSAggregatorV2AvgTimeinmilliseconds+RDSAggregatorAvgTimeinmilliseconds+RDSAggregatorClassificationResultAggregationAvgTimeinmilliseconds)
        
        
        var RDSExportToS3AvgMonthComp = ((RDSSnapshotLamCalls + RDSExportToS3LamCalls + RDSAggregatorClassificationResultAggregationLamcalls)*(RDSAggregatorClassificationResultAggregationAvgTimeinmilliseconds)*(MemoryInGB)*(ConvertFromMillisecondsToSeconds)*(StandardCost)).toFixed(2)
        var RDSDataProfilerMonthComp = (RDSDataProfilerLamCalls*RDSDataProfilerAvgTimeinmilliseconds*MemoryInGB*ConvertFromMillisecondsToSeconds*StandardCost).toFixed(2)
        var RDSAggregatorV2MonthComp = (RDSAggregatorV2LamCalls*RDSAggregatorV2AvgTimeinmilliseconds*MemoryInGB*ConvertFromMillisecondsToSeconds*StandardCost).toFixed(2)
        var RDSAggregatorMonthComp = (RDSAggregatorLamcalls*RDSAggregatorAvgTimeinmilliseconds*MemoryInGB*ConvertFromMillisecondsToSeconds*StandardCost).toFixed(2)
        
        
        var RDSExportToS3MonthReq = ((RDSSnapshotLamCalls + RDSExportToS3LamCalls + RDSAggregatorClassificationResultAggregationLamcalls)*PerRequestCharge).toFixed(2)
        var RDSDataProfilerMonthReq =(+RDSDataProfilerLamCalls*(+PerRequestCharge)).toFixed(2)
        var RDSAggregatorV2MonthReq =(+RDSAggregatorV2LamCalls*(+PerRequestCharge)).toFixed(2)
        var RDSAggregatorMonthReq = (+RDSAggregatorLamcalls*(+PerRequestCharge)).toFixed(2)
        var RDSExportToS3TotalAWSCost = (Number(RDSExportToS3AvgMonthComp) + Number(RDSExportToS3MonthReq)).toFixed(2)
        var RDSDataProfilerTotalAWSCost = (Number(RDSDataProfilerMonthComp) + Number(RDSDataProfilerMonthReq)).toFixed(2)
        // console.log("RDSDataProfilerTotalAWSCost : ", typeof RDSDataProfilerTotalAWSCost)
        var RDSAggregatorV2TotalAWSCost = (+RDSAggregatorV2MonthComp+(+RDSAggregatorV2MonthReq)).toFixed(2)
        var RDSAggregatorTotalAWSCost = (+RDSAggregatorMonthComp+(+RDSAggregatorMonthReq)).toFixed(2)
        RDSTotalOfTotalAWSCost = ((+RDSExportToS3TotalAWSCost) + (+RDSDataProfilerTotalAWSCost) + (+RDSAggregatorV2TotalAWSCost) + (+RDSAggregatorTotalAWSCost))

        document.getElementById("RDSSnapshotLamCalls").innerHTML = RDSSnapshotLamCalls
        document.getElementById("RDSExportToS3LamCalls").innerHTML = RDSExportToS3LamCalls
        document.getElementById("RDSDataProfilerLamCalls").innerHTML = RDSDataProfilerLamCalls
        document.getElementById("RDSAggregatorV2LamCalls").innerHTML = RDSAggregatorV2LamCalls
        document.getElementById("RDSAggregatorLamcalls").innerHTML = RDSAggregatorLamcalls
        document.getElementById("RDSAggregatorClassificationResultAggregationLamcalls").innerHTML = RDSAggregatorClassificationResultAggregationLamcalls
        document.getElementById("RDSTotalLamcalls").innerHTML = RDSTotalLamcalls
        document.getElementById("RDSSnapshotAvgTimeinmilliseconds").innerHTML = RDSSnapshotAvgTimeinmilliseconds
        document.getElementById("RDSExportToS3AvgTimeinmilliseconds").innerHTML = RDSExportToS3AvgTimeinmilliseconds
        document.getElementById("RDSDataProfilerAvgTimeinmilliseconds").innerHTML = RDSDataProfilerAvgTimeinmilliseconds
        document.getElementById("RDSAggregatorV2AvgTimeinmilliseconds").innerHTML = RDSAggregatorV2AvgTimeinmilliseconds
        document.getElementById("RDSAggregatorAvgTimeinmilliseconds").innerHTML = RDSAggregatorAvgTimeinmilliseconds
        document.getElementById("RDSAggregatorClassificationResultAggregationAvgTimeinmilliseconds").innerHTML = RDSAggregatorClassificationResultAggregationAvgTimeinmilliseconds
        document.getElementById("RDSTotalAvgTimeinmilliseconds").innerHTML = RDSTotalAvgTimeinmilliseconds
        document.getElementById("RDSExportToS3AvgMonthComp").innerHTML = RDSExportToS3AvgMonthComp
        document.getElementById("RDSDataProfilerMonthComp").innerHTML = RDSDataProfilerMonthComp
        document.getElementById("RDSAggregatorV2MonthComp").innerHTML = RDSAggregatorV2MonthComp
        document.getElementById("RDSAggregatorMonthComp").innerHTML = RDSAggregatorMonthComp
        document.getElementById("RDSExportToS3MonthReq").innerHTML = RDSExportToS3MonthReq
        document.getElementById("RDSDataProfilerMonthReq").innerHTML = RDSDataProfilerMonthReq
        document.getElementById("RDSAggregatorV2MonthReq").innerHTML = RDSAggregatorV2MonthReq
        document.getElementById("RDSAggregatorMonthReq").innerHTML = RDSAggregatorMonthReq
        document.getElementById("RDSExportToS3TotalAWSCost").innerHTML = RDSExportToS3TotalAWSCost
        document.getElementById("RDSDataProfilerTotalAWSCost").innerHTML = RDSDataProfilerTotalAWSCost
        document.getElementById("RDSAggregatorV2TotalAWSCost").innerHTML = RDSAggregatorV2TotalAWSCost
        document.getElementById("RDSAggregatorTotalAWSCost").innerHTML = RDSAggregatorTotalAWSCost
        document.getElementById("RDSTotalOfTotalAWSCost").innerHTML = RDSTotalOfTotalAWSCost
    }
}
noOfInstanceRDS.addEventListener("input", changeHandlerRDS)
datasizeInGBRDS.addEventListener("input", changeHandlerRDS)
noOfRDStables.addEventListener("input", changeHandlerRDS)

const noOfEC2InstanceRDS = document.getElementById("NoOfEC2Instances")
const datasizeInGBEC2 = document.getElementById("NoOfVolumes")
const avgSizeEBS = document.getElementById("SizeOfEBSVolumeInGBs")
const changeHandlerSelf = () => {
    const instanceSelf = +noOfEC2InstanceRDS.value
    const sizeSelf = +datasizeInGBEC2.value
    const avgSizeSelf = +avgSizeEBS.value

    if (instanceSelf != "" && sizeSelf != "" && avgSizeSelf != "") {
        var C17 = 1
        var C18 = 1
        var C19 = 1
        var C20 = 10
        var C21 = 10
        var C22 = 10
        var C23 = 10
        var C24 = (C17+C18+C19+C20+C21+C22+C23)
        var D17 = 1000 
        var D18 = 10000
        var D19 = 500
        var D20 = 30000
        var D21 = 56000
        var D22 = 10000
        var D23 = 1000
        var D24 = (D17+D18+D19+D20+D21+D22+D23)
        var H24 = (C24*D24*MemoryInGB*ConvertFromMillisecondsToSeconds*StandardCost).toFixed(2)
        var I24 = (C24*PerRequestCharge).toFixed(2)
        var J24 = ((+H24) + (+I24))
        var J25 = ((+S3TotalOfTotalAWSCost) + (+RDSTotalOfTotalAWSCost) + J24)

        // console.log("S3TotalOfTotalAWSCost: ", S3TotalOfTotalAWSCost)
        // console.log("RDSTotalOfTotalAWSCost: ", RDSTotalOfTotalAWSCost)
        // console.log("J25: ", J25)

        document.getElementById("C17").innerHTML = C17
        document.getElementById("C18").innerHTML = C18
        document.getElementById("C19").innerHTML = C19
        document.getElementById("C20").innerHTML = C20
        document.getElementById("C21").innerHTML = C21
        document.getElementById("C22").innerHTML = C22
        document.getElementById("C23").innerHTML = C23
        document.getElementById("C24").innerHTML = C24
        document.getElementById("D17").innerHTML = D17
        document.getElementById("D18").innerHTML = D18
        document.getElementById("D19").innerHTML = D19
        document.getElementById("D20").innerHTML = D20
        document.getElementById("D21").innerHTML = D21
        document.getElementById("D22").innerHTML = D22
        document.getElementById("D23").innerHTML = D23
        document.getElementById("D24").innerHTML = D24
        document.getElementById("H24").innerHTML = H24
        document.getElementById("I24").innerHTML = I24
        document.getElementById("J24").innerHTML = J24
        document.getElementById("J25").innerHTML = J25

    }
}
noOfEC2InstanceRDS.addEventListener("input", changeHandlerSelf)
datasizeInGBEC2.addEventListener("input", changeHandlerSelf)
avgSizeEBS.addEventListener("input", changeHandlerSelf)

function displayHandlerS3(button) {
    console.log("Button",button)
    let divs = ["lambdaCallsS3", "avgTimeS3", "computeChargeS3", "requestChargeS3", "totalChargeS3"]
    for(let i=0; i<divs.length; i++){
        if(divs[i] == button){
            console.log("Reached")
            let x = document.getElementById(button)
            if (x.style.display === "none") {
                console.log("Change CSS")
            x.style.display = "block";
            } else {
            x.style.display = "none";
            }
        }
        else{
            let x = document.getElementById(divs[i])
            x.style.display = "none"
        }
    }   
}
document.getElementById("displayLamCalls").addEventListener("click", () => {displayHandlerS3("lambdaCallsS3")})
document.getElementById("displayAvgTime").addEventListener("click", () => {displayHandlerS3("avgTimeS3")})
document.getElementById("displayCompCharge").addEventListener("click", () => {displayHandlerS3("computeChargeS3")})
document.getElementById("displayreqCharge").addEventListener("click", () => {displayHandlerS3("requestChargeS3")})
document.getElementById("displayTotalCharge").addEventListener("click", () => {displayHandlerS3("totalChargeS3")})

function displayHandlerRDS(button) {
    let divs = ["lambdaCallsRDS", "avgTimeRDS", "compChargeRDS", "reqChargeRDS", "totalChargeRDS"]
    for(let i=0; i<divs.length; i++){
        if(divs[i] == button){
            let x = document.getElementById(button)
            if (x.style.display === "none") {
            x.style.display = "block";
            } else {
            x.style.display = "none";
            }
        }
        else{
            let x = document.getElementById(divs[i])
            x.style.display = "none"
        }
    }   
}
document.getElementById("displayLamCallsRDS").addEventListener("click", () => {displayHandlerRDS("lambdaCallsRDS")})
document.getElementById("displayAvgTimeRDS").addEventListener("click", () => {displayHandlerRDS("avgTimeRDS")})
document.getElementById("displayCompChargeRDS").addEventListener("click", () => {displayHandlerRDS("compChargeRDS")})
document.getElementById("displayreqChargeRDS").addEventListener("click", () => {displayHandlerRDS("reqChargeRDS")})
document.getElementById("displayTotalChargeRDS").addEventListener("click", () => {displayHandlerRDS("totalChargeRDS")})

function displayHandlerSelf(button) {
    let divs = ["lambdaCallsSelf", "avgTimeSelf", "compAndReqChargeSelf"]
    for(let i=0; i<divs.length; i++){
        if(divs[i] == button){
            let x = document.getElementById(button)
            if (x.style.display === "none") {
            x.style.display = "block";
            } else {
            x.style.display = "none";
            }
        }
        else{
            let x = document.getElementById(divs[i])
            x.style.display = "none"
        }
    }   
}
document.getElementById("displayLamCallsSelf").addEventListener("click", () => {displayHandlerSelf("lambdaCallsSelf")})
document.getElementById("displayAvgTimeSelf").addEventListener("click", () => {displayHandlerSelf("avgTimeSelf")})
document.getElementById("displayCompAndReqChargeSelf").addEventListener("click", () => {displayHandlerSelf("compAndReqChargeSelf")})





    // function lambdaCalls() {
    //     let x = document.getElementById("lambdaCallsS3");
    //     if (x.style.display === "none") {
    //     x.style.display = "block";
    //     } else {
    //     x.style.display = "none";
    //     }
    // }
    // const lamCallsS3Button = document.getElementById("displayLamCalls")
    // lamCallsS3Button.addEventListener("click", lambdaCalls)

    // function avgTimeS3() {
    //     let x = document.getElementById("avgTimeS3");
    //     if (x.style.display === "none") {
    //     x.style.display = "block";
    //     } else {
    //     x.style.display = "none";
    //     }
    // }
    // const avgTimeS3Button = document.getElementById("displayAvgTime")
    // avgTimeS3Button.addEventListener("click", avgTimeS3)
    
    // function compChargeS3() {
    //     let x = document.getElementById("computeChaargeS3");
    //     if (x.style.display === "none") {
    //     x.style.display = "block";
    //     } else {
    //     x.style.display = "none";
    //     }
    // }
    // const compChargeS3Button = document.getElementById("displayCompCharge")
    // compChargeS3Button.addEventListener("click", compChargeS3)

    // function reqChargeS3() {
    //     let x = document.getElementById("requestChaargeS3");
    //     if (x.style.display === "none") {
    //     x.style.display = "block";
    //     } else {
    //     x.style.display = "none";
    //     }
    // }
    // const reqChargeS3Button = document.getElementById("displayreqCharge")
    // reqChargeS3Button.addEventListener("click", reqChargeS3)

    // function totalChargeS3() {
    //     let x = document.getElementById("totalChaargeS3");
    //     if (x.style.display === "none") {
    //     x.style.display = "block";
    //     } else {
    //     x.style.display = "none";
    //     }
    // }
    // const totalChargeS3Button = document.getElementById("displayTotalCharge")
    // totalChargeS3Button.addEventListener("click", totalChargeS3)

