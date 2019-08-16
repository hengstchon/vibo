var loadLevel = function(game, n) {
  n = n - 1;
  level = levels[n];
  var blocks = [];
  for (var i = 0; i < level.length; i++) {
    var p = level[i];
    var b = Block(game, p);
    blocks.push(b);
  }
  return blocks;
};

var enableDebugMode = function(game, enable) {
  if (!enable) {
    return;
  }
  window.paused = false;
  window.addEventListener("keydown", function(event) {
    var k = event.key;
    if (k == "p") {
      // 暂停功能
      paused = !paused;
    } else if ("1234567".includes(k)) {
      // 为了 debug 临时加入的载入关卡功能
      blocks = loadLevel(game, Number(k));
    }
  });
};
// 控制速度
document
  .querySelector("#id-input-speed")
  .addEventListener("input", function(event) {
    var input = event.target;
    window.fps = Number(input.value);
  });

var __main = function() {
  var images = {
    ball: "ball.png",
    block: "block.png",
    paddle: "paddle.png",
  };

  var game = GuaGame(30, images, function(g) {
    var score = 0;
    var paddle = Paddle(game);
    var ball = Ball(game);

    blocks = loadLevel(game, 1);

    game.registerAction("a", function() {
      paddle.moveLeft();
    });

    game.registerAction("d", function() {
      paddle.moveRight();
    });

    game.registerAction("f", function() {
      ball.fire();
    });

    game.update = function() {
      if (paused) {
        return;
      }
      ball.move();
      // 判断相撞
      if (paddle.collide(ball)) {
        ball.fantan();
      }

      // 判断 ball 和 blocks 相撞
      for (var i = 0; i < blocks.length; i++) {
        var block = blocks[i];
        if (block.collide(ball)) {
          block.kill();
          ball.fantan();
          // 更新分数
          score += 100;
        }
      }
    };

    game.draw = function() {
      // draw
      game.drawImage(paddle);
      game.drawImage(ball);

      // draw blocks
      for (var i = 0; i < blocks.length; i++) {
        var block = blocks[i];
        if (block.alive) {
          game.drawImage(block);
        }
      }

      // draw labels
      game.context.fillText("分数：" + score, 10, 290);
    };
  });

  enableDebugMode(game, true);
};

__main();
