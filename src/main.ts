const [centerX, centerY] = [display.contentCenterX, display.contentCenterY]

let player = display.newRect(centerX, centerY, 50, 50)

Runtime.addEventListener(Runtime, "key", function(e: any){
    if (e.keyName == "up") {
        player.y -= 5
        player.x += 5
    }
})