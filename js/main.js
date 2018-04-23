"use strict";

var contact = require('./contact');

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
    {title: "Blog5",
            date:"February 3rd, 2017",
            content:`<p>Sriracha try-hard godard, typewriter chicharrones meditation prism
            shoreditch meggings tacos you probably haven't heard of them organic lyft.
            Meditation brunch adaptogen cardigan vape shabby chic. Forage tilde trust fund 
            drinking vinegar, raw denim irony pop-up vexillologist helvetica tumeric occupy
            vegan. Succulents ramps readymade chambray. Hell of kitsch gluten-free lomo,
                master cleanse pabst tumeric sriracha flexitarian. Fingerstache mlkshk yr
                ennui vice pickled ugh plaid post-ironic selvage retro single-origin coffee
                normcore trust fund. Succulents tofu cronut affogato selvage poutine ugh 
                chillwave raclette poke kogi.</p>`}
];

var blogHTML = document.getElementById("blog-holder");
for (let i=0; i < blogs.length;i++ ){
blogHTML.innerHTML += `<article class="flex-item"><h4>${blogs[i].title}</h4><h5>${blogs[i].date}</h5><p>${blogs[i].content}</p></article>`;


}