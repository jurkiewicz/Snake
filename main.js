document.addEventListener("DOMContentLoaded", function(){

	var container = document.getElementById('container');
	var key = [];
	var direction = 0;
	var snake = [];
	var s = 0;
	var last;

	onkeydown = onkeyup = function (e){
        var e = e || event;
        key[e.keyCode] = e.type == 'keydown';
    }

    function snakePart(x, y){
		snake[s] = document.createElement('div');
		snake[s].id = s;
		snake[s].className = 'snake';
		snake[s].style.left = x + 'px';
		snake[s].style.top = y + 'px';
		container.appendChild(snake[s]);
		snake[s] = [x, y];
		s++;
    }

    function initialSnake(){
    	x = 350;
		y = 250;
		for (var i = 0; i < 3; i++) {
			snakePart(x, y);
			x += 25;
		}
    }
    initialSnake();

    function changeSnake(x, y, z){
    	var lastSnake = document.getElementById(last);
    	lastSnake.style.left = x + 'px';
    	lastSnake.style.top = y + 'px';
    	snake.splice(0, 0, snake[last]);
    	snake.splice(last, 1);
		snake[0][0] = x;
		snake[0][1] = y;
		--last;
		if (last < 0) {
			last = 2;
		}
    }

	function apple(){
		x = 25 * Math.floor(Math.random() * 32);
		y = 25 * Math.floor(Math.random() * 18);
		var apple = document.createElement('div');
		apple.className = 'apple';
		apple.style.left = x + 'px';
		apple.style.top = y + 'px';
		container.appendChild(apple);
	}

	function steering(){
		for(var i = 0; i < key.length; i ++){
	        if(key[i]){
	            switch (i) {
	            	case 37: // left
	                	if (direction != 2) {
	                		direction = 0;
	                	}	                	
	                break;

	                case 38: // up
	                	if (direction != 3) {
	                		direction = 1;
	                	}
	                break;

	                case 39: // right
	                    if (direction != 0) {
	                		direction = 2;
	                	}
	                break;
	             
	                case 40: // down
	                	if (direction != 1) {
	                		direction = 3;
	                	}
	                break;
	            }
	        }
	    }
	}
	for (var i = 0; i < snake.length; i++) {
			last = i;
	}

	function move(){
		console.log(last);
		switch(direction){
			case 0:
				x = snake[0][0] - 25;
				y = snake[0][1];
				changeSnake(x, y, last);
            break;

            case 1:
            	x = snake[0][0];
				y = snake[0][1] - 25;
				changeSnake(x, y, last);
            break;

            case 2:
            	x = snake[0][0] + 25;
				y = snake[0][1];
				changeSnake(x, y, last);
            break;

            case 3:
            	x = snake[0][0];
				y = snake[0][1] + 25;
				changeSnake(x, y, last);
            break;
		}
	}

	setInterval(move, 500);

	setInterval(steering, 50);
});