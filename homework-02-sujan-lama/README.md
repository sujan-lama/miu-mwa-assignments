# MWA Homework 02 - NodeJS 01

## Written Exercises

1.  Explain why do we want sometimes to use `setImmediate` instead of using `setTimeout`?</br>
    ->
    `setImmediate` is used when you want to execute function right after the poll functions finish and `setTimeout` is used when you want to execute a function after some delay after all the event loop finished.</br></br>
    `setImmediate` has more priority than `setTimeout` so if you want immediate execution, it is used instead of `setTimeout`

2.  Explain the difference between `process.nextTick` and `setImmediate`?</br>
    -> `process.nextTick` has higher priority and executed first before all event queues while `setImmediate` goes into event queue and has lower priority than `process.nextTick`.

3.  Name 10 core modules that Node provides by default, and 10 of the Global objects?
    ->
    Core Modules:
    
    1. http
    1. cluster
    1. querystring
    1. path 
    1. child-process 
    1. util
    1. assert
    1. fs 
    1. v8 
    1. events 
    
    Global objects:
    
       1. Buffer
       1. console
       1. URL 
       1. global 
       1. process
       1. setInterval() and clearInterval() 
       1. setTimeout() and clearTimeout() 
       1. setImmediate() and clearImmediate() 
       1. \_\_dirname 
       1. module

## Exercise 02

Complete the necessary Node code to make `process(array)` function work asynchronously, the function returns:

- Sub-array of all the positive numbers, if the sum of the positive numbers was bigger than the sum of negative numbers
- Sub-array of all the negative numbers, if the sum of the negative numbers was bigger than the sum of the positive numbers

```javascript
// your Node code here...
console.log("start");
process([4, -6, -3, 7]).then(console.log);
process([-7, 3, -2, 4]).then(console.log);
console.log("end");

// Test your code in Node.JS CLI, Output:
// start
// end
// returns [4,7] because (4 + 7) > 0 -(-6 + -3)
// returns [-7, -2] because 0 -(-7 + -2) > (3 + 4)
```

**Practice:** Try to solve the exercise in many ways.
