class GuaScene {
  constructor(game) {
    this.game = game;
  }
  draw() {}
  update() {}
}

class SceneTitle extends GuaScene {
  constructor(game) {
    super(game);
    game.registerAction("k", function() {
      var s = Scene(game);
      game.replaceScene(s);
    });
  }

  static new(game) {
    var i = new this(game);
    return i;
  }

  draw() {
    // draw labels
    this.game.context.fillText("按 k 开始游戏", 100, 190);
  }
}
