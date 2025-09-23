document.addEventListener('DOMContentLoaded', function(){
    const vp = document.querySelector('.video-page #videoPlayer');
    const controls = document.querySelector('.video-page #controlsPanel');
    const playPause = document.querySelector('.video-page #playPauseBtn');
    const playIcon = document.querySelector('.video-page #playIcon');
    const pauseIcon = document.querySelector('.video-page #pauseIcon');
    const backward = document.querySelector('.video-page #backwardBtn');
    const forward = document.querySelector('.video-page #forwardBtn');
    const speedBtn = document.querySelector('.video-page #speedBtn');
    const speedMenu = document.querySelector('.video-page #speedMenu');
    const progressContainer = document.querySelector('.video-page #progressContainer');
    const progressBar = document.querySelector('.video-page #progressBar');
    const progressHandle = document.querySelector('.video-page #progressHandle');
    const currentTime = document.querySelector('.video-page #currentTime');
    const totalTime = document.querySelector('.video-page #totalTime');
    const muteBtn = document.querySelector('.video-page #muteBtn');
    const volumeSlider = document.querySelector('.video-page #volumeSlider');
    const overlayMsg = document.querySelector('.video-page #overlayMessage');
    const loading = document.querySelector('.video-page #loadingSpinner');
    const videoContainer = document.querySelector('.video-page #videoContainer');

    let isPlaying = false;
    let controlsTimeout;

    vp.addEventListener('loadedmetadata', () => { updateTotalTime(); loading.style.display='none'; });
    vp.addEventListener('waiting', ()=>loading.style.display='block');
    vp.addEventListener('playing', ()=>loading.style.display='none');

    function togglePlayPause(){
        if(isPlaying){
            vp.pause();
            playIcon.style.display='block';
            pauseIcon.style.display='none';
            isPlaying=false;
            showMessage('Paused');
        } else {
            vp.play();
            playIcon.style.display='none';
            pauseIcon.style.display='block';
            isPlaying=true;
            showMessage('Playing');
        }
    }

    playPause.addEventListener('click', togglePlayPause);
    vp.addEventListener('click', togglePlayPause);

    backward.addEventListener('click', ()=>{ vp.currentTime=Math.max(0,vp.currentTime-10); showMessage('-10s'); });
    forward.addEventListener('click', ()=>{ vp.currentTime=Math.min(vp.duration,vp.currentTime+10); showMessage('+10s'); });

    speedBtn.addEventListener('click', ()=>{ speedMenu.classList.toggle('show'); });
    document.querySelectorAll('.video-page .speed-option').forEach(option=>{
        option.addEventListener('click', ()=>{
            vp.playbackRate=parseFloat(option.dataset.speed);
            speedBtn.textContent=option.dataset.speed+'x';
            document.querySelectorAll('.video-page .speed-option').forEach(opt=>opt.classList.remove('active'));
            option.classList.add('active');
            speedMenu.classList.remove('show');
            showMessage(`Speed: ${option.dataset.speed}x`);
        });
    });

    vp.addEventListener('timeupdate', updateProgress);
    function updateProgress(){
        const pct=(vp.currentTime/vp.duration)*100;
        progressBar.style.width=pct+'%';
        progressHandle.style.left=pct+'%';
        updateCurrentTime();
    }

    progressContainer.addEventListener('click',(e)=>{
        const rect=progressContainer.getBoundingClientRect();
        vp.currentTime=((e.clientX-rect.left)/rect.width)*vp.duration;
    });

    function updateCurrentTime(){ currentTime.textContent=formatTime(vp.currentTime); }
    function updateTotalTime(){ totalTime.textContent=formatTime(vp.duration); }
    function formatTime(s){ const m=Math.floor(s/60), sec=Math.floor(s%60); return `${m}:${sec.toString().padStart(2,'0')}`; }

    volumeSlider.addEventListener('input',(e)=>{ vp.volume=e.target.value/100; });
    muteBtn.addEventListener('click',()=>{ vp.muted=!vp.muted; showMessage(vp.muted?'Muted':'Unmuted'); });

    function showMessage(txt){
        overlayMsg.textContent=txt;
        overlayMsg.classList.add('show');
        setTimeout(()=>overlayMsg.classList.remove('show'),1000);
    }

    function showControls(){
        controls.classList.remove('hidden');
        clearTimeout(controlsTimeout);
        controlsTimeout=setTimeout(()=>{
            if(isPlaying) controls.classList.add('hidden');
        }, 2000);
    }

    videoContainer.addEventListener('mouseenter', ()=>controls.classList.remove('hidden'));
    videoContainer.addEventListener('mouseleave', ()=>{ if(isPlaying) controls.classList.add('hidden'); });

    document.addEventListener('click',(e)=>{ if(!speedBtn.contains(e.target)&&!speedMenu.contains(e.target)) speedMenu.classList.remove('show'); });

    document.addEventListener('keydown',(e)=>{
        switch(e.code){
            case 'Space': e.preventDefault(); togglePlayPause(); break;
            case 'ArrowLeft': e.preventDefault(); backward.click(); break;
            case 'ArrowRight': e.preventDefault(); forward.click(); break;
            case 'KeyM': e.preventDefault(); muteBtn.click(); break;
            case 'ArrowUp': e.preventDefault(); vp.volume=Math.min(1,vp.volume+0.1); volumeSlider.value=vp.volume*100; showMessage(`Volume: ${Math.round(vp.volume*100)}%`); break;
            case 'ArrowDown': e.preventDefault(); vp.volume=Math.max(0,vp.volume-0.1); volumeSlider.value=vp.volume*100; showMessage(`Volume: ${Math.round(vp.volume*100)}%`); break;
        }
    });

    showControls();
});
