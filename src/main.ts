const display = document.getElementById('screen') as HTMLDivElement;
const THEMES = ['dark', 'light', 'cyberpunk']

function handleInput(ev: Event) {
    const instruction: string = (ev.target as HTMLLinkElement).dataset['value'] as string;
    switch(instruction) {
        case 'reset': 
            display.textContent = '0';
            break;
        case 'del':
            if(display.textContent !== '0') {
                const symbols = display.textContent?.trim().split(" ") as string[];
                display.textContent = "";
                const lastSymbol = symbols.pop();
                
                // If the last symbol is a number (with or without decimal), remove only the last entered one character
                const lastSymbolArr = lastSymbol?.split("") || [];
                if(lastSymbolArr.length > 1) {
                    lastSymbolArr.pop();
                    symbols.push(lastSymbolArr.join(""));
                }
                
                symbols.forEach((symbol: string) => {
                    if(symbol === "+" || symbol === "-" || symbol === "/" || symbol === "x") {
                        display.textContent = display.textContent + " " + symbol + " ";
                    }
                    else {
                        display.textContent += symbol;
                    }
                });
                display.textContent.trim();
            }
            if(!display.textContent) {
                display.textContent = "0";
            }
            break;
        case "=":
            const result = eval(display.textContent?.split("").map((char) => (char !== 'x')? char : '*').join("") || "0");
            display.textContent = result;
            break;
        case "+":
        case "-":
        case "x":
        case "/":
            if(display.textContent !== "0") {
                const symbols = display.textContent?.trim().split(" ");
                const symbol = symbols?.pop();
                if(symbol !== '+' && symbol !== '-' && symbol !== 'x' && symbol !== '/') {
                    display.textContent = display.textContent + " " + instruction + " ";
                }
            }
            break;
        case ".":
            const symbols = display.textContent?.trim().split(" ");
            const lastSymbol = symbols?.pop() as string;
            if(!lastSymbol.split("").includes('.')) {
                display.textContent += '.';
            }
            break;
        default:
            if(display.textContent !== "0") {
                display.textContent = display.textContent + instruction;    
            }
            else {
                display.textContent = instruction;
            }
            break;
    }
}

// register the handleInput event on relevant actors 
document.querySelectorAll('[data-value]').forEach((el: Element) => {
    el.addEventListener('click', handleInput);
})

// clicking on the label of a theme should put me in that theme
document.querySelectorAll('.theme-label').forEach((el: Element) => {
    el.addEventListener('click', (e: Event) => {
        const root = document.documentElement;
        const label = e.target as HTMLLabelElement;
        root.dataset['theme'] = label.dataset['theme'];

        // save the current theme inside the browser
        localStorage.setItem("theme", label.dataset['theme'] as string);
    })
});

// clicking on the theme-selection-field must take me to the next theme or to the first one if there is no next
document.querySelector('.theme-selection-field')?.addEventListener('click', () => {
    const root = document.documentElement;
    const currentTheme = root.dataset['theme'];
    let themeNumber = THEMES.findIndex((themeStr) => themeStr === currentTheme);
    if(themeNumber === -1) {
        throw new Error('the website is set to a theme which is not supported, supported themes are: ' + THEMES.toString());
    }
    themeNumber = ((themeNumber + 1) > 2) ? 0 : themeNumber + 1; 
    root.dataset['theme'] = THEMES[themeNumber];

    // save the current theme inside the browser
    localStorage.setItem("theme", THEMES[themeNumber]);
});

// Try to load the saved theme from the browser on startup
const themeStr = localStorage.getItem("theme");
if(THEMES.findIndex((themeName) => themeName === themeStr) !== -1) {
    document.documentElement.dataset['theme'] = (themeStr as string);
}
else {
    // The dark theme is preferred when no preference is set manually or the preference is corrupted 
    localStorage.setItem("theme", 'dark');
    document.documentElement.dataset['theme'] = 'dark';
}