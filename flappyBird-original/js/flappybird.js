
// 让小鸟飞起来
// 移动的背景
// top
// 定时器
// 动画原理 leader = leader + step
// 获取相应的元素

var game = document.getElementById('game');
var birdEle = document.getElementById('bird');
var btnSt = document.getElementById('start')
var btnStSpeach = document.getElementById('start-speach')
var btnRSt = document.getElementById('restart')
// 初始化背景图的值
// the original loc of background sky
var score = 0
var sky = {
    x: 0
}
// 初始bird 的值
// the original loc of the bird
var bird = {
    speedX: 5,
    speedY: 0,
    x: birdEle.offsetLeft,
    y: birdEle.offsetTop
}
// 游戏的状态
// the begining satus of the game is runing
var running = false;
var alreadybegin
btnSt.onclick = () => {
    if (alreadybegin == true) return
    running = true;
    alreadybegin = true
}
btnStSpeach.onclick = () => {
    recognition.start()
}

btnRSt.onclick = () => {
    history.go(0)
    // if(running=true) running=false
    // // clearInterval(interval1)

    // sky.x=0
    // bird.x=birdEle.offsetLeft
    // bird.y=birdEle.offsetTop
    // let uselessPipe = document.getElementsByTagName("p");

    // while(uselessPipe.length>0){
    //     game.removeChild(uselessPipe[0]);
    // }
    // birdEle.style.top='100px'
    // birdEle.style.left='100px'

    // createPipe(400);
    // createPipe(600);
    // createPipe(800);
    // createPipe(1000);

}
let interval1 = setInterval(function () {
    if (running) {
        // 移动背景让小鸟实现水平运动
        // moving the background
        sky.x -= 5;
        game.style.backgroundPositionX = sky.x + 'px';
        // 实现小鸟的上下运动
        // the gravity of the bird
        bird.speedY += 0.9;
        bird.y += bird.speedY;
        if (bird.y < 0) {
            running = false;
            bird.y = 0;
        }
        if (bird.y + birdEle.offsetHeight > 600) {
            running = false;
            bird.y = 600 - birdEle.offsetHeight;

        }

        birdEle.style.top = bird.y + 'px';
    }

}, 30)
// 点击文档的时候实现小鸟向上运动
// this is the trigger of fly up action
document.onclick = function () {
    bird.speedY = -10;
}
document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
        bird.speedY = -10;
    }
}
// 创建管道
// create Pipe
// the pipe's height and width need to be fixed
function createPipe(position) {
    var pipe = {};
    pipe.x = position;
    pipe.uHeight = 200 + parseInt(Math.random() * 100);
    pipe.dHeight = 600 - pipe.uHeight - 200;
    pipe.dTop = pipe.uHeight + 200;
    var uPipe = document.createElement('p');
    uPipe.style.width = '52px';
    uPipe.style.height = pipe.uHeight + 'px';
    uPipe.style.background = 'url("./images/forest/pipe2.png") no-repeat center bottom';
    uPipe.style.position = 'absolute';
    uPipe.style.top = '0px';
    uPipe.style.left = pipe.x + 'px';
    game.appendChild(uPipe);

    var dPipe = document.createElement('p');
    dPipe.style.width = '52px';
    dPipe.style.height = pipe.dHeight + 'px';
    dPipe.style.background = 'url("./images/forest/pipe1.png") no-repeat center  top';
    dPipe.style.position = 'absolute';
    dPipe.style.top = pipe.dTop + 'px';
    dPipe.style.left = pipe.x + 'px';
    game.appendChild(dPipe);
    // 让管道运动起来
    // moving pipe
    let interval2 = setInterval(function () {
        if (running) {
            pipe.x -= 2;
            uPipe.style.left = pipe.x + 'px';
            dPipe.style.left = pipe.x + 'px';
            if (pipe.x < -52) {
                pipe.x = 800;
            }
            var uCheck = bird.x + 34 > pipe.x && bird.x < pipe.x + 52 && bird.y < pipe.uHeight;
            var dCheck = bird.x + 34 > pipe.x && bird.x < pipe.x + 52 && bird.y > pipe.uHeight + 200;
            if (uCheck || dCheck) {
                running = false;
                return
            }
            if (bird.x == pipe.x) {
                score += 1
                console.log(score)
                document.getElementById('score').innerHTML = 'score: ' + score
            }
        }
    }, 30)
}
createPipe(400);
createPipe(600);
createPipe(800);
createPipe(1000);

/* Speach recoginition */
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var grammar = '#JSGF V1.0;'
var message = document.querySelector('#message')
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList
recognition.lang = 'en-US'
recognition.interimResults = false

recognition.onresult = function (event) {
    var last = event.results.length - 1;
    var command = event.results[last][0].transcript;
    message.textContent = 'Voice Input: ' + command + '.';

    if (command.toLowerCase() === 'jump,') {
        bird.speedY = -10;
    }
    else if (command.toLowerCase() === 'jumps') {
        bird.speedY = -10;
    }

    else if (command.toLowerCase() === 'jump') {
        bird.speedY = -10;
    }
    else if (command.toLowerCase() === 'up') {
        bird.speedY = -10;
    }

};
recognition.onspeechend = function () {
    //recognition.stop()
}
recognition.onerror = function (event) {
    message.textContent = 'Error occurred in recognition' + event.error
}
