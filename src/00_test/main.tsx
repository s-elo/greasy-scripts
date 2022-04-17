window.addEventListener("load", () => {
  "use strict";
  console.log("start");
  const arr = new Array(3).fill(0).map((_, i) => i + 1);
  let promise = Promise.resolve();

  for (const n of arr) {
    promise = promise.then(
      () =>
        new Promise<void>((res) =>
          setTimeout(() => {
            console.log(n);
            res();
          }, 1000)
        )
    );
  }

  promise.then(() => console.log("done"));
});
