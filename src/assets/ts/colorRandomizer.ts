const random = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const colorRandomizer = () => {
  const bg = { r: random(125) + 100, g: random(125) + 100, b: random(125) + 100 };
  const border = { rb: bg.r - 25, gb: bg.g - 25, bb: bg.b - 25 };
  return { bg, border };
};

export const colorRandomizerByChildren = (target:HTMLCollection) => {
    for(let elem of target){
        console.log(elem);
        const {bg , border } = colorRandomizer()
        if (!elem.style.backgroundColor && elem.id != "standBy") {
            elem.style.backgroundColor = `rgb(${bg.r},${bg.g},${bg.b})`
            elem.style.border = `4px solid rgb(${border.rb},${border.gb},${border.bb})`
        }

    }
}