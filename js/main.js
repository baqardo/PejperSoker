let squaresX = 10;
let squaresY = 8;
let pointsArray = create2dArray(8, 10);
let gatewayArray = create2dArray(1, 2);
let canvas = document.createElement("canvas");
let divBoard = document.getElementById("board");;
let boardWidth = divBoard.offsetWidth ;
let boardHeight = divBoard.offsetHeight;
let ctx = canvas.getContext('2d');
let scale = 147;
let canvasWidthResolution = 1800;
let canvasHeightResolution = 1200;
let borderWidth = 20 / 2;
let borderWidth2 = 5/2;

function Board(div_id) {
    
    
    this.squaresX = squaresX;
    this.squaresY = squaresY;

    this.draw = function () {
        divBoard.appendChild(canvas);
        canvas.width = canvasWidthResolution;
        canvas.height = canvasHeightResolution;
    }
}

function Point(x, y) {
    this.x = x;
    this.y = y;
    this.moveTable =
        [
            [0, 0, 0],
            [0, 2, 0],
            [0, 0, 0]
        ];

    this.draw = function () {
        ctx.beginPath();
        ctx.arc((this.x) * scale, this.y * scale, 10, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
    }
}

function drawLine(x1, y1, x2, y2) {
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo((x1 + 1) * scale + 10, y1 * scale + 10);// to plus 10 to ustawnia marginsow
    ctx.lineTo((x2 + 1) * scale + 10, y2 * scale + 10);
    ctx.stroke();
    ctx.closePath();
}

function drawGateway(x1, y1, x2, y2) {
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo((x1) * scale + 10, y1 * scale + 10);// to plus 10 to ustawnia marginsow
    ctx.lineTo((x2) * scale + 10, y2 * scale + 10);
    ctx.stroke();
    ctx.closePath();
}

function setup() {
    var myboard = new Board("board");
    myboard.draw();
// WYPELNIANIE TABLICY SPECJALNYMI PKT
    for (let i = 0; i <= squaresY; i++) {
        for (let j = 0; j <= squaresX; j++) {
            pointsArray[i][j] = new Point(j, i);
            if (i == 0) pointsArray[i][j].moveTable = [[2, 2, 2], [1, 2, 1], [0, 0, 0]];
            if (j == 0) pointsArray[i][j].moveTable = [[2, 1, 0], [2, 2, 0], [2, 1, 0]];
            if (i == squaresY) pointsArray[i][j].moveTable = [[0, 0, 0], [1, 2, 1], [2, 2, 2]];
            if (j == squaresX) pointsArray[i][j].moveTable = [[0, 1, 2], [0, 2, 2], [0, 1, 2]];
        }
    }

    ///ROGI///
    pointsArray[0][0].moveTable = [[2, 2, 2], [2, 2, 1], [2, 1, 0]];
    pointsArray[0][squaresX].moveTable = [[2, 2, 2], [1, 2, 2], [0, 1, 2]];
    pointsArray[squaresY][squaresX].moveTable = [[0, 1, 2], [1, 2, 2], [2, 2, 2]];
    pointsArray[squaresY][0].moveTable = [[2, 1, 0], [2, 2, 1], [2, 2, 2]];

    ///BRAMKI///
    var side = ((squaresY - 2) / 2); //odleglosc_rogu_planszy_do_bramki
    pointsArray[side][0].moveTable = [[2, 1, 0], [1, 2, 0], [0, 0, 0]];
    pointsArray[side + 1][0].moveTable = [[0, 0, 0], [0, 2, 0], [0, 0, 0]];
    pointsArray[side + 2][0].moveTable = [[0, 0, 0], [1, 2, 0], [2, 1, 0]];
    pointsArray[side][squaresX].moveTable = [[0, 1, 2], [0, 2, 1], [0, 0, 0]];
    pointsArray[side + 1][squaresX].moveTable = [[0, 0, 0], [0, 2, 0], [0, 0, 0]];
    pointsArray[side + 2][squaresX].moveTable = [[0, 0, 0], [0, 2, 1], [0, 1, 2]];

    ///RYSOWANIE PLANSZY///
    for (let i = 0; i <= squaresY; i++) {
        for (let j = 0; j <= squaresX; j++) {
            if (pointsArray[i][j].moveTable[2][1] == 0) {
                ctx.lineWidth = 5;
                drawLine(pointsArray[i][j].x, pointsArray[i][j].y, pointsArray[i + 1][j].x, pointsArray[i + 1][j].y);
            }
            if (pointsArray[i][j].moveTable[2][1] == 1) {
                ctx.lineWidth = 20;
                drawLine(pointsArray[i][j].x, pointsArray[i][j].y, pointsArray[i + 1][j].x, pointsArray[i + 1][j].y);
            }
            if (j != squaresX) {
                if (pointsArray[i][j].moveTable[1][2] == 0) {
                    ctx.lineWidth = 5;
                    drawLine(pointsArray[i][j].x, pointsArray[i][j].y, pointsArray[i][j + 1].x, pointsArray[i][j + 1].y);
                }
                if (pointsArray[i][j].moveTable[1][2] == 1) {
                    ctx.lineWidth = 20;
                    drawLine(pointsArray[i][j].x, pointsArray[i][j].y, pointsArray[i][j + 1].x, pointsArray[i][j + 1].y);
                }
            }
        }
    }
    ///PUNKTY BRAMEK///
    gatewayArray[0][0] = new Point(0, side);
    gatewayArray[0][1] = new Point(0, (side) + 1);
    gatewayArray[0][2] = new Point(0, (side) + 2);
    gatewayArray[1][0] = new Point(squaresX + 2, side);
    gatewayArray[1][1] = new Point(squaresX + 2, (side) + 1);
    gatewayArray[1][2] = new Point(squaresX + 2, (side) + 2);

    // ///RYSOWANIE BRAMEK///
    for (let i = 0; i <= 1; i++) {
        for (let j = 0; j <= 2; j++) {
            ctx.lineWidth = 20;
            if (j < 2)
                drawGateway(gatewayArray[i][j].x, gatewayArray[i][j].y, gatewayArray[i][j + 1].x, gatewayArray[i][j + 1].y);
            if (j == 0 || j == 2) {
                if (i == 1)
                    drawGateway(gatewayArray[i][j].x, gatewayArray[i][j].y, gatewayArray[i][j].x - 1, gatewayArray[i][j].y);
                else
                    drawGateway(gatewayArray[i][j].x, gatewayArray[i][j].y, gatewayArray[i][j].x + 1, gatewayArray[i][j].y);
            }
            else {
                ctx.lineWidth = 5;
                if (i == 1)
                    drawGateway(gatewayArray[i][j].x, gatewayArray[i][j].y, gatewayArray[i][j].x - 1, gatewayArray[i][j].y);
                else
                    drawGateway(gatewayArray[i][j].x, gatewayArray[i][j].y, gatewayArray[i][j].x + 1, gatewayArray[i][j].y);
            }
        }
    }
    canvas.addEventListener("mousemove", function (e) {
        let rect = canvas.getBoundingClientRect();
        log(e.clientX - rect.left + 5 +'---'+pointsArray[0][0].x+scale)
        log(e.clientY - Math.floor(rect.top) + 5 +'!!!'+pointsArray[0][0].y)
        for (let i = 0; i < pointsArray.length; i++) {
            for (let j = 0; j < pointsArray[i].length; j++) {
                if ((e.clientX - rect.left + 5 >= pointsArray[i][j].x && e.clientY - Math.floor(rect.top) + 5 >= pointsArray[i][j].y)
                    && (e.clientX - rect.left - 5 <= pointsArray[i][j].x && e.clientY - Math.floor(rect.top) - 5 <= pointsArray[i][j].y)) {
                    log("!!!!");
                }
            }
        }
    });

}
   setup();

   //ADD EVENT LISENER
for (let i = 0; i <= squaresY; i++) {
    for (let j = 0; j <= squaresX; j++) {
        

    }
}

//-------------------------------------------------------------
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}


console.log(pointsArray);

canvas.addEventListener('mousemove', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    //var message = 'Mouse position: ' + mousePos.x*przelicznik_do_pobiernia_myszki_x + ',' + mousePos.y*przelicznik_do_pobiernia_myszki_y;
    var przelicznik_na_x = canvasWidthResolution/boardWidth  ;
    var przelicznik_na_y = canvasHeightResolution/boardHeight  ;
    var cord_X = mousePos.x * przelicznik_na_x;
    var cord_Y = mousePos.y * przelicznik_na_y;

    // add event lisner na slupki

    console.log(cord_X);
    console.log(cord_Y);
    // console.log(przelicznik_na_x);
    console.log("--");
    log(pointsArray[0][0].x * scale + scale)
    log(pointsArray[0][0].y * scale)
    
    
    if ((pointsArray[1][0].x * scale + scale <= cord_X + 15 && pointsArray[1][0].y * scale <= cord_Y+15)
        && (pointsArray[1][0].x * scale + scale >= cord_X - 15 && pointsArray[1][0].y * scale >= cord_Y-15))
        {
        ctx.beginPath();
        ctx.fillStyle = "blue";
        //ctx.fillRect(pointsArray[1][0].x * scale + scale - 15, pointsArray[1][0].y * scale - 15, 30, 30);
        ctx.arc(pointsArray[1][0].x * scale + scale + 10 , pointsArray[1][0].y * scale + 10,15,0,Math.PI*2,false);
        ctx.fill();
        ctx.closePath();
            log("!!!!");
        }
    

    // add event lisner na slupki


}, false);

<<<<<<< HEAD


setup();
=======
>>>>>>> MatrasBranch
