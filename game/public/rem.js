;(function (win) {
  let h
  const docEl = document.documentElement
  function setUnitA() {
    var rect = docEl.getBoundingClientRect();
    var w = rect.width > rect.height ? rect.width : rect.height;
    win.rem = w / 100
    win.px2rem = (px) => {
      return px/win.rem + "rem";
    }
    docEl.style.fontSize = win.rem + 'px'
  }
  win.addEventListener(
    'resize',
    function () {
      clearTimeout(h)
      h = setTimeout(setUnitA, 300)
    },
    false
  )
  win.addEventListener(
    'pageshow',
    function (e) {
      if (e.persisted) {
        clearTimeout(h)
        h = setTimeout(setUnitA, 300)
      }
    },
    false
  )
  setUnitA()
})(window)
