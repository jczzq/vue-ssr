(function() {
  function getSize() {
    var innerWidth = window.innerWidth;
    if (innerWidth === 375) {
      return;
    }
    let rfs = 10;
    if (innerWidth < 640 && innerWidth >= 320) {
      rfs = (innerWidth / 375) * 10;
    } else if (innerWidth >= 640) {
      rfs = 12;
    }
    window.__ROOT_FONT_SIZE__ = rfs;
    document.documentElement.style.fontSize = rfs + 'px';
  }
  window.addEventListener('resize', getSize);
  getSize();
})();
