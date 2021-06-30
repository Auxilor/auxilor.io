import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// @ts-expect-error
import { ucase } from './lang.tsx';
import React, { MouseEventHandler, useState } from 'react';
// @ts-expect-error
import { createNewArgument } from './BaseEditor.ts';

const getEditorView = (data: Data, editorData, key) => {
  const {name, type} = editorData;
  switch (name) {
  case 'sets':
    const sets = data.sets;
    const set = sets.filter(item => item.name === type)[0];
    return newMethod(set, key);
    // return ABigFuckoffTemplate(set, key);
  case 'tiers':
    const tiers = data.tiers;
    break;
  default:
    break;
  }
};

const rerender = {
  value: true,
  set render(bool) {
    this.value = bool;
  },
  get rerender() {
    return this.value;
  }
};

function CreateSetPropertyNode({nodeName, set, children}: {nodeName:string, set:setData, children:Array<argument>}){
  console.log('children');
  console.log(children);
  console.log('name');
  console.log(nodeName);
  const [properties, setProperties] = useState(children);
  console.log('set Children');
  const removeArg = (name:String) => {
    setProperties([...properties.filter(item => item.id !== name)]);
  };

  const createArg = (item:string) => {
    setProperties([...properties, createNewArgument('test', 10)]);
    console.log(set[item]);
  };
  // return (
  //   <div></div>
  // );
  return (
    <div className='node-container'>
      <div className='property-node'>
        <span>{nodeName}</span>
        <button title='Add' onClick={() => createArg(nodeName)}>
          <FontAwesomeIcon icon="plus-circle"/>
        </button>
      </div>
      {
        properties.map(item => (
          <div key={item.id} className="tab property">
            <div>
              {
                item.id.includes('multiplier')
                  ? `${ucase(item.id.replace('-multiplier', ' ').replace('-', ' '))}: x${item.args} Multiplier.`
                  : item.id.includes('chance')
                    ? `${ucase(item.id.replace('-chance', ' ').replace('-', ' '))}: ${item.args}% Chance.`
                    : item.id.includes('percent')
                      // @ts-expect-error
                      ? `${ucase(item.id.replaceAll('-', ' '))}: ${item.args}%`
                      // @ts-expect-error
                      : `${ucase(item.id.replaceAll('-', ' '))}: ${item.args}.`
              }
            </div>
            <button title='Remove Item' onClick={() => {removeArg(item.id);}}>
              <FontAwesomeIcon icon='times' />
            </button>
          </div>
        ))
      }
    </div>
  );
} 

// const createSetPropertyNode = (nodeName: String, OnClickEvent: MouseEventHandler, children: Array<argument>) => {
//   return (
//     <div className='node-container'>
//       <div className='property-node'>
//         <span>{nodeName}</span>
//         <button title='Add' onClick={OnClickEvent}>
//           <FontAwesomeIcon icon="plus-circle"/>
//         </button>
//       </div>
//       {
//         children.map(item => (
//           <div key={item.id} className="tab property">
//             <div>
//               {
//                 item.id.includes('multiplier')
//                   ? `${ucase(item.id.replace('-multiplier', ' ').replace('-', ' '))}: x${item.args} Multiplier.`
//                   : item.id.includes('chance')
//                     ? `${ucase(item.id.replace('-chance', ' ').replace('-', ' '))}: ${item.args}% Chance.`
//                     : item.id.includes('percent')
//                       ? `${ucase(item.id.replaceAll('-', ' '))}: ${item.args}%`
//                       : `${ucase(item.id.replaceAll('-', ' '))}: ${item.args}.`
//               }
//             </div>
//             <button title='Remove Item' onClick={() => {alert('remove item');}}>
//               <FontAwesomeIcon icon='times' />
//             </button>
//           </div>
//         ))
//       }
//     </div>
//   );
// };

const newMethod = (set: setData, EditorKey: String) => {
  let setObject = Object.keys(set);
  EditorKey.toLowerCase() === 'properties'
    ? setObject = setObject.filter(item => !['helmet', 'chestplate', 'elytra', 'leggings', 'boots', 'name'].includes(item))
    : setObject = setObject.filter(item => ['helmet', 'chestplate', 'elytra', 'leggings', 'boots'].includes(item));

  if(EditorKey.toLowerCase() === 'properties') {
    return (
      <div className='main-node-container'>
        {
          setObject.map(item => (
            isArgumentNotString(set[item])
              // eslint-disable-next-line react/no-children-prop
              ? <CreateSetPropertyNode nodeName={item} set={set} children={set[item]} />
              : <div><span color="black">{item}</span></div>
          ))
        }
      </div>
    );
  }
};

function isArgumentNotString(object:any): object is Array<unknown> {
  // console.log(object);
  // console.log('bool');
  if(typeof object === 'boolean') return false;
  // console.log('string');
  if(typeof object[0] === 'string') return false;
  return typeof object[0] === 'object' ? object[0].args !== undefined : object[0] === undefined;
}

const getMeta = (data: Data) => {
  const {enchants, potionEffects, effects, conditions} = data.meta;

};

export {
  getEditorView,
};

type Data = {
  sets: Array<setData>,
  tiers: Array<tierData>,
  meta: metaData,
}

interface tierData {
  name: String,
  display: String,
  requiresTiers: Array<String>,
  crystalCraftable: boolean,
  crystalName: String,
  crystalRecipe: recipe,
  recipeGiveAmount: number,
  crystalLore: Array<String>,
  properties: {
    helmet: property,
    chestplate: property,
    elytra: property,
    leggings: property,
    boots: property,
  }
}

interface setData {
  name: string,
  conditions: Array<argument>,
  effects: Array<argument>,
  advancedEffects: Array<argument>,
  potionEffects: Array<argument>,
  advancedLore: Array<String>,
  advancementShardName: String,
  advancementShardLore: Array<String>,
  shardCraftable: boolean,
  shardRecipe: recipe,
  helmet: armorPiece,
  chestplate: armorPiece,
  elytra: armorPiece,
  leggings: armorPiece,
  boots: armorPiece,
}

interface metaData {
  enchants: Array<String>,
  potionEffects: Array<String>,
  effects: Array<String>,
  conditions: Array<String>
}

interface property {
  armor: number,
  toughness: number,
  knockbackResistance: number,
  speedPercentage: number,
  attackSpeedPercentage: number,
  attackDamagePercentage: number,
  attackKnockbackPercentage: number
}

interface armorPiece {
  enchants: Array<enchantment>,
  material: String,
  skullTexture?: String,
  leatherColor?: String,
  name: string,
  advancedName: String,
  effectiveDurability: number,
  unbreakable: boolean,
  flags: Array<String>,
  customModelData: number,
  lore: Array<String>,
  craftable: boolean,
  defaultTier: String,
  recipe: Array<String>
}

interface argument {
  id?: string,
  args?: number
}

interface enchantment {
  id?: string,
  level?: number
}

type recipe = Array<String>

enum color {
  '&0' = '#000000',
  '&1' = '#0000AA',
  '&2' = '#00AA00',
  '&3' = '#00AAAA',
  '&4' = '#AA0000',
  '&5' = '#AA00AA',
  '&6' = '#FFAA00',
  '&7' = '#AAAAAA',
  '&8' = '#555555',
  '&9' = '#5555FF',
  '&a' = '#55FF55',
  '&b' = '#55FFFF',
  '&c' = '#FF5555',
  '&d' = '#FF55FF',
  '&e' = '#55FF55',
  '&f' = '#FFFFFF',
}

enum modifiers {
  '&l' = 'italics',
  '&o' = 'bold',
  '&n' = 'underline',
  '&m' = 'strike',
}

enum potionsEnum {
  'ABSORPTION' = 'Absorption: Level {0}.',
  'BAD_OMEN' = 'Bad Omen: Level {0}.',
  'BLINDNESS' = 'Blindness: Level {0}.',
  'CONDUIT_POWER' = 'Conduit Power: Level {0}.',
  'CONFUSION' = 'Nausea: Level {0}.',
  'DAMAGE_RESISANCE' = 'Resistance: Level {0}.',
  'DOLPHINS_GRACE' = 'Dolphins Grace: Level {0}.',
  'FAST_DIGGING' = 'Haste: Level {0}.',
  'FIRE_RESISTANCE' = 'Fire Resistance: Level {0}.',
  'GLOWING' = 'Glowing: Level {0}.',
  'HEALTH_BOOST' = 'Health Boost: Level {0}.',
  'HERO_OF_THE_VILLAGE' = 'Hero Of the Village: Level {0}.',
  'HUNGER' = 'Hunger: Level {0}.',
  'INCREASE_DAMAGE' = 'Strength: Level {0}.',
  'INVISIBILITY' = 'Invisibility: Level {0}.',
  'JUMP' = 'Jump Boost: Level {0}.',
  'LEVITATION' = 'Levitation: Level {0}.',
  'LUCK' = 'Luck: Level {0}.',
  'NIGHT_VISION' = 'Night Vision: Level {0}.',
  'POISON' = 'Poison: Level {0}.',
  'REGENERATION' = 'Regeneration: Level {0}.',
  'SATURATION' = 'Saturation: Level {0}.',
  'SLOW' = 'Slowness: Level {0}.',
  'SLOW_DIGGING' = 'Mining Fatigue: Level {0}.',
  'SLOW_FALLING' = 'Slow Falling: Level {0}.',
  'SPEED' = 'Swiftness: Level {0}.',
  'UNLUCK' = 'Bad Luck: Level {0}.',
  'WATER_BREATHING' = 'Water Breathing: Level {0}.',
  'WEAKNESS' = 'Weakness: Level {0}.',
  'WITHER' = 'Wither: Level {0}.'
}

enum conditionsEnum {
  'above-health-percent' = 'Above Health Percent',
  'below-health-percent' = 'Below Health Percent',
  'above-hunger-percent' = 'Above Hunger Percent',
  'below-hunger-percent' = 'Below Hunger Percent',
  'above-xp-level' = 'Above XP level',
  'below-xp-level' = 'Below XP level',
  'above-y-level' = 'Above Y level',
  'below-y-level' = 'Below Y level',
  'has-permission' = 'Has Permission',
  'in-biome' = 'In Biome',
  'in-water' = 'In Water',
  'in-world' = 'In World'
}

enum effectsEnum { 
  'attack-speed-multiplier' = 'Atack Speed: {0} Multiplier.',
  'bonus-hearts' = 'Bonus Hearts: {0} Hearts.',
  'boss-damage-multiplier' = 'Boss Damage: {0} Multiplier.',
  'bow-damage-multiplier' = 'Bow Damage: {0} Multiplier.',
  'damage-multiplier' = 'Damage: {0} Multiplier.',
  'damage-taken-multiplier' = 'Damage Taken: {0} Multiplier.',
  'durability-multiplier' = 'Durability: {0} Multiplier.',
  'evade-chance' = 'Evade: {0}% Chance.',
  'experience-multiplier' = 'Experience: {0} Multiplier.',
  'fall-damage-multiplier' = 'Fall Damage: {0} Multiplier.',
  'flight' = 'Flight: {0}.',
  'hunger-loss-multiplier' = 'Hunger Loss: {0} Multiplier.',
  'melee-damage-multiplier' = 'Melee Damage: {0} Multiplier.',
  'regeneration-multiplier' = 'Regeration: {0} Multiplier.',
  'speed-multiplier' = 'Speed: {0} Multiplier.',
  'trident-damage-multiplier' = 'Trident Damage: {0} Multiplier.',
  'warp-chance' = 'Warp: {0}% Chance.'
}

const pain = {
  potionEffects: potionsEnum,
  advancedPotionEffects: potionsEnum,
  conditions: conditionsEnum,
  effects: effectsEnum,
  advancedEffects: effectsEnum
}; 