//MODEL:
const display = document.getElementById('display')
const raiseBtn = document.getElementById('raiseBtn')
const lowerBtn = document.getElementById('lowerBtn')
const mainInput = document.getElementById('mainInput')
let mainNum = Number(mainInput.value)
const outputArea = document.getElementById('outputArea')
const timeSig = document.getElementsByTagName('select')[0]
const options = document.getElementsByClassName('options')
let currentBeat = 4
let currentTimSig = timeSig.value
let displayMaxWidth = 90
let beat=0

//VIEW:

//CONTROLLER:
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
    let arr1 = [options[0], options[1], options[2], options[3]]
    arr1.forEach(element => {
        element.addEventListener('click', ()=>{
            totalBeats = Number(element.value.split('/')[0])
            console.log(`${totalBeats} beats`)
        })
    });
}
timSigChange()

manTempChange = ()=>{
    //interval for active input area...
    mainInput.addEventListener('click', ()=>{
        console.log('input clicked')
        interval1 = setInterval(() => {
            mainNum = Number(mainInput.value)
            console.log('interval active')
            stopInputInterval(interval1)
        }, 500);
    })
}
manTempChange()

stopInputInterval = (interval1)=>{
    if (document.activeElement.id != 'mainInput'){clearInterval(interval1)}
}
