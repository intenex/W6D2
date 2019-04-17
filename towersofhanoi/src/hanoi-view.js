const Game = require('./game.js');

class View {
    constructor(game, el) {
        this.game = game;
        this.$el = $(el);
        this.setupTowers();
        // this.render();
        this.clickTower();
    }

    clickTower() {
        const $uls = this.$el.children();
        $uls.on("click", (e) => {
            const $targetPile = $(e.currentTarget)
         
                
                if (this.pileNumber !== undefined) {
                    let origTowers = [];
                    this.game.towers.slice().forEach((el) => {
                        origTowers.push(el.slice());
                    });
                    const successfulMove = this.game.move(this.pileNumber, $targetPile.data('pos'));
                    if (successfulMove) {
                        const diskPile = origTowers[this.pileNumber];
                        const $targetLis = $targetPile.find('li')
                        
                        for (let i = 2; i >= 0; i--) {
                            if ($($targetLis[i]).hasClass('filled')) {
                                //nothing
                            }
                            else {
                                console.log($targetLis[i]);
                                $($targetLis[i]).addClass('filled');
                                console.log(diskPile[i]);
                                $($targetLis[i]).addClass(`disk-${diskPile[diskPile.length-1]}`);
                                for (let k = 0; k < 3; k++) {
                                    let $targetLiThing = $($($uls[this.pileNumber]).children()[k]);
                                    if ($targetLiThing.hasClass('filled')) {
                                        $targetLiThing.removeClass();
                                        break;
                                    }
                                }
                                break;
                            }
                            
                        }
                        if (this.game.isWon()) {
                            alert('You won!!!');
                        }
                    }
                    else {
                        alert('Invalid move');
                    }
                    this.pileNumber = undefined;
                }
                else {
                    this.pileNumber = $targetPile.data('pos');
                }
                
            });
    }

    setupTowers() {
        for (let i = 0; i < 3; i++) {
            const $ul = $("<ul>");
            $ul.data('pos', `${i}`);

            for (let j = 0; j < 3; j++) {
                const $li = $("<li>");
                // $li.addClass("disk-3");
                $ul.append($li);
            }

            if (i === 0) {
                $ul.children().each((idx, el) => {
                    const $el = $(el);
                    $el.addClass(`disk-${idx+1}`);
                    $el.addClass('filled');
                });
            }

            this.$el.append($ul);
        }
    }

    // render() {

    // }
}

module.exports = View;