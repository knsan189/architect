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

        let sct = this.scrollY
        let header = document.getElementById('header')

        if (sct > 50 && !header.classList.contains('fixed')) {
            header.classList.add('fixed')
        } else if (sct <= 50 && header.classList.contains('fixed')) {
            header.classList.remove('fixed')
        }
    })

    const tabtitle = document.querySelectorAll('.tabtitle > li')
    const contentsTag = document.querySelectorAll('.contents p')
    // for (let i=0; i < tabtitle.length; i++) {
    //     tabtitle[i].addEventListener('click', function () {
    //         this.classList.add('on')
    //     })
    // }
    for (let i = 0; i < contentsTag.length; i++) {

        function clickEvent(status) {
            if (contentsTag[i].textContent.includes(status)) {
                contentsTag[i].parentNode.style.display = "block"
                contentsTag[i].parentNode.classList.add('active')

            } else {
                contentsTag[i].parentNode.classList.remove('active')
                contentsTag[i].parentNode.style.display = "none"
            }
        }

        
        tabtitle[0].addEventListener('click', function () { // ALL
            if (!contentsTag[i].parentNode.classList.contains('active')) {
                contentsTag[i].parentNode.style.display = "block"
                contentsTag[i].parentNode.classList.add('active')
            }
        })
        tabtitle[1].addEventListener('click', function () { // Building
            clickEvent('Building')
        })
        tabtitle[2].addEventListener('click', function () {
            clickEvent('Concept')
        })
        tabtitle[3].addEventListener('click', function () {
            clickEvent('Design')
        })
        tabtitle[4].addEventListener('click', function () {
            clickEvent('Motion')
        })
    }


    var Slider = function(id, _web, _tab, _mobile, spacing){
        var containerWidth = 0;
        var sliderItemWidth = 0;
        var totalCount = 0;
        var spacing = spacing;
        var display = _web;
        var left = 0;
        var interval;
      
        var DOM = {
          container: function(id){
            var dom = document.querySelector('#'+id);
            dom.className = 's-container';
            dom.style.position = 'relative';
            dom.style.overflow = 'hidden';
            return dom;
          },
          slider: function(container){
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
      
        // DOM 만들기
        var container = DOM.container(id);
        var slider = DOM.slider(container);
        var temp = container.innerHTML;
        container.innerHTML = '';
        slider.innerHTML = temp;
        container.appendChild(slider);
        var items = document.querySelector('#'+ id + ' .slider').children;
        for(var i=0; i<items.length; i++){
          items[i].style.float = 'left';
          items[i].style.height = '100%';
          items[i].style.width = (sliderItemWidth-spacing)+ 'px';
          items[i].style['margin-right'] = spacing+'px'; // 간격
        }
      
        // 화면 사이즈 수정시 발생하는 이벤트
        function resize(){
          left = 0;
          document.querySelector('#'+ id + ' .slider').style.left = left + 'px';
      
          var innerWidth = window.innerWidth;
          if(innerWidth >= 1000){
            setDisplayCount(_web);
          }else if(innerWidth < 1000 && innerWidth >= 768) {
            setDisplayCount(_tab);
          }else if (innerWidth < 768) {
            setDisplayCount(_mobile);
          }
          
          if(display === 1){
            spacing = 0;
            var items = document.querySelector('#'+ id + ' .slider').children;
            for(var i=0; i<items.length; i++){
              items[i].style.width = sliderItemWidth + 'px';
              items[i].style['margin-right'] = 0 + 'px'; // 간격
            }
          }
        }
      
        // 디스플레이 갯수 설정 함수
        function setDisplayCount(count) {
          display = count;
      
          containerWidth = container.offsetWidth + spacing;
          sliderItemWidth = containerWidth / display;
      
          document.querySelector('#'+ id + ' .slider').style.width = totalCount * sliderItemWidth + spacing * totalCount + 'px';
          var items = document.querySelector('#'+ id + ' .slider').children;
          for(var i=0; i<items.length; i++){
            items[i].style.width = (sliderItemWidth-spacing)+ 'px';
          }
        }
      
        // 반응형 디스플레이 갯수 조절
        var isResponsive = _tab != undefined && _mobile != undefined;
        if(isResponsive){
          window.onresize = resize;
        }
        resize();
      
      
        return {
          setDisplayCount: setDisplayCount,
          move: function(index){
            left = (-1) * sliderItemWidth * index;
            document.querySelector('#'+ id + ' .slider').style.left = left + 'px';
          },
          prev: function(){
            left += sliderItemWidth;
            var limit = 0;
            if(left > limit){
              left = limit;
            }
            document.querySelector('#'+ id + ' .slider').style.left = left + 'px';
          },
          next: function(){
            left -= sliderItemWidth;
            var limit = (-1) * sliderItemWidth * (totalCount - display);
            if(left < limit){
              left = limit;
            }
            document.querySelector('#'+ id + ' .slider').style.left = left + 'px';
          },
          auto: function(){
            clearInterval(interval);
            interval = setInterval(function(){
              left -= sliderItemWidth;
              var limit = (-1) * sliderItemWidth * (totalCount - display);
              if(left < limit){
                left = 0;
              }
              document.querySelector('#'+ id + ' .slider').style.left = left + 'px';
            }, 2000)
          },
          stop: function(){
            clearInterval(interval);
          }
        }
      }
      
      var slider = new Slider('slider', 4, 3, 1, 0);
      slider.auto();

    


})