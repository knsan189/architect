window.addEventListener('DOMContentLoaded', function () {

  const megaMenu = document.querySelector('.depth1 .menu')
  const depth2 = document.querySelector('.depth2')
  const html = document.querySelector('html')



  megaMenu.addEventListener('mouseover', function () {
    if (html.classList.contains('pc')) {
      depth2.classList.add('on')
    }
  })
  megaMenu.addEventListener('mouseout', function () {
    if (html.classList.contains('pc')) {
      depth2.classList.remove('on')
    }
  })



  const tabbarLi = document.querySelectorAll('.tabbar > li')

  for (let i = 0; i < tabbarLi.length; i++) {
    tabbarLi[i].addEventListener('click', function () {
      this.classList.add('active')
      // this.children[1].style.display = "block"
      for (let siblings of this.parentNode.children) {
        if (siblings !== this) {
          siblings.classList.remove('active')
          // siblings.children[1].style.display = "none"
        }
      }
    })
  }



  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.getElementById('nav')
  const menuBtn2 = document.querySelector('.menu-btn2')

  slideDown(menuBtn, nav);
  slideDown(menuBtn2, depth2);

  function slideDown(button, menu) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      if (html.classList.contains('tablet')) {

        let height;

        if (!menu.classList.contains('on')) {
          this.classList.add('on')
          menu.classList.add('on')
          menu.style.height = 'auto'

          height = menu.clientHeight + 'px'

          menu.style.height = '0px'

          setTimeout(function () {
            menu.style.height = height
          }, 0)

          menu.addEventListener('transitionend', function () {
            menu.style.removeProperty('height')
          }, {
            once: true
          })

        } else {

          height = menu.clientHeight + 'px'
          menu.style.height = height
          button.classList.remove('on')

          setTimeout(() => {
            menu.style.height = '0px'
          }, 0)

          menu.addEventListener('transitionend', function () {
            menu.classList.remove('on')
            menu.style.removeProperty('height')

          }, {
            once: true
          })
        }
      }
    })
  }


  const menuBtn3 = document.querySelectorAll('.menu-btn3')
  const depth3ul = document.querySelectorAll('.depth3')

  menuBtn3.forEach(function (e) {
    e.addEventListener('click', function () {
      if (html.classList.contains('tablet')) {
        
        let height;
        const depth3 = e.previousElementSibling

        if (!depth3.classList.contains('on')) {
          depth3.classList.add('on')
          e.classList.add('on')
          height = depth3.clientHeight + 'px'
          depth3.style.height = "0px"

          setTimeout(function(){
            depth3.style.height = height
          },0)

        }
        else{
          depth3.style.height = "0px"
          depth3.addEventListener('transitionend', function(){
            this.classList.remove('on')
            this.style.removeProperty('height')
            e.classList.remove('on')
          }, {once: true})
        }
      }
    })
  })


  window.addEventListener('resize', function () {
    deviceResize();
  })
  deviceResize();


  function deviceResize() {
    let deviceWidth = document.body.offsetWidth;
    const tabletSize = 960


    if (deviceWidth > tabletSize) {
      html.classList.add('pc')
      html.classList.remove('tablet')
      nav.style.height = "100%";
      nav.classList.remove('on')
      menuBtn.classList.remove('on')
      menuBtn2.classList.remove('on')
      menuBtn3.forEach(e =>{ e.classList.remove('on')})
      depth3ul.forEach(e =>{ e.classList.remove('on')})
    } else {
      html.classList.add('tablet')
      html.classList.remove('pc')
      nav.classList.remove('on')
      menuBtn.classList.remove('on')
      menuBtn2.classList.remove('on')
      menuBtn3.forEach(e =>{ e.classList.remove('on')})
      depth3ul.forEach(e =>{ e.classList.remove('on')})
    }
  }



  const aniTriggerMargin = 100;
  const aniElemetList = document.querySelectorAll('.ani')
  const aniFunc = function () {
    for (const element of aniElemetList) {
      if (!element.classList.contains('show')) {
        if (window.innerHeight > element.getBoundingClientRect().top + aniTriggerMargin) {
          element.classList.add('show')
        }
      }
    }
  }


  window.addEventListener('scroll', function () {
    aniFunc();

    var sct = this.scrollY
    const header = document.getElementById('header')

    if (sct > 50 && !header.classList.contains('fixed')) {
      header.classList.add('fixed')
    } else if (sct <= 50 && header.classList.contains('fixed')) {
      header.classList.remove('fixed')
    }

    var intro = document.querySelector('.intro')
    var introLocation = window.pageYOffset + intro.getBoundingClientRect().top
    var topBtn = document.getElementById('top-btn')

    if (sct > introLocation && !intro.classList.contains('active')) {
      topBtn.classList.add('active')
    } else {
      topBtn.classList.remove('active')
    }
  })


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






})