(function(){
  "use strict";

  const KEY="vix94-theme";

  function getTheme(){
    const saved=localStorage.getItem(KEY);
    if(saved==="light" || saved==="dark") return saved;

    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme:light)").matches
      ? "light"
      : "dark";
  }

  function applyTheme(theme){
    document.documentElement.setAttribute("data-vix-theme",theme);

    const button=document.getElementById("vix94ThemeToggle");
    const state=document.getElementById("vix94ThemeState");

    if(button){
      button.textContent=theme==="light" ? "LIGHT" : "DARK";
      button.setAttribute(
        "aria-label",
        theme==="light"
          ? "Switch to dark mode"
          : "Switch to light mode"
      );
    }

    if(state){
      state.textContent=theme==="light" ? "LIGHT MODE" : "DARK MODE";
    }
  }

  function createThemeControl(){
    const panel=document.getElementById("vix94GlobalMenuPanel");
    if(!panel || document.getElementById("vix94ThemeControl")) return;

    const control=document.createElement("div");
    control.id="vix94ThemeControl";
    control.innerHTML=
      '<span id="vix94ThemeState">DARK MODE</span>'+
      '<button id="vix94ThemeToggle" type="button" aria-label="Switch theme">DARK</button>';

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

      const next=
        document.documentElement.getAttribute("data-vix-theme")==="light"
          ? "dark"
          : "light";

      localStorage.setItem(KEY,next);
      applyTheme(next);
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
