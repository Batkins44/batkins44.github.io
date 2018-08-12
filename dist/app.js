(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
let projects = require("./projects");

var blogs = [
    {title: "Nervous, but More Excited",
            date:"January 6th, 2017",
            content:`<p>We spent this week primarily preparing our systems for what is to come
            in Cohort 24. Since I am using a Windows laptop, the instructions were a bit different
            that the majority of my class. It involved downloading programs such as Windows Visual
            Studio, including the extensions to simplify the process, and Git Bash which admittedly is
            the most intimidating part of NSS so far. I felt so lost when I opened the shell, and even
            moreso when they told me that our first assignment was to back up our harddrive. However,
            it seems incredibly important so I'm going to make cheat sheets for navigating around the
            terminal and I am going to pay extremely close attention to what is taught in class, because
            for the first time in my life I feel ambitious and thrilled about what lies ahead.  </p>`},
    {title: "First Project!",
            date:"January 13th, 2017",
            content:`<p>This week at NSS, they threw us right into the deep end. They assigned us our first
            group project. First, we were to choose our favorite character from our childhood and discuss
            them as a group. We selected our favorite (Winnie the Pooh) and we decided that a honey company
            would be the best angle to serve that specific persona. It became quickly apparent that 
            using github with a group was infinitely more complicated than using it for a personal site.
            Our commits immediately had conflicts and it took what seemed like a lifetime to sort them out.
            After a couple days of nonstop grinding and a bonus snow day, we had our honey business up and
            running. It was a very proud feeling, being able to present a fully functioning website. Sure it
            was a simple design, but two weeks ago I wouldn't have known where to start!</p>`},
    {title: "Moving On",
            date:"January 25th, 2017",
            content:`<p>Yesterday, we presented our third group project. It was the first time in this class that we were assigned a style guide to work with.
             The instructors spoke to us as if our company was aquired by a tech company and explained what would be expected of us. This was also the first time
              that we were required to use Javascript to populate content on each page. That seemed to be the most beneficial part of exercise the way I see it.
               I feel much more comfortable using '.innerHTML' method to dynamically show content. It seems like working through problems that seem impossible is
                the most helpful for diving into each subsequent project or exercise</p>`},
    {title: "Chatty Pineapple Metal",
            date:"February 14th, 2017",
            content:`<p>Yesterday, we presented our latest group project. They just keep coming, but I have felt a strong
            sense of satisfaction after each one of them. I imagine they are trying to get us in the mindset of actually having a job in this field
            Anyways, this project required us as a group to create a mostly functioning chatting website. We called our site NSS Mayhem,
            and it was meant to be a place to vent on days that programming just has it out for you.</p><p>The most difficult part of the project for me,
            was developing a way to give each message bubble a dynamically created unique id, and associate that ID with a dynamically created button.
            It didn't take me long to realize that Javascript does not like "document.getElementbyID" if the element doesn't exist yet. Anyways, I figured out
            an ugly way to solve the problem by using a counter everytime a message is created and adding counter number to both the element id and the
            dynamically created delete button. With this method, I was able to get the id of the button I clicked, then add the number at the end
            of the name of the message and delete it that way. I felt pretty good about figuring that out</p>`},
    {title: "Tornado Legends",
            date:"February 25th, 2017",
            content:`<p>Earlier this week, we finished our latest group project. The goal was to make an interactive map for a fictional theme park.
            We were given a large amount of data regarding the park's attractions, such as location, times the attraction is available, and the type
            of attraction it is. The idea was to make it easy for the user to see which attractions are in a certain location, by either clicking on the
            section or allowing them to use our search engine. My biggest hurdle was to create a module that displays which attractions are available at the current
            time. Additionally, I allowed the user to pick another time to see what was available then. Seeing as how using JSON files was brand new to me,
            using the XHR calls and the ".then()" method proved to be challenging. This project opened my eyes to the fact that no matter how simple
            a certain functionality seems, there is a lot more that goes into the actual coding of it. For example, I didn't consider the fact that I
            would have to account for the time display to say "12pm - 1pm" as opposed to 12pm-13pm. I was able to fix the details and honestly, I would say
            this is the best group project I've been a part of.  </p>`}
];

var blogHTML = document.getElementById("blog-holder");
if($('#blog-holder').length > 0){
for (let i=0; i < blogs.length;i++ ){
blogHTML.innerHTML += `<article class="flex-blog" id='blog${i}'><h4>${blogs[i].title}</h4><h5>${blogs[i].date}</h5></article>`;
}}



$('.flex-blog').click((element) => {
        // console.log(element);
        let blogid=element.currentTarget.id;
        blogid=blogid.slice(4,5);
        console.log(blogid);
        $('#blog-print').html(`<h2>${blogs[blogid].title}</h2><h3>${blogs[blogid].date}</h3><p>${blogs[blogid].content}</p>`);
        $('#blog-header').slideUp(1000);
        $('#blog-print').addClass('active-blog');
});




},{"./projects":2}],2:[function(require,module,exports){
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
},{}]},{},[1]);
