class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    this.$el.on("click", "li", (e) => {
      const $li = $(e.currentTarget);
      const pos = $li.data("pos").split(",").map((num) => {return parseInt(num);});
      this.game.playMove(pos);
      $li.text(this.game.currentPlayer);
      (this.game.isOver()) ? alert(`${this.game.currentPlayer} wins!`) : undefined;
      
    })
  }

  makeMove($square) {}

  setupBoard() {
    const $board = $("<ul>");
    $board.css('display', 'flex');
    $board.css('width', '300');
    $board.css('flex-wrap', 'wrap');
    for (let i = 0; i < 9; i++) {
      const $tile = $("<li>");

      const x = i % 3;
      const y = Math.floor(i / 3);

      $tile.data("pos", `${x},${y}`);
      $tile.css('width', '90');
      // $tile.css('background-color', 'lightgray');
      $board.append($tile);
    }
    this.$el.append($board);
  }
}

module.exports = View;
