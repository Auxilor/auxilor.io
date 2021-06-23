import { InputGroup, FormControl, Button } from 'react-bootstrap';

const getEditorView = (data: Data, editorData, key) => {
  const {name, type} = editorData;
  console.log('inside of editorView')
  console.log(`${name} ${type} ${key}`)
  switch (name) {
    case 'sets':
      const sets = data.sets;
      const set = sets.filter(item => item.name === type)[0]
      console.log(sets.filter(item => item.name === type).length === 1 ? sets.filter(item => item.name === type)[0] : sets.filter(item => item.name === type))
      return ABigFuckoffTemplate(set, key)
      break;
    case 'tiers':
      const tiers = data.tiers;
      break;
    default:
      break;
  }
}

const ABigFuckoffTemplate = (set: setData, EditorKey: String) => {
  let ObjSet = Object.keys(set)
  EditorKey.toLowerCase() === 'properties'
  ? ObjSet = ObjSet.filter(item => !['helmet', 'chestplate', 'elytra', 'leggings', 'boots', 'name'].includes(item)) 
  : ObjSet = ObjSet.filter(item => !['name', 'conditions', 'effects', 'advancedEffects', 'potionEffects', 'advancedPotionEffects', 'advancedLore', 'advancementShardName', 'advancementShardLore', 'shardCraftable', 'shardRecipe'].includes(item))

  console.log(ObjSet)

  ObjSet.map(item => (
    Object.values(set[item]).map(item => console.log(instanceOfargument(item)))
    // Array.isArray(set[item]) ? set[item].length === 0 ? console.log('Undefined') : Object.values(set[item]).map(item => console.log(`${item['id']}: With ${item['args']}%`)) : console.log(set[item])
  ))
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
                  ? set[item].length === 0 ? <div className="tab">Empty</div> 
                  : Object.values(set[item]).map(item => 
                    <>
                      {
                        instanceOfargument(item) ? <span className="arguments">{`${item['id']}: with ${item['args']}%\n`}</span> : <div className="tab">{item}</div> 
                      }
                    </>
                  ) 
                  : <div className="tab">{`${set[item]}`}</div>
                }
              </div>
            </li>
          ))
        }
      </ul>
    )
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
                      <div className='tab'>
                        <span><b>{property}:  </b></span>
                        <div>
                          {
                            Array.isArray(set[item][property])
                            ? set[item][property].length === 0 ? <div className="tab">Empty</div>
                            : Object.values(set[item][property]).map(item => 
                              <>
                                {
                                  instanceOfenchantment(item) ? <span className="enchantment">{`${item['id']}: ${item['level']}\n`}</span> : <div className="tab">{item}</div>
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
    )
  }
}

function instanceOfargument(Object: any): Object is argument {
  return (Object as argument).args !== undefined;
}

function instanceOfenchantment(Object: any): Object is enchantment {
  return (Object as enchantment).id !== undefined;
}

export {
  getEditorView
}

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
  crystalRecipe: Array<String>,
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
  shardRecipe: Array<String>,
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

enum color {
  '&0' = '000000',
  '&1' = '0000AA',
  '&2' = '00AA00',
  '&3' = '00AAAA',
  '&4' = 'AA0000',
  '&5' = 'AA00AA',
  '&6' = 'FFAA00',
  '&7' = 'AAAAAA',
  '&8' = '555555',
  '&9' = '5555FF',
  '&a' = '55FF55',
  '&b' = '55FFFF',
  '&c' = 'FF5555',
  '&d' = 'FF55FF',
  '&e' = '55FF55',
  '&f' = 'FFFFFF',
}

enum potions {
  "FAST_DIGGING" = "Haste",
  "JUMP" = "Jump Boost"
}

enum conditions {
  "above-health-percent" = "Above Health Percent",
  "below-health-percent" = "Below Health Percent",
  "above-hunger-percent" = "Above Hunger Percent",
  "below-hunger-percent" = "Below Hunger Percent",
  "above-xp-level" = "Above XP level",
  "below-xp-level" = "Below XP level",
  "above-y-level" = "Above Y level",
  "below-y-level" = "Below Y level",
  "has-permission" = "Has Permission",
  "in-biome" = "In Biome",
  "in-water" = "In Water",
  "in-world" = "In World"

}

enum effects { 
  "attack-speed-multifier",
  "bonus-hears",
  "boss-damage-multiplier",
  "bow-damage-multiplier",
  "damage-multiplier",
  "damage-taken-multiplier",
  "durability-multiplier",
  "evade-chance",
  "experience-multplier",
  "fall-damage-multiplier",
  "flight",
  "hunger-loss-multiplier",
  "melee-damage-multiplier",
  "regeneration-multiplier",
  "speed-multiplier",
  "trident-damage-multiplier",
  "warp-chance"

}