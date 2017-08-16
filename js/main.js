const num = {
    random: (max, min = 0) => {
        return Math.floor(Math.random() * (max - min) + min);
    }
};
const metr = {
    vw: (quan) => {
        return quan * (document.body.clientWidth / 100);
    },
    vh: (quan) => {
        return quan * (document.body.clientHeight / 100);
    }
}
//Variables
let W = window.innerWidth;
let H = window.innerWidth;
window.addEventListener('resize',(e)=>{W = window.innerWidth;H = window.innerHeight;console.log('Updated vw vh')});


const mainField = document.querySelector('main.main');
    const mainFieldstyle = mainField.style;
    let gridCount = mainFieldstyle.getPropertyValue('--gridCount');
const blocks = [];
const grassBlocks = [];
const sandBlocks = [];
const treeBlocks = [];
const stoneBlocks = [];
let visiableBlocks = [];
console.log('Main here');
let s = 4;
//Functions
function Block(type){
    this.type = type || 1;
    this.cls;
    this.body;
    if(this.type < 3){
        this.cls = 'grass';
    }else if(this.type >= 3 && this.type <= 7 ){
        this.cls = 'grass2';
    }else if(this.type > 7 && this.type <= 10){
        this.cls = 'grass3';
    }else if(this.type > 10 && this.type <= 12){
        this.cls = 'tree';
    }else if(this.type > 12 && this.type <= 15){
        this.cls = 'stone';
    }else if(this.type > 15 && this.type <= 17){
        this.cls = 'sand';
    }

    return this;
}
let th;
Block.prototype.draw = (cls) => {
    let el = document.createElement('div'); 
        el.classList.add(`block-${cls}`);
        mainField.appendChild(el);
        /*this.oX = el.offsetLeft;
        this.x = el.getBoundingClientRect().left;
        this.oY = el.offsetTop;
        this.y = el.getBoundingClientRect().top;*/
        th = el;
        el = null;
}
Block.prototype.setPos = (el) => {
    let tf = false;
    while(el.body && tf === false){
        el.oX = el.body.offsetLeft;
        el.x = el.body.getBoundingClientRect().left;
        el.oY = el.body.offsetTop;
        el.y = el.body.getBoundingClientRect().top;
        tf = true;
    }
    tf = null;
}
function render(){
    let count = 0;
    for(i = 0;i < s * 50;i++){
        blocks.push(new Array());
        for(x = 0;x < s;x++){
            blocks[i].push(new Array());
            count++;
            let n;
            if(blocks[i - 5] != undefined && x > 1){
                if(blocks[i - 1][x].type < 3){//grass1
                    n = num.random(11,1);

                }else if(blocks[i][x - 1].type > 7 && blocks[i][x - 1].type <= 10){//grass1 / 2 / 3
                    n = num.random(11,2);

                }else if(blocks[i][x - 1].type > 10 && blocks[i][x - 1].type <= 12){//tree
                    n = num.random(12,10);

                }else if(blocks[i][x - 1].type > 12 && blocks[i][x - 1].type <= 15){//stone
                    n = num.random(17,11);

                }else{
                    n = num.random(17,1);
                }
            }
            else{
                n = num.random(17,1);
            }
            blocks[i][x] = new Block(n);
            blocks[i][x].draw(blocks[i][x].cls);
            blocks[i][x].body = th;
            blocks[i][x].setPos(blocks[i][x]);
            //Grouping blocks => easier to find when mining
            if(blocks[i][x].cls === 'grass' || blocks[i][x].cls === 'grass2' || blocks[i][x].cls === 'grass3'){
                grassBlocks.push(blocks[i][x]);
            }else if(blocks[i][x].cls === 'tree'){
                treeBlocks.push(blocks[i][x]);
            }else if(blocks[i][x].cls === 'stone'){
                stoneBlocks.push(blocks[i][x]);
            }else if(blocks[i][x].cls === 'sand'){
                sandBlocks.push(blocks[i][x]);
            }else{
                console.log('Unknown Block Type')
            }
        }
    }
    //console.log(blockBox);
    console.log(`Blocks: ${count}`);
}
//End of terrain rendering
//Player

function Player(){
    this.x = 0;
    this.y = 0;
        this.oldY = 0;
    this.neg = 0;
    this.body = document.querySelector('span.player');
    this.camY = 0;
    this.s = metr.vw(100) / 20;
    this.updateView = () => {
        visiableBlocks = [];
        for(i = 0; i < blocks.length;i++){
            for(x = 0; x < blocks[i].length; x++){
                let camPos;
                if(this.camY > 0){camPos = this.camY;}
                else{camPos = 100;}
                if(blocks[i][x].y < 2800 * (camPos / 100)){
                    visiableBlocks.push(blocks[i][x]);
                }
                console.log(blocks[i][x].body);
            }
        }
        console.log(visiableBlocks);
    }
    this.walk = (dir, pn) => {
        oldY = this.y || 0;
            if(dir === 2){//Y
                this.y += 10 * pn;
                if(this.y < 0){
                    this.y = 0;
                }
                if(this.y < oldY){
                    console.log('Moving up');
                    if(Math.floor(this.body.getBoundingClientRect().top / 100) * 100 / 1000 % 4 < 0 && Math.floor(this.body.getBoundingClientRect().top / 100) * 100 != 0){
                    this.camY -= 100;
                    this.neg--;
                    this.updateView();
                    }
                }
                if(this.y > oldY){
                    console.log('Moving down');
                    if(Math.floor(this.body.getBoundingClientRect().top / 100) * 100 / 1000 % 4 >= 2.5 && Math.floor(this.body.getBoundingClientRect().top / 100) * 100 != 0){
                        this.camY += 100;
                        this.neg++;
                        this.updateView();
                    }
                }
                if(this.camY < 0){
                    this.camY = 0;
                }
            }else if(dir === 1){//X
                this.x += 10 * pn;
                if(this.x < 0){
                    this.x = 0;
                }
                if(this.x > 190){
                    this.x = 190;
                }
            }
        mainFieldstyle.setProperty('--y', this.camY);
        this.body.style.setProperty('--x', this.x);
        this.body.style.setProperty('--y', this.y);

        requestAnimationFrame(this.walk);
    }
    requestAnimationFrame(this.walk);

    this.mine = () => {
        let left = this.body.getBoundingClientRect().left;
        let top = this.body.getBoundingClientRect().top;
        console.log(`Left: ${left} Top: ${top}`);
        this.updateView();
        for(block in visiableBlocks){
            /*if(top / block.y < 2 && left /  block.x < 2){
                console.log(block.cls);
            }*/
        }
    }

    return this;
}
const player = new Player();
player.updateView();
    //Walking
    window.addEventListener('keydown', (e) => {
        switch(e.keyCode){
            //X
            case 37: e.preventDefault(), player.walk(1, -1);break;//!A, ArrowLeft
            case 39: e.preventDefault(), player.walk(1, 1);break;//!D, ArrowRight
            //Y
            case 38: e.preventDefault(), player.walk(2,-1);break;//!W, ArrowUp
            case 40: e.preventDefault(), player.walk(2,1);break;//!S, ArrowDown
            //End of movement
            //Mining
            case 81: e.preventDefault(), player.mine();break;
        }
    }, true);




//Start menu //Uncomment when relese
/*const startBtn = document.querySelector('header.start > button.btn');
startBtn.addEventListener('click', (e) => {
    document.querySelector('header.start').setAttribute('style', 'display: none;');
    render();
}, true);*/


//Dev
document.querySelector('header.start').setAttribute('style', 'display: none;');
    render();

function foo(){
    let f = 0;
    let t = 0;
    while(f <= metr.vh(1)){
        f += metr.vw(100) / 20;
        console.log(f, metr.vh(1), t);
        t++;
    }
    return Math.floor(f);
}
//console.log(foo());