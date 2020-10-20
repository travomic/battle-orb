
/**
 * Expose `Backoff`.
 */
export default Backoff;

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */
function Backoff(opts: any = {}) {
  opts = opts || {};
  // @ts-ignore
  let self: any = this;
  self.ms = opts.min || 100;
  self.max = opts.max || 10000;
  self.factor = opts.factor || 2;
  self.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  self.attempts = 0;
}

/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */
Backoff.prototype.duration = function(){
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand =  Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */
Backoff.prototype.reset = function(){
  this.attempts = 0;
};

/**
 * Set the minimum duration
 *
 * @api public
 */
Backoff.prototype.setMin = function(min: number){
  this.ms = min;
};

/**
 * Set the maximum duration
 *
 * @api public
 */
Backoff.prototype.setMax = function(max: number){
  this.max = max;
};

/**
 * Set the jitter
 *
 * @api public
 */
Backoff.prototype.setJitter = function(jitter: number){
  this.jitter = jitter;
};
