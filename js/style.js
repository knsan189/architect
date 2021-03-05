window.addEventListener('DOMContentLoaded', function () {

  const tabtitle = document.querySelectorAll('.tabtitle > li')
  const contentsTag = document.querySelectorAll('.contents p')


  var tabTag
  for (let i = 0; i < tabtitle.length; i++) {
    tabtitle[i].addEventListener('click', function () {
      tabTag = this.textContent
      tabfilter(tabTag);
      this.classList.add('active')
      for (let siblings of this.parentNode.children) {
        if (siblings !== this) {
          siblings.classList.remove('active')
        }
      }
    })
  }


  function tabfilter(type) {
    for (let j = 0; j < contentsTag.length; j++) {

      function showDisplay(display) {
        contentsTag[j].parentNode.parentNode.style.display = display
      }

      var datatag = contentsTag[j].textContent
      if (datatag.includes(type)) {

        showDisplay('block')
        setTimeout(function () {
          contentsTag[j].parentNode.parentNode.classList.add('active')
        }, 10)

      } else if (tabTag.includes('ALL')) {

        showDisplay('block')
        setTimeout(function () {
          contentsTag[j].parentNode.parentNode.classList.add('active')
        }, 10)

      } else {

        contentsTag[j].parentNode.parentNode.classList.remove('active')
        setTimeout(function () {
          contentsTag[j].parentNode.parentNode.style.display = 'none'
        }, 1000)

      }
    }
  }


  const playBtn = document.querySelector('.playbox')
  const videoBox = document.querySelector('.videoContent')
  const closeBtn = document.querySelector('.closebtn')

  playBtn.addEventListener('click', function (e) {
    e.preventDefault()
    videoBox.classList.add('active')
  })

  closeBtn.addEventListener('click', function () {
    videoBox.classList.remove('active')
    videoBox.children[0].replace
  })


  window.addEventListener('scroll', function () {
    var sct = this.scrollY
    var intro = document.querySelector('.intro')
    var introLocation = window.pageYOffset + intro.getBoundingClientRect().top
    var topBtn = document.getElementById('top-btn')

    if (sct > introLocation && !intro.classList.contains('active')) {
      topBtn.classList.add('active')
    } else {
      topBtn.classList.remove('active')
    }
  })

})