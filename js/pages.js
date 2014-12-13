var uv     = { main : [new THREE.Vector2(0, .875), new THREE.Vector2(.125, .875), new THREE.Vector2(.125, 1),new THREE.Vector2(0, 1)],
               website : [new THREE.Vector2(.125, .875), new THREE.Vector2(.25, .875), new THREE.Vector2(.25, 1),new THREE.Vector2(.125, 1)],
               contact : [new THREE.Vector2(.250, .875), new THREE.Vector2(.375, .875), new THREE.Vector2(.375, 1),new THREE.Vector2(.250, 1)],
               me : [new THREE.Vector2(.375, .875), new THREE.Vector2(.500, .875), new THREE.Vector2(.500, 1),new THREE.Vector2(.375, 1)],
               projects : [new THREE.Vector2(.375, .875), new THREE.Vector2(.500, .875), new THREE.Vector2(.500, 1),new THREE.Vector2(.375, 1)]
};

var bkgMain = THREE.ImageUtils.loadTexture( 'img/bkg/bkgmain.png' );
var bkgWebsite = THREE.ImageUtils.loadTexture( 'img/bkg/bkgweb.png');
var bkgContact = THREE.ImageUtils.loadTexture( 'img/bkg/bkgcontact.png');
var bkgProva1 = THREE.ImageUtils.loadTexture( 'img/bkg/bkg2.png');
var bkgProva2 = THREE.ImageUtils.loadTexture( 'img/bkg/bkg3.jpg');

var navs = {   main:    {top : "projects",bottom : "me",   left : "website", right: "contact", front: "main",    background:bkgMain},
               website: {top : "main",    bottom : "main", left : "main",    right: "main",     front: "website", background:bkgWebsite},
               contact: {top : "main",    bottom : "main", left : "main",    right: "main",     front: "contact", background:bkgContact},
               me:      {top : "main",    bottom : "main", left : "main",    right: "main",     front: "me",      background:bkgProva1},
               projects:{top : "main",    bottom : "main", left : "main",    right:"main",      front: "projects",background:bkgProva2}
}
