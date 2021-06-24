// @ts-ignore
import {pain, color} from './EditorView.tsx';

const get = (path: string, args: (string | number)[]) => {
  console.log(path);
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
  if (!str) return '';
  let a = str.match(/(&.)/g);
  if (!a) return str;
  a = a.map(item => item = color[item]);
  console.log(a);
  // return (
  //   <span style={{"color"}}></span>
  // )
};

export {
  parseString,
  parseColor
};
