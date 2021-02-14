

window.addEventListener('DOMContentLoaded', function(){
    
    let megaMenu = document.querySelector('.depth1 .menu')
    let depth2 = document.querySelector('.depth2')

    megaMenu.addEventListener('mouseover', function(){
        depth2.classList.add('on')
    })
    megaMenu.addEventListener('mouseout', function(){
        depth2.classList.remove('on')
    })





    const tabbarLi = document.querySelectorAll('.tabbar > li')
    for(let i=0;i<tabbarLi.length;i++){
        tabbarLi[i].addEventListener('click', function(){
            this.classList.add('active')
            // this.children[1].style.display = "block"
            for(let siblings of this.parentNode.children){
                if(siblings !== this){
                    siblings.classList.remove('active')
                    // siblings.children[1].style.display = "none"
                }
            }
        })
    }
    




    const aniTriggerMargin = 100;
    const aniElemetList = document.querySelectorAll('.ani')

    const aniFunc = function(){
        for(const element of aniElemetList){
            if(!element.classList.contains('show')){
                if(window.innerHeight > element.getBoundingClientRect().top + aniTriggerMargin){
                    element.classList.add('show')
                }
            }
        }
    }

     window.addEventListener('scroll', aniFunc)





})