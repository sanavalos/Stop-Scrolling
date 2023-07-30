(function () {
  var scrolling = false;
  var activatedScrolling;
  var savedActivatedScrolling;

  window.addEventListener('scroll', scrollEventHandler);

  function scrollEventHandler() {
    if (scrolling) {
      var nowTime = Date.now();
      if (activatedScrolling + 15000 < nowTime) {
        showScrollModal();
        scrolling = false;
      }
    } else {
      if (activatedScrolling && activatedScrolling + 15000 < Date.now()) {
        activatedScrolling = savedActivatedScrolling;
      }
      activatedScrolling = Date.now();
      savedActivatedScrolling = activatedScrolling;
      scrolling = true;
    }
  }

  function showScrollModal() {
    var modal = document.createElement('div');
    modal.id = 'scrollModal';

    var message = document.createElement('p');
    message.textContent = 'You have been scrolling for more than 15 seconds!';
    modal.appendChild(message);

    var okButton = document.createElement('button');
    okButton.id = 'scrollModalOkButton';
    okButton.textContent = 'OK';
    okButton.addEventListener('click', function () {
      clearTimeout(modalTimeout);
      scrolling = false;
      document.body.removeChild(modal);
    });
    modal.appendChild(okButton);

    document.body.appendChild(modal);

    modalTimeout = setTimeout(function () {
      scrolling = false;
      document.body.removeChild(modal);
    }, 10000);
  }

  window.scrollDetection = {
    stop: function () {
      window.removeEventListener('scroll', scrollEventHandler);
      if (modalTimeout) {
        clearTimeout(modalTimeout);
      }
    },
  };
})();