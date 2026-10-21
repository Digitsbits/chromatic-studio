import test from 'node:test';import assert from 'node:assert/strict';import {DEFAULT,contrast,luminance,normalize,cssTokens,undo} from '../tokens.js';
test('black and white have a 21:1 contrast ratio',()=>assert.equal(contrast('#000000','#FFFFFF'),21));
test('contrast is symmetric and identical colors have ratio one',()=>{assert.equal(contrast('#DBF06C','#222824'),contrast('#222824','#DBF06C'));assert.equal(contrast('#abcdef','#abcdef'),1);});
test('invalid color inputs fail explicitly',()=>assert.throws(()=>luminance('red')));
test('malformed persisted state falls back safely',()=>{assert.deepEqual(normalize({colors:['bad']}),DEFAULT);assert.deepEqual(normalize(null),DEFAULT);});
test('valid persisted state is bounded and ignores unknown font',()=>{const v=normalize({...DEFAULT,scale:50,font:'unknown',name:'x'.repeat(100)});assert.equal(v.scale,1.25);assert.equal(v.font,'sans');assert.equal(v.name.length,50);});
test('CSS export contains all tokens and prevents comment breakout',()=>{const css=cssTokens({...DEFAULT,name:'test */ body{'});assert.match(css,/--color-accent: #DBF06C;/);assert.match(css,/--font-family: Arial/);assert.equal(css.split('*/').length,2);});
test('undo restores previous snapshot and consumes only last history item',()=>{const first={...DEFAULT,name:'First'},second={...DEFAULT,name:'Second'};const result=undo([first,second],DEFAULT);assert.equal(result.state.name,'Second');assert.deepEqual(result.history,[first]);assert.equal(undo([],DEFAULT).state,DEFAULT);});
