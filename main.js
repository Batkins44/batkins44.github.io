var blogs = [
    {title: "Nervous, but More Excited",
            date:"January 6th, 2017",
            content:"<p>We spent this week primarily preparing our systems for what is to come\
            in Cohort 24. Since I am using a Windows laptop, the instructions were a bit different\
            that the majority of my class. It involved downloading programs such as Windows Visual\
            Studio, including the extensions to simplify the process, and Git Bash which admittedly is\
            the most intimidating part of NSS so far. I felt so lost when I opened the shell, and even\
            moreso when they told me that our first assignment was to back up our harddrive. However,\
            it seems incredibly important so I'm going to make cheat sheets for navigating around the\
            terminal and I am going to pay extremely close attention to what is taught in class, because\
            for the first time in my life I feel ambitious and thrilled about what lies ahead.  </p>"},
    {title: "First Project!",
            date:"January 13th, 2017",
            content:"<p>This week at NSS, they threw us right into the deep end. They assigned us our first\
            group project. First, we were to choose our favorite character from our childhood and discuss\
            them as a group. We selected our favorite (Winnie the Pooh) and we decided that a honey company\
            would be the best angle to serve that specific persona. It became quickly apparent that \
            using github with a group was infinitely more complicated than using it for a personal site.\
            Our commits immediately had conflicts and it took what seemed like a lifetime to sort them out.\
            After a couple days of nonstop grinding and a bonus snow day, we had our honey business up and\
            running. It was a very proud feeling, being able to present a fully functioning website. Sure it\
            was a simple design, but two weeks ago I wouldn't have known where to start!</p>"},
    {title: "Blog3",
            date:"January 20th, 2017",
            content:"<p>Sriracha try-hard godard, typewriter chicharrones meditation prism\
            shoreditch meggings tacos you probably haven't heard of them organic lyft.\
            Meditation brunch adaptogen cardigan vape shabby chic. Forage tilde trust fund \
            drinking vinegar, raw denim irony pop-up vexillologist helvetica tumeric occupy\
            vegan. Succulents ramps readymade chambray. Hell of kitsch gluten-free lomo,\
                master cleanse pabst tumeric sriracha flexitarian. Fingerstache mlkshk yr\
                ennui vice pickled ugh plaid post-ironic selvage retro single-origin coffee\
                normcore trust fund. Succulents tofu cronut affogato selvage poutine ugh \
                chillwave raclette poke kogi.</p>"},
    {title: "Blog4",
            date:"January 27th, 2017",
            content:"<p>Sriracha try-hard godard, typewriter chicharrones meditation prism\
            shoreditch meggings tacos you probably haven't heard of them organic lyft.\
            Meditation brunch adaptogen cardigan vape shabby chic. Forage tilde trust fund \
            drinking vinegar, raw denim irony pop-up vexillologist helvetica tumeric occupy\
            vegan. Succulents ramps readymade chambray. Hell of kitsch gluten-free lomo,\
                master cleanse pabst tumeric sriracha flexitarian. Fingerstache mlkshk yr\
                ennui vice pickled ugh plaid post-ironic selvage retro single-origin coffee\
                normcore trust fund. Succulents tofu cronut affogato selvage poutine ugh \
                chillwave raclette poke kogi.</p>"},
    {title: "Blog5",
            date:"February 3rd, 2017",
            content:"<p>Sriracha try-hard godard, typewriter chicharrones meditation prism\
            shoreditch meggings tacos you probably haven't heard of them organic lyft.\
            Meditation brunch adaptogen cardigan vape shabby chic. Forage tilde trust fund \
            drinking vinegar, raw denim irony pop-up vexillologist helvetica tumeric occupy\
            vegan. Succulents ramps readymade chambray. Hell of kitsch gluten-free lomo,\
                master cleanse pabst tumeric sriracha flexitarian. Fingerstache mlkshk yr\
                ennui vice pickled ugh plaid post-ironic selvage retro single-origin coffee\
                normcore trust fund. Succulents tofu cronut affogato selvage poutine ugh \
                chillwave raclette poke kogi.</p>"}
];

var blogHTML = document.getElementById("blog-holder");
for (i=0; i < blogs.length;i++ ){
blogHTML.innerHTML += `<article class="flex-item"><h4>${blogs[i].title}</h4><h5>${blogs[i].date}</h5><p>${blogs[i].content}</p></article>`


}