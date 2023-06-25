//Bugs/Issues:
//When page first loads, numbers go crazy (reload to solve it)

//MODEL:
const display = document.getElementById('display')
const raiseBtn = document.getElementById('raiseBtn')
const lowerBtn = document.getElementById('lowerBtn')
const mainInput = document.getElementById('mainInput')
let mainNum = Number(mainInput.value)
const outputArea = document.getElementById('outputArea')
const timeSig = document.getElementsByTagName('select')[0]
const options = document.getElementsByClassName('options')
const mainBox = document.getElementsByClassName('mainBox')[0]
let totalBeats = Number(timeSig.value.split('/')[0])
let resetCounter
let noteType = 4
let currentTimSig = timeSig.value
let displayMaxWidth = 90
let beat=0
let numCountInterval
let tempChangeInterval

//default BPM so page doesn't go crazy:
mainInput.value = '100'


//to add onclick to each time signature:
let arrOptions = [options[0], options[1], options[2], options[3]]
arrOptions.forEach(element => {
    element.addEventListener('click', ()=>{
        //clearInterval(numCountInterval)
        numCounter()
    })
});


//////////////////////VIEW:

viewUpdate = ()=>{
    document.addEventListener('click', ()=>{
        if (document.activeElement.id == "raiseBtn" || document.activeElement.id == "lowerBtn"){
            mainInput.value = mainNum.toString()
            //clearInterval(numCountInterval)
            numCounter()
        }
        else if (document.activeElement.id == "mainInput"){
            clearInterval(numCountInterval)
            outputArea.innerHTML = 'updating...'
            inputChecker = setInterval(() => {
                if (document.activeElement.id != "mainInput"){
                    numCounter()
                    clearInterval(inputChecker)
                }
            }, 200);
        }

    })
}
viewUpdate()

numCounter = ()=>{
    clearInterval(numCountInterval)
    let millisecs = (1000*60)/mainNum

    //array with number of beats:
    let arr1 = [1, 2, 3, 4, 5, 6, 7, 8]

    //cycles through array:
    let numCycler = 0
    numCountInterval = setInterval(() => {
        if (numCycler == totalBeats) numCycler = 0
        lightFlasher(arr1[numCycler], millisecs)
        outputArea.innerHTML = arr1[numCycler]
        numCycler++
        console.log('count')
    }, millisecs);
}
numCounter()

lightFlasher = (currentBeat, milli)=>{
    setTimeout(() => {
       if (currentBeat == 1){
        display.style.backgroundColor = 'rgba(213, 51, 36, 0.8)'
        }
        else {
            display.style.backgroundColor = 'rgba(109, 202, 213, 0.8)'
        }
    }, milli/2);
    display.style.backgroundColor = ''
}

/////////////////////CONTROLLER:




tempoChange = ()=>{
    let arr1 = [raiseBtn, lowerBtn]
    arr1.forEach(element => {
        element.addEventListener('click', ()=>{
                if (element.id == 'lowerBtn' && mainNum>0){
                    mainNum-=1
                    console.log('lowered time')
                }
                else if (element.id == 'raiseBtn' && mainNum<1000){
                    mainNum+=1
                    console.log('raised time')
                }
        })
    });
}
tempoChange()

timSigChange = ()=>{
    arrOptions.forEach(element => {
        element.addEventListener('click', ()=>{
            totalBeats = Number(element.value.split('/')[0])
            noteType = Number(element.value.split('/')[1])
            console.log(`${totalBeats} beats, ${noteType} is note type`)
        })
    });
}
timSigChange()

manTempChange = ()=>{
    //interval for active input area...
    mainInput.addEventListener('click', ()=>{
        let tempValue
        let tempNum = 0
        console.log('input clicked')
        document.addEventListener('click', ()=>{
            if (document.activeElement.id!='mainInput'){
                mainNum = Number(mainInput.value)
                clearInterval(inputTimer)
            }
        })
        //to listen out for input area being idle:
        let inputTimer = setInterval(() => {
            if (tempValue == mainInput.value) tempNum++
            else if (tempValue!=mainInput.value) {
                tempValue = mainInput.value
                tempNum = 0
            }
            if (tempNum == 6){
                clearInterval(inputTimer)
                console.log('interval cleared')
                mainNum = Number(mainInput.value)
                document.activeElement.blur()
            }
            console.log(tempNum)
        }, 500);
    })
}
manTempChange()

stopInputInterval = (interval1)=>{
    if (document.activeElement.id != 'mainInput'){clearInterval(interval1)}
}
