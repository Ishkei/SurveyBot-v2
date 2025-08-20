function isFlashEnabled()
{
    var hasFlash = false;
    try
    {
        var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if(fo) hasFlash = true;
    }
    catch(e)
    {
        if(navigator.mimeTypes ["application/x-shockwave-flash"] != undefined) hasFlash = true;
    }
    return hasFlash;
}

function hasHTML5Video()
{
if (Modernizr.video) {
    return true;
} else {
    return false;
}
}


(function(window,document,undefined){

var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
document.getElementById("w").value = x;
document.getElementById("h").value = y;

if(isFlashEnabled()) {
document.getElementById('fl').value=1;
} else {
document.getElementById('fl').value=0;
}   

if(hasHTML5Video()) {
document.getElementById('h5v').value=1;
} else {
document.getElementById('h5v').value=0;
}   

})(this,document)