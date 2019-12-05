class Output {
  constructor(text) {
    this.text = text;
  }
  show() {
    $("#output").append(`<p>${this.text}</p>`);

  }
}

class AsyncTest {
  getAsyncArr() {
    const runInParallel = async() => {
      return await Promise.all([this.runAfterOneSec(), this.runAfterTwoSec()]);
    };
    return runInParallel();
  }
  parllelUrlLoad() {
    const loadUrls = async() => {
      return await Promise.all([
        this.sendHTTP('https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/load_event'),
        this.sendHTTP('https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest'),
      ]);
    };
    return loadUrls();
  }
  runPromise(delayInSec) {
    return new Promise(resolve => {
      setTimeout(() => resolve(`${delayInSec} sec.`), delayInSec * 1000);
    });
  }
  runAfterOneSec() {
    return this.runPromise(1);
  }
  runAfterTwoSec() {
    return this.runPromise(5);
  }
  sendHTTP(url) {
    return new Promise((resolve, reject) => {
      const oReq = new XMLHttpRequest();
      oReq.addEventListener('load', pe => { resolve(pe) });
      oReq.addEventListener('error', pe => { reject(pe) });
      oReq.open('GET', url);
      oReq.send();
    });
  }
}

function someFunction() {

  /*  new AsyncTest().getAsyncArr().then(resolve => {
      resolve.forEach(element => { new Output(element).show(); });
    });
  */

  const asyncTest = new AsyncTest();
  for (let i = 0; i < 2; i++) {
    asyncTest.parllelUrlLoad()
      .then(response => response.forEach(element => { new Output(element.type).show(); }))
      .catch(response => new Output(response.type).show());
  }


  /*  new AsyncTest().sendHTTP('https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/load_event')
      .then(resolve => console.log(resolve.type))
      .catch(reject => console.log(reject.type));
  */
}
