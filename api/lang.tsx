import React from 'react';
// @ts-ignore
import {pain, color, modifiers} from './EditorView.tsx';

const get = (path: string, args: (string | number)[]) => {
  // console.log(path);
  let a = path.split('.');
  return formatArgs(pain[a[0]][a[1]], args);
};

const formatArgs = (str: string, args: (string | number)[]) => {
  if ([undefined, null].includes(str)) return null;
  args.map((a, i) => {
    str = str?.replace(new RegExp(`\\{${i}\\}`, 'g'), a?.toString());
  });
  return str;
};

const parseString = (str: string) => {
  if (!str) return '';
  const a = str.match(/{lang:(.*?)}/);
  if (!a) return str;
  const b = a[0];
  let c = a[1];
  const d = c.split('|');
  // console.log(d[0])
  // console.log(d.slice(1))
  let l = get(d[0], d.slice(1));
  return l;
};

const parseColor = (str: string) => {
  monkeyFix();
  if (!str) return '';
  if (str.includes('GRADIENT')) return;
  let a = str.match(/(&.)/g);
  if (!a) return str;
  let b = str.split(/(&.)/g);
  if(b[0] === '') b.shift();
  // console.log(b);
  let c = [];
  b.forEach(item => {
    let index = b.indexOf(item);
    if(item.match(/(&.)/g)) {
      ![undefined, null].includes(b[index+1][modifiers[item]]) ? c.push((b[index+1][modifiers[item]] as any)()) : c.push(`<span color=${color[item]}>${b[index+1]}</span>`);
    }
  });
  // console.log(c);

  // return (
  //   <div>{c}</div>
  // );
  // a = a.map(item => color[item] ? item = color[item] : modifiers[item] ? item = modifiers[item] : item);
  // console.log(a);
  // return (
  //   <span style={{color: a[0]}}></span>
  // )
};

const ucase = (str: String) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export {
  parseString,
  parseColor,
  ucase
};


const monkeyFix = () => {
  if(!(String.prototype as any).underline) {
    (String.prototype as any).underline = function() {
      return (
        React.createElement(
          'u',{displayName: 'E'},this
        )
      );
    };
  }
};