﻿//HF Namespace
window.HF = window.HF || {};

//This is a static class that holds game configuration values
HF.config = function()
{
    return {
        //Frame rate in frames per second
        frameRate: 10,

        //0 to 1; 0 represents no dispersion, 1 represents complete dispersion.
        flowDispersionConstant: .2,

        //0 to 1; 1 represents no decay in magnitude, 0 represents complete loss of momentum.
        flowMagnitudeSustain: .01,

        //The size of a hex, corner to corner
        hexSize: 30,

        //The power amount at which a hex will appear fully powered
        hexFullPower: 100,

        //The color used for full power.
        hexFullColor: '#0000FF'

        debug: false
    };
}();