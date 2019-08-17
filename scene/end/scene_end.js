class SceneEnd extends GuaScene {
  constructor(game) {
    super(game);
    game.registerAction("r", function() {
      var s = SceneTitle.new(game);
      game.replaceScene(s);
    });
  }

  static new(game) {
    var i = new this(game);
    return i;
  }

  draw() {
    // draw labels
    this.game.context.fillText("游戏结束, 按 r 重玩返回标题界面", 100, 290);
  }
}
