var uv     = { main : [new THREE.Vector2(0, .875), new THREE.Vector2(.125, .875), new THREE.Vector2(.125, 1),new THREE.Vector2(0, 1)],
               website : [new THREE.Vector2(.125, .875), new THREE.Vector2(.25, .875), new THREE.Vector2(.25, 1),new THREE.Vector2(.125, 1)],
               contact : [new THREE.Vector2(.250, .875), new THREE.Vector2(.375, .875), new THREE.Vector2(.375, 1),new THREE.Vector2(.250, 1)],
               me : [new THREE.Vector2(.375, .875), new THREE.Vector2(.500, .875), new THREE.Vector2(.500, 1),new THREE.Vector2(.375, 1)],
               projects : [new THREE.Vector2(.5, .875), new THREE.Vector2(.625, .875), new THREE.Vector2(.625, 1),new THREE.Vector2(.5, 1)],
               education : [new THREE.Vector2(.6251, .875), new THREE.Vector2(.7499, .875), new THREE.Vector2(.7499, 1),new THREE.Vector2(.6251, 1)],
               skills : [new THREE.Vector2(.75, .875), new THREE.Vector2(.875, .875), new THREE.Vector2(.875, 1),new THREE.Vector2(.75, 1)],
               motivations : [new THREE.Vector2(.875, .875), new THREE.Vector2(1, .875), new THREE.Vector2(1, 1),new THREE.Vector2(.875, 1)]

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

var isLoading = true;
THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {
    if(loaded = total) isLoading=false;
    console.log( item, loaded, total );
};

var navs = {   main:      {top : "projects",bottom : "me",   left : "website", right: "contact", front: "main",    background:bkgMain},
               website:   {top : "main",    bottom : "main", left : "main",    right: "main",     front: "website", background:bkgWebsite},
               contact:   {top : "main",    bottom : "main", left : "main",    right: "main",     front: "contact", background:bkgContact},
               me:        {top : "main",    bottom : "skills", left : "education",    right: "motivations",     front: "me",      background:bkgAboutMe},
               projects:  {top : "main",    bottom : "main", left : "main",    right:"main",      front: "projects",background:bkgProjects},
               education: {top : "main",    bottom : "main", left : "main",    right:"me",      front: "education",background:bkgEducation},
               skills:    {top : "me",    bottom : "main", left : "main",    right:"main",      front: "skills",   background:bkgSkills},
               motivations:{top : "main",   bottom : "main", left : "me",    right:"main",      front: "motivations",  background:bkgMotivations}
}
