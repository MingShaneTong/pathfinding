let PriorityQueue = (function(){
  //Container
  class QueueElement{
    constructor(element, cost){
      this.element = element;
      this.cost = cost;
    }
  }

  //PriorityQueue
  return class PriorityQueue{
     constructor(){
       this.items = [];
     }

     //Add a new element in queue
    enqueue = function(element, cost){
      let queueElement = new QueueElement(element, cost);

      //To check if element is added
      let added = false;
      for(let i = 0; i < this.items.length; i++){
        //We are using giving cost to higher numbers
        //If new element has more cost then add it at that place
        if(queueElement.cost < this.items[i].cost){
          this.items.splice(i, 0, queueElement);

          //Mark the flag true
          added = true;
          break;
        }
      }

      //If element is not added
      //Then add it to the end of the queue
      if(!added){
        this.items.push(queueElement);
      }
    }

    //Remove element from the queue
    dequeue = function(){
      return this.items.shift();
    }

    //Return the first element from the queue
    front = function(){
      return this.items[0];
    }

    //Return the last element from the queue
    rear = function(){
      return this.items[this.items.length - 1];
    }

    //Check if queue is empty
    isEmpty = function(){
      return this.items.length == 0;
    }

    //Return the size of the queue
    size = function(){
     return this.items.length;
    }

    //Print the queue
    print = function(){
      for(let i = 0; i < this.items.length; i++){
        console.log(`${this.items[i].element} - ${this.items[i].cost}`);
      }
    }
   }
 }());