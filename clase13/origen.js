const randChanelNum = ()=> Math.floor(Math.random()*(255+1))

class RGB{
    create(){
        const color = `rgb(${randChanelNum()},${randChanelNum()},${randChanelNum()})`
        return color
    }
}
const rgb = new RGB()

console.log(rgb.create())