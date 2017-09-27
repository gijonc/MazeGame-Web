
var imageRepo = new function(){

    const IMG_DIR = "img/";
    // define element images
    this.grass = new Image();
    this.wall = new Image();
    this.key = new Image();
    this.door = new Image();
    this.cherry = new Image();
    this.entrance = new Image();
    this.ghost = new Image();
    this.player = new Image();

    // assert for loading images
    var imgNum = 8;
    var imgLoaded = 0;
    function imageLoaded(i){
        imgLoaded++;
        if(imgLoaded === imgNum){
            windows.init();
        }else{
        }
    }

    this.grass.onload = function(){
        imageLoaded("grass")
    };
    this.wall.onload = function(){
        imageLoaded("wall")
    };
    this.player.onload = function(){
        imageLoaded("player")
    };
    this.key.onload = function(){
        imageLoaded("key")
    };
    this.door.onload = function(){
        imageLoaded("door")
    };
    this.cherry.onload = function(){
        imageLoaded("cherry")
    };
    this.entrance.onload = function(){
        imageLoaded("entrance")
    };
    this.ghost.onload = function(){
         imageLoaded("ghost")
    };

    this.grass.src = IMG_DIR + "grass_1.png";
    this.door.src = IMG_DIR + "door.png";
    this.wall.src = IMG_DIR + "wall.png";
    this.key.src = IMG_DIR + "key_1.png";
    this.cherry.src = IMG_DIR + "cherry.png";
    this.player.src = IMG_DIR + "minion.png";
    this.ghost.src = IMG_DIR + "ghost.png";

    /*

    this.entrance.src = "img/entrance.png";
    */

}

function MazeMap(){

    this.NUM_ARR_COL = 30;  // const
    this.NUM_ARR_ROW = 20;  // const

    this.cur_level = 0;
    this.pX = 0;
    this.pY = 0;

	this.UIinit = function(x, y, width, height) {
        // const value of width/height of each tile (32x32)
        this.tile_width = width;    
        this.tile_height = height;

        this.x = x; // start X-coordinate
        this.y = y; // start Y-coordinate

        // actual width/height of 2d map
        this.canvasWidth = (this.NUM_ARR_COL) * this.tile_width;
        this.canvasHeight = (this.NUM_ARR_ROW) * this.tile_height;
        //console.log("w:"+this.canvasWidth + " " + "h:"+this.canvasHeight);

    }


// setLevel constructs a map based on input raw 2d array 
	this.setLevel = function(level){
		this.charArray = new Array(this.NUM_ARR_ROW);
		// convert raw map data to 20x30 array map
		for (var i = 0; i < level.length; i++){
			this.charArray[i] = level[i].split('');
		}

        // draw on map
		for (var i = 0; i < this.NUM_ARR_ROW; i++){
			for (var j = 0; j < this.NUM_ARR_COL; j++){
                this.context.drawImage(imageRepo.grass, this.x, this.y, this.tile_width, this.tile_height);
                if(level[i][j] == 'E'){
                    this.pX = this.tile_width*j;    // array: row by col, screen pixel: col by row
                    this.pY = this.tile_height*i;
                }
                if(this.charArray[i][j] == '1'){
                    this.context.drawImage(imageRepo.wall, this.x, this.y, this.tile_width, this.tile_height);
                }
                if(this.charArray[i][j] == 'C'){
                    this.context.drawImage(imageRepo.cherry, this.x, this.y, this.tile_width, this.tile_height);
                }
                if(this.charArray[i][j] == 'K'){
                    this.context.drawImage(imageRepo.key, this.x, this.y, this.tile_width, this.tile_height);
                }
                if(this.charArray[i][j] == 'D'){
                    this.context.drawImage(imageRepo.door, this.x, this.y, this.tile_width, this.tile_height);
                }
                // if(this.charArray[i][j] == 'A'){
                //     this.context.drawImage(imageRepo.door, this.x, this.y, this.tile_width, this.tile_height);
                // }
                

                this.x += this.tile_width;
			}
			this.x = 0;
			this.y += this.tile_height;
		}

        this.cur_level++;
	}


    this.update = function(player){
        this.player = player;
        var curRow = this.player.arrRow;
        var curCol = this.player.arrCol;
        var object = ' ';
        
        //console.log("In array:" + this.charArray[this.arrRow][this.arrCol]);
        //console.log("X:" + (curRow) + "  " + "Y:" + (curCol) + "\n");

        object = this.charArray[curRow][curCol];

        switch(object){
            case "1":
                return false;
                break;

            case "C":
                this.player.cherry++;
                this.context.drawImage(imageRepo.grass, curCol*this.tile_width, curRow*this.tile_height, this.tile_width, this.tile_height);
                this.charArray[curRow][curCol] = '0';
                return true;
                break;

            case "K":
                this.player.keyNum++;
                this.context.drawImage(imageRepo.grass, curCol*this.tile_width, curRow*this.tile_height, this.tile_width, this.tile_height);
                this.charArray[curRow][curCol] = '0';
                return true;
                break;

            case "D":
                if(this.player.keyNum > 0){
                    this.player.keyNum--;
                    this.context.drawImage(imageRepo.grass, curCol*this.tile_width, curRow*this.tile_height, this.tile_width, this.tile_height);
                    this.charArray[curRow][curCol] = '0';
                    return true;
                }
                return false
                break;

            default:
                return true;
                break;
        }
        
    }
}








