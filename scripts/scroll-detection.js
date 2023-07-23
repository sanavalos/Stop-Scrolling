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
    modal.style.position = 'fixed';
    modal.style.top = '25px';
    modal.style.right = '30px';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.width = '300px';
    modal.style.padding = '20px';
    modal.style.background = '#ffffff';
    modal.style.border = '1px solid #000000';
    modal.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
    modal.style.textAlign = 'center';
    modal.style.fontFamily = 'Arial, sans-serif';
    modal.style.borderRadius = '12px';

    var message = document.createElement('p');
    message.textContent = 'You have been scrolling for more than 15 seconds!';
    modal.appendChild(message);

    var okButton = document.createElement('button');
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