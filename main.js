let $buttons = $('#buttonWrapper > button')
let $slides = $('#slides')
let current = 0
let $images = $slides.children('img')

makeFakeSlides()
$slides.css({
    transform: 'translateX(-300px)'
})
bindEvents()
$('#next').on('click',function(){
    goToslide(current+1)
})
$('#previous').on('click',function(){
    goToslide(current-1)
})
//自动播放
let timer = setInterval(()=>{
    goToslide(current+1)
},2000)
//监听点击事件实现切换
function bindEvents() {
    //使用事件代理
    $('#buttonWrapper').on('click', 'button', function (e) {
                let $button = $(e.currentTarget)
                let index = $button.index()
                goToslide(index)
    })
}
//当鼠标悬停在body，则取消定时器
document.body.addEventListener('mouseenter',function(){
    window.clearInterval(timer);
    console.log('定时器停止')
})
//鼠标移出,设置自动轮播
document.body.addEventListener('mouseleave',function(){
    timer = setInterval(()=>{
        goToslide(current+1)
    },2000)
    console.log('设置定时器')
})
//设置页面不可见时轮播停止
document.addEventListener('visibilitychange',function(e){
    if(document.hidden){
        window.clearInterval(timer);
    }else{
        timer = setInterval(()=>{
            goToslide(current+1)
        },2000)
        console.log('设置定时器')
    }
})
//一旦拥有了直接到达某个slide的能力,那么就很容易做下一张和上一张的切换
function goToslide(index){
    if(index > $buttons.length-1){
        index = 0
    }else if(index < 0){
        index = $buttons.length-1
    }
    if (current === 0 && index === $buttons.length - 1) {
        //从第一张到最后一张
        $slides.css({
            //先移动到最前面一张
            transform: `translateX(${-(current) * 300}px)`
        }).one('transitionend', function () {
                $slides.hide().offset()//可以触发 re-layout
                //再移动到倒数第二张
                $slides.css({
                    transform: `translateX(${-(index+1) * 300}px)`
                })
                $slides.show()
                console.log(index)
            })
        }else if (current === $buttons.length - 1 && index === 0) {
            //从最后一张到第一张
                $slides.css({
                    //先移动到最后一张
                    transform: `translateX(${-($buttons.length+1) * 300}px)`
                }).one('transitionend', function () {
                    $slides.hide().offset()
                    //再移动到正数第二张
                    $slides.css({
                        transform: `translateX(${-(index+1) * 300}px)`
                    })
                    $slides.show()
                    console.log(index)
                })
            } else {
                $slides.css({
                    transform: `translateX(${-(index+1) * 300}px)`
                })
            }
            current = index
}
function makeFakeSlides(){
    //克隆第一张图片和最后一张图片
    let $firstCopy = $images.eq(0).clone(true)
    let $lastCopy = $images.eq($images.length - 1).clone(true)
    //打印出来
    // console.log($firstCopy[0].outerHTML)
    // console.log($lastCopy[0].outerHTML)
    //添加到容器中
    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}