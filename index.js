let inputHex = document.getElementById("hex-el")
let inputColor = document.getElementById("input-color")
let sliderBar = document.getElementById("slider-el")
let sliderText = document.getElementById("slider-text")
let alterInputColor = document.getElementById('alter-color')
let alteredColorText = document.getElementById('alter-text')
let lightenText = document.getElementById('lightenText')
let darkenText = document.getElementById('darkenText')
let toggleBtn = document.getElementById('toggleBtn')

const isValidHex = (hex) => {
    if(!hex) return false

    const strippedHex = hex.replace("#", "")
    return strippedHex.length === 3 || strippedHex.length === 6
}

inputHex.addEventListener("keyup", () => {
    const hex = inputHex.value
    if(!isValidHex(hex)) return

    const strippedHex = hex.replace("#", "")

    inputColor.style.backgroundColor = "#" + strippedHex
    reset()
})


const convertHexToRgb = (hex) => {
    if(!isValidHex(hex)) return null

    let strippedHex = hex.replace("#", "")

    if(strippedHex.length === 3){
        strippedHex = strippedHex[0] + strippedHex[0]
        + strippedHex[1] + strippedHex[1]
        + strippedHex[2] + strippedHex[2]
    }

    const r = parseInt(strippedHex.substring(0,2), 16)
    const g = parseInt(strippedHex.substring(2,4), 16)
    const b = parseInt(strippedHex.substring(4,6), 16)


    return {r,g,b}
}

const convertRgbToHex = (r,g,b) => {
    const firstPair = ("0" + r.toString(16)).slice(-2)
    const secondPair = ("0" + g.toString(16)).slice(-2)
    const thirdPair  = ("0" + b.toString(16)).slice(-2)

    const hex = "#" + firstPair + secondPair + thirdPair
    return hex
}


sliderBar.addEventListener("input", () => {

    if(!isValidHex(inputHex.value)) return


    sliderText.textContent = sliderBar.value + "%"

    const valueAddition  = 
    toggleBtn.classList.contains('toggled') ? -(sliderBar.value) : sliderBar.value;

    const alteredHex = alterColor(inputHex.value, valueAddition)
    alterInputColor.style.backgroundColor = alteredHex
    alteredColorText.textContent = `Altered Color ${alteredHex}`
})


const alterColor = (hex, percentage) => {
    const {r,g,b} = convertHexToRgb(hex)

    const amount = Math.floor((percentage/100)*255)

    const newR = increaseBetween0To255(r, amount)
    const newG = increaseBetween0To255(g, amount)
    const newB = increaseBetween0To255(b, amount)

    return convertRgbToHex(newR, newG, newB)
}


const increaseBetween0To255 = (hex, amount) => {
    // const newHex = hex + amount
    // if(newHex>255) return 255
    // if(newHex<0) return 0
    // else return newHex
    return Math.min(255, Math.max(0, hex + amount));
}


toggleBtn.addEventListener("click" , () => {
    if(toggleBtn.classList.contains('toggled')){
        toggleBtn.classList.remove('toggled')
        lightenText.classList.remove('unselected')
        darkenText.classList.add('unselected')
    }
    else{
        toggleBtn.classList.add('toggled')
        lightenText.classList.add('unselected')
        darkenText.classList.remove('unselected')
    }
    reset()
})


const reset = () => {
    sliderBar.value = 0
    sliderText.innerText = `0%`
    alterInputColor.style.backgroundColor = inputHex.value
    alteredColorText.textContent = `Altered Color ${inputHex.value}`
}