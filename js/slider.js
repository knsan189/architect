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

const buttonBox = document.querySelectorAll('.button-box > a')
for (let i = 0; i < buttonBox.length; i++) {
    buttonBox[i].addEventListener('click', function (e) {
        e.preventDefault()
    })
}


var slider = new Slider('slider', 4, 3, 1, 0);
slider.auto();

var slider1 = new Slider('slider1', 4, 3, 1, 0);
slider1.auto();