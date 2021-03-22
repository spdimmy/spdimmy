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
        triggerElement.removeEventListener('animationend', update);

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
    triggerElement.addEventListener('click', click, false);
  })();

  (function () {
    const draggableEl = document.querySelector('.header');
    const dragTrigger = document.querySelector('.header__drag');
    const headerHeight = getComputedStyle(document.documentElement).getPropertyValue('--header-height');

    let isDragged = false;
    let startPosition = null;

    let vibrateDistance = 0;

    function updateTranslate(top) {
      draggableEl.style.transform = `translateY(${top}px) translateY(-${headerHeight})`;
    }

    function dragStart(e) {
      isDragged = true;
      draggableEl.style.transition = '';
      startPosition = e.clientY || e.touches[0].clientY;
    }

    function dragEnd() {
      if (!isDragged) return;
      isDragged = false;
      startPosition = null;
      draggableEl.style.transform = '';
      draggableEl.style.transition = 'transform 0.5s ease-out';
      vibrateDistance = 0;

      draggableEl.addEventListener('transitionend', () => draggableEl.style.transition = '');
    }

    function dragMove(e) {
      if (!isDragged) return;

      const pos = e.clientY || e.touches[0].clientY;
      updateTranslate(pos);

      if (pos > vibrateDistance + 40) {
        navigator.vibrate(30);
        vibrateDistance = pos;
      }
    }

    dragTrigger.addEventListener('mousedown', dragStart, false);
    dragTrigger.addEventListener('touchstart', dragStart, false);
    document.addEventListener('mousemove', dragMove, true);
    document.addEventListener('touchmove', dragMove, true);
    document.addEventListener('mouseup', dragEnd, false);
    document.addEventListener('touchend', dragEnd, false);
  })();
});
