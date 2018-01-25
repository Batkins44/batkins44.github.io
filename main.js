var blogs = [
    {title: "Blog1",
            date:"January 6th, 2017",
            content:"<p>Sriracha try-hard godard, typewriter chicharrones meditation prism\
            shoreditch meggings tacos you probably haven't heard of them organic lyft.\
            Meditation brunch adaptogen cardigan vape shabby chic. Forage tilde trust fund \
            drinking vinegar, raw denim irony pop-up vexillologist helvetica tumeric occupy\
            vegan. Succulents ramps readymade chambray. Hell of kitsch gluten-free lomo,\
                master cleanse pabst tumeric sriracha flexitarian. Fingerstache mlkshk yr\
                ennui vice pickled ugh plaid post-ironic selvage retro single-origin coffee\
                normcore trust fund. Succulents tofu cronut affogato selvage poutine ugh \
                chillwave raclette poke kogi.</p>"},
    {title: "Blog2",
            date:"January 13th, 2017",
            content:"<p>Sriracha try-hard godard, typewriter chicharrones meditation prism\
            shoreditch meggings tacos you probably haven't heard of them organic lyft.\
            Meditation brunch adaptogen cardigan vape shabby chic. Forage tilde trust fund \
            drinking vinegar, raw denim irony pop-up vexillologist helvetica tumeric occupy\
            vegan. Succulents ramps readymade chambray. Hell of kitsch gluten-free lomo,\
                master cleanse pabst tumeric sriracha flexitarian. Fingerstache mlkshk yr\
                ennui vice pickled ugh plaid post-ironic selvage retro single-origin coffee\
                normcore trust fund. Succulents tofu cronut affogato selvage poutine ugh \
                chillwave raclette poke kogi.</p>"},
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