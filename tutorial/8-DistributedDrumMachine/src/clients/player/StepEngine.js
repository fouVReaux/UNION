
class StepEngine {
  constructor(audioContext, period, buffer, activeStep) {
    this.audioContext = audioContext;
    this.period = period;
    this.buffer = buffer;
    this.activeStep = activeStep;
    this.score = [];

    this.output = this.audioContext.createGain();
  }

  connect(node) {
    this.output.connect(node);
  }

  advanceTime(syncTime) {
    const audioTime = this.master.audioTime;

    // play buffer at right step

    return syncTime + this.period;
  }
}

export default StepEngine;
