/**

 */
let AudioContext;
let audioContext;

document.addEventListener('DOMContentLoaded', function () {
    //브라우저 정책으로 인한 오디오 자동재생 권한 설정
    alert('타이핑 소리를 듣기 위해선 권한을 허용 해주어야 합니다.')
    navigator.mediaDevices.getUserMedia({audio: true}).then(() => {
        AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
    }).catch(e => {
        console.error(`Audio permissions denied: ${e}`);
    });
    //오디오 빠르기 설정
    let $audio = document.getElementById('typingSound');
    $audio.playbackRate = 2.0;

    // 로딩시 이미지 적용후 없애기
    const html = document.querySelector('html');
    html.style.overflow = 'hidden'; //로딩 중 스크롤 방지
    const $loading = document.querySelector('.loading');

    //로딩되는 과정을 확인하기 위해 임의로 setTimeout 작성. 실제 적용 시에는 삭제 후 적용해야함.
    setTimeout(function () {
        $loading.style.opacity = '0'; //서서히 사라지는 효과
        html.style.overflow = 'auto'; //스크롤 방지 해제
        setTimeout(() => {
            $loading.style.display = 'none';
        }, 500)
    }, 1000);

    const tit = document.querySelector('.home h2');
    const txtString = `Developer \n ddalla Portfolio`;
    txtString.split('');
    const txtSpeed = 100;
    const txtDelay = 1000;
    let txtIndex = 0;

    function typingEvent() {
        $audio.play();
        for (txtIndex = 0; txtIndex <= txtString.length - 1; txtIndex++) {
            let txtNow = txtString[txtIndex];
            setTimeout(() => {
                tit.innerHTML += (txtNow === "\n" ? "<br>" : txtNow);
            }, txtSpeed * txtIndex);
        }
    }

    setTimeout(typingEvent, txtDelay);

})

let isToggle = false;
//스크롤시
window.addEventListener('scroll', function (e) {
    //console.log(window.scrollY);
    //console.log(e.target)
    const $header = document.querySelector('header');
    if (window.scrollY >= 50 && !isToggle) {
        $header.classList.add('fixed');
        isToggle = true; // 상태 변경 여부를 변수에 반영
    } else if (window.scrollY < 50 && isToggle) {
        $header.classList.remove('fixed'); // 원래 상태로 돌아감
        isToggle = false; // 상태 변경 여부를 변수에 반영
    }
})

//여기 부턴 제이쿼리 ㅠㅠㅠ
$(document).ready(function () {

    //about영역 스크롤로 보이고 사라지공
    $(window).on("scroll", function () {
        let scroll = $(window).scrollTop();

        if (scroll > 600) $('.about').addClass('on');
        else $('.about').removeClass('on');
    });


    //work영역
    $(".toggle-btn").on('click', function () {
        $("html").css({'overflow': 'hidden'});
        ; //스크롤 방지
        $(".flex div").css({'flex-grow': '1'});
        $(this).css({'flex-grow': '4'});
        var navId = $(this).data('nav-target');
        toggleNav(navId);
    });
    $(".closebtn").on('click', function () {
        $("html").css({'overflow': 'auto'}); //스크롤 재개
        $(".flex div").css({'flex-grow': '1'});
        var navId = $(this).closest('.overlay').data('nav-id');
        closeNav(navId);
    });

    function toggleNav(navId) {
        var nav = $(".overlay[data-nav-id='" + navId + "']");
        if (nav.css('width') === "100%") {
            closeNav(navId);
        } else {
            openNav(navId);
        }
    }

    function openNav(navId) {
        $(".overlay[data-nav-id='" + navId + "']").css('width', '100%');
    }

    function closeNav(navId) {
        $(".overlay[data-nav-id='" + navId + "']").css('width', '0%');
    }
});



