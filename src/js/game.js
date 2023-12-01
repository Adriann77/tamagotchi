"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tamagotchi_1 = require("./modules/tamagotchi");
var eatBtn = document.querySelector('.hunger');
var sleepBtn = document.querySelector('.sleep');
var playBtn = document.querySelector('.fun');
var restartBtn = document.querySelector('.restart');
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.start = function (_a) {
            var healthElement = _a.healthElement, hungerElement = _a.hungerElement, energyElement = _a.energyElement, funElement = _a.funElement;
            _this.tamagotchi.mount({ healthElement: healthElement, hungerElement: hungerElement, energyElement: energyElement, funElement: funElement });
            eatBtn.addEventListener('click', function () {
                _this.tamagotchi.setStateEating();
            });
            sleepBtn.addEventListener('click', function () {
                _this.tamagotchi.setStateSleeping();
            });
            playBtn.addEventListener('click', function () {
                _this.tamagotchi.setStatePlaying();
            });
            restartBtn.addEventListener('click', function () {
                _this.tamagotchi.handleRestart();
                _this.tamagotchi.mount({ healthElement: healthElement, hungerElement: hungerElement, energyElement: energyElement, funElement: funElement });
            });
        };
        this.tamagotchi = new tamagotchi_1.default();
    }
    return Game;
}());
exports.default = Game;
