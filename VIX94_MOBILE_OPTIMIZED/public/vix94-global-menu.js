(function(){

    "use strict";

    if(document.getElementById("vix94GlobalMenuButton")) return;

    const links = [
        ["THE FREQUENCY","/?player=1"],
        ["PARTY MODE","/party.html"],
        ["ABOUT","/about.html"],
        ["ORIGINALS","/originals.html"],
        ["DISCOVER","/discover.html"],
        ["ARTISTS","/artists.html"],
        ["RECENTLY PLAYED","/recently-played.html"],
        ["SUBMIT MUSIC","/submit.html"],
        ["CONTACT","/contact.html"]
    ];

    const button=document.createElement("button");

    button.id="vix94GlobalMenuButton";
    button.type="button";
    button.textContent="MENU";
    button.setAttribute("aria-label","Open VIX 94' menu");
    button.setAttribute("aria-expanded","false");

    const overlay=document.createElement("div");

    overlay.id="vix94GlobalMenu";
    overlay.setAttribute("aria-hidden","true");

    const panel=document.createElement("div");

    panel.id="vix94GlobalMenuPanel";
    panel.setAttribute("role","dialog");
    panel.setAttribute("aria-modal","true");
    panel.setAttribute("aria-label","VIX 94' navigation");

    const eyebrow=document.createElement("div");

    eyebrow.id="vix94GlobalMenuEyebrow";
    eyebrow.textContent="EXPLORE THE";

    const brand=document.createElement("a");

    brand.id="vix94GlobalMenuBrand";
    brand.href="/?player=1";
    brand.setAttribute("aria-label","The Frequency");

    const logo=document.createElement("img");

    logo.src="/vix94logo.png";
    logo.alt="VIX 94'";

    brand.appendChild(logo);

    const frequency=document.createElement("div");

    frequency.id="vix94GlobalMenuFrequency";

    function makeWave(){
        const wrap=document.createElement("span");
        wrap.className="vix94-wave";
        const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
        svg.setAttribute("viewBox","0 0 38 10");
        svg.setAttribute("preserveAspectRatio","none");
        svg.setAttribute("aria-hidden","true");
        const path=document.createElementNS("http://www.w3.org/2000/svg","path");
        path.setAttribute("d","M0 5 L4 5 L6 2 L8 8 L10 4 L12 6 L15 1 L18 9 L21 4 L24 6 L27 2 L30 8 L33 5 L38 5");
        svg.appendChild(path);
        wrap.appendChild(svg);
        return wrap;
    }

    const leftWave=makeWave();
    const word=document.createElement("span");
    word.textContent="FREQUENCY";
    const rightWave=makeWave();
    frequency.append(leftWave,word,rightWave);

    const menuLinks=document.createElement("nav");

    menuLinks.id="vix94GlobalMenuLinks";
    menuLinks.setAttribute("aria-label","VIX 94' navigation");

    links.forEach(function(item){

        const a=document.createElement("a");

        a.href=item[1];
        a.textContent=item[0];
        a.addEventListener("click",function(){ closeMenu(); });
        menuLinks.appendChild(a);
    });

    const close=document.createElement("button");

    close.id="vix94GlobalMenuClose";
    close.type="button";
    close.textContent="CLOSE";

    panel.append(
        eyebrow,
        brand,
        frequency,
        menuLinks,
        close
    );

    overlay.appendChild(panel);

    document.body.appendChild(button);
    document.body.appendChild(overlay);

    function openMenu(){

        overlay.classList.add("open");

        overlay.setAttribute("aria-hidden","false");
        button.setAttribute("aria-expanded","true");

        document.documentElement.style.overflow="hidden";

        close.focus();
    }

    function closeMenu(){

        overlay.classList.remove("open");

        overlay.setAttribute("aria-hidden","true");
        button.setAttribute("aria-expanded","false");

        document.documentElement.style.overflow="";

        button.focus();
    }

    button.addEventListener("click",function(){

        if(overlay.classList.contains("open")){
            closeMenu();
        }else{
            openMenu();
        }

    });

    close.addEventListener("click",closeMenu);

    overlay.addEventListener("click",function(event){

        if(event.target===overlay){
            closeMenu();
        }

    });

    document.addEventListener("keydown",function(event){

        if(event.key==="Escape" &&
           overlay.classList.contains("open")){

            closeMenu();
        }

    });

    /*
     * Close menu automatically when navigating.
     */
    menuLinks.addEventListener("click",function(){
        document.documentElement.style.overflow="";
    });

})();
