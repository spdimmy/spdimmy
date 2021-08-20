import React, { useEffect } from "react";

const FunBlock = () => {
  useEffect(() => {
    const triggerElement = document.querySelector(".fun-block__title");
    const phrases = [`This's my webpage`, `GO!`, `<3`, `Log Out`];

    let step = 1;
    let prevStep = null;

    const symbolsCount = 80;

    function updateContent() {
      triggerElement.textContent = phrases[step - 1];
    }

    function updateClass() {
      // Remove prev class
      if (prevStep !== null)
        triggerElement.classList.remove(`fun-block__title--step-${prevStep}`);

      triggerElement.classList.add(`fun-block__title--step-${step}`);
    }

    function click() {
      navigator.vibrate(40);
      update();
    }

    function update() {
      step++;

      if (step > phrases.length) step = 1;

      updateContent();
      updateClass();

      // Transit
      if (step === 2) {
        navigator.vibrate(400);
        triggerElement.addEventListener("animationend", update);
      }

      if (step === 3) {
        triggerElement.removeEventListener("animationend", update);

        // Add symbols with timeout
        for (let i = 0; i < symbolsCount; i++) {
          setTimeout(() => {
            triggerElement.textContent += " <3";
            navigator.vibrate(20);
            if (i === symbolsCount - 1) update();
          }, 30 * i);
        }
      }

      prevStep = step;
    }

    triggerElement.addEventListener("click", click, false);
  }, []);

  return (
    <section id="bounce-harm" className="fun-block">
      <h1 className="fun-block__title fun-block__title--step-1">
        This's my webpage
      </h1>
    </section>
  );
};

export default FunBlock;
