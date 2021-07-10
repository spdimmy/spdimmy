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
      step++;

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
    }

    triggerElement.addEventListener('click', click, false);
  })();

  (function () {
    const draggableEl = document.querySelector('.header');
    const dragTrigger = document.querySelector('.header__drag');
    const secretArea = document.querySelector('.header__secret');
    const headerHeight = getComputedStyle(document.documentElement).getPropertyValue('--header-height');

    let isDragged = false;
    let startPosition = null;
    let prevPosition = null;
    let currentPosition = null;

    let vibrateDistance = 0;

    let dragDirection = null;

    function updateTranslate() {
      draggableEl.style.transform = `translateY(${currentPosition}px) translateY(-${headerHeight})`;
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
      vibrateDistance = 0;

      // Whether stick header to the end or not
      currentPosition > window.innerHeight / (dragDirection === 'down' ? 4 : 1.3)
          ? draggableEl.style.transform = `translateY(${window.innerHeight}px) translateY(-${headerHeight})`
          : draggableEl.style.transform = ``;

      draggableEl.style.transition = 'transform 0.5s ease-out';
      draggableEl.addEventListener('transitionend', () => draggableEl.style.transition = '');
    }

    function dragMove(e) {
      if (!isDragged) return;

      currentPosition = e.clientY || e.touches[0].clientY;
      updateTranslate();

      if (currentPosition > vibrateDistance + 40) {
        navigator.vibrate(30);
        vibrateDistance = currentPosition;
      }

      dragDirection = currentPosition > prevPosition ? 'down' : 'up';
      prevPosition = currentPosition;

      console.log(dragDirection);

      // Show secret zone if drag more than 1/4
      currentPosition > window.innerHeight / 4
          ? secretArea.classList.add('header__secret--visible')
          : secretArea.classList.remove('header__secret--visible');
    }

    dragTrigger.addEventListener('mousedown', dragStart, false);
    dragTrigger.addEventListener('touchstart', dragStart, false);
    document.addEventListener('mousemove', dragMove, true);
    document.addEventListener('touchmove', dragMove, true);
    document.addEventListener('mouseup', dragEnd, false);
    document.addEventListener('touchend', dragEnd, false);
  })();
});