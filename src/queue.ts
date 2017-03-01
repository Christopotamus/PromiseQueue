export class Queue{
  private funcQueue: Array<any> = [];
  private isProcessing = false;
  constructor(){

  }
  private queue(promiseFunction, callback): any{
    let p = new Promise((resolve, reject) =>{
        resolve([promiseFunction, callback]);
    });
    this.funcQueue.push(p);
    this.fire();
  }
  public fire(){
    if(this.funcQueue.length > 0 && this.isProcessing == false){
      this.isProcessing = true;
      let f = this.funcQueue.shift();
      f.then((result) => {
        result[0].then((innerResult) => {
          result[1](innerResult);
          this.isProcessing = false;
          this.fire();
        });
      });
    }
  }
}
