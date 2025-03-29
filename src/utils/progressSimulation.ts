
// Utility for simulating progress during async operations
export const simulateProgress = (
  setProgressFn: (progress: number | ((prev: number) => number)) => void,
  onComplete?: () => void
) => {
  setProgressFn(0);
  
  const progressSteps = [
    { target: 15, time: 1000 },
    { target: 35, time: 2000 },
    { target: 60, time: 2500 },
    { target: 85, time: 2000 },
    { target: 95, time: 1500 },
  ];
  
  let currentStep = 0;
  
  const runStep = () => {
    if (currentStep < progressSteps.length) {
      const { target, time } = progressSteps[currentStep];
      let currentProgress = currentStep > 0 ? progressSteps[currentStep - 1].target : 0;
      
      const smallStepTime = time / (target - currentProgress);
      const stepInterval = setInterval(() => {
        setProgressFn((prev: number) => {
          const next = prev + 1;
          if (next >= target) {
            clearInterval(stepInterval);
            currentStep++;
            setTimeout(runStep, 300);
            return target;
          }
          return next;
        });
      }, smallStepTime);
    } else if (onComplete) {
      onComplete();
    }
  };
  
  runStep();
};
