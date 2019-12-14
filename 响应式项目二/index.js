$('.head-nav .container .nav>li').each(function (index, li) {
    $(li).on('click', function () {
        $(li).find('.glyphicon-remove').toggleClass('active');
    })
})

// $('.nav>li').each(function(index,li){
//     $(li).find('.dropdown-menu>li').each(function(index,lis){
//         $(lis).on('mouseenter',function(){
//             $(this).css({
//                 background:'#e7e7e7'
//             })
//         })
//         $(lis).on('mouseleave',function(){
//             $(this).css({
//                 background:'#lightblue'
//             })
//         })
//     })

// })
$('.nav>li').each(function (index, li) {

    $(li).on('mouseenter', function () {
        // $(this).addClass('open');

        $(this).find('.dropdown-menu').css({
            top: '80%',
            opacity: '1',
            visibility: 'visible'
        });
    })
    $(li).on('mouseleave', function () {
        // $(this).removeClass('open');
        $(this).find('.dropdown-menu').css({
            top: '120%',
            opacity: '0',
            visibility: 'hidden'
        });
    })

})
$('.swiper-wrapper .swiper-slide').each(function (index, li) {
    $(li).on('mouseenter', function () {
        // console.log($(this)[0]);

        $(this).children("img").css({
            transform: "scale(1)"
        }).end().children('.showed').css({
            visibility: "visible"
        }).find('img').css({
            opacity: '1',
            transform: "scale(1)"
        })

    })
    $(li).on('mouseleave', function () {
        // console.log($(this).children("img"));

        $(this).children("img").css({
            transform: "scale(1.1)"
        }).end().children('.showed').css({
            visibility: "hidden"
        }).find('img').css({
            opacity: '0',
            transform: "scale(1.2)"
        })
    })
})

$('.oderto li').each((index, li) => {

    $(li).on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        var str = '';
        // console.log(String($(this).text()).toLocaleUpperCase());

        for (var key in products) {
            if (String($(this).text()).toLocaleUpperCase() === key) {
                // console.log(String($(this).text()).toLocaleUpperCase(),key);
                // console.log(products[key]);

                for (let i = 0; i <= products[key].length - 1; i++) {
                    str += ` <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                     <img class="auto-img" src="${products[key][i].img}" alt="">
                     <div class='datas' data-src='${products[key][i].img}' href=""></div>
                     </div>`;


                }
                // console.log('str ==> ',str);
                $('.imgshow').html(str);
            }
        }

    })

})

$('.oderto li').each((index, li) => {

$(li).on('click', function () {
$(this).addClass('active').siblings().removeClass('active');
var str = '';
// console.log(String($(this).text()).toLocaleUpperCase());

for (var key in products) {
    if (String($(this).text()).toLocaleUpperCase() === key) {
        // console.log(String($(this).text()).toLocaleUpperCase(),key);
        // console.log(products[key]);

        for (let i = 0; i <= products[key].length - 1; i++) {
            str += ` <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
             <img class="auto-img" src="${products[key][i].img}" alt="">
             <div class='datas' data-src='${products[key][i].img}' href=""></div>
             </div>`;


        }
        // console.log('str ==> ',str);
        $('.imgshow').html(str);
    }
}

})

})
var current;
// $('.imgshow>div>.datas').each((index, li) => {
//     $(li).on('click', function () {


//     })
// })

$('.imgshow').on('click','div>.datas',function(){
            console.log(111);
       
        $('#myModal').modal('show');
        $('#myModal').find('.modal-body img').attr('src', $(this).attr('data-src'))
    
        current = $(this);
})
$('#myModal  .modal-footer span').eq(1).click(function () {
    if (current.parent().next().find('img')[0]) {
        current = current.parent().next().find('img')
    }
    
    // console.log(current);
    $('#myModal').find('.modal-body img').attr('src', current.attr('src'))
})
$('#myModal  .modal-footer span').eq(0).click(function () {
    if (current.parent().prev().find('img')[0]) {
        current = current.parent().prev().find('img')
    }
    
    // console.log(current);

    $('#myModal').find('.modal-body img').attr('src', current.attr('src'))
})
$('.show-six ul>li').each((index,li) => {
    $(li).on('click',function(){
        if($(this).hasClass('active')){
            return;
        }else{
            $(this).addClass('active').siblings().removeClass('active');
            $('.right-img>img').attr('src',$(this).find('.auto-img').attr('src'))
            console.log($(this).find('.auto-img').attr('src'));
            
        }
    })
})
