var uv     = { main : [new THREE.Vector2(0, .875), new THREE.Vector2(.125, .875), new THREE.Vector2(.125, 1),new THREE.Vector2(0, 1)],
               website : [new THREE.Vector2(.125, .875), new THREE.Vector2(.25, .875), new THREE.Vector2(.25, 1),new THREE.Vector2(.125, 1)],
               contact : [new THREE.Vector2(.250, .875), new THREE.Vector2(.375, .875), new THREE.Vector2(.375, 1),new THREE.Vector2(.250, 1)],
               me : [new THREE.Vector2(.375, .875), new THREE.Vector2(.500, .875), new THREE.Vector2(.500, 1),new THREE.Vector2(.375, 1)],
               projects : [new THREE.Vector2(.5, .875), new THREE.Vector2(.625, .875), new THREE.Vector2(.625, 1),new THREE.Vector2(.5, 1)],
               education : [new THREE.Vector2(.6251, .875), new THREE.Vector2(.7499, .875), new THREE.Vector2(.7499, 1),new THREE.Vector2(.6251, 1)],
               skills : [new THREE.Vector2(.75, .875), new THREE.Vector2(.875, .875), new THREE.Vector2(.875, 1),new THREE.Vector2(.75, 1)],
               motivations : [new THREE.Vector2(.8751, .875), new THREE.Vector2(1, .875), new THREE.Vector2(1, 1),new THREE.Vector2(.8751, 1)],

               vj1 : [new THREE.Vector2(0, .75), new THREE.Vector2(.125, .75), new THREE.Vector2(.125, .875),new THREE.Vector2(0, .875)],
               vj2 : [new THREE.Vector2(.125, .75), new THREE.Vector2(.25, .75), new THREE.Vector2(.25, .875),new THREE.Vector2(.125, .875)],
               vj3 : [new THREE.Vector2(.250, .75), new THREE.Vector2(.375, .75), new THREE.Vector2(.375, .875),new THREE.Vector2(.250, .875)],
               vj4 : [new THREE.Vector2(.375, .75), new THREE.Vector2(.500, .75), new THREE.Vector2(.500, .875),new THREE.Vector2(.375, .875)],
               vj5 : [new THREE.Vector2(.5, .75), new THREE.Vector2(.625, .75), new THREE.Vector2(.625, .875),new THREE.Vector2(.5, .875)],

               w1 : [new THREE.Vector2(0, .625), new THREE.Vector2(.125, .625), new THREE.Vector2(.125, .75),new THREE.Vector2(0, .75)],
               w2 : [new THREE.Vector2(.125, .625), new THREE.Vector2(.25, .625), new THREE.Vector2(.25, .75),new THREE.Vector2(.125, .75)],
               w3 : [new THREE.Vector2(.250, .625), new THREE.Vector2(.375, .625), new THREE.Vector2(.375, .75),new THREE.Vector2(.250, .75)],

               a1 : [new THREE.Vector2(0, .500), new THREE.Vector2(.125, .500), new THREE.Vector2(.125, .625),new THREE.Vector2(0, .625)],
               a2 : [new THREE.Vector2(.125, .500), new THREE.Vector2(.25, .500), new THREE.Vector2(.25, .625),new THREE.Vector2(.125, .625)]



};

var pages = THREE.ImageUtils.loadTexture( 'img/pages/pages.png' );
var bkgMain = THREE.ImageUtils.loadTexture( 'img/bkg/bkgmain.jpg' );
var bkgWebsite = THREE.ImageUtils.loadTexture( 'img/bkg/bkgweb.jpg');
var bkgContact = THREE.ImageUtils.loadTexture( 'img/bkg/bkgcontact.jpg');
var bkgAboutMe = THREE.ImageUtils.loadTexture( 'img/bkg/bkgAboutMe.jpg');
var bkgProjects = THREE.ImageUtils.loadTexture( 'img/bkg/bkgProjects.jpg');
var bkgMotivations = THREE.ImageUtils.loadTexture( 'img/bkg/bkgMotivations.jpg');
var bkgSkills = THREE.ImageUtils.loadTexture( 'img/bkg/bkgSkills.jpg');
var bkgEducation = THREE.ImageUtils.loadTexture( 'img/bkg/bkgEducation.jpg');
var bkgVj = THREE.ImageUtils.loadTexture( 'img/bkg/bkgVj.png');
var bkgWb = THREE.ImageUtils.loadTexture( 'img/bkg/bkgWb.jpg');


THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {
    //if(loaded = total) isLoading=false;
    document.getElementById("loadingText").innerHTML = "Loading: " + Math.round(loaded/total*100) + "%";
    if(loaded==total) document.getElementById("loadingDiv").style.display = 'none';
    //console.log( item, loaded, total );
};

var navs = {   main:      {top : "projects",bottom : "me",   left : "website", right: "contact", front: "main",    background:bkgMain},
               website:   {top : "main",    bottom : "main", left : "main",    right: "main",     front: "website", background:bkgWebsite},
               contact:   {top : "main",    bottom : "main", left : "main",    right: "main",     front: "contact", background:bkgContact},
               me:        {top : "main",    bottom : "skills", left : "education",    right: "motivations",     front: "me",      background:bkgAboutMe},
               projects:  {top : "w1",    bottom : "main", left : "a1",    right:"vj1",      front: "projects",background:bkgProjects},
               education: {top : "main",    bottom : "main", left : "main",    right:"me",      front: "education",background:bkgEducation},
               skills:    {top : "me",    bottom : "main", left : "main",    right:"main",      front: "skills",   background:bkgSkills},
               motivations:{top : "main",   bottom : "main", left : "me",    right:"main",      front: "motivations",  background:bkgMotivations},

               vj1: {top : "vj2",   bottom : "vj5", left : "projects",    right:"main",      front: "vj1",  background:bkgVj, buttons:[{height:0.073, width:0.34, x:0.08, y:-0.288, link:"https://www.youtube.com/watch?v=tVEEdebiVG8"}]},
               vj2: {top : "vj3",   bottom : "vj1", left : "projects",    right:"main",      front: "vj2",  background:bkgVj, buttons:[{height:0.073, width:0.34, x:0.08, y:-0.288, link:"https://www.youtube.com/watch?v=Vp_X0DgzwpI"},{height:0.073, width:0.34, x:-0.42, y:-0.288, link:"http://www.kongregate.com/games/lepka/mongo-the-shurmanos"}]},
               vj3: {top : "vj4",   bottom : "vj2", left : "projects",    right:"main",      front: "vj3",  background:bkgVj, buttons:[{height:0.073, width:0.34, x:0.08, y:-0.288, link:"https://www.youtube.com/watch?v=U5m4ixkeEX0"},{height:0.073, width:0.34, x:-0.42, y:-0.288, link:"http://samitier.github.io/Snow-Bros-Reborn/"}]},
               vj4: {top : "vj5",   bottom : "vj3", left : "projects",    right:"main",      front: "vj4",  background:bkgVj, buttons:[{height:0.073, width:0.34, x:0.08, y:-0.288, link:"https://www.youtube.com/watch?v=5jJCd3k_l98"},{height:0.073, width:0.34, x:-0.42, y:-0.288, link:"https://github.com/albarralnunez/TowerDefense"}]},
               vj5: {top : "vj1",   bottom : "vj4", left : "projects",    right:"main",      front: "vj5",  background:bkgVj, buttons:[{height:0.073, width:0.34, x:0.08, y:-0.288, link:"https://www.youtube.com/channel/UCjI7xjQrVNpVbXngJEimwSQ"}]},

               w1: {top : "main",   bottom : "projects", left : "w3",    right:"w2",      front: "w1",  background:bkgWb, buttons:[{height:0.073, width:0.34, x:-0.178, y:-0.342, link:"http://dhis2-hii.asfes.org/"}]},
               w2: {top : "main",   bottom : "projects", left : "w1",    right:"w3",      front: "w2",  background:bkgWb, buttons:[{height:0.073, width:0.34, x:0.08, y:-0.288, link:"https://github.com/ferranmarlet/ticketForAll"},{height:0.073, width:0.34, x:-0.42, y:-0.288, link:"http://ticketforall.herokuapp.com/"}]},
               w3: {top : "main",   bottom : "projects", left : "w2",    right:"w1",      front: "w3",  background:bkgWb},

               a1: {top : "a2",   bottom : "a2", left : "main",    right:"projects",      front: "a1",  background:bkgMain},
               a2: {top : "a1",   bottom : "a1", left : "main",    right:"projects",      front: "a2",  background:bkgMain},
}
