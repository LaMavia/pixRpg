const num = {
    random: (max, min = 0) => {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
//Variables
let W = window.innerWidth;
let H = window.innerHeight;
const mainField = document.querySelector('main.main');
    const mainFieldstyle = mainField.style;
    let gridCount = mainFieldstyle.getPropertyValue('--gridCount');
const blocks = [];
console.log('Main here');
let s = 40;
//Functions
function Block(type){
    this.type = type || 1;
    this.cls;
    if(this.type < 3){
        this.cls = 'grass';
    }else if(this.type <= 7 && this.type >= 3){
        this.cls = 'grass2';
    }else if(this.type > 7 && this.type <= 10){
        this.cls = 'sand';
    }else if(this.type > 10 && this.type <= 12){
        this.cls = 'tree'
    }else{
        this.cls = 'grass3';
    }

    return this;
}
Block.prototype.draw = (cls) => {
    let el = document.createElement('div'); 
        el.classList.add(`block-${cls}`);
        mainField.appendChild(el);
}
function render(){
    for(i = 0;i < s * 50;i++){
        blocks.push(new Array());
        for(x = 0;x < s;x++){
            blocks[i].push(new Array());
            let n = num.random(15,1);
            blocks[i][x] = new Block(n);
            blocks[i][x].draw(blocks[i][x].cls);
        }
    }
}
//End of terrain rendering
//Player
function Player(){
    this.x = 0;
    this.y = 0;
    this.body = document.querySelector('span.player');
    this.walk = (dir, pn) => {
            if(dir === 2){//Y
                this.y += 10 * pn;
                if(this.y < 0){
                    this.y = 0;
                }
            }else if(dir === 1){//X
                this.x += 10 * pn;
                if(this.x < 0){
                    this.x = 0;
                }
                if(this.x > W - (W - this.x)){
                    this.x = W - (W - this.x);
                }
            }
        this.body.style.setProperty('--x', this.x);
        this.body.style.setProperty('--y', this.y);

        requestAnimationFrame(this.walk);
    }
    requestAnimationFrame(this.walk);

    return this;
}
const player = new Player();
    //Walking
    window.addEventListener('keydown', (e) => {
        switch(e.keyCode){
            //X
            case 37: e.preventDefault(), player.walk(1, -1);break;//!A, ArrowLeft
            case 39: e.preventDefault(), player.walk(1, 1);break;//!D, ArrowRight
            //Y
            case 38: e.preventDefault(), player.walk(2,-1);break;//!W, ArrowUp
            case 40: e.preventDefault(), player.walk(2,1);break;//!S, ArrowDown

        }
    }, true);




//Start menu
const startBtn = document.querySelector('header.start > button.btn');
startBtn.addEventListener('click', (e) => {
    document.querySelector('header.start').setAttribute('style', 'display: none;');
    render();
}, true);