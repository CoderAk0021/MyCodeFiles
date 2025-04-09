let hrs = document.querySelector(".hrs input")
let min = document.querySelector(".min input")
let sec = document.querySelector(".sec input")
let startBtn = document.querySelectorAll(".btn button")[2]
let pauseBtn = document.querySelectorAll(".btn button")[0]
let resetBtn = document.querySelectorAll(".btn button")[1]
let hrsInc = document.querySelectorAll(".hrs span")[0]
let hrsDec = document.querySelectorAll(".hrs span")[1]
let secInc = document.querySelectorAll(".sec span")[0]
let secDec = document.querySelectorAll(".sec span")[1]
let minInc = document.querySelectorAll(".min span")[0]
let minDec = document.querySelectorAll(".min span")[1]


pauseBtn.style.pointerEvents="none"

startBtn.addEventListener("click",start)
pauseBtn.addEventListener("click",pause)
resetBtn.addEventListener("click",reset)
let timer
function start(){
  if(hrs.value == 0 && sec.value == 0 && min.value == 0)
  {
    hrs.style.borderColor="red"
    sec.style.borderColor="red"
    min.style.borderColor="red"
    hrs.style.backgroundColor = "#FD00003B"
    sec.style.backgroundColor = "#FD00003B"
    min.style.backgroundColor = "#FD00003B"
  }
  if(hrs.value != 0 || min.value != 0 || sec.value != 0)
  {
    hrsInc.style.pointerEvents = "none"
    secInc.style.pointerEvents = "none"
    minInc.style.pointerEvents = "none"
    hrsDec.style.pointerEvents = "none"
    secDec.style.pointerEvents = "none"
    min.style.pointerEvents = "none"
    pauseBtn.style.pointerEvents="initial"
    startBtn.style.pointerEvents="none"
    startBtn.innerHTML="Start"
     timer = setInterval(()=>{
     if(sec.value !== 0)
     {
      sec.value--;
      sec.value = sec.value <= 9 ? "0" + sec.value : sec.value
     }
     if(sec.value == 0 && min.value != 0)
     {
       min.value--
       min.value = min.value <= 9 ? "0" + min.value : min.value
       sec.value = 59
     }
     if(min.value == 0 && hrs.value !=0)
     {
       hrs.value--;
       hrs.value = hrs.value <= 9 ? "0" + hrs.value : hrs.value
       min.value = 59
     }
     if(min.value == 0 && hrs.value == 0 && sec.value == 0)
     {
       reset();
     }
    },1000)
  }
  if(sec.value == "")
  {
    sec.style.backgroundColor="#FD00003B"
    sec.style.borderColor="red"
  }
  if (min.value == "")
  {
    min.style.backgroundColor = "#FD00003B"
    min.style.borderColor = "red"
  }
  if (hrs.value == "")
  {
    hrs.style.backgroundColor = "#FD00003B"
    hrs.style.borderColor = "red"
  }
}

hrsInc.addEventListener("click",change)
secInc.addEventListener("click",change)
minInc.addEventListener("click",change)

function change(){
  if(hrs.value != "")
  {
    hrs.style.backgroundColor="#0094FD42"
    hrs.style.borderColor="#2AA6FF"
  }
if(sec.value != "")
  {
    sec.style.backgroundColor="#0094FD42"
    sec.style.borderColor="#2AA6FF"
  }
  if(min.value != "")
  {
    min.style.backgroundColor="#0094FD42"
    min.style.borderColor="#2AA6FF"
  }
   
  
}
hrs.value = "0" + 0
min.value = "0" + 0
sec.value = "0" + 0

hrsInc.addEventListener("click",()=>{
  if(hrs.value < 60)
  {
  hrs.value++ ;
  hrs.value = hrs.value <= 9 ? "0" + hrs.value : hrs.value
  }
  
})

minInc.addEventListener("click", () => {
  if (min.value < 60)
  {
    min.value++;
    min.value = min.value <= 9 ? "0" + min.value : min.value
  }
  
})
secInc.addEventListener("click", () => {
  if (sec.value < 60)
  {
    sec.value++;
    sec.value = sec.value <= 9 ? "0" + sec.value : sec.value
  }
  
})


hrsDec.addEventListener("click", () => {
  if (hrs.value >= 1)
  {
    hrs.value--;
    hrs.value = hrs.value <= 9 ? "0" + hrs.value : hrs.value
  }
})

minDec.addEventListener("click", () => {
  if (min.value >= 1)
  {
    min.value--;
    min.value = min.value <= 9 ? "0" + min.value : min.value
  }
})
secDec.addEventListener("click", () => {
  if (sec.value >= 1)
  {
    sec.value--;
    sec.value = sec.value <= 9 ? "0" + sec.value : sec.value
  }
})


function pause(){
  clearInterval(timer)
  startBtn.innerHTML="continue"
  pauseBtn.style.pointerEvents="none"
  startBtn.style.pointerEvents="initial"
}

function reset(){
  clearInterval(timer)
  min.value = 0 + "0"
  sec.value = 0 + "0"
  hrs.value = 0 + "0"
  hrs.style.backgroundColor = "#fff"
  hrs.style.borderColor = "black"
  sec.style.backgroundColor = "#fff"
  sec.style.borderColor = "black"
  min.style.backgroundColor = "#fff"
  min.style.borderColor = "black"
  hrsInc.style.pointerEvents = "initial"
  secInc.style.pointerEvents = "initial"
  minInc.style.pointerEvents = "initial"
  hrsDec.style.pointerEvents = "initial"
  secDec.style.pointerEvents = "initial"
  min.style.pointerEvents = "initial"
  startBtn.innerHTML="Start"
  startBtn.style.pointerEvents="initial"
}
