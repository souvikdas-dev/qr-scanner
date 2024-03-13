import "./style.css";
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'
import { Html5QrcodeScanner } from "html5-qrcode";

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))

let html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  {
    fps: 40,
    qrbox: { width: 250, height: 250 },
    // rememberLastUsedCamera: true,
    // showTorchButtonIfSupported: true,
    // showZoomSliderIfSupported: true,
    defaultZoomValueIfSupported: 3,
  },
  /* verbose= */ false
);

function onScanSuccess(decodedText, decodedResult) {
  // handle the scanned code as you like, for example:
  console.log(`Code matched = ${decodedText}`, decodedResult);

  html5QrcodeScanner.pause(true);

  document.querySelector(
    "#html5-qrcode-button-camera-output"
  ).innerHTML = `<a href="${decodedText}">${decodedText}</a>`;
  document.querySelector("#html5-qrcode-button-camera-resume").style.display =
    "inline-block";
}

function resumeSacn() {
  document.querySelector("#html5-qrcode-button-camera-resume").style.display =
    "none";
  html5QrcodeScanner.resume();
}

function onScanFailure(error) {
  // handle scan failure, usually better to ignore and keep scanning.
  // for example:
  // console.warn(`Code scan error = ${error}`);
}

html5QrcodeScanner.render(onScanSuccess, onScanFailure);

document
  .querySelector("#html5-qrcode-button-camera-resume")
  .addEventListener("click", function () {
    resumeSacn();
  });
