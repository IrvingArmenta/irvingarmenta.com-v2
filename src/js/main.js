/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
;if("document" in self&&!("classList" in document.createElement("_"))){(function(j){"use strict";if(!("Element" in j)){return}var a="classList",f="prototype",m=j.Element[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.getAttribute("class")||""),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.setAttribute("class",this.toString())}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false;do{r=t[s]+"";var q=g(this,r);if(q!==-1){this.splice(q,1);o=true}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}return !o};e.toString=function(){return this.join(" ")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))};

var body = document.getElementById('body');
var main = document.getElementById('main');
var html = document.getElementById('irving-html');
var backButtons = document.querySelectorAll('.back-button');
var navButtons = document.querySelectorAll('.nav-link');
var sections = document.getElementsByTagName('section');
var contentSection = document.querySelectorAll('.section-content');
var navButtonsArray = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
var sectionsArray = Array.prototype.slice.call(document.getElementsByTagName('section'));


function sectionsActiveClass(dir) {
  var flag = false;
  Array.prototype.forEach.call(sections, function(el) {
    if (dir === el.getAttribute('class') && !el.classList.contains('activated')) {
      setTimeout(function() {
        var sectionSelected = document.querySelector('.' + dir);
        sectionSelected.classList.add('activated');
      }, 800);
    } else {
      return false;
    }
  });
}

for (var i = 0, length = navButtons.length; i < length; i++) {
      var item = navButtons[i];
       item.addEventListener('click', function() {
            var direction = this.getAttribute('data-go');
            sectionsActiveClass(direction);
            setTimeout(function() {
              window.location.hash = direction;
                body.classList.add('body--' + direction);
            }, 150);
        });
};


// backButton click function
for (var i = 0, length = backButtons.length; i < length; i++) {
    backButtons[i].addEventListener('click', function() {
        body.setAttribute("class", "body");
        if (history.pushState) {
            history.pushState(null, null, window.location.origin);
        } else {
            window.location.hash = "";
        }
    });
};

function hashNav() {
    Array.prototype.forEach.call(navButtons, function(el, i) {
        var direction = el.getAttribute('data-go');
        if (window.location.hash === '#' + direction) {
            setTimeout(function() {
                body.classList.add('body--' + direction);
            }, 150);
        }
    });
}

hashNav();

function locationHashChanged(callback) {
    if (window.location.hash === "" || window.location.hash === 'null') {
        body.setAttribute("class", "body");
    } else {
        body.classList.add('body--' + window.location.hash.substring(1));
    }
}

window.onhashchange = locationHashChanged;


// media query event handler
if (matchMedia) {
  var mq = window.matchMedia("(min-width: 500px)");
  mq.addListener(WidthChange);
  WidthChange(mq);
}

// media query change
function WidthChange(mq) {
  const el = document.querySelectorAll(".nav-button");
  if (mq.matches) {
    VanillaTilt.init(el, {
        speed: 400,
        max: 50,
        perspective: 300
    });
  } else {
    for (var i = 0, len = el.length; i < len; i++) {
      el[i].vanillaTilt.destroy();
    }
  }
}
