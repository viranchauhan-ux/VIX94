(function(){
  "use strict";

  const KEY="vix94-theme";

  function getTheme(){
    localStorage.removeItem(KEY);
    return "dark";
  }

  function applyTheme(theme){
    document.documentElement.setAttribute("data-vix-theme",theme);

    const themeColor=document.querySelector('meta[name="theme-color"]');
    if(themeColor){
      themeColor.setAttribute(
        "content",
        "#070909"
      );
    }

    document.querySelectorAll(
      ".logo img, .corner-logo, #vix94GlobalMenuBrand img"
    ).forEach(function(logo){
      logo.src="/vix94logo.png";
      logo.dataset.themeLogo=theme;
    });

    const button=document.getElementById("vix94ThemeToggle");
    const state=document.getElementById("vix94ThemeState");

    if(button){
      button.textContent="DARK";
      button.setAttribute(
        "aria-label",
        "Dark mode is enabled"
      );
    }

    if(state){
      state.textContent="DARK MODE";
    }
  }

  function createThemeControl(){
    const panel=document.getElementById("vix94GlobalMenuPanel");
    if(!panel || document.getElementById("vix94ThemeControl")) return;

    const control=document.createElement("div");
    control.id="vix94ThemeControl";
    control.innerHTML=
      '<span id="vix94ThemeState">DARK MODE</span>'+ 
      '<button id="vix94ThemeToggle" type="button" aria-label="Dark mode is enabled">DARK</button>';

    const close=document.getElementById("vix94GlobalMenuClose");

    if(close && close.parentNode){
      close.parentNode.insertBefore(control,close);
    }else{
      panel.appendChild(control);
    }

    const button=document.getElementById("vix94ThemeToggle");

    button.addEventListener("click",function(event){
      event.preventDefault();
      event.stopPropagation();

      localStorage.removeItem(KEY);
      applyTheme("dark");
    });

    applyTheme(getTheme());
  }

  applyTheme(getTheme());

  document.addEventListener("DOMContentLoaded",function(){
    createThemeControl();

    const observer=new MutationObserver(function(){
      createThemeControl();
    });

    observer.observe(document.body,{
      childList:true,
      subtree:true
    });

    window.setTimeout(function(){
      createThemeControl();
    },50);
  });
})();
