// Helper for toggling CRT screen power effect

// Turn on the CRT monitor and enable scanlines if the flicker checkbox is enabled
function powerOn() {
/*    if ($("#flicker").is(":checked")) {
        $(".crt-effects").addClass("scanlines");
    }*/
    $("#switch").prop("checked", true);
    $(".surround").addClass("on");
    createCookie('power', 1);
}
// Shut off the CRT monitor
function powerOff() {
    $("#switch").prop("checked", false);
    $(".surround").removeClass("on");
    //$(".crt-effects").removeClass("scanlines");
    createCookie('power', 0);
}

// Helper for toggling CRT screen flickering effect
function scanlinesOn() {
    $("#flicker").prop("checked", true);
    $(".crt-effects").addClass("scanlines");
    $(".power-label").addClass("btn-scanlines");
    createCookie('flicker',1);
}
function scanlinesOff() {
    $("#flicker").prop("checked", false);
    $(".crt-effects").removeClass("scanlines");
    $(".power-label").removeClass("btn-scanlines");
    createCookie('flicker',0);
}

// Helper for toggling CRT color theme
function greenTheme() {
    $("#greenTheme").prop("checked", true);
    $("body").addClass("green");
    createCookie('greenTheme',1);
}
function amberTheme() {
    $("#greenTheme").prop("checked", false);
    $("body").removeClass("green");
    createCookie('greenTheme',0);
}

function togglePower() {
    if ($("#switch").prop("checked")) {
        powerOff()
    } else {
        powerOn()
    }
}

function toggleScanlines() {
    //if ($("#flicker").is(":checked") && $("#switch-wrap").hasClass("on")) {
    if ($("#flicker").is(":checked")) {
        scanlinesOff();
    } else {
        scanlinesOn();
    }
}

function toggleTheme() {
    if ($("#greenTheme").is(":checked")) {
        amberTheme();
    } else {
        greenTheme();
    }
}

// Totally pointless, yet somewhat stylish extra 1KB of randomly generated pseudo-encryption bloat
function randomgen() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@^$_@`";

    for( var i=0; i < 1024; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    $(".random").text(text+"^^EXTRA1KBPAGELOADWHYNOT?");
}

// Set a cookie to store prefs
function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// Get a cookie to read prefs
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// Clean up the cookie crumbs
function eraseCookie(name) {
    createCookie(name,"",-1);
}

function readPrefs() {
    var cookiePower=readCookie('power'),
        cookieFlicker=readCookie('flicker'),
        cookieGreenTheme=readCookie('greenTheme');

    if (cookiePower == 0) { powerOff() } else { powerOn() }
    if (cookieFlicker == 0) { scanlinesOff() } else {} //scanlinesOn() }
    if (cookieGreenTheme == 0) { amberTheme() } else { greenTheme() }

    console.log("cookiePower=="+cookiePower+" /// cookieFlicker=="+cookieFlicker+" /// cookieGreenTheme=="+cookieGreenTheme);
}

$(document).ready(function () {
    readPrefs(); // Read site preferences (flicker, colour, etc.)
    randomgen(); // Add 1KB to the page for that A E S T H E T I C look
    setInterval(randomgen, 300000); // Regenerate the fake encrypted string in footer every 5 minutes because why not?

    $(".surround").on('click', togglePower);
//    $(".power-label").on('click',toggleScanlines);
    $(".theme-button").on('click', toggleTheme);
});
