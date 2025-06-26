document.addEventListener('DOMContentLoaded', () => {
  const progressRing = document.querySelector('.progress-ring-bar');
  const progressText = document.querySelector('.progress-text');
  const radius = progressRing.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  progressRing.style.strokeDasharray = circumference;
  progressRing.style.strokeDashoffset = circumference;

  let progress = 0;
  const target = 100;
  const duration = 4000; // durée animation en ms
  let startTime = null;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progressValue = Math.min((elapsed / duration) * target, target);
    const offset = circumference - (progressValue / 100) * circumference;
    progressRing.style.strokeDashoffset = offset;
    progressText.textContent = `${Math.floor(progressValue)}%`;
    if (progressValue < target) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
});
