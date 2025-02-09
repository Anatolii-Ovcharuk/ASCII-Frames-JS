/* ██████████ Frames JS (Runner) | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk ██████████ */

/* INSTALLATION */
/* Add in HTML page next: <script src="./frames.js" type="module"></script> */

/* Options */
const DEFAULT_TIME_CHANGE_FRAME = 100; /* Time to change next frame. Default value (numbers): 100 */
const DEFAULT_USE_FIX_REGISTER = false; /* Set all register to lowercase. Values: true/false. */
const SHOW_IN_CONSOLE = false; /* Show frame in browser console. Values: true/false. */
const NAME_HTML_ELEMENT = "ascii"; /* Set id name for show frame in HTML Element. Values: true/false. */

/* Runner */
const names = prompt('Entry frame name:');
const element = document.getElementById(NAME_HTML_ELEMENT);
if (!names || names === null || names === " ") {
    const message = "Name frame is not set. Aborted running.";
    console.warn(message);
    if (element) {
        element.innerText = message;
    };
} else {
    import(`./frames/${DEFAULT_USE_FIX_REGISTER ? names.toLocaleLowerCase() : names}.js`).then(module => {
        const frames = module.default;
        let index = 0;
        function updateFrame() {
            if (element) {
                element.innerText = frames[index];
            };
            if (SHOW_IN_CONSOLE) {
                console.log(frames[index])
            };
            index = (index + 1) % frames.length;
        }

        setInterval(() => {
            if (SHOW_IN_CONSOLE) {
                console.clear()
            };
            updateFrame();
        }, DEFAULT_TIME_CHANGE_FRAME);
    }).catch(error => {
        console.error("Failed to load module:", error);
        if (element) {
            element.innerText = error.message;
        };
    });
};
