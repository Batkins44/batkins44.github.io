'use strict';

let lastClicked;

console.log(window.innerWidth);

let puckLuck = `<div class="full-project" id='puck-luck-project'>

<h2 class='project-title'>Puck-Luck</h2>
<h3 class='standard-header'>I created this half-way through my time at Nashville Software Schoole as the 1st of two Capstone projects. Thus we call it our midstone. Built with jQuery, Sass, Firebase and the 'MySportsFeed API', Puck-Luck allows users
    to check the NHL schedule, search for individual players as well as well as view season long team stats.
    After logging in, user can view daily updates of their favorite teams and players.
</h3>
<h3 class="hover-notice">Hover over images to see code snippets associated with each component mentioned</h3>
<pan class='ind-project'>
<div class="project-description">
<h3>Landing Page</h3>
<a id='puck-luck-deployed' href="https://batkins44.github.io/puck-luck/">Go to Deployed Site!</a>
</div>
<img id='index-pic-1' class="project-pic project" alt="puck-luck" src="images/puck-luck.png" width="600px" height="300px">
</span>
<span class='gray-project'>

<div class="gray-project-description">
    <h3>Challenge Statement and Style Guide</h3>
    
</div>
<br>
<img id='challenge-pic' class="gray-project-pic project-pic" alt="challenge statement" src="images/challenge.png" width="600px" height="300px">

</span>
<span class='ind-project'>
    <div class="project-description">
    <h3>Look at the NHL Schedule for any given day</h3>
    </div>

        <img class="project-pic project" alt="persona" src="images/schedule.png" width="600px" height="300px">
    </span>
    <span class='gray-project'>

        <div class="gray-project-description">
            <h3>Catch up with the latest Hockey news</h3>
        </div>
        <img class="gray-project-pic project-pic" alt="MVP" src="images/news.png" width="600px" height="300px">

    </span>
    <span class='ind-project'>
            <div class="project-description">
            <h3>Up to Date Team Stats</h3>
            </div>

                <img class="project-pic project" alt="style guide" src="images/byteam.png" width="600px" height="300px">
            </span>
            <span class='gray-project'>

                <div class="gray-project-description">
                    <h3>Search Through Players in the League</h3>
                </div>
                <img class="gray-project-pic project-pic" alt="search" src="images/search.png" width="600px" height="300px">

            </span>
            <span class='ind-project'>
                    <div class="project-description">
                    <h3>Save your Favorite Players and Teams to View their Status Daily</h3>
                    <br>
                    </div>
                        <div class='flex-project'>
                        <img class="flex-pics project-pic" alt="favorite-team" src="images/fav-team.png" width="600px" height="300px">
                        <img class="flex-pics project-pic" alt="favorite-player" src="images/fav-player.png" width="600px" height="300px">
                    </div>
                    </span>
                </div>
`;

let gameSwap = 'GAMESWAPBABYYYYGAMESWAPBABYYYYGAMESWAPBABYYYYGAMESWAPBABYYYYGAMESWAPBABYYYY';
let wyfy = '';



$( document ).ready(function() {
    if($('#index-header').length){
        $('#slide1').fadeIn(500);
        $('#slide2').fadeIn(2000);
        $('#slide3').fadeIn(2000);
        $('#slide4').fadeIn(2000);

    }
});

$(".project-pic").hover(function(element){
    
    if(element.target.className.includes('gif')){
    $(this).attr("src", function(index, attr){
        return attr.replace(".gif", "-hover.png");
    });
}else{
    $(this).attr("src", function(index, attr){
        return attr.replace(".png", "-hover.png");
    });
}
}, function(element){
    if(element.target.className.includes('gif')){
    $(this).attr("src", function(index, attr){
        return attr.replace("-hover.png", ".gif");
    });
    }else{
        $(this).attr("src", function(index, attr){
            return attr.replace("-hover.png", ".png");
        });
    }
});

$(".project-display-box").click(function(element){
if(lastClicked){
    $(`#${lastClicked}`).fadeOut(500);
}
    console.log(element.target.id);
    let projectName = element.target.id.substring(0,element.target.id.length-4);
    let projectID = (projectName + "-project");
    console.log(projectName);
    console.log(projectID);
    $(`#${projectID}`).fadeIn(1000);
    $('#to-top').removeClass('is-hidden');


lastClicked = projectID;

});

$(".project-display-box").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#project-body").offset().top
    }, 2000);
});

$("#to-top").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#slide4").offset().top
    }, 2000);
});