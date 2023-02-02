"use strict"

let timer = Date.now();
let res;

class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}
class AllError extends MyError {
  constructor(message, error) {
    super(message);
    this.error = error;
  }
}
class SumError extends MyError {
  constructor(param) {
    super(`Wrong parameter ${param}`);
  }
}


function checkError(func, ...args) {
  let result;

  try {
    result = func.call(this, ...args);
    }

  catch(err) {
    if (err instanceof SumError) {
      throw new AllError("SumError", err);
    } else if(err instanceof SyntaxError) { throw new AllError("SyntaxError", err);
    } else {throw err}
  } finally {
    if( typeof result == "number" ) return result;
  }
}


function sum(a, b) {

  if(a < 0) throw new SumError(a);
  else if (b < 0) throw new SumError(b);
  if(typeof a != "number" || typeof b != "number") throw new SyntaxError("Agrument is'nt number");
  // throw new Error("undefined error");

  return a + b;
}


try {
  res = checkError(sum, 1, 2);
}

catch(err) {
  if(err instanceof AllError) {
    alert("Base Error: " + err.error.name);
    console.log(err.error.stack);
  } else {
  alert("undefined error " + err.name);
  console.log(err.stack);
  }
} finally {
  // console.log("Script work " + (Date.now() - timer) + " ms");
}

// (isFinite(res)) ? console.log("Succes result: " + res) : console.log("Wrong result!");
