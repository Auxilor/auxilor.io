import { InputGroup, FormControl, Button } from 'react-bootstrap';
// @ts-ignore
import { parseString, parseColor } from './lang.tsx';
import Image from 'next/image';

const getEditorView = (data: Data, editorData, key) => {
  const {name, type} = editorData;
  switch (name) {
  case 'sets':
    const sets = data.sets;
    const set = sets.filter(item => item.name === type)[0];
    console.log(set);
    return ABigFuckoffTemplate(set, key);
  case 'tiers':
    const tiers = data.tiers;
    break;
  default:
    break;
  }
};

const ABigFuckoffTemplate = (set: setData, EditorKey: String) => {
  let ObjSet = Object.keys(set);
  EditorKey.toLowerCase() === 'properties'
    ? ObjSet = ObjSet.filter(item => !['helmet', 'chestplate', 'elytra', 'leggings', 'boots', 'name'].includes(item))
    : ObjSet = ObjSet.filter(item => !['name', 'conditions', 'effects', 'advancedEffects', 'potionEffects', 'advancedPotionEffects', 'advancedLore', 'advancementShardName', 'advancementShardLore', 'shardCraftable', 'shardRecipe'].includes(item));

  // console.log(ObjSet)

  ObjSet.map(item => {
    Object.values(set[item]).map(item => console.log(instanceOfargument(item)));
    // Array.isArray(set[item]) ? set[item].length === 0 ? console.log('Undefined') : Object.values(set[item]).map(item => console.log(`${item['id']}: With ${item['args']}%`)) : console.log(set[item])
  });
  if(EditorKey.toLowerCase() === 'properties') {
    return (
      <ul>
        {
          ObjSet.map(item => (
            <li key={item} className='item'>
              <div>
                <span><b>{item}:  </b></span>
                {
                  Array.isArray(set[item])
                    ? item.toLowerCase().includes('recipe')
                      ? <div className="tab grid">{(set[item]).map((item: string) => <div key={item}><Image src={`/assets/items/${item}`} width="64" height="64"/></div>)}</div>
                      : set[item].length === 0
                        ? <div className="tab">Empty</div>
                        : Object.values(set[item]).map(property =>
                          <>
                            {
                              instanceOfargument(property)
                                ? <div className="tab arguments">{parseString(`{lang:${item}.${property.id}|${property.args}}`)}</div>
                                : <div className="tab">
                                  {
                                    parseColor(property)
                                  }
                                  {
                                    property
                                  }
                                </div>
                            }
                          </>
                        )
                    : <div className="tab">
                      {
                        console.log('boofed', set[item])
                      }
                      {
                        `${set[item]}`
                      }
                    </div>
                }
              </div>
            </li>
          ))
        }
      </ul>
    );
  } else {
    return (
      <ul>
        {
          ObjSet.map(item => (
            <li key={item} className='item'>
              <div>
                <span><b>{item}</b></span>
                <div>
                  {
                    Object.keys(set[item]).map(property => (
                      <div className='tab' key={property}>
                        <span><b>{property}:  </b></span>
                        <div>
                          {
                            Array.isArray(set[item][property])
                              ? property.toLowerCase().includes('recipe')
                                ? <div className="tab grid">{(set[item][property]).map((item: string) => <div key={item}><Image src={`/assets/items/${item}`} width="64" height="64" alt="item"/></div>)}</div>
                                : set[item][property].length === 0 ? <div className="tab">Empty</div>
                                  : Object.values(set[item][property]).map(item =>
                                    <>
                                      {
                                        instanceOfenchantment(item)
                                          ? <div className="tab enchantment">{`${item['id']}: Level ${item['level']}.`}</div>
                                          : <div className="tab">{item}</div>
                                      }
                                    </>
                                  )
                              : <div className="tab">{`${set[item][property]}`}</div>
                          }
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </li>
          ))
        }
      </ul>
    );
  }
};

function instanceOfargument(Object: any): Object is argument {
  return (Object as argument).args !== undefined;
}

function instanceOfenchantment(Object: any): Object is enchantment {
  return (Object as enchantment).id !== undefined;
}

function propertyIsRecipe(item: String, property: any) {
  return (item.toLowerCase().includes('recipe') && Array.isArray(property) && property?.length === 9);
}

export {
  getEditorView,
  color
};

type Data = {
  sets: Array<setData>,
  tiers: Array<tierData>
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
  '&l' = 'italic',
  '&o' = 'bold',
  '&n' = 'underline',
  '&m' = 'strikethrough',
}
