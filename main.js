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
  // 控制速度
  document
    .querySelector("#id-input-speed")
    .addEventListener("input", function(event) {
      var input = event.target;
      window.fps = Number(input.value);
    });
};

var __main = function() {
  var images = {
    bullet: "img/bullet.png",
    cloud: "img/cloud.png",
    player: "img/player.png",
    sky: "img/sky.png",
    enemy0: "img/enemy0.png",
    enemy1: "img/enemy1.png",
    enemy2: "img/enemy2.png",
  };

  var game = GuaGame.instance(30, images, function(g) {
    var s = Scene.new(g);
    g.runWithScene(s);
  });

  enableDebugMode(game, true);
};

__main();
