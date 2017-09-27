// keyboard events
const KEY_CODES = {
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
}

const KEY_STATUS = {};
for (code in KEY_CODES) {
    KEY_STATUS[ KEY_CODES[ code ]] = false;
}

document.onkeydown = function(e) {
  // Firefox and opera use charCode instead of keyCode to
  // return which key was pressed.
    var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
    if (KEY_CODES[keyCode]) {
        e.preventDefault();
        KEY_STATUS[KEY_CODES[keyCode]] = true;
    }
}

document.onkeyup = function(e) {
  var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODES[keyCode]) {
    e.preventDefault();
    KEY_STATUS[KEY_CODES[keyCode]] = false;
  }
}




/*  check when moving left:
    prevent LEFT side of the player img overlaps with the wall
*/
function chkGoLeft(n){
    if ( (n - Math.floor(n)) < 0.9){
        return Math.floor(n);
    }
    return Math.round(n);
}
/*  check when moving right:
    prevent RIGHT side of the player img overlaps with the wall
*/
function chkGoRight(n){

    if ( (n+1) - Math.floor(n+1) > 0.1){
        return Math.floor(n+1);
    }
    return Math.round(n);
}
/*  check when moving up:
    prevent top side of the player img overlaps with the wall
*/
function chkGoUp(n){
    if ( (Math.round(n) - n) >= 0.9){
        return Math.round(n);
    }
    return Math.floor(n);
}

/*  check when moving down:
    prevent bottom side of the player img overlaps with the wall
*/
function chkGoDown(n){
    if ( (n+1) > Math.floor(n+1)){
        return Math.floor(n+1);
    }
    return Math.round(n+1);
}