var thumbnail=document.querySelector('#thumbnail');
var song=document.querySelector('#song');
var songTitle=document.querySelector('.song-title');
let pPause=document.querySelector('#play-pause')

let songIndex=0;
let songs=['music/HEER.mp3','music/TERAHONE.mp3','music/BOLDO.mp3']
let thumbnails=['images/1.jfif','images/2.jfif','images/3.png']
let songtitles=['BOLNA','HEER','TERAHONE']
let songLen=songs.length-1;
console.log(songLen);
let playing=true;
function playPause(){
    if(playing){
        const song=document.querySelector('#song'),
        thumbnail=document.querySelector('#thumbnail');
        pPause.src="icon/pause.png"
        thumbnail.style.transform="scale(1.15)";
        song.play();
        playing=false;
    }else{
        pPause.src="icon/play.png"
        thumbnail.style.transform="scale(1)";
        song.pause();
        playing=true;
    }
}
// song.addEventListener('even',function(){
//     nextSong();
// })
function nextSong(){
    songIndex++;
    console.log(songIndex);
    if(songIndex>songLen){
        songIndex=0;//all song over first play
        song.play()
        song.src=songs[songIndex];
        // document.innerHTML.ui='none';
    }
    console.log(songs[songIndex]);
    song.src=songs[songIndex];
    
    thumbnail.src=thumbnails[songIndex];
    var n1 = songtitles[songIndex];
    songTitle.innerHTML= n1;
    playing=true;
    playPause();
}
function previousSong(){
    songIndex--;
    if(songIndex<0){
        songIndex=songLen;
        // song.play()
        // document.innerHTML.iu='none';
    }
    song.src=songs[songIndex];
    thumbnail.src=thumbnails[songIndex];
    songTitle.innerHTML=songtitles[songIndex];
    playing=true;
    playPause();
}
