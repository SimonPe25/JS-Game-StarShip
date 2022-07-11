
const canvas = document.getElementById("game");
const context = canvas.getContext("2d"); // Этот метод генерирует контекст рисования, 
//который будет связан с указанным холстом. 
//получаем контекст холста

//let aster = { x: 0, y: 300, dx: 10, dy: 20 };
let aster = [];
let fire = [];
let ship = { x: 300, y: 300 };


aster.push({ x: 0, y: 300, dx: 1, dy: 2 })

const fonimg = new Image(); //выделяем память и 
fonimg.src = 'fon.jpg' // подгружаем файл, будет загружен в память пк

const asterimg = new Image(); //выделяем память и 
asterimg.src = 'astero.png' // подгружаем файл, будет загружен в память пк
const shipImg = new Image(); //выделяем память и 
shipImg.src = 'ship.png' // подгружаем файл, будет загружен в память пк
const fireImg = new Image(); //выделяем память и 
fireImg.src = 'fire.png' // подгружаем файл, будет загружен в память пк


canvas.addEventListener("mousemove", function (event) {
    ship.x = event.offsetX - 50;
    ship.y = event.offsetY - 80;
})

fonimg.onload = function () {
    game(); // после загрузки фона, будет запускаться игра
}
//context.drawImage(fon, 0, 0, 600, 600);

//основной игровой цикл
function game() {
    update();
    render();
    requestAnimationFrame(game); // вызывает функцию с частотой обновления экрана 
}

let timer = 0;
function update() {
    timer++;

    if (timer % 10 == 0) {

        aster.push({
            x: Math.random() * 600,
            y: -50,
            dx: Math.random() * 2 - 1,

            //dy: Math.random() * 2 - 1
            dy: Math.random() * 2 + 2,
            del: 0
        })
    }

    //выстрел
    if (timer % 10 == 0) {
        fire.push({ x: ship.x + 10, y: ship.y, dx: 0, dy: -5.2 })
        fire.push({ x: ship.x + 10, y: ship.y, dx: 0.5, dy: -5 })
        fire.push({ x: ship.x + 10, y: ship.y, dx: -0.5, dy: -5 })
    }
    //двигаем пули
    for (i in fire) {
        fire[i].x = fire[i].x + fire[i].dx;
        fire[i].y = fire[i].y + fire[i].dy;
        if (fire[i].y < -30) {
            fire.splice(i, 1)
        }


    }

    for (i in aster) {
        //физика
        aster[i].x = aster[i].x + aster[i].dx
        aster[i].y = aster[i].y + aster[i].dy
        if (aster[i].x >= 550 || aster[i].x < i) {
            aster[i].dx = -aster[i].dx
            //console.log("aster[i].x", aster[i].x);
        }
        if (aster[i].y >= 600) {
            aster.splice(i, 1)
            //console.log("aster[i].y", aster[i].y);
        }
        for (j in fire) {
            if (Math.abs(aster[i].x + 25 - fire[j].x - 15) < 50 && Math.abs(aster[i].y - fire[j].y) < 25) {
                //произошло столкновение
                //спавн взрыва
                // expl.push({x:aster[i].x-25,y:aster[i].y-25,animx:0,animy:0})
                //помечаем астероид на удаление
                aster[i].del = 1;
                fire.splice(j, 1); break;

            }
        }
        if (aster[i].del == 1) {
            aster.splice(i, 1);
        }
    }
}

function render() {
    context.drawImage(fonimg, 0, 0, 600, 600)   //функция вывода на экран
    context.drawImage(shipImg, ship.x, ship.y, 100, 150)
    for (i in fire) {
        context.drawImage(fireImg, fire[i].x, fire[i].y, 30, 30)
    }
    for (i in aster) context.drawImage(asterimg, aster[i].x, aster[i].y, 50, 50)   //функция вывода на экран
}



//Чтобы сработал вызов функции requestAnimationFame во всех браузерах
var requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 20);
        };

})();