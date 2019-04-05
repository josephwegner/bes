(function() {
  var scrollShown = false
  var scroller

  bdndb.features.backToTop = {
    shouldRun: () => {
      return document.getElementsByClassName("sidebar-menu-top-link").length === 0
    },

    run: () => {
      window.addEventListener('scroll', checkScroll)
      scroller = document.createElement('button')
      scroller.innerText = "Back to top"
      scroller.className = "bdndb-scrollToTop"
      scroller.addEventListener('click', scrollToTop)

      checkScroll()
    }
  }

  function scrollToTop() {
    window.scrollTo(0,0)
  }

  function checkScroll() {
    if (window.scrollY >= 600 && !scrollShown) {
      showScroll()
    } else if (window.scrollY < 600 && scrollShown) {
      hideScroll()
    }
  }

  function showScroll() {
    document.body.appendChild(scroller)
    scrollShown = true
  }

  function hideScroll() {
    scroller.remove()
    scrollShown = false
  }
})()
