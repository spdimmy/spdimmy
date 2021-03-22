document.addEventListener('DOMContentLoaded', function () {
  (function () {
    const triggerElement = document.querySelector('.fun-block__title');
    const phrases = [
      `This's my webpage`,
      `GO!`,
      `.!.`,
      `Log Out`,
    ];

    let step = 1;
    let prevStep = null;

    const symbolsCount = 80;

    function updateContent() {
      triggerElement.textContent = phrases[step - 1];
    }

    function updateClass() {
      // Remove prev class
      if (prevStep !== null) triggerElement.classList.remove(`fun-block__title--step-${prevStep}`);

      triggerElement.classList.add(`fun-block__title--step-${step}`);

    }

    function click() {
      navigator.vibrate(40);
      update();
    }

    function update() {
      if (step > phrases.length) step = 1;

      updateContent();
      updateClass();

      // Transit
      if (step === 2) {
        navigator.vibrate(400);
        triggerElement.addEventListener('animationend', update);
      }

      if (step === 3) {
        // Add symbols with timeout
        for (let i = 0; i < symbolsCount; i++) {
          setTimeout(() => {
            triggerElement.textContent += ' .!.';
            navigator.vibrate(20);
            if (i === symbolsCount - 1) update();
          }, 30 * i);
        }
      }

      prevStep = step;
      step++;
    }

    update();
    triggerElement.addEventListener('click', click);
  })();
});
