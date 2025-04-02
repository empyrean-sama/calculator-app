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
                if(lastSymbol?.split("").length || 0 > 1) {
                    const cleaning = lastSymbol?.split("");
                    cleaning?.pop();
                    symbols.push(cleaning?.join("") || "");
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