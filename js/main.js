const num = {
    random: (max, min = 0) => {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
//Variables
let W = window.innerWidth;
let H = window.innerWidth;
const mainField = document.querySelector('main.main');
    const mainFieldstyle = mainField.style;
    let gridCount = mainFieldstyle.getPropertyValue('--gridCount');
const blocks = [];
console.log('Main here');
let s = 5;
//Functions
function Block(type){
    this.type = type || 1;
    this.cls;
    if(this.type < 3){
        this.cls = 'grass';
    }else if(this.type >= 3 && this.type <= 7 ){
        this.cls = 'grass2';
    }else if(this.type > 7 && this.type <= 10){
        this.cls = 'grass3';
    }else if(this.type > 10 && this.type <= 11){
        this.cls = 'tree';
    }else if(this.type > 11 && this.type <= 15){
        this.cls = 'sand';
    }

    return this;
}
Block.prototype.draw = (cls) => {
    let el = document.createElement('div'); 
        el.classList.add(`block-${cls}`);
        mainField.appendChild(el);
        el = null;
}
function render(){
    let count = 0;
    for(i = 0;i < s * 50;i++){
        blocks.push(new Array());
        for(x = 0;x < s;x++){
            blocks[i].push(new Array());
            count++;
            let n;
            n = num.random(15,1);
            blocks[i][x] = new Block(n);
            blocks[i][x].draw(blocks[i][x].cls);
            
        }
    }
    console.log(`Blocks: ${count}`);
}
//End of terrain rendering
//Player
async function cooldown(time){
    let z = 0;
    setTimeout(() => {
        z++
        if(z < 1){
            return true;
        }
    }, 1000)
}
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
                if(this.x > 190){
                    this.x = 190;
                }
            }
        mainFieldstyle.setProperty('--y', this.y / 1.8);
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




//Start menu //Uncomment when relese
/*const startBtn = document.querySelector('header.start > button.btn');
startBtn.addEventListener('click', (e) => {
    document.querySelector('header.start').setAttribute('style', 'display: none;');
    render();
}, true);*/


//Dev
document.querySelector('header.start').setAttribute('style', 'display: none;');
    render();