#  [p5 FFT functions](https://p5js.org/reference/#/p5.FFT)
Methods
setInput() Set the input source for the FFT analysis. If no source is provided, FFT will analyze all sound in the sketch.
waveform() Returns an array of amplitude values (between -1.0 and +1.0) that represent a snapshot of amplitude readings in a single buffer. Length will be equal to bins (defaults to 1024). Can be used to draw the waveform of a sound.
analyze() Returns an array of amplitude values (between 0 and 255) across the frequency spectrum. Length is equal to FFT bins (1024 by default). The array indices correspond to frequencies (i.e. pitches), from the lowest to the highest that humans can hear. Each value represents amplitude at that slice of the frequency spectrum. Must be called prior to using getEnergy().
getEnergy() Returns the amount of energy (volume) at a specific frequency, or the average amount of energy between two frequencies. Accepts Number(s) corresponding to frequency (in Hz), or a "string" corresponding to predefined frequency ranges ("bass", "lowMid", "mid", "highMid", "treble"). Returns a range between 0 (no energy/volume at that frequency) and 255 (maximum energy). NOTE: analyze() must be called prior to getEnergy(). analyze() tells the FFT to analyze frequency data, and getEnergy() uses the results to determine the value at a specific frequency or range of frequencies.
getCentroid() Returns the spectral centroid of the input signal. NOTE: analyze() must be called prior to getCentroid(). Analyze() tells the FFT to analyze frequency data, and getCentroid() uses the results determine the spectral centroid.
smooth() Smooth FFT analysis by averaging with the last analysis frame.
linAverages() Returns an array of average amplitude values for a given number of frequency bands split equally. N defaults to 16. NOTE: analyze() must be called prior to linAverages(). Analyze() tells the FFT to analyze frequency data, and linAverages() uses the results to group them into a smaller set of averages.
logAverages() Returns an array of average amplitude values of the spectrum, for a given set of Octave Bands NOTE: analyze() must be called prior to logAverages(). Analyze() tells the FFT to analyze frequency data, and logAverages() uses the results to group them into a smaller set of averages.
getOctaveBands() Calculates and Returns the 1/N Octave Bands N defaults to 3 and minimum central frequency to 15.625Hz. (1/3 Octave Bands ~= 31 Frequency Bands) Setting fCtr0 to a central value of a higher octave will ignore the lower bands and produce less frequency groups.