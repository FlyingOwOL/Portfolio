const playButton = document.getElementById("playButton");

function openFappybird(){
    const width = screen.width;
    const height = screen.height;



    /**
     * use this path when developing
     * http://localhost:8080/pages/index/popup/fappybird.html
     * 
     * use this path when pushing to github
     * https://flyingowol.github.io/Personal-website/pages/index/popup/fappybird.html
     * 
     */

    window.open('https://flyingowol.github.io/Personal-website/pages/index/popup/fappybird.html', 'Fappybird', `width=${width},height=${height}`);
}

playButton.addEventListener("click", () => {
    openFappybird();
    console.log("Button is working");
});

