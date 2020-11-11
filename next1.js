let phase = 1;
let phase1;
let phase2;
let phase3;
let finalColorH;
let finalColorS;
let finalColorL;


$("#canvas").css("width", window.innerWidth);
$("#canvas").css("height", window.innerHeight);
$("#canvas").attr("width", window.innerWidth);
$("#canvas").attr("height", window.innerHeight);
$("#whichContainer").css("height", window.innerHeight);
$("#satContainer").css("height", window.innerHeight);
$("#temperContainer").css("height", window.innerHeight);
$("#lastContainer").css("height", window.innerHeight);
$("#hueContainer").css("height", window.innerHeight);
$(window).resize(function () {
    $("#canvas").css("width", window.innerWidth);
    $("#canvas").css("height", window.innerHeight);
    $("#canvas").attr("width", window.innerWidth);
    $("#canvas").attr("height", window.innerHeight);
    $("#whichContainer").css("height", window.innerHeight);
    $("#satContainer").css("height", window.innerHeight);
    $("#temperContainer").css("height", window.innerHeight);
    $("#lastContainer").css("height", window.innerHeight);
    $("#hueContainer").css("height", window.innerHeight);
});

requestAnimationFrame(mainDraw);

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
$("body").append('<div id="whichContainer"><h1 id="which">どちらの色を使いたい？</h1></div>');
$("#whichContainer").css("height", window.innerHeight);
$("#which").fadeIn(1200).fadeOut(1200).queue(function () {
    $("#whichContainer").remove();
    requestAnimationFrame(drawBrightness);
});
let brightnessCount = 0;
let brightnessMiddle = window.innerWidth / 2;
let brightnessMoveFinished = false;
let saturationCount = 0;
let saturationMiddle = window.innerWidth / 2;
let saturationMoveFinished = false;
let temperCount = 0;
let temperMiddle = window.innerWidth / 2;
let temperMoveFinished = false;


function drawBrightness() {
    let moveSpeed = 20;
    brightnessCount += 1;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.fillStyle = "lightpink";
    if (window.innerWidth / (moveSpeed * 2) * brightnessCount > window.innerWidth / 2) {
        context.rect(0, 0, window.innerWidth / 2, window.innerHeight);
    } else {
        context.rect(0, 0, window.innerWidth / (moveSpeed * 2) * brightnessCount, window.innerHeight);
    }
    context.closePath();
    context.fill();
    context.beginPath();
    context.fillStyle = "rebeccapurple";
    if (window.innerWidth / (moveSpeed * 2) * brightnessCount > window.innerWidth / 2) {
        context.rect(window.innerWidth / 2, 0, window.innerWidth, window.innerHeight);
    } else {
        context.rect(window.innerWidth - (window.innerWidth / (moveSpeed * 2) * brightnessCount), 0, window.innerWidth, window.innerHeight);
    }
    context.closePath();
    context.fill();
    if (brightnessCount > moveSpeed) {
        brightnessCount = 0;
        brightnessMoveFinished = true;
        requestAnimationFrame(mainDraw);
        $("#svgBright").fadeIn(1200);
        $("#svgDark").fadeIn(1200);
    } else {
        requestAnimationFrame(drawBrightness);
    }
}

function drawSaturation() {
    let moveSpeed = 20;
    saturationCount += 1;
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (phase1 == 2) {
        context.fillStyle = "black";
        context.beginPath();
        context.rect(0, 0, window.innerWidth, window.innerHeight);
        context.closePath();
        context.fill();
    }
    context.beginPath();
    context.fillStyle = "#fecbff";
    if (window.innerWidth / (moveSpeed * 2) * saturationCount > window.innerWidth / 2) {
        context.rect(0, 0, window.innerWidth / 2, window.innerHeight);
    } else {
        context.rect(0, 0, window.innerWidth / (moveSpeed * 2) * saturationCount, window.innerHeight);
    }
    context.closePath();
    context.fill();
    context.beginPath();
    context.fillStyle = "#453745";
    if (window.innerWidth / (moveSpeed * 2) * saturationCount > window.innerWidth / 2) {
        context.rect(window.innerWidth / 2, 0, window.innerWidth, window.innerHeight);
    } else {
        context.rect(window.innerWidth - (window.innerWidth / (moveSpeed * 2) * saturationCount), 0, window.innerWidth, window.innerHeight);
    }
    context.closePath();
    context.fill();
    if (saturationCount > moveSpeed) {
        saturationCount = 0;
        saturationMoveFinished = true;
        $("#svgHigh").fadeIn(1200);
        $("#svgLow").fadeIn(1200);
    } else {
        requestAnimationFrame(drawSaturation);
    }
}

function drawTemper() {
    let moveSpeed = 20;
    temperCount += 1;
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (phase2 == 1) {
        context.fillStyle = "#fecbff";
        context.beginPath();
        context.rect(0, 0, window.innerWidth, window.innerHeight);
        context.closePath();
        context.fill();
    } else if (phase2 == 2) {
        context.fillStyle = "#453745";
        context.beginPath();
        context.rect(0, 0, window.innerWidth, window.innerHeight);
        context.closePath();
        context.fill();
    }
    context.beginPath();
    context.fillStyle = "orange";
    if (window.innerWidth / (moveSpeed * 2) * temperCount > window.innerWidth / 2) {
        context.rect(0, 0, window.innerWidth / 2, window.innerHeight);
    } else {
        context.rect(0, 0, window.innerWidth / (moveSpeed * 2) * temperCount, window.innerHeight);
    }
    context.closePath();
    context.fill();
    context.beginPath();
    context.fillStyle = "lightblue";
    if (window.innerWidth / (moveSpeed * 2) * temperCount > window.innerWidth / 2) {
        context.rect(window.innerWidth / 2, 0, window.innerWidth, window.innerHeight);
    } else {
        context.rect(window.innerWidth - (window.innerWidth / (moveSpeed * 2) * temperCount), 0, window.innerWidth, window.innerHeight);
    }
    context.closePath();
    context.fill();
    if (temperCount > moveSpeed) {
        temperCount = 0;
        temperMoveFinished = true;
        $("#svgWarm").fadeIn(1200);
        $("#svgCold").fadeIn(1200);
    } else {
        requestAnimationFrame(drawTemper);
    }
}
let colorHArray = [];
let colorSArray = [];
let colorVArray = [];
let colorPositionArrayX = [];
let colorPositionArrayY = [];
let colorRadiusArray = [];
for (let i = 0; i < 24; i++) {
    colorRadiusArray.push(0);
}
let drawHueCount = 0;
let drawHueFinished = false;

function drawHue() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (phase3 == 1) {
        context.fillStyle = "orange";
    } else if (phase3 == 2) {
        context.fillStyle = "lightblue";
    }
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.closePath();
    context.fill();
    drawHueCount += 1;
    context.fillStyle = "white";
    context.beginPath();
    context.arc(window.innerWidth / 2, window.innerHeight / 2, drawHueCount * 20, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
    if (drawHueCount * 20 > window.innerWidth * 0.8) {
        drawHueFinished = true;
    }
    for (let i = 0; i < 24; i++) {
        if (colorRadiusArray[i] < 80) {
            colorRadiusArray[i] += 7;
        } else if (colorRadiusArray[i] > 80) {
            colorRadiusArray[i] -= 1;
        }
        if (drawHueCount < 120) {
            context.globalAlpha = drawHueCount / 10;
        }
        context.fillStyle = "hsl(" + colorHArray[i] + "," + colorSArray[i] + "%," + colorVArray[i] + "%)";
        let temprgb = hsvToRgb(colorHArray[i], colorSArray[i] / 100, colorVArray[i] / 100);
        context.fillStyle = code(temprgb[0], temprgb[1], temprgb[2]);
        context.beginPath();
        context.arc(colorPositionArrayX[i], colorPositionArrayY[i], colorRadiusArray[i], 0, Math.PI * 2, false);
        context.closePath();
        context.fill();
    }
    if (drawHueFinished == false) {
        requestAnimationFrame(drawHue);
    } else {
        console.log("hello");
    }
}

let enlargeBright = false;
let enlargeDark = false;
let enlargeHigh = false;
let enlargeLow = false;
let enlargeWarm = false;
let enlargeCold = false;
let colorSelected;
$("body").on("mousemove", function (e) {
    hozonnX = e.clientX;
    hozonnY = e.clientY;
    if (phase == 1) {
        if (brightnessMoveFinished == true) {
            if (e.clientX < brightnessMiddle) {
                enlargeBright = true;
                enlargeDark = false;
            } else if (e.clientX > brightnessMiddle) {
                enlargeBright = false;
                enlargeDark = true;
            } else {
                enlargeBright = false;
                enlargeDark = false;
            }
        }
    } else if (phase == 2) {
        if (saturationMoveFinished == true) {
            if (e.clientX < saturationMiddle) {
                enlargeHigh = true;
                enlargeLow = false;
            } else if (e.clientX > saturationMiddle) {
                enlargeHigh = false;
                enlargeLow = true;
            } else {
                enlargeHigh = false;
                enlargeLow = false;
            }
        }
    } else if (phase == 3) {
        if (temperMoveFinished == true) {
            if (e.clientX < temperMiddle) {
                enlargeWarm = true;
                enlargeCold = false;
            } else if (e.clientX > temperMiddle) {
                enlargeWarm = false;
                enlargeCold = true;
            } else {
                enlargeWarm = false;
                enlargeCold = false;
            }
        }
    } else if (phase == 4) {

    }
});

let finalColorSelected = false;


let hozonnX = 0;
let hozonnY = 0;

let brightArray = [];
let darkArray = [];
let brightLengthArray = [];
let darkLengthArray = [];
for (let i = 0; i < 20; i++) {
    brightArray.push(Math.random() * Math.PI * 2);
    darkArray.push(Math.random() * Math.PI * 2);
    brightLengthArray.push(0);
    darkLengthArray.push(100);
}
let highArray = [];
let lowArray = [];
let highLengthArray = [];
let lowLengthArray = [];
for (let i = 0; i < 20; i++) {
    highArray.push(Math.random() * window.innerWidth * 0.7);
    lowArray.push(window.innerWidth * 0.3 + Math.random() * window.innerWidth * 0.7);
    highLengthArray.push(window.innerHeight);
    lowLengthArray.push(0);
}
let warmArrayX = [];
let warmArrayY = [];
let coldArrayX = [];
let coldArrayY = [];
for (let i = 0; i < 50; i++) {
    warmArrayX.push(Math.random() * window.innerWidth * 0.7);
    warmArrayY.push(Math.random() * window.innerHeight);
    coldArrayX.push(window.innerWidth * 0.3 + Math.random() * window.innerWidth * 0.7);
    coldArrayY.push(Math.random() * window.innerHeight);
}

let centerXB = brightnessMiddle / 2;
let centerY = window.innerHeight / 2;
let centerXD = window.innerWidth - (window.innerWidth - brightnessMiddle) / 2;

function mainDraw() {
    if (phase == 1) {
        if (brightnessMoveFinished == true) {
            $("#svgBright").css("width", brightnessMiddle);
            $("#svgDark").css("width", window.innerWidth - brightnessMiddle);
            $("#svgDark").css("left", brightnessMiddle);
            $("#svgDark").css("top", window.innerHeight - (window.innerWidth - brightnessMiddle) * 243.6 / 598.5);
            centerXB = brightnessMiddle / 2;
            centerY = window.innerHeight / 2;
            centerXD = window.innerWidth - (window.innerWidth - brightnessMiddle) / 2;
            context.clearRect(0, 0, window.innerWidth, window.innerHeight);
            if (enlargeBright == true) {
                if (brightnessMiddle < window.innerWidth * 0.7) {
                    brightnessMiddle += 40;
                }
            }
            if (enlargeDark == true) {
                if (brightnessMiddle > window.innerWidth * 0.3) {
                    brightnessMiddle -= 40;
                }
            }
            context.beginPath();
            context.fillStyle = "lightpink";
            context.rect(0, 0, brightnessMiddle, window.innerHeight);
            context.closePath();
            context.fill();
            context.beginPath();
            context.fillStyle = "rebeccapurple";
            context.rect(brightnessMiddle, 0, window.innerWidth, window.innerHeight);
            context.closePath();
            context.fill();
            if (enlargeBright == true) {
                context.strokeStyle = "white";
                for (let i = 0; i < brightLengthArray.length; i++) {
                    context.beginPath();
                    context.fillStyle = "white";
                    context.lineWidth = 5;
                    context.moveTo(centerXB + Math.cos(brightArray[i]) * brightLengthArray[i], centerY + Math.sin(brightArray[i]) * brightLengthArray[i]);
                    context.lineTo(centerXB + Math.cos(brightArray[i]) * brightLengthArray[i] * 2, centerY + Math.sin(brightArray[i]) * brightLengthArray[i] * 2);
                    context.closePath();
                    context.stroke();
                }
            }
            if (enlargeDark == true) {
                context.strokeStyle = "black";
                for (let i = 0; i < darkLengthArray.length; i++) {
                    context.beginPath();
                    context.fillStyle = "white";
                    context.lineWidth = 5;
                    context.moveTo(centerXD + Math.cos(darkArray[i]) * darkLengthArray[i], centerY + Math.sin(darkArray[i]) * darkLengthArray[i]);
                    context.lineTo(centerXD + Math.cos(darkArray[i]) * darkLengthArray[i] / 2, centerY + Math.sin(darkArray[i]) * darkLengthArray[i] / 2);
                    context.closePath();
                    context.stroke();
                }
            }
            context.beginPath();
            context.fillStyle = "white";
            context.arc(centerXB, centerY, 25, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
            context.beginPath();
            context.fillStyle = "black";
            context.arc(centerXD, centerY, 25, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();

            brightArray.push(Math.random() * Math.PI * 2);
            darkArray.push(Math.random() * Math.PI * 2);
            brightArray.shift();
            darkArray.shift();
            brightLengthArray.push(0);
            darkLengthArray.push(80);
            brightLengthArray.shift();
            darkLengthArray.shift();
            for (let i = 0; i < brightLengthArray.length; i++) {
                brightLengthArray[i] += 1.8;
            }
            for (let i = 0; i < darkLengthArray.length; i++) {
                darkLengthArray[i] -= 1.8;
            }
        }
    } else if (phase == 2) {
        if (saturationMoveFinished == true) {
            $("#svgHigh").css("width", saturationMiddle);
            $("#svgLow").css("width", window.innerWidth - saturationMiddle);
            $("#svgLow").css("left", saturationMiddle);
            $("#svgLow").css("top", window.innerHeight - (window.innerWidth - saturationMiddle) * 232.2 / 537.6);
            context.clearRect(0, 0, canvas.width, canvas.height);
            if (enlargeHigh == true) {
                if (saturationMiddle < window.innerWidth * 0.7) {
                    saturationMiddle += 40;
                }
            }
            if (enlargeLow == true) {
                if (saturationMiddle > window.innerWidth * 0.3) {
                    console.log("test");
                    saturationMiddle -= 40;
                }
            }
            context.beginPath();
            context.fillStyle = "#fecbff";
            context.rect(0, 0, saturationMiddle, window.innerHeight);
            context.closePath();
            context.fill();
            context.beginPath();
            context.fillStyle = "#453745";
            context.rect(saturationMiddle, 0, window.innerWidth, window.innerHeight);
            context.closePath();
            context.fill();
            if (enlargeHigh == true) {
                context.strokeStyle = "white";
                for (let i = 0; i < highLengthArray.length; i++) {
                    context.beginPath();
                    context.fillStyle = "white";
                    context.lineWidth = 5;
                    context.moveTo(highArray[i], highLengthArray[i]);
                    context.lineTo(highArray[i], highLengthArray[i] * 0.8);
                    context.closePath();
                    context.stroke();
                }
            }
            if (enlargeLow == true) {
                context.strokeStyle = "gray";
                for (let i = 0; i < lowLengthArray.length; i++) {
                    context.beginPath();
                    context.fillStyle = "gray";
                    context.lineWidth = 5;
                    context.moveTo(lowArray[i], lowLengthArray[i]);
                    context.lineTo(lowArray[i], lowLengthArray[i] * 1.2);
                    context.closePath();
                    context.stroke();
                }
            }
            highArray.push(Math.random() * window.innerWidth * 0.7);
            lowArray.push(window.innerWidth * 0.3 + Math.random() * window.innerWidth * 0.7);
            highArray.shift();
            lowArray.shift();
            highLengthArray.push(window.innerHeight);
            lowLengthArray.push(0);
            highLengthArray.shift();
            lowLengthArray.shift();
            for (let i = 0; i < highLengthArray.length; i++) {
                highLengthArray[i] -= 20;
            }
            for (let i = 0; i < lowLengthArray.length; i++) {
                lowLengthArray[i] += 20;
            }
        }
    } else if (phase == 3) {
        if (temperMoveFinished == true) {
            $("#svgWarm").css("width", temperMiddle);
            $("#svgCold").css("width", window.innerWidth - temperMiddle);
            $("#svgCold").css("left", temperMiddle);
            $("#svgCold").css("top", window.innerHeight - (window.innerWidth - temperMiddle) * 232.2 / 537.6);
            context.clearRect(0, 0, canvas.width, canvas.height);
            if (enlargeWarm == true) {
                if (temperMiddle < window.innerWidth * 0.7) {
                    temperMiddle += 40;
                }
            }
            if (enlargeCold == true) {
                if (temperMiddle > window.innerWidth * 0.3) {
                    temperMiddle -= 40;
                }
            }
            context.beginPath();
            context.fillStyle = "orange";
            context.rect(0, 0, temperMiddle, window.innerHeight);
            context.closePath();
            context.fill();
            context.beginPath();
            context.fillStyle = "lightblue";
            context.rect(temperMiddle, 0, window.innerWidth, window.innerHeight);
            context.closePath();
            context.fill();
            if (enlargeWarm == true) {
                for (let i = 0; i < warmArrayX.length; i++) {
                    context.beginPath();
                    context.fillStyle = "red";
                    context.rect(warmArrayX[i], warmArrayY[i], 5, 5);
                    context.closePath();
                    context.fill();
                }
            }
            if (enlargeCold == true) {
                for (let i = 0; i < coldArrayX.length; i++) {
                    context.beginPath();
                    context.fillStyle = "white";
                    context.arc(coldArrayX[i], coldArrayY[i], 2.5, 0, Math.PI * 2, false);
                    context.closePath();
                    context.fill();
                }
            }
            warmArrayX.push(Math.random() * window.innerWidth * 0.7);
            coldArrayX.push(window.innerWidth * 0.3 + Math.random() * window.innerWidth * 0.7);
            warmArrayX.shift();
            coldArrayX.shift();
            warmArrayY.push(Math.random() * window.innerHeight);
            coldArrayY.push(Math.random() * window.innerHeight);
            warmArrayY.shift();
            coldArrayY.shift();
        }
    } else if (phase == 4) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < 24; i++) {
            if (Math.pow(hozonnX - colorPositionArrayX[i], 2) + Math.pow(hozonnY - colorPositionArrayY[i], 2) < Math.pow(colorRadiusArray[i], 2)) {
                colorSelected = i;
            }
        }
        for (let i = 0; i < 24; i++) {
            if (colorSelected == i) {
                if (colorRadiusArray[i] < 110) {
                    colorRadiusArray[i] += 3;
                }
            } else {
                if (colorRadiusArray[i] > 80) {
                    colorRadiusArray[i] -= 3;
                }
            }
            let temprgb = hsvToRgb(colorHArray[i], colorSArray[i] / 100, colorVArray[i] / 100);
            context.fillStyle = code(temprgb[0], temprgb[1], temprgb[2]);
            context.beginPath();
            context.arc(colorPositionArrayX[i], colorPositionArrayY[i], colorRadiusArray[i], 0, Math.PI * 2, false);
            context.closePath();
            context.fill();
        }
    } else if (phase == 5) {

    }
    if (finalColorSelected == true) {
        finalColorClearRad += 10;
        context.beginPath();
        let temprgb = hsvToRgb(colorHArray[colorSelected], colorSArray[colorSelected] / 100, colorVArray[colorSelected] / 100);
        context.fillStyle = code(temprgb[0], temprgb[1], temprgb[2]);
        context.arc(colorPositionArrayX[colorSelected], colorPositionArrayY[colorSelected], finalColorClearRad, 0, Math.PI * 2, false);
        context.closePath();
        context.fill();
        context.beginPath();
        context.fillStyle = "white";
        context.arc(colorPositionArrayX[colorSelected], colorPositionArrayY[colorSelected], Math.abs(finalColorClearRad - 100), 0, Math.PI * 2, false);
        context.closePath();
        context.fill();
        context.beginPath();
        temprgb = hsvToRgb(colorHArray[colorSelected], colorSArray[colorSelected] / 100, colorVArray[colorSelected] / 100);
        context.fillStyle = code(temprgb[0], temprgb[1], temprgb[2]);
        context.arc(colorPositionArrayX[colorSelected], colorPositionArrayY[colorSelected], Math.abs(finalColorClearRad - 200), 0, Math.PI * 2, false);
        context.closePath();
        context.fill();
        if (finalColorClearRad > window.innerWidth / 2) {
            phase = 5;
        }
    }
    requestAnimationFrame(mainDraw);
}
let finalColorClearRad = 0;

let clearAnimationBrightRadius = 0;
let clearAnimationDarkRadius = 0;
let clearAnimationHighRadius = [];
let clearAnimationHighX = [];
let clearAnimationHighY = [];
let clearAnimationLowRadius = [];
let clearAnimationLowX = [];
let clearAnimationLowY = [];
let clearAnimationWarmX = [];
let clearAnimationWarmY = [];
let clearAnimationColdX = [];
let clearAnimationColdY = [];
$("body").on("click", function (e) {
    if (phase == 1) {
        phase = 2;
        if (e.clientX < brightnessMiddle) {
            phase1 = 1;
            $("#svgBright").remove();
            $("#svgDark").remove();
            requestAnimationFrame(clearAnimationBright);
        } else {
            phase1 = 2;
            $("#svgBright").remove();
            $("#svgDark").remove();
            requestAnimationFrame(clearAnimationDark);
        }
        $("body").append("<div id='satContainer'><h1 id='sat'>高彩度？低彩度？</h1></div>");
        $("#satContainer").css("height", window.innerHeight);
        $("#sat").fadeIn(1200).fadeOut(1200).queue(function () {
            $("#satContainer").remove();
            requestAnimationFrame(drawSaturation);
        });
    } else if (phase == 2) {
        phase = 3;
        if (e.clientX < saturationMiddle) {
            phase2 = 1;
            $("#svgHigh").remove();
            $("#svgLow").remove();
            requestAnimationFrame(clearAnimationHigh);
        } else {
            phase2 = 2;
            $("#svgHigh").remove();
            $("#svgLow").remove();
            requestAnimationFrame(clearAnimationLow);
        }
        $("body").append("<div id='temperContainer'><h1 id='temper'>暖色系？寒色系？</h1></div>");
        $("#temperContainer").css("height", window.innerHeight);
        $("#temper").fadeIn(1200).fadeOut(1200).queue(function () {
            $("#temperContainer").remove();
            requestAnimationFrame(drawTemper);
        });
    } else if (phase == 3) {
        phase = 4;
        if (e.clientX < temperMiddle) {
            phase3 = 1;
            $("#svgWarm").remove();
            $("#svgCold").remove();
            requestAnimationFrame(clearAnimationWarm);
        } else {
            phase3 = 2;
            $("#svgWarm").remove();
            $("#svgCold").remove();
            requestAnimationFrame(clearAnimationCold);
        }
        //write new phase here
        $("body").append("<div id='lastContainer'><h1 id='last'>最後に・・・</h1></div>");
        $("#lastContainer").css("height", window.innerHeight);
        $("#last").fadeIn(1200).fadeOut(1200).queue(function () {
            $("#lastContainer").remove();
            $("body").append("<div id='hueContainer'><h1 id='hue'>好きな色を一つ選んでください</h1></div>");
            $("#hueContainer").css("height", window.innerHeight);
            $("#hue").fadeIn(1200).fadeOut(1200).queue(function () {
                $("#hueContainer").remove();
                for (let i = 0; i < 24; i++) {
                    if (phase1 == 1) {
                        colorVArray.push(50 + Math.random() * 40);
                    } else if (phase1 == 2) {
                        colorVArray.push(20 + Math.random() * 40);
                    }
                    if (phase2 == 1) {
                        colorSArray.push(60 + Math.random() * 40);
                    } else if (phase2 == 2) {
                        colorSArray.push(20 + Math.random() * 40);
                    }
                    if (phase3 == 1) {
                        if (Math.random() < 0.5) {
                            colorHArray.push(Math.random() * 140);
                        } else {
                            colorHArray.push(360 - Math.random() * 60);
                        }
                    } else if (phase3 == 2) {
                        colorHArray.push(140 + Math.random() * 130);
                    }
                    if (i <= 5) {
                        colorPositionArrayX.push(window.innerWidth * ((i + 1) / 7));
                        colorPositionArrayY.push(window.innerHeight * 1 / 5);
                    } else if (i <= 11) {
                        colorPositionArrayX.push(window.innerWidth * (((i + 1) - 6) / 7));
                        colorPositionArrayY.push(window.innerHeight * 2 / 5);
                    } else if (i <= 17) {
                        colorPositionArrayX.push(window.innerWidth * (((i + 1) - 12) / 7));
                        colorPositionArrayY.push(window.innerHeight * 3 / 5);
                    } else {
                        colorPositionArrayX.push(window.innerWidth * (((i + 1) - 18) / 7));
                        colorPositionArrayY.push(window.innerHeight * 4 / 5);
                    }
                }
                requestAnimationFrame(drawHue);
            });
        });
    } else if (phase == 4) {
        for (let i = 0; i < 24; i++) {
            if (Math.pow(e.clientX - colorPositionArrayX[i], 2) + Math.pow(e.clientY - colorPositionArrayY[i], 2) < Math.pow(colorRadiusArray[i], 2)) {
                finalColorH = colorHArray[i];
                finalColorL = colorVArray[i];
                finalColorS = colorSArray[i];
                finalColorSelected = true;
                $("#mihonn1").css("z-index", 500);
                $("#mihonn1").fadeIn(2400);
                $("#mihonn2").css("z-index", 500);
                $("#mihonn2").fadeIn(2400);
                $("#mihonn3").css("z-index", 500);
                $("#mihonn3").fadeIn(2400);
                $("#mihonn4").css("z-index", 500);
                $("#mihonn4").fadeIn(2400);
                $("#hueNum").css("z-index", 500);
                $("#satNum").css("z-index", 500);
                $("#lumNum").css("z-index", 500);
                //                $("#hueNum").fadeIn(2400);
                //                $("#satNum").fadeIn(2400);
                //                $("#lumNum").fadeIn(2400);
                let finalhslArray = [finalColorH, finalColorS / 100, finalColorL / 100];
                let finalrgbArray = hsvToRgb(finalhslArray[0], finalhslArray[1], finalhslArray[2]);
                finalrgbArray[0] = Math.round(finalrgbArray[0]);
                finalrgbArray[1] = Math.round(finalrgbArray[1]);
                finalrgbArray[2] = Math.round(finalrgbArray[2]);
                finalhslArray[0] = Math.round(finalhslArray[0] * 100) / 100;
                finalhslArray[1] = Math.round(finalhslArray[1] * 100) / 100;
                finalhslArray[2] = Math.round(finalhslArray[2] * 100) / 100;
                let finalhex = code(finalrgbArray[0], finalrgbArray[1], finalrgbArray[2]);
                $("#mihonn1 .cls-1").css("fill", finalhex);
                $("#mihonn2 .cls-1").css("fill", finalhex);
                $("#mihonn3 .cls-1").css("fill", finalhex);
                $("#mihonn4 .cls-1").css("fill", finalhex);

                $("#mainHex").fadeIn(1200);
                $("#mainHex").css("font-size", window.innerWidth / 7);
                $("#mainHex").css("z-index", 600);
                $("#mainHexContainer").css("z-index", 600);
                $("#mainHexContainer").css("height", window.innerHeight / 2);
                $("#mainHex").html(code(finalrgbArray[0], finalrgbArray[1], finalrgbArray[2]));
                $("#mainHexContainer").on("click", function (e) {
                    if (isHex) {
                        $("#mainHex").html("R:" + finalrgbArray[0] + "G:" + finalrgbArray[1] + "B:" + finalrgbArray[2]);
                        $("#mainHex").css("font-size", window.innerWidth / 10);
                        isHex = false;
                    } else {
                        $("#mainHex").html(code(finalrgbArray[0], finalrgbArray[1], finalrgbArray[2]));
                        $("#mainHex").css("font-size", window.innerWidth / 7);
                        isHex = true;
                    }
                });

                let temprgb = [finalrgbArray[0], finalrgbArray[1], finalrgbArray[2]];
                let temphsl = [finalhslArray[0], finalhslArray[1], finalhslArray[2]];
                temphsl[0] = (finalhslArray[0] + 180) % 360;
                temprgb = hsvToRgb(temphsl[0], temphsl[1], temphsl[2]);
                $("#mihonn1 #kyouchou").css("fill", code(temprgb[0], temprgb[1], temprgb[2]));
                $("#mihonn1 .others").css("fill", code(temprgb[0], temprgb[1], temprgb[2]));
                $("#mihonn1 .cls-1").css("stroke", code(temprgb[0], temprgb[1], temprgb[2]));
                $("#mihonn1").on("mouseenter", function (e) {
                    let thsl = [finalhslArray[0], finalhslArray[1], finalhslArray[2]];
                    thsl[0] = (finalhslArray[0] + 180) % 360;
                    let trgb = hsvToRgb(thsl[0], thsl[1], thsl[2]);
                    $("#firstColor").css("opacity", 1);
                    $("#firstColor").css("color", code(trgb[0], trgb[1], trgb[2]));
                    $("#firstColor").css("left", e.clientX);
                    $("#firstColor").css("top", e.clientY);
                    $("#firstColor").html(code(trgb[0], trgb[1], trgb[2]));
                });
                $("#mihonn1").on("mouseleave", function (e) {
                    $("#firstColor").css("opacity", 0);
                });

                temphsl[0] = (finalhslArray[0] + 60) % 360;
                temprgb = hsvToRgb(temphsl[0], temphsl[1], temphsl[2]);
                $("#mihonn2 #kyouchou").css("fill", code(temprgb[0], temprgb[1], temprgb[2]));
                temphsl[0] = (finalhslArray[0] + 330) % 360;
                temprgb = hsvToRgb(temphsl[0], temphsl[1], temphsl[2]);
                $("#mihonn2 .others").css("fill", code(temprgb[0], temprgb[1], temprgb[2]));
                $("#mihonn2 .cls-1").css("stroke", code(temprgb[0], temprgb[1], temprgb[2]));
                $("#mihonn2").on("mouseenter", function (e) {
                    let thsl = [finalhslArray[0], finalhslArray[1], finalhslArray[2]];
                    thsl[0] = (finalhslArray[0] + 330) % 360;
                    let trgb = hsvToRgb(thsl[0], thsl[1], thsl[2]);
                    $("#firstColor").css("opacity", 1);
                    $("#firstColor").css("color", code(trgb[0], trgb[1], trgb[2]));
                    $("#firstColor").css("left", e.clientX);
                    $("#firstColor").css("top", e.clientY);
                    $("#firstColor").html(code(trgb[0], trgb[1], trgb[2]));
                });
                $("#mihonn2").on("mouseleave", function (e) {
                    $("#firstColor").css("opacity", 0);
                });

                temphsl[0] = (finalhslArray[0] + 120) % 360;
                temprgb = hsvToRgb(temphsl[0], temphsl[1], temphsl[2]);
                $("#mihonn3 #kyouchou").css("fill", code(temprgb[0], temprgb[1], temprgb[2]));
                temphsl[0] = (finalhslArray[0] + 240) % 360;
                temprgb = hsvToRgb(temphsl[0], temphsl[1], temphsl[2]);
                $("#mihonn3 .others").css("fill", code(temprgb[0], temprgb[1], temprgb[2]));
                $("#mihonn3 .cls-1").css("stroke", code(temprgb[0], temprgb[1], temprgb[2]));
                $("#mihonn3").on("mouseenter", function (e) {
                    let thsl = [finalhslArray[0], finalhslArray[1], finalhslArray[2]];
                    thsl[0] = (finalhslArray[0] + 240) % 360;
                    let trgb = hsvToRgb(thsl[0], thsl[1], thsl[2]);
                    $("#firstColor").css("opacity", 1);
                    $("#firstColor").css("color", code(trgb[0], trgb[1], trgb[2]));
                    $("#firstColor").css("left", e.clientX);
                    $("#firstColor").css("top", e.clientY);
                    $("#firstColor").html(code(trgb[0], trgb[1], trgb[2]));
                });
                $("#mihonn3").on("mouseleave", function (e) {
                    $("#firstColor").css("opacity", 0);
                });

                temphsl[0] = (finalhslArray[0] + 150) % 360;
                temprgb = hsvToRgb(temphsl[0], temphsl[1], temphsl[2]);
                $("#mihonn4 #kyouchou").css("fill", code(temprgb[0], temprgb[1], temprgb[2]));
                temphsl[0] = (finalhslArray[0] + 210) % 360;
                temprgb = hsvToRgb(temphsl[0], temphsl[1], temphsl[2]);
                $("#mihonn4 .others").css("fill", code(temprgb[0], temprgb[1], temprgb[2]));
                $("#mihonn4 .cls-1").css("stroke", code(temprgb[0], temprgb[1], temprgb[2]));
                $("#mihonn4").on("mouseenter", function (e) {
                    let thsl = [finalhslArray[0], finalhslArray[1], finalhslArray[2]];
                    thsl[0] = (finalhslArray[0] + 210) % 360;
                    let trgb = hsvToRgb(thsl[0], thsl[1], thsl[2]);
                    $("#firstColor").css("opacity", 1);
                    $("#firstColor").css("color", code(trgb[0], trgb[1], trgb[2]));
                    $("#firstColor").css("left", e.clientX);
                    $("#firstColor").css("top", e.clientY);
                    $("#firstColor").html(code(trgb[0], trgb[1], trgb[2]));
                });
                $("#mihonn4").on("mouseleave", function (e) {
                    $("#firstColor").css("opacity", 0);
                });

                $("#hueNum").html("R: " + finalrgbArray[0] + " G: " + finalrgbArray[1] + " B: " + finalrgbArray[2]);
                $("#satNum").html("H: " + finalhslArray[0] + " S: " + finalhslArray[1] + " L: " + finalhslArray[2]);
                $("#lumNum").html("HexCode: " + finalhex);
            }
            colorSelected = i;
        }

    }
});

let isHex = true;

function clearAnimationBright() {
    context.beginPath();
    context.fillStyle = "white";
    context.arc(centerXB, centerY, clearAnimationBrightRadius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
    clearAnimationBrightRadius += 30;
    if (clearAnimationBrightRadius < window.innerWidth) {
        requestAnimationFrame(clearAnimationBright);
    } else {
        clearAnimationBrightRadius = 0;
    }
}

function clearAnimationDark() {
    context.beginPath();
    context.fillStyle = "black";
    context.arc(centerXD, centerY, clearAnimationDarkRadius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
    clearAnimationDarkRadius += 30;
    if (clearAnimationDarkRadius < window.innerWidth) {
        requestAnimationFrame(clearAnimationDark);
    } else {
        clearAnimationDarkRadius = 0;
    }
}


function clearAnimationHigh() {
    context.fillStyle = "#fecbff"
    clearAnimationHighRadius.push(0);
    clearAnimationHighX.push(Math.random() * window.innerWidth);
    clearAnimationHighY.push(Math.random() * window.innerHeight);
    for (let i = 0; i < clearAnimationHighRadius.length; i++) {
        context.beginPath();
        clearAnimationHighRadius[i] += 10;
        context.arc(clearAnimationHighX[i], clearAnimationHighY[i], clearAnimationHighRadius[i], 0, Math.PI * 2, false);
        context.closePath();
        context.fill();
    }
    if (clearAnimationHighRadius[0] < window.innerWidth / 2) {
        requestAnimationFrame(clearAnimationHigh);
    } else {

    }
}


function clearAnimationLow() {
    context.fillStyle = "#453745";
    clearAnimationLowRadius.push(0);
    clearAnimationLowX.push(Math.random() * window.innerWidth);
    clearAnimationLowY.push(Math.random() * window.innerHeight);
    for (let i = 0; i < clearAnimationLowRadius.length; i++) {
        context.beginPath();
        clearAnimationLowRadius[i] += 10;
        context.arc(clearAnimationLowX[i], clearAnimationLowY[i], clearAnimationLowRadius[i], 0, Math.PI * 2, false);
        context.closePath();
        context.fill();
    }
    if (clearAnimationLowRadius[0] < window.innerWidth / 2) {
        requestAnimationFrame(clearAnimationLow);
    } else {

    }
}


function clearAnimationWarm() {
    context.strokeStyle = "orange";
    context.fillStyle = "orange";
    clearAnimationWarmX.push(Math.random() * window.innerWidth);
    clearAnimationWarmY.push(0);
    clearAnimationWarmX.push(Math.random() * window.innerWidth);
    clearAnimationWarmY.push(0);
    for (let i = 0; i < clearAnimationWarmX.length; i++) {
        context.beginPath();
        context.lineCap = "round";
        context.lineWidth = 50;
        context.moveTo(clearAnimationWarmX[i], 0);
        context.lineTo(clearAnimationWarmX[i], clearAnimationWarmY[i]);
        context.closePath();
        context.stroke();
        context.beginPath();
        context.arc(clearAnimationWarmX[i], clearAnimationWarmY[i], 25, 0, Math.PI * 2, false);
        context.closePath();
        context.fill();
        clearAnimationWarmY[i] += 20;
    }
    if (clearAnimationWarmX.length < 500) {
        requestAnimationFrame(clearAnimationWarm);
    } else {

    }
}


function clearAnimationCold() {
    context.strokeStyle = "lightblue";
    context.fillStyle = "lightblue";
    clearAnimationColdX.push(Math.random() * window.innerWidth);
    clearAnimationColdY.push(0);
    clearAnimationColdX.push(Math.random() * window.innerWidth);
    clearAnimationColdY.push(0);
    for (let i = 0; i < clearAnimationColdX.length; i++) {
        context.beginPath();
        context.lineCap = "round";
        context.lineWidth = 50;
        context.moveTo(clearAnimationColdX[i], 0);
        context.lineTo(clearAnimationColdX[i], clearAnimationColdY[i]);
        context.closePath();
        context.stroke();
        context.beginPath();
        context.arc(clearAnimationColdX[i], clearAnimationColdY[i], 25, 0, Math.PI * 2, false);
        context.closePath();
        context.fill();
        clearAnimationColdY[i] += 20;
    }
    if (clearAnimationColdX.length < 500) {
        requestAnimationFrame(clearAnimationCold);
    } else {

    }
}

function code(r, g, b) {
    let integer = r * 256 * 256 + g * 256 + b;
    let hex = ('000000' + integer.toString(16).toUpperCase()).slice(-6);
    return '#' + hex;
}

function hsvToRgb(H, S, V) {
    //https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV

    var C = V * S;
    var Hp = H / 60;
    var X = C * (1 - Math.abs(Hp % 2 - 1));

    var R, G, B;
    if (0 <= Hp && Hp < 1) {
        [R, G, B] = [C, X, 0]
    };
    if (1 <= Hp && Hp < 2) {
        [R, G, B] = [X, C, 0]
    };
    if (2 <= Hp && Hp < 3) {
        [R, G, B] = [0, C, X]
    };
    if (3 <= Hp && Hp < 4) {
        [R, G, B] = [0, X, C]
    };
    if (4 <= Hp && Hp < 5) {
        [R, G, B] = [X, 0, C]
    };
    if (5 <= Hp && Hp < 6) {
        [R, G, B] = [C, 0, X]
    };
    var m = V - C;
    [R, G, B] = [R + m, G + m, B + m];

    R = Math.floor(R * 255);
    G = Math.floor(G * 255);
    B = Math.floor(B * 255);

    return [R, G, B];
}