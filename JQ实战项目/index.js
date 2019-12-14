var y = 0;
var canClick = true;
$("body").on("wheel", function (e) {
    console.log(e.originalEvent.deltaY);

    y += e.originalEvent.deltaY;
    // 连着滚动的时候 200毫秒 以内 只算一次
    setTimeout(function () {
        // console.log(y);

        if (canClick) {
            canClick = false;

            if (y > 0) {
                nextPic();
            } else if (y < 0) {
                prevPic();
            }
            // 防止动画未完成连着滚动
            setTimeout(function () {
                canClick = true;
            }, 500);
        }

        y = 0;
    }, 200);
});
var current = 0;
// 图片显示事件
function showPic() {
    $('.list').animate({
        top: -$('.list li').eq(0).height() * current,
    })
    $('.menu li').eq(current).addClass('active').siblings().removeClass('active');
    switch (current) {
        case 0:
            $('.plane1').removeClass('active');
            $('.plane2').removeClass('active1');
            $('.plane3').removeClass('active2');
            $('.right .bott').removeClass('active');
            $('.right .top').removeClass('active');
            $('.pencel1').removeClass('active11')
            $('.pencel3').removeClass('active33')
            break;
        case 1:
            $('.plane1').addClass('active');
            $('.plane2').addClass('active1');
            $('.plane3').addClass('active2');
            $('.right .bott').removeClass('active');
            $('.right .top').removeClass('active');
            $('.pencel1').removeClass('active11')
            $('.pencel3').removeClass('active33')
            break;
        case 2:
            $('.plane1').removeClass('active');
            $('.plane2').removeClass('active1');
            $('.plane3').removeClass('active2');
            $('.right .bott').removeClass('active');
            $('.right .top').removeClass('active');
            $('.pencel1').addClass('active11')
            $('.pencel3').addClass('active33')
            break;

        case 3:
            $('.plane1').removeClass('active');
            $('.plane2').removeClass('active1');
            $('.plane3').removeClass('active2');
            $('.right .bott').addClass('active');
            $('.right .top').addClass('active');
            $('.pencel1').removeClass('active11')
            $('.pencel3').removeClass('active33')
            break;

        case 4:
            $('.plane1').removeClass('active');
            $('.plane2').removeClass('active1');
            $('.plane3').removeClass('active2');
            $('.right .bott').removeClass('active');
            $('.right .top').removeClass('active');
            $('.pencel1').removeClass('active11')
            $('.pencel3').removeClass('active33')
            break;

    }

}

// 下一张方法
function nextPic() {
    current = current >= $('.list>li').length - 1 ? current : ++current;
    showPic();
    changeNav(current);

}



var t1 = setInterval(function () {
    // if (current !== 2) {
    //     clearInterval(t1);
    // }
    $('.robotMove').addClass('active');
    setTimeout(function () {
        $('.robotMove').css({
            transform: 'rotateY(180deg)'
        });
        $('.robotMove').removeClass('active');

    }, 3000);
    $('.robotMove').css({
        transform: 'rotateY(0deg)'
    });
}, 5000)



// 上一张方法
function prevPic() {
    current = current <= 0 ? 0 : --current;
    showPic();
    changeNav(current);
}
// 索引点击事件
$('.menu li').each(function (index, li) {
    $(li).on('click', function () {
        current = $(this).index();
        showPic();
        changeNav(current);
    })
})
$('.nav .right ul li').each(function (index, li) {
    $(li).on('click', function () {
        changeNav(index);
    })
})
//导航栏变化事件函数
function changeNav(num) {
    switch (num) {
        case 0:

            $('.arrow').css({
                left: 17.5 + 'px',
            })
            current = num;
            showPic();
            $('.nav .right ul li').eq(current).addClass('active').siblings().removeClass('active');
            break;

        case 1:

            $('.arrow').css({
                left: 94 + 'px',
            })
            current = num;
            showPic();
            $('.nav .right ul li').eq(current).addClass('active').siblings().removeClass('active');
            break;

        case 2:

            $('.arrow').css({
                left: 165 + 'px',
            })
            current = num;
            showPic();
            $('.nav .right ul li').eq(current).addClass('active').siblings().removeClass('active');
            break;

        case 3:

            $('.arrow').css({
                left: 242 + 'px',
            })
            current = num;
            showPic();
            $('.nav .right ul li').eq(current).addClass('active').siblings().removeClass('active');
            break;

        case 4:

            $('.arrow').css({
                left: 318 + 'px',
            })
            current = num;
            showPic();
            $('.nav .right ul li').eq(current).addClass('active').siblings().removeClass('active');
            break;

    }
}

// $(function() {
//     $('.swiper-pagination span').each(function(index, span) {
//         $(span).on('click', function() {
//             $(this).addClass('swiper-pagination-bullet-active').siblings().removeClass('.swiper-pagination-bullet-active');
//         })
//     })
// })
// $('.ss').on('mouseenter', function() {
//     $(this).children('.l9').addClass('active');
//     $(this).children('.shadow').addClass('active1');
// })
// $('.ss').on('mouseleave', function() {
//     $(this).children('.l9').removeClass('active');
//     $(this).children('.shadow').removeClass('active1');
// })
$('.logogo').each(function (index, ss) {
    $(ss).on('mouseenter', function () {
        $(this).children(".l" + (index + 1) + "").addClass('active');
        $(this).children('.shadow').addClass('active1');
        console.log($(this).children('.l1'));


    })
    $(ss).on('mouseleave', function () {
        $(this).children(".l" + (index + 1) + "").removeClass('active');
        $(this).children('.shadow').removeClass('active1');
    })
})
$('.img li').each(function (index, li) {
    $(li).on('mouseenter', function () {
        $(this).children('.search').css({
            display: 'block'
        })
        $(this).children('img').addClass('active');
    })
    $(li).on('mouseleave', function () {
        $(this).children('img').removeClass('active');
        $(this).children('.search').css({
            display: 'none'
        })
    })
})


$('.about .right .top').on('mouseenter', function () {
    $('.about .right .top>img').css({
        transform: 'scale(1)'
    })
    $('.right .top ul li:nth-child(1)>img').css({
        top: "100px"
    })
    $('.right .top ul li:nth-child(2)>img').css({
        left: "-260px"
    })
    $('.right .top ul li:nth-child(3)>img').css({
        left: "130px"
    })
    $('.right .top ul li:nth-child(4)>img').css({
        top: "-200px"
    })
})
$('.about .right .top').on('mouseleave', function () {
    $('.about .right .top>img').css({
        transform: 'scale(1.5)'
    })
    $('.right .top ul li:nth-child(1)>img').css({
        top: "0px"
    })
    $('.right .top ul li:nth-child(2)>img').css({
        left: "-130px"
    })
    $('.right .top ul li:nth-child(3)>img').css({
        left: "0px"
    })
    $('.right .top ul li:nth-child(4)>img').css({
        top: "-100px"
    })

})

// 底部的小盒子
$('.about .right .bott').on('mouseenter', function () {
    $('.about .right .bott>img').css({
        transform: 'scale(1)'
    })
    $('.right .bott ul li:nth-child(1)>img').css({
        top: "100px"
    })
    $('.right .bott ul li:nth-child(2)>img').css({
        left: "-260px"
    })
    $('.right .bott ul li:nth-child(3)>img').css({
        left: "130px"
    })
    $('.right .bott ul li:nth-child(4)>img').css({
        top: "-200px"
    })
})
$('.about .right .bott').on('mouseleave', function () {
    $('.about .right .bott>img').css({
        transform: 'scale(1.5)'
    })
    $('.right .bott ul li:nth-child(1)>img').css({
        top: "0px"
    })
    $('.right .bott ul li:nth-child(2)>img').css({
        left: "-130px"
    })
    $('.right .bott ul li:nth-child(3)>img').css({
        left: "0px"
    })
    $('.right .bott ul li:nth-child(4)>img').css({
        top: "-100px"
    })

})

// 设置cosplay每个人物的背景图片
$('.cosplay li').each(function (index, li) {

    $(li).css({
        backgroundPositionX: -parseInt($(li).width()) * index + 'px',

    })
    $(li).on('mouseenter', function () {
        $(li).siblings().addClass('active');
    })
    $(li).on('mouseleave', function () {
        $(li).siblings().removeClass('active');
    })
})