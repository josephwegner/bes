(function() {
  const LIST = document.getElementsByClassName("listing")[0]
  const PAGING = document.getElementsByClassName("b-pagination")[1]
  const FOOTER = document.getElementsByClassName("listing-footer")[0]

  var currentPage
  var maxPage = 1
  var loading = false
  var loadingIcon

  bes.features.lazyLoad = {
    shouldRun: () => {
      return !!LIST && !!PAGING && PAGING.querySelectorAll('.b-pagination-item').length > 1
    },

    run: () => {
      var pageMatch = document.location.search.match(/page=([0-9])+/)

      if (pageMatch) {
        currentPage = parseInt(pageMatch[1])
      } else {
        currentPage = 1
      }

      var pageButtons = document.getElementsByClassName("b-pagination-item")
      maxPage = parseInt(pageButtons[pageButtons.length - 2].innerText)
      PAGING.style.display = "none"

      loadingIcon = document.createElement('div')
      loadingIcon.className = 'filter-listing-loading-icon'

      var scr = document.createElement('script')
      scr.innerHTML = `
        var $l = $('.listing')
        $l.on('click', '.info.bes-info', Waterdeep.ShowMore.toggleMoreInfo)
        $l.on('hover', '.info.bes-info', Waterdeep.ShowMore.handleHoverChange)
        $l.on('click', '.info.bes-info .fav-indicator', Waterdeep.ShowMore.toggleFavorite)
      `

      document.documentElement.prepend(scr)

      window.addEventListener('scroll', checkScroll)
      checkScroll()
    }
  }

  function checkScroll() {
    if (currentPage >= maxPage) { return }
    var distanceFromBottom = LIST.getBoundingClientRect().bottom - document.body.getBoundingClientRect().height

    if (!loading  && distanceFromBottom < 50) {
      loadNextPage()
    }
  }

  function loadNextPage() {
    var urlWithoutPage = document.location.href.replace(/page=[0-9]+/, '')
    currentPage++
    var url = `${urlWithoutPage}&page=${currentPage}`

    loading = true
    FOOTER.appendChild(loadingIcon)
    fetch(url)
      .then((body) => {
        body.text().then((html) => {
          var parser = new DOMParser()
          var doc = parser.parseFromString(html, "text/html")

          var nodes = doc.querySelectorAll('.listing .info')

          Array.prototype.forEach.call(nodes, (node) => {
            node.className += ' bes-info'
            LIST.appendChild(node)
          })

          loading = false
          loadingIcon.remove()
        })
      })
  }
})()
