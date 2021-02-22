window.addEventListener('DOMContentLoaded', function () {

  let megaMenu = document.querySelector('.depth1 .menu')
  let depth2 = document.querySelector('.depth2')

  megaMenu.addEventListener('mouseover', function () {
    depth2.classList.add('on')
  })
  megaMenu.addEventListener('mouseout', function () {
    depth2.classList.remove('on')
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

    var intro =  document.querySelector('.intro')
    var introLocation = window.pageYOffset + intro.getBoundingClientRect().top
    var topBtn = document.getElementById('top-btn')

    if(sct > introLocation && !intro.classList.contains('active')){
        topBtn.classList.add('active')
    }
    else{
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
  const videoSrc = videoBox.children[0].getAttribute['src']

  playBtn.addEventListener('click', function (e) {
    e.preventDefault()
    videoBox.classList.add('active')
  })

  closeBtn.addEventListener('click', function () {
    videoBox.classList.remove('active')
    videoBox.children[0].replace
  })


  var Slider = function (id, _web, _tab, _mobile, spacing) {
    var containerWidth = 0;
    var sliderItemWidth = 0;
    var totalCount = 0;
    var spacing = spacing;
    var display = _web;
    var left = 0;
    var interval;

    var DOM = {
      container: function (id) {
        var dom = document.querySelector('#' + id);
        dom.className = 's-container';
        dom.style.position = 'relative';
        dom.style.overflow = 'hidden';
        return dom;
      },
      slider: function (container) {
        totalCount = container.children.length;

        var dom = document.createElement('div');
        dom.className = 'slider'
        dom.style.position = 'relative';
        dom.style.overflow = 'hidden';
        dom.style.height = '100%';
        dom.style.left = 0;
        dom.style.transition = 'left .6s';
        return dom;
      }
    }

    var container = DOM.container(id);
    var slider = DOM.slider(container);
    var temp = container.innerHTML;
    container.innerHTML = '';
    slider.innerHTML = temp;
    container.appendChild(slider);
    var items = document.querySelector('#' + id + ' .slider').children;
    for (var i = 0; i < items.length; i++) {
      items[i].style.float = 'left';
      items[i].style.height = '100%';
      items[i].style.width = (sliderItemWidth - spacing) + 'px';
      items[i].style['margin-right'] = spacing + 'px';
    }

    function resize() {
      left = 0;
      document.querySelector('#' + id + ' .slider').style.left = left + 'px';

      var innerWidth = window.innerWidth;
      if (innerWidth >= 1000) {
        setDisplayCount(_web);
      } else if (innerWidth < 1000 && innerWidth >= 768) {
        setDisplayCount(_tab);
      } else if (innerWidth < 768) {
        setDisplayCount(_mobile);
      }

      if (display === 1) {
        spacing = 0;
        var items = document.querySelector('#' + id + ' .slider').children;
        for (var i = 0; i < items.length; i++) {
          items[i].style.width = sliderItemWidth + 'px';
          items[i].style['margin-right'] = 0 + 'px';
        }
      }
    }

    function setDisplayCount(count) {
      display = count;

      containerWidth = container.offsetWidth + spacing;
      sliderItemWidth = containerWidth / display;

      document.querySelector('#' + id + ' .slider').style.width = totalCount * sliderItemWidth + spacing * totalCount + 'px';
      var items = document.querySelector('#' + id + ' .slider').children;
      for (var i = 0; i < items.length; i++) {
        items[i].style.width = (sliderItemWidth - spacing) + 'px';
      }
    }

    var isResponsive = _tab != undefined && _mobile != undefined;
    if (isResponsive) {
      window.onresize = resize;
    }
    resize();


    return {
      setDisplayCount: setDisplayCount,
      move: function (index) {
        left = (-1) * sliderItemWidth * index;
        document.querySelector('#' + id + ' .slider').style.left = left + 'px';
      },
      prev: function () {
        left += sliderItemWidth;
        var limit = 0;
        if (left > limit) {
          left = limit;
        }
        document.querySelector('#' + id + ' .slider').style.left = left + 'px';
      },
      next: function () {
        left -= sliderItemWidth;
        var limit = (-1) * sliderItemWidth * (totalCount - display);
        if (left < limit) {
          left = limit;
        }
        document.querySelector('#' + id + ' .slider').style.left = left + 'px';
      },
      auto: function () {
        clearInterval(interval);
        interval = setInterval(function () {
          left -= sliderItemWidth;
          var limit = (-1) * sliderItemWidth * (totalCount - display);
          if (left < limit) {
            left = 0;
          }
          document.querySelector('#' + id + ' .slider').style.left = left + 'px';
        }, 5000)
      },
      stop: function () {
        clearInterval(interval);
      }
    }
  }

  let buttonBox = document.querySelectorAll('.button-box > a')
  for (let i = 0; i < buttonBox.length; i++) {
    buttonBox[i].addEventListener('click', function (e) {
      e.preventDefault()
    })
  }




  var slider = new Slider('slider', 4, 3, 1, 0);
  slider.auto();

  var slider1 = new Slider('slider1', 4, 3, 1, 0);
  slider1.auto();



})