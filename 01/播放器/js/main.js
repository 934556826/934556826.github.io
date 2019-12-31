// 歌曲信息
var playlist = [
    {
        file: "songs/Idina Menzel _ Evan Rachel Wood - Show Yourself.mp3",
        thumb: "images/Frozen2-1.jpg",
        trackName: "Show Yourself",
        trackArtist: "Idina Menzel/Evan Rachel Wood",
        trackAlbum: "Single"
    },
    {
        file: "songs/Idina Menzel _ AURORA - Into the Unknown.mp3",
        thumb: "images/Frozen2-2.jpg",
        trackName: "Into the Unknown",
        trackArtist: "Idina Menzel/AURORA",
        trackAlbum: "Single"
    },
    {
        file: "songs/Evan Rachel Wood - All Is Found.mp3",
        thumb: "images/Frozen2-1.jpg",
        trackName: "All Is Found",
        trackArtist: "Evan Rachel Wood",
        trackAlbum: "Single"
    },
    {
        file: "songs/Various Artists - Let It Go.mp3",
        thumb: "images/Frozen2-4.jpg",
        trackName: "Let It Go",
        trackArtist: "Idina Menzel",
        trackAlbum: "Single"
    }
];

$(playlist).each(function (i, e) {
    // $("audio").attr("src", playlist[e].file)
    // $("audio").append(e.file)

})

var audio = $("audio")[0]
var current = 0

function play() {
    // playlist.eq(current)
}

// 初始化，载入第一首歌
$("audio").attr("src", playlist[current].file)

// 定义切换上/下一首
function nextOrprevSongMsg() {
    $("audio").attr("src", playlist[current].file)
    $(".bg-song").css("background-image", "url(" + playlist[current].thumb + ")")
    $(".cd").css("background-image", "url(" + playlist[current].thumb + ")")
    $(".song-msg h3").html(playlist[current].trackName)
    $(".song-msg p").html(playlist[current].trackArtist)
}

// 定义自动播放
function autoplay() {
    audio.play()
    if ($(".fa-play").hasClass("fa fa-play")) {
        $(".fa-play").removeClass("fa fa-play").addClass("fa fa-pause")
        $(".cd").css({ "animation": "restart 10s linear infinite" })
        $(".pointer").css({ "transform": "rotateZ(0deg)" })
    }
    // if ($(".cd").css({ "animation": "cd 10s linear infinite initial" })) {
    //     $(".cd").css({ "animation": "cd 10s linear infinite" })
    // }
    // if ($(".cd").css({ "animation": "" })) {
    //     $(".cd").css({ "animation": "cd 10s linear infinite" })
    // }
}

// 播放、暂停键
$(".play").click(function () {
    $(".cd").css({ "animation": "cd 10s linear infinite" })
    if ($(".fa-play").hasClass("fa fa-play")) {
        audio.play()
        $(".fa-play").removeClass("fa fa-play").addClass("fa fa-pause")
        $(".cd").css({ "animation-play-state": "runnning" })
        $(".pointer").css({ "transform": "rotateZ(0deg)" })
    } else if ($(".fa-pause").hasClass("fa fa-pause")) {
        audio.pause()
        $(".fa-pause").removeClass("fa fa-pause").addClass("fa fa-play")
        $(".cd").css({ "animation-play-state": "paused" })
        $(".pointer").css({ "transform": "rotateZ(-20deg)" })
    }
})

// 切换下一首
$(".next").click(function () {
    current = current >= playlist.length - 1 ? 0 : ++current
    // console.log(current);
    if ($(".fa-pause").hasClass("fa fa-pause")) {
        $(".fa-pause").removeClass("fa fa-pause").addClass("fa fa-play")
        $(".pointer").css({ "transform": "rotateZ(-20deg)" })
    }
    if ($(".cd").css({ "animation": "restart 10s linear infinite" })) {
        $(".cd").css({ "animation": "cd 10s linear infinite" })
    if ($(".cd").css({ "animation": "cd 10s linear infinite" })) {
        $(".cd").css({ "animation": "" })
        console.log('111');
        
    }
    // if ($(".cd").css({ "animation-fill-mode": "initial" })) {
    //     $(".cd").css({ "animation-fill-mode": "" })
    // }
    // autoplayNext()
    nextOrprevSongMsg()
    autoplay()
    // $("audio").attr("src", playlist[current].file)
    // $(".bg-song").css("background-image", "url(" + playlist[current].thumb + ")")
    // $(".cd").css("background-image", "url(" + playlist[current].thumb + ")")
    // $(".song-msg h3").html(playlist[current].trackName)
    // $(".song-msg p").html(playlist[current].trackArtist)

    // console.log("下一首");
    // audio.autoplay()
})

// 切换上一首
$(".prev").click(function () {
    current = current <= 0 ? playlist.length - 1 : --current
    // console.log(current);
    if ($(".fa-pause").hasClass("fa fa-pause")) {
        $(".fa-pause").removeClass("fa fa-pause").addClass("fa fa-play")
        $(".pointer").css({ "transform": "rotateZ(-20deg)" })
    }
    if ($(".cd").css({ "animation": "cd 10s linear infinite" })) {
        $(".cd").css({ "animation": "" })
    }

    nextOrprevSongMsg()
    autoplay()
    // $("audio").attr("src", playlist[current].file)
    // $(".bg-song").css("background-image", "url(" + playlist[current].thumb + ")")
    // $(".cd").css("background-image", "url(" + playlist[current].thumb + ")")
    // $(".song-msg h3").html(playlist[current].trackName)
    // $(".song-msg p").html(playlist[current].trackArtist)

    // console.log("上一首");
    // audio.autoplay()
})

// 音频结束后自动播放下一首
audio.onended = function autoplayNext() {
    current = current >= playlist.length - 1 ? 0 : ++current
    nextOrprevSongMsg()
    autoplay()
}

// function replay() {
//     $(".fa-refresh")
// }