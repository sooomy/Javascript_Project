const textInput = document.getElementById('textInput');
const voiceSelect = document.getElementById('voiceSelect');
const rateInput = document.getElementById('rate');
const pitchInput = document.getElementById('pitch');
const speakBtn = document.getElementById('speakBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resumeBtn = document.getElementById('resumeBtn');
const cancelBtn = document.getElementById('cancelBtn');
const messageEl = document.getElementById('message');

let synth = window.speechSynthesis;
let voices = [];
let utterance;
let isPaused = false;

function populateVoiceList() {
  voices = synth.getVoices().sort((a, b) => a.name.localeCompare(b.name));
  voiceSelect.innerHTML = '';
  voices.forEach((voice, i) => {
    const option = document.createElement('option');
    option.textContent = `${voice.name} (${voice.lang})`;
    option.value = i;
    voiceSelect.appendChild(option);
  });
}

// On some browsers, voices might not be immediately available
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
} else {
  populateVoiceList();
}

function speakText() {
  if (synth.speaking) {
    messageEl.textContent = '⚠️ Already speaking...';
    return;
  }

  if (textInput.value.trim() === '') {
    messageEl.textContent = '⚠️ Please enter some text.';
    return;
  }

  utterance = new SpeechSynthesisUtterance(textInput.value);
  const selectedVoice = voices[voiceSelect.value];
  if (selectedVoice) utterance.voice = selectedVoice;
  utterance.rate = parseFloat(rateInput.value);
  utterance.pitch = parseFloat(pitchInput.value);

  utterance.onstart = () => {
    messageEl.textContent = '🔊 Speaking...';
    updateButtons(true);
  };

  utterance.onend = () => {
    messageEl.textContent = '✅ Speech finished.';
    updateButtons(false);
  };

  utterance.onerror = (e) => {
    messageEl.textContent = '❌ Error occurred during speech.';
    updateButtons(false);
  };

  synth.speak(utterance);
}

function pauseSpeech() {
  if (synth.speaking && !synth.paused) {
    synth.pause();
    isPaused = true;
    messageEl.textContent = '⏸️ Paused.';
    updateButtons(true, true);
  }
}

function resumeSpeech() {
  if (synth.paused) {
    synth.resume();
    isPaused = false;
    messageEl.textContent = '▶️ Resumed.';
    updateButtons(true);
  }
}

function cancelSpeech() {
  if (synth.speaking) {
    synth.cancel();
    isPaused = false;
    messageEl.textContent = '⏹️ Stopped.';
    updateButtons(false);
  }
}

function updateButtons(isSpeaking, isPausedState = false) {
  speakBtn.disabled = isSpeaking;
  pauseBtn.disabled = !isSpeaking || isPausedState;
  resumeBtn.disabled = !isSpeaking || !isPausedState;
  cancelBtn.disabled = !isSpeaking;
}

speakBtn.addEventListener('click', speakText);
pauseBtn.addEventListener('click', pauseSpeech);
resumeBtn.addEventListener('click', resumeSpeech);
cancelBtn.addEventListener('click', cancelSpeech);
