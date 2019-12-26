const Tone = require("tone");

function Mk20edo(){
  //create a synth and connect it to the master output (your speakers)
  const synth = new Tone.Synth().toMaster();

  const lut = "zZxXcCvVbBnNmM,<.>/?" +
              "aAsSdDfFgGhHjJkKlL;:" +
              "qQwWeErRtTyYuUiIoOpP";

  const s = Math.log(2.0)/20;
  const zFreq = 440.0;
  this.lut = lut;
  this.s = s;
  this.zFreq = zFreq;
  this.synth = synth;
};

Mk20edo.prototype = {
  KeyDown: function(event){
    const i = this.lut.indexOf(event.key);

    if (i >= 0){
      const freq = (1.0 + Math.exp(i * this.s)) * this.zFreq;
      this.synth.triggerAttackRelease(freq, "8n");
    }
  }
};

$(function(){
  const mk20edo = new Mk20edo();

  $( "#in" ).keydown(function(event){
     event.preventDefault();
     mk20edo.KeyDown(event);
     $( "#in" ).val(event.key.toString());
  });

  $( "#in" ).keyup(function(event) {
     event.preventDefault();
     $( "#in" ).val("_");
  });
});
