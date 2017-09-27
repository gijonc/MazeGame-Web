function Player(){
    // initialized player status:
    this.speed = 4;
    this.keyNum = 0;
    this.cherry = 0;
    this.movingTo = ' ';

    this.init = function(map){
        if(!map){
            console.log("Failed to load map");
            return false;
        }
        this.map = map;
        this.x = this.map.pX;
        this.y = this.map.pY;
        this.width = this.map.tile_width;
        this.height = this.map.tile_height;

        this.update();
    }

    this.move = function (){
        if (KEY_STATUS.left || 
            KEY_STATUS.right || 
            KEY_STATUS.down || 
            KEY_STATUS.up) 
        {
            // clear before update image
            this.context.clearRect(this.x, this.y, this.width, this.height);
            
            if (KEY_STATUS.left) {
                this.update('l');
            } else if (KEY_STATUS.right) {
                this.update('r');
            } else if (KEY_STATUS.up) {
                this.update('u');
            } else if (KEY_STATUS.down) {
                this.update('d');
            }
        }
    }

    this.update = function(d){
        this.arrCol = 0;
        this.arrRow = 0;

        console.log("Current Level: " + this.map.cur_level);
        console.log("Cherry: " + this.cherry);
        console.log("Key: " + this.keyNum);

        // put canvas image
        switch(d){
            case 'l':
                this.arrCol = chkGoLeft(this.x/this.width);
                this.arrRow = Math.round(this.y/this.height);

                if( (this.arrCol >= 0) && (this.map.update(this)) ){
                    this.x -= this.speed;
                }
                break;

            case 'r':
                this.arrCol = chkGoRight(this.x/this.width);
                this.arrRow = Math.round(this.y/this.height);
                if( (this.arrCol < this.map.NUM_ARR_COL) && (this.map.update(this)) ){
                    this.x += this.speed;
                }
                break;

            case 'u':
                this.arrCol = Math.round(this.x/this.width);
                this.arrRow = chkGoUp(this.y/this.height);

                if( (this.y/this.height >= 0) && (this.map.update(this)) ){
                    this.y -= this.speed;
                }
                break;

            case 'd':
                this.arrCol = Math.round(this.x/this.width);
                this.arrRow = chkGoDown(this.y/this.height);
                if( (this.y/this.height < this.map.NUM_ARR_ROW-1) && (this.map.update(this)) ){
                    this.y += this.speed;
                }
                break;

            default:
                break;
        }

        console.log("pX:"+this.x + " " + "pY:" + this.y);
        console.log("------------------------------");

        this.context.drawImage(imageRepo.player, this.x, this.y, this.width, this.height);
    }

/*
    this.checkMove = function(d){
        
        this.update();
    }
*/
}



function Ghost(){

    this.speed = 0.1;

    this.init = function(map){
        if(!map){
            alert("Failed to load map");
            return false;
        }
        this.map = map;
        this.x = Math.floor(Math.random() * this.map.NUM_ARR_COL);    // middle of the map
        this.y = Math.floor(Math.random() * this.map.NUM_ARR_ROW);
        this.width = this.map.tile_width;
        this.height = this.map.tile_height;

        // first move
        this.move();
    }


    this.move = function(playerInfo){
        var dir = Math.floor(Math.random() * 4);    // random four directions
        // console.log("dir: "+dir);
        console.log(playerInfo);
        this.context.clearRect(this.x*this.width, this.y*this.height, this.width, this.height);

        // switch (dir){
        //     case 0: // going left
        //         this.x -= this.speed;

        //     case 1: // going left
        //         this.x += this.speed;

        //     case 2: // going left
        //         this.y -= this.speed;

        //     case 3: // going left
        //         this.y += this.speed;
        // }



        // console.log("gX:"+this.x*this.width + " " + "gY:" + this.y*this.height);
        this.context.drawImage(imageRepo.ghost, this.x*this.width, this.y*this.height, this.width, this.height);

    }
}






















