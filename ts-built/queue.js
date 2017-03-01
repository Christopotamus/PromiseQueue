"use strict";
var Queue = (function () {
    function Queue() {
        this.funcQueue = [];
        this.isProcessing = false;
    }
    Queue.prototype.queue = function (promiseFunction, callback) {
        var p = new Promise(function (resolve, reject) {
            resolve([promiseFunction, callback]);
        });
        this.funcQueue.push(p);
        this.fire();
    };
    Queue.prototype.fire = function () {
        var _this = this;
        if (this.funcQueue.length > 0 && this.isProcessing == false) {
            this.isProcessing = true;
            var f = this.funcQueue.shift();
            f.then(function (result) {
                result[0].then(function (innerResult) {
                    result[1](innerResult);
                    _this.isProcessing = false;
                    _this.fire();
                });
            });
        }
    };
    return Queue;
}());
exports.Queue = Queue;
