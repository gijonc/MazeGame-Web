

function Game(){

    const TILE_LENG = 30;
    const START_LEVEL = level1;

    this.grassLayer = document.getElementById('grassLayer');
    this.playerLayer = document.getElementById('playerLayer');
    this.ghostLayer = document.getElementById('ghostLayer');
    
    this.statusLayer = document.getElementById('statusLayer');

    // first to check if canvas is suppoted
    if (this.grassLayer.getContext){
        this.grassContext = this.grassLayer.getContext('2d');
        this.playerContext = this.playerLayer.getContext('2d');
        this.ghostContext = this.ghostLayer.getContext('2d');
        this.statusContext = this.statusLayer.getContext('2d');

        MazeMap.prototype.context = this.grassContext;
        Player.prototype.context = this.playerContext;
        Ghost.prototype.context = this.ghostContext;

        this.map = new MazeMap();
        this.player = new Player();
        this.ghost = new Ghost();

        this.map.UIinit(0,0,TILE_LENG,TILE_LENG);
        this.map.setLevel(START_LEVEL);

        //this.object.init(this.map);

        this.player.init(this.map);
        this.ghost.init(this.map);

    }else{
        console.log("Failed to load context");
        return false;
    }

    function Update(){
        this.player.move();
        this.ghost.move(this.player);
        requestAnimationFrame(Update);
    }
    requestAnimationFrame(Update);
}



