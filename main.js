const display = document.getElementById('display')
const raiseBtn = document.getElementById('raiseBtn')
const lowerBtn = document.getElementById('lowerBtn')
const mainInput = document.getElementById('mainInput')
const outputArea = document.getElementById('outputArea')
const timeSig = document.getElementsByTagName('select')[0]
let currentBpm = Number(mainInput.value)
let totalBeats = 4
let displayMaxWidth = 90
let beat=0

pageUpdate = setInterval(() => {
    function timeSignature(){
        if (timeSig.value == '4/4') totalBeats = 4
        else if (timeSig.value == '2/4') totalBeats = 2
        else if (timeSig.value == '3/4') totalBeats = 3
        else if (timeSig.value == '5/4') totalBeats = 5
    }
    timeSignature()
    //console.log('update')
}, 1000);

function mainInt(currentBpm){
    return 1000*(60/currentBpm)
}

function lightFlash(beat){
    setTimeout(() => {
        if (beat==1){
            display.style.backgroundColor = 'rgb(222, 84, 84)'
        }
        else display.style.backgroundColor = 'rgb(204, 224, 255)'
    }, 100);
    display.style.backgroundColor = ''
}

function displaySize(beat){
    let percent = displayMaxWidth/beat
    display.style.width = `${percent}%`
}

mainInterval = setInterval(() => {
    let arr1 = [1, 2, 3, 4, 5]
    if (beat==totalBeats) beat=0

    outputArea.innerHTML = arr1[beat]
    beat++
    //console.log(currentBpm)

    lightFlash(beat)
    displaySize(beat)
}, mainInt(currentBpm));

function inputChanger(){
    raiseBtn.addEventListener('click', ()=>{
        currentBpm+=1
        mainInput.value = currentBpm.toString()
        clearInterval(mainInterval)
    })
    lowerBtn.addEventListener('click', ()=>{
        currentBpm-=1
        mainInput.value = currentBpm.toString()
        clearInterval(mainInterval)
    })
}
inputChanger()
