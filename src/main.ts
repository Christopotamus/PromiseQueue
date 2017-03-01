import { Queue } from './queue';

export class Program {
  private queue: Queue = new Queue();

  constructor(){

  }
  public main(){
    console.log("1");
    this.test1("2").then( (result) => {
      console.log(result);
    }); 
    this.test2("3").then( (result) => {
      console.log(result);
    }); 

    this.queue.queue(this.test2("one"), (result) => {console.log(result)});
    this.queue.fire(); 
    this.queue.queue(this.test1("two"),(result) => {
        console.log(result); 
      }
    );
    this.queue.fire(); 
    this.queue.fire(); 
    this.queue.queue(this.test2("three"),(result) => {
        console.log(result);
      }
    );
    this.queue.fire(); 
    //output needs to be 1 2 3
  }

  private test1(value: string): Promise<any>{
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(value);
      }, 3000);
    });
  }
  private test2(value: string): Promise<any>{
    return new Promise((resolve, reject) => {
      resolve(value);
    });
  }
}
let p = new Program();

p.main();
