document.addEventListener("DOMContentLoaded", function(){

	var container = document.getElementById('container');
	var key = [];
	var direction = 0;
	var snake = [];
	var s = 0;
	var last = 2;
	var score = 0;
	var speed = 500;
	var steer;
	var appleX, appleY;
	var apple;
	var canChange = true;

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

    function changeSnake(x, y){
    	var lastSnake = document.getElementById(last);
    	lastSnake.style.left = x + 'px';
    	lastSnake.style.top = y + 'px';
    	snake.splice(0, 0, snake[last]);
    	snake.splice(last, 1);
		snake[0][0] = x;
		snake[0][1] = y;
		--last;
		if (last < 0) {
			last = s - 1;
		}
    }

	function makeApple(){
		appleX = 25 * Math.floor(Math.random() * 32);
		appleY = 25 * Math.floor(Math.random() * 18);
		apple = document.createElement('div');
		apple.className = 'apple';
		apple.style.left = appleX + 'px';
		apple.style.top = appleY + 'px';
		container.appendChild(apple);
	}

	function start(){
		var menu = document.getElementById('menu');
		var easy = document.getElementById('easy');
		var medium = document.getElementById('medium');
		var hard = document.getElementById('hard');
		var start = document.getElementById('start');

		easy.addEventListener('click', function(){
			speed = 500;
			start.style.visibility = 'visible';
		});
		medium.addEventListener('click', function(){
			speed = 300;
			start.style.visibility = 'visible';
		});
		hard.addEventListener('click', function(){
			speed = 100;
			start.style.visibility = 'visible';
		});

		start.addEventListener('click', function(){
			menu.style.visibility = 'hidden';
			start.style.visibility = 'hidden';
			initialSnake();
			setInterval(move, speed);
			steer = setInterval(steering, 50);
			makeApple();
		});		
	}

	function gameOver(){
		var end = document.getElementById('end');
		direction = -1;
		clearInterval(steer);
		end.innerHTML = 'GAME OVER!</br>Your score: ' + score + '</br>Click to play again';
		end.style.visibility = 'visible';
		document.addEventListener('click', function(){
			location.reload();
		});
	}

	function steering(){
		for(var i = 0; i < key.length; i ++){
	        if(key[i]){
	            switch (i) {
	            	case 37: // left
	                	if (direction != 2 && canChange) {
	                		direction = 0;
	                		canChange = false;
	                	}	                	
	                break;

	                case 38: // up
	                	if (direction != 3 && canChange) {
	                		direction = 1;
	                		canChange = false;
	                	}
	                break;

	                case 39: // right
	                    if (direction != 0 && canChange) {
	                		direction = 2;
	                		canChange = false;
	                	}
	                break;
	             
	                case 40: // down
	                	if (direction != 1 && canChange) {
	                		direction = 3;
	                		canChange = false;
	                	}
	                break;
	            }
	        }
	    }
	}

	function move(){
		// for (var i = 3; i < snake.length; i++) {
		// 	if ((snake[0][0] === snake[i][0] + 25 && direction === 0) ||
		// 	(snake[0][0] === snake[i][0] - 25 && direction === 2) ||
		// 	(snake[0][1] === snake[i][1] + 25 && direction === 1) ||
		// 	(snake[0][1] === snake[i][1] - 25 && direction === 3)) {
		// 		gameOver();
		// 	}
		// }
		if ((snake[0][0] === 0 && direction === 0) ||
			(snake[0][0] === 775 && direction === 2) ||
			(snake[0][1] === 0 && direction === 1) ||
			(snake[0][1] === 425 && direction === 3)) {
			gameOver();
		}
		if (snake[0][0] === appleX && snake[0][1] === appleY) {
			apple.remove();
			score += 10;
			switch(direction){
				case 0:
					snakePart(snake[0][0] - 25, snake[0][1]);
	            break;

	            case 1:
	            	snakePart(snake[0][0], snake[0][1] - 25);
	            break;

	            case 2:
	            	snakePart(snake[0][0] + 25, snake[0][1]);
	            break;

	            case 3:
	            	snakePart(snake[0][0], snake[0][1] + 25);
	            break;
			}
			makeApple();
		}
		canChange = true;
		switch(direction){
			case 0:
				x = snake[0][0] - 25;
				y = snake[0][1];
				changeSnake(x, y);
            break;

            case 1:
            	x = snake[0][0];
				y = snake[0][1] - 25;
				changeSnake(x, y);
            break;

            case 2:
            	x = snake[0][0] + 25;
				y = snake[0][1];
				changeSnake(x, y);
            break;

            case 3:
            	x = snake[0][0];
				y = snake[0][1] + 25;
				changeSnake(x, y);
            break;
		}
	}

	start();	
});