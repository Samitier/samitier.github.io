var uv     = { main : [new THREE.Vector2(0, .875), new THREE.Vector2(.125, .875), new THREE.Vector2(.125, 1),new THREE.Vector2(0, 1)],
               website : [new THREE.Vector2(.125, .875), new THREE.Vector2(.25, .875), new THREE.Vector2(.25, 1),new THREE.Vector2(.125, 1)],
               contact : [new THREE.Vector2(.250, .875), new THREE.Vector2(.375, .875), new THREE.Vector2(.375, 1),new THREE.Vector2(.250, 1)],
               me : [new THREE.Vector2(.375, .875), new THREE.Vector2(.500, .875), new THREE.Vector2(.500, 1),new THREE.Vector2(.375, 1)],
               projects : [new THREE.Vector2(.5, .875), new THREE.Vector2(.625, .875), new THREE.Vector2(.625, 1),new THREE.Vector2(.5, 1)],
               education : [new THREE.Vector2(.6251, .875), new THREE.Vector2(.7499, .875), new THREE.Vector2(.7499, 1),new THREE.Vector2(.6251, 1)],
               skills : [new THREE.Vector2(.75, .875), new THREE.Vector2(.875, .875), new THREE.Vector2(.875, 1),new THREE.Vector2(.75, 1)],
               motivations : [new THREE.Vector2(.875, .875), new THREE.Vector2(1, .875), new THREE.Vector2(1, 1),new THREE.Vector2(.875, 1)],

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
var bkgMain = THREE.ImageUtils.loadTexture( 'img/bkg/bkgmain.png' );
var bkgWebsite = THREE.ImageUtils.loadTexture( 'img/bkg/bkgweb.png');
var bkgContact = THREE.ImageUtils.loadTexture( 'img/bkg/bkgcontact.png');
var bkgAboutMe = THREE.ImageUtils.loadTexture( 'img/bkg/bkgAboutMe.png');
var bkgProjects = THREE.ImageUtils.loadTexture( 'img/bkg/bkgProjects.png');
var bkgMotivations = THREE.ImageUtils.loadTexture( 'img/bkg/bkgMotivations.png');
var bkgSkills = THREE.ImageUtils.loadTexture( 'img/bkg/bkgSkills.png');
var bkgEducation = THREE.ImageUtils.loadTexture( 'img/bkg/bkgEducation.png');
var bkgVj = THREE.ImageUtils.loadTexture( 'img/bkg/bkgVj.png');
var bkgWb = THREE.ImageUtils.loadTexture( 'img/bkg/bkgWb.png');


var isLoading = true;
THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {
    if(loaded = total) isLoading=false;
    console.log( item, loaded, total );
};

var navs = {   main:      {top : "projects",bottom : "me",   left : "website", right: "contact", front: "main",    background:bkgMain},
               website:   {top : "main",    bottom : "main", left : "main",    right: "main",     front: "website", background:bkgWebsite},
               contact:   {top : "main",    bottom : "main", left : "main",    right: "main",     front: "contact", background:bkgContact},
               me:        {top : "main",    bottom : "skills", left : "education",    right: "motivations",     front: "me",      background:bkgAboutMe},
               projects:  {top : "w1",    bottom : "main", left : "a1",    right:"vj1",      front: "projects",background:bkgProjects},
               education: {top : "main",    bottom : "main", left : "main",    right:"me",      front: "education",background:bkgEducation},
               skills:    {top : "me",    bottom : "main", left : "main",    right:"main",      front: "skills",   background:bkgSkills},
               motivations:{top : "main",   bottom : "main", left : "me",    right:"main",      front: "motivations",  background:bkgMotivations},

               vj1: {top : "vj2",   bottom : "vj5", left : "projects",    right:"main",      front: "vj1",  background:bkgVj},
               vj2: {top : "vj3",   bottom : "vj1", left : "projects",    right:"main",      front: "vj2",  background:bkgVj},
               vj3: {top : "vj4",   bottom : "vj2", left : "projects",    right:"main",      front: "vj3",  background:bkgVj},
               vj4: {top : "vj5",   bottom : "vj3", left : "projects",    right:"main",      front: "vj4",  background:bkgVj},
               vj5: {top : "vj1",   bottom : "vj4", left : "projects",    right:"main",      front: "vj5",  background:bkgVj},

               w1: {top : "main",   bottom : "projects", left : "w3",    right:"w2",      front: "w1",  background:bkgWb},
               w2: {top : "main",   bottom : "projects", left : "w1",    right:"w3",      front: "w2",  background:bkgWb},
               w3: {top : "main",   bottom : "projects", left : "w2",    right:"w1",      front: "w3",  background:bkgWb},

               a1: {top : "a2",   bottom : "a2", left : "main",    right:"projects",      front: "a1",  background:bkgMain},
               a2: {top : "a1",   bottom : "a1", left : "main",    right:"projects",      front: "a2",  background:bkgMain},
}
