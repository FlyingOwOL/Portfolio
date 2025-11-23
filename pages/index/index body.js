const playButton = document.getElementById("playButton");

function openFappybird(){
    const width = 620;
    const height = 500;
    const left = (screen.width / 2) - (width / 2);
    const top = (screen.height / 2) - (height / 2);
    window.open('pages/index/popup/fappybird.html', 'Fappybird', `width=${width},height=${height},left=${left + 20},top=${top + 65}`);
}

playButton.addEventListener("click", () => {
    openFappybird();
    console.log("Button is working");
});