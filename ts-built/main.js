"use strict";
var queue_1 = require("./queue");
var Program = (function () {
    function Program() {
        this.queue = new queue_1.Queue();
    }
    Program.prototype.main = function () {
        console.log("1");
        this.test1("2").then(function (result) {
            console.log(result);
        });
        this.test2("3").then(function (result) {
            console.log(result);
        });
        this.queue.queue(this.test2("one"), function (result) { console.log(result); });
        this.queue.fire();
        this.queue.queue(this.test1("two"), function (result) {
            console.log(result);
        });
        this.queue.fire();
        this.queue.fire();
        this.queue.queue(this.test2("three"), function (result) {
            console.log(result);
        });
        this.queue.fire();
        //output needs to be 1 2 3
    };
    Program.prototype.test1 = function (value) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(value);
            }, 3000);
        });
    };
    Program.prototype.test2 = function (value) {
        return new Promise(function (resolve, reject) {
            resolve(value);
        });
    };
    return Program;
}());
exports.Program = Program;
var p = new Program();
p.main();
