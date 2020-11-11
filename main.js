$("#canvas").css("width", window.innerWidth);
$("#canvas").css("height", window.innerHeight);
$("#canvas").attr("width", window.innerWidth);
$("#canvas").attr("height", window.innerHeight);
$("#start").css("top", window.innerHeight/2);
$("#whichContainer").css("height", window.innerHeight);
$(window).resize(function () {
    $("#canvas").css("width", window.innerWidth);
    $("#canvas").css("height", window.innerHeight);
    $("#canvas").attr("width", window.innerWidth);
    $("#canvas").attr("height", window.innerHeight);
    $("#start").css("top", window.innerHeight/2);
    $("#whichContainer").css("height", window.innerHeight);
});
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
context.lineWidth = 5;
context.lineCap = "round";
let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;
let centerXArray = [];
let centerYArray = [];
let colorRArray = [];
let colorGArray = [];
let colorBArray = [];
let colorAArray = [];
let radiusArray = [];
let insideArray = [];
let pastInsideArray = [];
let addArray = [];

let countArray = [];
let countUpArray = [];
let sizeArray = [];
let sizeChange = false;

let mul = 7;

function draw() {
    if (sizeChange == true) {
        sizeArray[sizeArray.length - 1] += 3;
        radiusArray[radiusArray.length - 1] += 3;
    }
    if (mul > 7) {
        mul -= 0.1;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let j = 0; j < centerXArray.length; j++) {
        context.beginPath();
//        context.strokeStyle = "rgba(" + colorRArray[j] + "," + colorGArray[j] + "," + colorBArray[j] + "," + colorAArray[j] + ")";
        context.strokeStyle = "rgba(255, 255, 255, 1)";
        for (let i = 0; i < 1000; i++) {
            let tempX;
            let tempY;
            if (addArray[j][i] == 0) {
                tempX = Math.cos((Math.PI * 2 + 0.03) / 1000 * i) * sizeArray[j] + Math.sin(i / 1000 * countArray[j] / 5);
                tempY = Math.sin((Math.PI * 2 + 0.03) / 1000 * i) * sizeArray[j] + Math.sin(i / 1000 * countArray[j] / 5);
            } else {
                tempX = Math.cos((Math.PI * 2 + 0.03) / 1000 * i) * sizeArray[j] + Math.sin(i / 1000 * countArray[j] / 5) + Math.sin(i / 1000 * countArray[j] / 5) * Math.cos(addArray[j][i]) * mul;
                tempY = Math.sin((Math.PI * 2 + 0.03) / 1000 * i) * sizeArray[j] + Math.sin(i / 1000 * countArray[j] / 5) + Math.sin(i / 1000 * countArray[j] / 5) * Math.sin(addArray[j][i]) * mul;
            }
            context.moveTo(centerXArray[j] + tempX * 0.95, centerYArray[j] + tempY * 0.95);
            context.lineTo(centerXArray[j] + tempX, centerYArray[j] + tempY);
        }
        context.closePath();
        context.stroke();
        if (countArray[j] == 150) {
            countUpArray[j] = false;
        } else if (countArray[j] == 30) {
            countUpArray[j] = true;
        }
        if (countUpArray[j] == true) {
            countArray[j] += 1;
        } else if (countUpArray[j] == false) {
            countArray[j] -= 1;
        }
        for (let k = 0; k < 1000; k++) {
            if (addArray[j][k] === Infinity) {
                addArray[j][k] = 10000;
            }
            if (addArray[j][k] > 5000) {
                addArray[j][k] -= 5000;
            } else if (addArray[j][k] < -5000) {
                addArray[j][k] += 5000;
            }
            if (addArray[j][k] > 1000) {
                addArray[j][k] -= 1000;
            } else if (addArray[j][k] < -1000) {
                addArray[j][k] += 1000;
            }
            if (addArray[j][k] > 500) {
                addArray[j][k] -= 500;
            } else if (addArray[j][k] < -500) {
                addArray[j][k] += 500;
            }
            if (addArray[j][k] > 100) {
                addArray[j][k] -= 100;
            } else if (addArray[j][k] < -100) {
                addArray[j][k] += 100;
            }
            if (addArray[j][k] > 30) {
                addArray[j][k] -= 30;
            } else if (addArray[j][k] < -30) {
                addArray[j][k] += 30;
            }
            if (addArray[j][k] > 0) {
                addArray[j][k] -= 0.1;
            } else if (addArray[j][k] < 0) {
                addArray[j][k] += 0.1;
            }
            if (Math.abs(addArray[j][k]) < 1) {
                addArray[j][k] = 0;
            }
        }
    }
    if(startClicked == false){
        requestAnimationFrame(draw);
    }
}
requestAnimationFrame(draw);

$("#canvas").on("mousedown", function (e) {
    setumei = false;
    $("#setumei").remove();
    centerXArray.push(e.clientX);
    centerYArray.push(e.clientY);
    colorRArray.push(Math.floor(Math.random() * 255));
    colorGArray.push(Math.floor(Math.random() * 255));
    colorBArray.push(Math.floor(Math.random() * 255));
    colorAArray.push(1);
    countArray.push(0);
    countUpArray.push(true);
    sizeArray.push(0);
    sizeChange = true;
    radiusArray.push(0);
    insideArray.push(true);
    pastInsideArray.push(true);
    let temp = [];
    for (let i = 0; i < 1000; i++) {
        temp.push(0);
    }
    addArray.push(temp);
});
$("#canvas").on("mouseup", function (e) {
    sizeChange = false;
    for (let i = 0; i < radiusArray.length; i++) {
        for (let j = 0; j < radiusArray.length; j++) {
            if (i == j) {
                continue;
            }
            let dis = Math.pow(Math.pow(centerXArray[i] - centerXArray[j], 2) + Math.pow(centerYArray[i] - centerYArray[j], 2), 0.5);
            let radSum = radiusArray[i] + radiusArray[j];
            let difX = centerXArray[i] - centerXArray[j];
            let difY = centerYArray[i] - centerYArray[j];
            let finalDifX = difX * (radiusArray[i] / (radiusArray[j] + radiusArray[i]));
            let finalDifY = difY * (radiusArray[i] / (radiusArray[j] + radiusArray[i]));
            let finalCenterX = centerXArray[j] + finalDifX;
            let finalCenterY = centerYArray[j] + finalDifY;
            let finalRadius = Math.pow(radiusArray[i] * radiusArray[i] + radiusArray[j] * radiusArray[j], 0.5);
            if (dis < radSum) {
                attach(finalDifX, finalDifY, finalCenterX, finalCenterY, finalRadius, i, j);
                break;
            }
        }
    }
});
let attachCount = 0;

function attach(finalDifX, finalDifY, finalCenterX, finalCenterY, finalRadius, i, j) {
    if (i > j) {
        centerXArray.splice(i, 1);
        centerXArray.splice(j, 1);
        centerYArray.splice(i, 1);
        centerYArray.splice(j, 1);
        colorRArray.splice(i, 1);
        colorRArray.splice(j, 1);
        colorGArray.splice(i, 1);
        colorGArray.splice(j, 1);
        colorBArray.splice(i, 1);
        colorBArray.splice(j, 1);
        colorAArray.splice(i, 1);
        colorAArray.splice(j, 1);
        countArray.splice(i, 1);
        countArray.splice(j, 1);
        countUpArray.splice(i, 1);
        countUpArray.splice(j, 1);
        sizeArray.splice(i, 1);
        sizeArray.splice(j, 1);
        radiusArray.splice(i, 1);
        radiusArray.splice(j, 1);
        insideArray.splice(i, 1);
        insideArray.splice(j, 1);
        pastInsideArray.splice(i, 1);
        pastInsideArray.splice(j, 1);
        addArray.splice(i, 1);
        addArray.splice(j, 1);
    } else if (j > i) {
        centerXArray.splice(j, 1);
        centerXArray.splice(i, 1);
        centerYArray.splice(j, 1);
        centerYArray.splice(i, 1);
        colorRArray.splice(j, 1);
        colorRArray.splice(i, 1);
        colorGArray.splice(j, 1);
        colorGArray.splice(i, 1);
        colorBArray.splice(j, 1);
        colorBArray.splice(i, 1);
        colorAArray.splice(j, 1);
        colorAArray.splice(i, 1);
        countArray.splice(j, 1);
        countArray.splice(i, 1);
        countUpArray.splice(j, 1);
        countUpArray.splice(i, 1);
        sizeArray.splice(j, 1);
        sizeArray.splice(i, 1);
        radiusArray.splice(j, 1);
        radiusArray.splice(i, 1);
        insideArray.splice(j, 1);
        insideArray.splice(i, 1);
        pastInsideArray.splice(j, 1);
        pastInsideArray.splice(i, 1);
        addArray.splice(j, 1);
        addArray.splice(i, 1);
    }
    centerXArray.push(finalCenterX);
    centerYArray.push(finalCenterY);
    colorRArray.push(Math.floor(Math.random() * 255));
    colorGArray.push(Math.floor(Math.random() * 255));
    colorBArray.push(Math.floor(Math.random() * 255));
    colorAArray.push(1);
    countArray.push(0);
    countUpArray.push(true);
    sizeArray.push(finalRadius);
    radiusArray.push(finalRadius);
    insideArray.push(true);
    pastInsideArray.push(true);
    let temp = [];
    for (let i = 0; i < 1000; i++) {
        temp.push(Math.sin(i / 1000) * 50);
    }
    addArray.push(temp);
    console.log(addArray);
    attachCount = 0;
    mul = 12;
}
$("#canvas").on("touchstart", function (e) {
    let touch = e.touches[0] || e.changedTouches[0];
    centerXArray.push(touch.pageX);
    centerYArray.push(touch.pageY);
    colorRArray.push(Math.floor(Math.random() * 255));
    colorGArray.push(Math.floor(Math.random() * 255));
    colorBArray.push(Math.floor(Math.random() * 255));
    colorAArray.push(1);
    countArray.push(0);
    countUpArray.push(true);
    sizeArray.push(0);
    sizeChange = true;
    radiusArray.push(0);
    insideArray.push(false);
    pastInsideArray.push(false);
    let temp = [];
    for (let i = 0; i < 1000; i++) {
        temp.push(0);
    }
    addArray.push(temp);
});
$("#canvas").on("touchend", function (e) {
    sizeChange = false;
});
let setumei = true;
$("#canvas").on("mousemove", function (e) {
    if (setumei == true) {
        $("#setumei").css("left", e.clientX + 10);
        $("#setumei").css("top", e.clientY + 10);
    }
    for (let i = 0; i < radiusArray.length; i++) {
        pastInsideArray[i] = insideArray[i];
        if (Math.pow(e.clientX - centerXArray[i], 2) + Math.pow(e.clientY - centerYArray[i], 2) < Math.pow(radiusArray[i], 2)) {
            insideArray[i] = true;
        } else {
            insideArray[i] = false;
        }
    }
    for (let i = 0; i < insideArray.length; i++) {
        if (pastInsideArray[i] != insideArray[i]) {
            let per = returnDegrees(centerXArray[i], centerYArray[i], e.clientX, e.clientY) / (Math.PI * 2);
            for (let j = 0; j < 1000; j++) {
                if (Math.abs(per * 1000 - j) < 80) {
                    addArray[i][j] = Math.sin(j / 1000) * (150 / (per * 1000 - j));
//                    addArray[i][j] = (150/per*1000-j) / 160 / Math.PI /2;
                }
            }
        }
    }
});

function returnDegrees(posX, posY, targetX, targetY) {
    let rad = Math.atan2(targetY - posY, targetX - posX);
    if (rad < 0) {
        rad = Math.PI + (Math.PI + rad);
    }
    return rad;
}
$("#start").on("click", function(e){
    $("#start").remove();
    $("#setumei").remove();
    startClicked = true;
    requestAnimationFrame(startAnimation);
});
let startRad = 0;
let startClicked = false;
function startAnimation(){
    startRad += 15;
    context.beginPath();
    context.fillStyle = "white";
    context.arc(window.innerWidth/2, window.innerHeight / 2, startRad, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
    if(startRad < window.innerWidth || startRad < window.innerHeight){
        requestAnimationFrame(startAnimation);
    } else {
        startRad = 0;
        this.location = "next1.html";
    }
}

$("#start").on("mouseover", function(e){
    isMouseOver = true;
     requestAnimationFrame(animateColor);
});
let colorCount = 0;
let start1Array = ["M272.2",",520.05c0",",6.4,2.1,8",",13.4,8h41.1c9.91,0",",11.51-2.8",",12.71-15.5a19.79",",19.79",",0",",0",",0",",6.6",",2.6c-1.6",",14.8-4.51",",19.2-19.31",",19.2H286.2c-15.9",",0-20.8-2.7-20.8-14.4v-45.6a100.15",",100.15",",0",",0",",1-7.9",",6.4",",22.87",",22.87",",0",",0",",0-5-4.8",",101",",101",",0",",0",",0",",30.3-33.61l8.9",",1.5c-.2.7-.9",",1.2-2.2",",1.31-.8",",1.39-1.7",",2.79-2.7",",4.29h26.5l1.1-.4",",5.3",",3.31a2.45",",2.45",",0",",0",",1-1.6.8",",102.5",",102.5",",0",",0",",1-9.2",",14.5h29.21v36.6H331.3v-4.7H272.2Zm0-46.2v19.5h25.2v-19.5Zm28.7-6.2a69.87",",69.87",",0",",0",",0",",8.1-12.2H282.6a153.35",",153.35",",0",",0",",1-10.2",",12.2Zm30.4",",25.7v-19.5H304.2v19.5Z"];
let start2Array = ["M441.71",",485.45a1.52",",1.52",",0",",0",",1-.6.2",",2.48",",2.48",",0,0",",1-1.5-.6c-7.61",",2.5-18.71",",6.6-27",",10.2q.3,3.45.3,7.8c0",",3.2-.1",",6.8-.3",",10.7l-7.3.4c.3-3.6.5-8.2.5-12.1,0-1.5",",0-2.9-.1-4-11.3",",5.5-20.5",",12.2-20.5",",18.2",",0",",5.8",",6.9",",8.6",",20.7",",8.6,9.7",",0",",18.7-.2",",25.1-1l.1",",6.7c-5.9.6-14.9.8-25.2.8-19.2",",0-27.7-4.6-27.7-14.8",",0-8.8",",11.6-17.3",",26.6-24.8-.6-6.3-3.4-9.4-7.4-9.4-7.3",",0-14.9",",4.1-23.9",",14.1-2.8",",3.1-6.7",",7-11",",10.9l-4.9-4.9c10-8.8",",19.4-17.2",",25.2-36.9l-5.6.1H360.5v-6.5c6.1.1",",13.2.1",",17.3.1l6.8-.1a130",",130",",0",",0",",0",",2.7-14.31l9.8",",1.2c-.2",",1-1",",1.61-2.5",",1.81-.7",",4-1.6",",7.5-2.5",",11.1a136.85",",136.85",",0",",0",",0",",34.4-5.8l1.2",",6.7c-12.5",",3.9-27.6",",5.3-37.5",",5.6-2.4",",7.5-4.9",",13.5-7.2",",16.9h.1c4.4-3.9",",11-6.5",",16.1-6.5",",6.8",",0",",11.1",",4.9",",12.4",",13",",8.4-3.8",",19-7.9",",27-11Z"];
let start3Array = ["M457",",470.85c6.5",",2.5",",14.6",",6.9",",18.7",",10.3l-3.8",",5.6c-4-3.4-12-8-18.5-10.8Zm-.9",",58.9a307.78",",307.78",",0",",0",",0",",17.4-33l5.2",",4.2a329.52",",329.52",",0",",0",",1-15.9",",31.1",",2.18",",2.18",",0",",0",",1",",.5",",1.4",",2.66",",2.66",",0",",0",",1-.3",",1.2Zm6.3-86.21c6.4",",2.8",",14.3",",7.41",",18.2",",11l-3.9",",5.5c-3.8-3.7-11.6-8.6-18.1-11.61Zm84",",53.11H518c5",",15.9",",14.91",",27.7",",29.61",",33.1a26.53",",26.53",",0",",0",",0-4.7",",5.9c-15.61-6.7-25.81-19.9-31.31-37.9-2.9",",14.5-10.7",",27.9-30.7",",38a27.12",",27.12",",0",",0",",0-5.2-4.9c18.9-9.2",",26.3-21.2",",29.2-34.2H480.3v-6.4H506a113.82",",113.82",",0",",0,","0",",.6-13.1v-11.4h-20v-6.4h20V442.74l8.7.6c-.1.7-.7",",1.2-2",",1.4v14.61h23.61v30.9h9.5Zm-33.11-30.9v11.5a112.09",",112.09",",0",",0",",1-.6",",13h17.6v-24.5Z"];
let start4Array = ["M623",",447c-.2.9-1.3",",1.31-2.6",",1.5A187.88",",187.88",",0",",0",",1",",616.3",",468c17.5",",3.3",",27.21",",16",",27.21",",31.4",",0",",17.8-13.51",",29.2-38.81",",32.8-1-2.1-2.1-4.3-3.2-6.1",",22.1-2.9",",34.71-11.9",",34.71-26.5",",0-12.1-7.71-22.3-21.91-25-4.7",",15.4-11.1",",27.3-18.1,35.6a35.59",",35.59",",0",",0",",0",",4.6",",4.9l-5.1",",4.9a51.92",",51.92",",0",",0",",1-4.3-4.9c-6.5",",6.2-13.6",",9.3-20.3",",9.3-8.8",",0-14.2-7.5-14.2-18.4",",0-13.6",",7.5-24.1",",17.6-30.7-1.9-7.6-3.5-15.9-4.9-24.9l9.6-.2a2.51",",2.51",",0",",0",",1-2.1",",2.2c1",",6.9",",2.1",",13.6",",3.5",",19.8",",11-5.5",",21.6-5.5",",26.1-5.5a18.48",",18.48",",0",",0",",1",",2.4.1",",200.14",",200.14",",0",",0",",0",",4-21.91Zm-35.4",",62.71c-4.5-7.3-8.2-16.6-11.2-27.7-6.3",",4.4-12.9",",12.3-12.9",",23.4",",0",",7.1",",2.7",",12.2",",8.1",",12.2C577.8",",517.65",",583.1",",514.05",",587.6",",509.75Zm4.5-5.5c6-7.3",",11.2-17.5",",15.2-31-1.1-.1-2.4-.1-3.5-.1a45.9",",45.9",",0",",0",",0-21.7",",5.4C584.7",",488.55",",587.9",",497.45",",592.1",",504.25Z"];
let start5Array = ["M687.6",",486.55c6.6-3.4",",16.9-5.8",",24.8-5.8",",15.9",",0",",25.91",",9.3",",25.91",",24",",0",",18.1-15.91",",28.1-36",",28.1-13",",0-21.9-5.2-21.9-14",",0-7.4",",7.3-13.4",",16.4-13.4",",11.3",",0",",18.9",",9",",20.4",",18.1",",8-3",",13.8-9.4",",13.8-18.7",",0-10.8-8-17.7-20.6-17.7-15",",0-29.7",",6.7-36.3",",13.1-3",",2.8-6.9",",7-9.6",",10.1l-5.1-5.1c9-9.4",",37.6-36.7",",51.2-49.4-5.8.8-25.8",",1.6-37.2",",2a3.31",",3.31",",0",",0",",1-2.1",",1.5l-.8-8.5c13.5-.1",",39.3-1.1",",46.6-2.2l1.5-.71",",5.3",",6.51a4.83",",4.83",",0",",0",",1-2.4.9c-7.1",",5.8-26.1",",23.6-33.9",",31.1Zm13.8",",40a43.73",",43.73",",0",",0",",0",",9.1-1c-1.1-7.7-6.8-14.2-14.2-14.2-5.2",",0-9.8",",2.8-9.8",",7.4C686.5",",524.85",",694.8",",526.55",",701.4",",526.55Z"];
function animateColor(){
    $("#start1").attr("d", $("#start1").attr("d") + start1Array[colorCount]);
    $("#start2").attr("d", $("#start2").attr("d") + start2Array[colorCount]);
    $("#start3").attr("d", $("#start3").attr("d") + start3Array[colorCount]);
    $("#start4").attr("d", $("#start4").attr("d") + start4Array[colorCount]);
    $("#start5").attr("d", $("#start5").attr("d") + start5Array[colorCount]);
    colorCount += 1;
    if(isMouseOver){
        if(start1Array[colorCount] !== undefined || start2Array[colorCount] !== undefined || start3Array[colorCount] !== undefined || start4Array[colorCount] !== undefined || start5Array[colorCount] !== undefined){
        requestAnimationFrame(animateColor);
    }
    }
}
let isMouseOver = false;
$("#start").on("mouseleave", function(e){
    isMouseOver = false;
    colorCount = 0;
    $("#start1").attr("d", ""); 
    $("#start2").attr("d", "");
    $("#start3").attr("d", "");
    $("#start4").attr("d", "");
    $("#start5").attr("d", "");
});
