local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 1,["5"] = 3,["6"] = 5,["7"] = 5,["8"] = 5,["9"] = 5,["10"] = 6,["11"] = 7,["13"] = 5,["14"] = 5,["15"] = 11,["16"] = 12});
centerX, centerY = display.contentCenterX, display.contentCenterY
player = display.newRect(centerX, centerY, 50, 50)
Runtime.addEventListener(
    Runtime,
    "key",
    function(e)
        if e.keyName == "up" then
            player.y = player.y - 5
        end
    end
)
