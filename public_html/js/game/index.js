"use strict";
document.addEventListener('DOMContentLoaded', onLoad);

function getCtx(){
  return window.ctx?window.ctx:null;
}

function generateUUID() {
  // Create an array to hold the UUID segments
  let uuid = [], i, random;

  // Loop through 36 positions of the UUID
  for (i = 0; i < 36; i++) {
      // Generate a random number between 0 and 15
      random = Math.random() * 16 | 0;

      // Insert dashes at specific positions
      if (i === 8 || i === 13 || i === 18 || i === 23) {
          uuid[i] = '-';
      } else if (i === 14) {
          // Set the 13th character to '4' to indicate UUID version 4
          uuid[i] = '4';
      } else {
          // Set the 17th character to one of '8', '9', 'A', or 'B'
          uuid[i] = (i === 19) ? (random & 0x3 | 0x8).toString(16) : random.toString(16);
      }
  }

  // Join the array into a single string and return the UUID
  return uuid.join('');
}

function onLoad(){
  window.flyingDebugger = document.getElementById('flyingDebugger')
  
  const ctx = initCanvas();
  const options = getOptions();
  if(!ctx)
    return;
  const App = bootstrap(ctx,options);
  App.run();
}

jQuery('#musicToggleBtn').on('click', function (){
  let val = jQuery(this).attr('data-status');
  // console.log(jQuery(this))
  if(!val || val == 'muted'){
    val = 'unmuted'
    jQuery(this).removeClass('btn-outline-danger')
    jQuery(this).addClass('btn-outline-success')
    window.app.setOption('isMuted', false)
  }else{
    val = 'muted'
    jQuery(this).removeClass('btn-outline-success')
    jQuery(this).addClass('btn-outline-danger')
    window.app.setOption('isMuted', true)
  }
  jQuery(this).attr('data-status', val)
})

function initCanvas(params) {
  const convasWrapper = document.getElementById('gameWrapper');
  window.devicePixelRatio = 2
  const canvasWidth = 480;
  const canvasHeight = 640
  const ratio = window.devicePixelRatio;
  window.ratio = ratio
  // console.log('ratio', ratio)
  window.canv = document.getElementById('gameCanvas');
  if(window.canv == undefined){
    console.error('error cannot find game canvas #gameCanvas');
    return false;
  }
  window.mctx = window.canv.getContext('2d');

  window.canv.style.width = canvasWidth + "px"; 
  window.canv.style.height = canvasHeight + "px";   

  window.canv.width = Math.floor(canvasWidth*ratio);
  window.canv.height = Math.floor(canvasHeight*ratio);
  // window.mctx.canvas.width = parseInt(convasWrapper.offsetWidth)*ratio;
  // window.mctx.canvas.height = parseInt(convasWrapper.offsetHeight)*ratio;
  // window.mctx.canvas.width = parseInt(convasWrapper.offsetWidth);
  // window.mctx.canvas.height = parseInt(convasWrapper.offsetHeight);
  window.mctx.scale(ratio, ratio);
  window.addEventListener('keydown', function (e){
    var keyCode = e.code
    // console.log(e)
    if(keyCode != undefined && keyCode!=null){
      App.publishKeyboardEvent(keyCode);
      if(keyCode == 'Space'){
        e.preventDefault();
        return false;      
      }
    }
  })
  window.canv.addEventListener('click', function (e){

    const rect = window.canv.getBoundingClientRect();  // get element's abs. position
    const X = parseInt(e.clientX - rect.left);              // get mouse x and adjust for el.
    const Y = parseInt(e.clientY - rect.top);               // get mouse y and adjust for el.
    App.publishMouseEvent({X,Y})
    // alert('Mouse position: ' + x + ',' + y);
  });
  return mctx;
}

function getOptions(){
  // console.log('c options', window.canv.getBoundingClientRect())
  // console.log('canv.width: ' + window.canv.width + ' canv.height: ' + window.canv.height)
  // console.log('canv.scrollWidth: ' + window.canv.scrollWidth + ' canv.scrollHeight: ' + window.canv.scrollHeight)
  // console.log('canv.naturalWidth: ' + window.canv.naturalWidth + ' canv.naturalHeight: ' + window.canv.naturalHeight)
  

  return {

    width: parseInt(window.canv.getBoundingClientRect().width),
    height: parseInt(window.canv.getBoundingClientRect().height),
    backgroundColor: '#0a1530',
    physicsFPS: 120,
    preLoadAssets: true,
    showLogo: false,
    isMuted: true,
    resourcePath: '/resources.json'
  };
}
