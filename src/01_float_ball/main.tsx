import React from "react";
import { render } from "react-dom";
// import { createRoot } from "react-dom/client";
import "./main.less";

window.addEventListener("load", async () => {
  "use strict";

  const div = document.createElement("div");
  div.setAttribute("id", "float-ball");
  div.innerText = "ball";
  document.body.append(div);

  const dragger = (dom: HTMLElement) => {
    let prevScrollLeft = 0;
    let prevScrollTop = 0;

    // change the floating position when scrolling
    document.addEventListener("scroll", () => {
      const scrollLeftLen =
        document.documentElement.scrollLeft || document.body.scrollLeft;
      const scrollToptLen =
        document.documentElement.scrollTop || document.body.scrollTop;

      const domCurLeft = Number(getComputedStyle(dom).left.replace("px", ""));
      const domCurTop = Number(getComputedStyle(dom).top.replace("px", ""));

      dom.style.left = domCurLeft + scrollLeftLen - prevScrollLeft + "px";
      dom.style.top = domCurTop + scrollToptLen - prevScrollTop + "px";

      prevScrollLeft = scrollLeftLen;
      prevScrollTop = scrollToptLen;
    });

    const mousedownEvent = (e: MouseEvent) => {
      e.preventDefault();

      const diffLeft = e.clientX - dom.offsetLeft;
      const diffTop = e.clientY - dom.offsetTop;

      const mousemoveEvent = (e: MouseEvent) => {
        const scrollLeftLen =
          document.documentElement.scrollLeft || document.body.scrollLeft;
        const scrollToptLen =
          document.documentElement.scrollTop || document.body.scrollTop;

        const domLeft = e.clientX - diffLeft;
        const domTop = e.clientY - diffTop;

        const domCurWidth = Number(
          getComputedStyle(dom).width.replace("px", "")
        );
        const domCurHeight = Number(
          getComputedStyle(dom).height.replace("px", "")
        );

        if (
          domLeft >= scrollLeftLen &&
          domLeft <= window.innerWidth + scrollLeftLen - domCurWidth
        ) {
          dom.style.left = domLeft + "px";
        }
        if (
          domTop >= scrollToptLen &&
          domTop <= window.innerHeight + scrollToptLen - domCurHeight
        ) {
          dom.style.top = domTop + "px";
        }
      };

      const mouseupEvent = () => {
        document.removeEventListener("mousemove", mousemoveEvent);
        document.removeEventListener("mouseup", mouseupEvent);
      };

      document.addEventListener("mouseup", mouseupEvent);
      document.addEventListener("mousemove", mousemoveEvent);
    };

    dom.addEventListener("mousedown", mousedownEvent);
  };

  dragger(div);

  const App = () => <div>this is a div</div>;

  render(<App />, document.getElementById("float-ball"));
  // createRoot(document.getElementById("float-ball")).render(<App />);
  console.log('call')
});
