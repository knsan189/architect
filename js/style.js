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
                contentsTag[i].parentNode.classList.add('active')
            } else {
                contentsTag[i].parentNode.classList.remove('active')
            }
        }

        tabtitle[0].addEventListener('click', function () {
            if (!contentsTag[i].parentNode.classList.contains('active')) {
                contentsTag[i].parentNode.classList.add('active')
            }
        })
        tabtitle[1].addEventListener('click', function () {
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





})