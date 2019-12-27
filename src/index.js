const Tone = require("tone");

function Mk20edo(){
  //create a synth and connect it to the master output (your speakers)
  const synth = new Tone.MonoSynth().toMaster();

  const lut = "zZxXcCvVbBnNmM,<.>/?" +
              "aAsSdDfFgGhHjJkKlL;:" +
              "qQwWeErRtTyYuUiIoOpP";

  const lut2 = "123456789";

  const s = Math.log(2.0)/20;
  const s12 = Math.log(2.0)/12;
  const c0Freq = Math.exp(s12 * -57) * 440.0;
  zFreq = c0Freq * 8;
  this.lut = lut;
  this.lut2 = lut2;
  this.s = s;
  this.c0Freq = c0Freq;
  this.zFreq = zFreq;
  this.synth = synth;
};

Mk20edo.prototype = {
  KeyDown: function(event){
    let i = null;
    i = this.lut.indexOf(event.key);

    if (i >= 0){
      const freq = Math.exp(i * this.s) * this.zFreq;
      this.synth.triggerAttack(freq);
      return;
    }

    i = this.lut2.indexOf(event.key);

    if (i >= 0){
      this.zFreq = Math.exp(i * 20 * this.s) * this.c0Freq;
    }
  },
  KeyUp: function(event){
    this.synth.triggerRelease();
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
     mk20edo.KeyUp(event);
     $( "#in" ).val("_");
  });
});
