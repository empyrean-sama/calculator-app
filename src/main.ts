const display = document.getElementById('screen') as HTMLDivElement;

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