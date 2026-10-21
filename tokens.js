export const DEFAULT = {name:'Electric orchard', colors:['#DBF06C','#222824','#F4F3E9','#7B65C1','#D9B99B'],font:'sans',scale:1};
export const PRESETS = [DEFAULT,{name:'After hours',colors:['#9F8AE6','#181C2B','#F3EEE7','#A5CCC3','#E79C77'],font:'serif',scale:1.05},{name:'Clay & ink',colors:['#CE7755','#272622','#F8F1E5','#68785E','#D7C6AC'],font:'serif',scale:1}];
export const validHex = x => typeof x==='string' && /^#[\da-f]{6}$/i.test(x);
export function luminance(hex){if(!validHex(hex))throw new Error('Expected six-digit hex color'); const v=hex.slice(1).match(/../g).map(n=>parseInt(n,16)/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4);return v[0]*.2126+v[1]*.7152+v[2]*.0722;}
export function contrast(a,b){const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
export function normalize(value){if(!value||!Array.isArray(value.colors)||value.colors.length!==5||!value.colors.every(validHex))return structuredClone(DEFAULT);return {name:typeof value.name==='string'?value.name.slice(0,50):'Untitled palette',colors:value.colors,font:['sans','serif','mono'].includes(value.font)?value.font:'sans',scale:Math.min(1.25,Math.max(.85,Number(value.scale)||1))};}
export function cssTokens(value){const s=normalize(value),names=['accent','ink','canvas','secondary','warm'];return `/* ${s.name.replace(/\*\//g,'')} — Chromatic Studio */\n:root {\n${names.map((n,i)=>`  --color-${n}: ${s.colors[i]};`).join('\n')}\n  --font-family: ${fonts[s.font]};\n  --type-scale: ${s.scale};\n}\n`;}
export const fonts={sans:'Arial, Helvetica, sans-serif',serif:'Georgia, Times, serif',mono:'Consolas, monospace'};
export function undo(history,current){return history.length?{state:history.at(-1),history:history.slice(0,-1)}:{state:current,history};}
