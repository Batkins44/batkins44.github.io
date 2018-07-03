'use strict';

let puckLuck = `<div class="full-project" id='puck-luck-project'>
<hr>
<h2 class='project-title'>Puck-Luck</h2>
<span class='ind-project'>
<div class="project-description">
<h3>Hockey Stats Retriever<br>
NSS Front End Capstone Project</h3>
<a id='puck-luck-deployed' href="https://batkins44.github.io/puck-luck/">Go to Deployed Site!</a>
</div>
<img id='index-pic-1' class="project-pic project" alt="puck-luck" src="images/puck-luck.png" width="600px" height="300px"></a>
</span>
<span class='gray-project'>

<div class="gray-project-description">
    <h3>Challenge Statement</h3>
</div>
<img id='challenge-pic' class="gray-project-pic project-pic" alt="challenge statement" src="images/challenge.PNG" width="600px" height="300px">

</span>
<span class='ind-project'>
    <div class="project-description">
    <h3>The target persona for "Puck-Luck"</h3>
    </div>

        <img class="project-pic project" alt="persona" src="images/dylan.PNG" width="600px" height="300px">
    </span>
    <span class='gray-project'>

        <div class="gray-project-description">
            <h3>Minimum Viable Product</h3>
        </div>
        <img class="gray-project-pic project-pic" alt="MVP" src="images/mvp.PNG" width="600px" height="300px">

    </span>
    <span class='ind-project'>
            <div class="project-description">
            <h3>The Style-Guide for "Puck-Luck"</h3>
            </div>

                <img class="project-pic project" alt="style guide" src="images/style.PNG" width="600px" height="300px">
            </span>
            <span class='gray-project'>

                <div class="gray-project-description">
                    <h3>Search Through Players in the League</h3>
                </div>
                <img class="gray-project-pic project-pic" alt="search" src="images/search.PNG" width="600px" height="300px">

            </span>
            <span class='ind-project'>
                    <div class="project-description">
                    <h3>Save your Favorite Players and Teams to View their Status Daily</h3>
                    <br>
                    </div>
                        <div class='flexbox'>
                        <img class="flex-pics" alt="favorite-team" src="images/fav-team.PNG" width="500px" height="250px">
                        <img class="flex-pics" alt="favorite-player" src="images/fav-player.PNG" width="500px" height="250px">
                    </div>
                    </span>
                </div>
`;




$( document ).ready(function() {
    if($('#index-header').length){
        $('#slide1').fadeIn(1000);
        $('#slide2').fadeIn(3000);
        $('#slide3').fadeIn(3000);
        $('#slide4').fadeIn(3000);

    }
});

$(".project-pic").hover(function(){
    $(this).attr("src", function(index, attr){
        return attr.replace(".png", "-hover.png");
    });
}, function(){
    $(this).attr("src", function(index, attr){
        return attr.replace("-hover.png", ".png");
    });
});