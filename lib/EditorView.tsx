import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { parseString, parseColor } from './lang.tsx';
import Image from 'next/image';

const getEditorView = (data: Data, editorData, key) => {
  const {name, type} = editorData;
  switch (name) {
    case 'sets':
      const sets = data.sets;
      const set = sets.filter(item => item.name === type)[0]
      console.log(set)
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

  // console.log(ObjSet)

  ObjSet.map(item => {
    Object.values(set[item]).map(item => console.log(instanceOfargument(item)))
    // Array.isArray(set[item]) ? set[item].length === 0 ? console.log('Undefined') : Object.values(set[item]).map(item => console.log(`${item['id']}: With ${item['args']}%`)) : console.log(set[item])
  })
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
                  ? item.toLowerCase().includes("recipe") 
                    ? <div className="tab grid">{(set[item]).map((item: string) => <div><Image src={`/assets/items/${item}`} width="64" height="64"></Image></div>)}</div>
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
                      console.log("boofed", set[item])
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
                            ? property.toLowerCase().includes("recipe")
                            ? <div className="tab grid">{(set[item][property]).map((item: string) => <div><Image src={`/assets/items/${item}`} width="64" height="64"></Image></div>)}</div>
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
    )
  }
}

function instanceOfargument(Object: any): Object is argument {
  return (Object as argument).args !== undefined;
}

function instanceOfenchantment(Object: any): Object is enchantment {
  return (Object as enchantment).id !== undefined;
}

function propertyIsRecipe(item: String, property: any) {
  return (item.toLowerCase().includes("recipe") && Array.isArray(property) && property?.length === 9)  
}

export {
  getEditorView,
  pain,
  color
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


enum potionsEnum {
  "ABSORPTION" = "Absorption: Level {0}.",
  "BAD_OMEN" = "Bad Omen: Level {0}.",
  "BLINDNESS" = "Blindness: Level {0}.",
  "CONDUIT_POWER" = "Conduit Power: Level {0}.",
  "CONFUSION" = "Nausea: Level {0}.",
  "DAMAGE_RESISANCE" = "Resistance: Level {0}.",
  "DOLPHINS_GRACE" = "Dolphins Grace: Level {0}.",
  "FAST_DIGGING" = "Haste: Level {0}.",
  "FIRE_RESISTANCE" = "Fire Resistance: Level {0}.",
  "GLOWING" = "Glowing: Level {0}.",
  "HEALTH_BOOST" = "Health Boost: Level {0}.",
  "HERO_OF_THE_VILLAGE" = "Hero Of the Village: Level {0}.",
  "HUNGER" = "Hunger: Level {0}.",
  "INCREASE_DAMAGE" = "Strength: Level {0}.",
  "INVISIBILITY" = "Invisibility: Level {0}.",
  "JUMP" = "Jump Boost: Level {0}.",
  "LEVITATION" = "Levitation: Level {0}.",
  "LUCK" = "Luck: Level {0}.",
  "NIGHT_VISION" = "Night Vision: Level {0}.",
  "POISON" = "Poison: Level {0}.",
  "REGENERATION" = "Regeneration: Level {0}.",
  "SATURATION" = "Saturation: Level {0}.",
  "SLOW" = "Slowness: Level {0}.",
  "SLOW_DIGGING" = "Mining Fatigue: Level {0}.",
  "SLOW_FALLING" = "Slow Falling: Level {0}.",
  "SPEED" = "Swiftness: Level {0}.",
  "UNLUCK" = "Bad Luck: Level {0}.",
  "WATER_BREATHING" = "Water Breathing: Level {0}.",
  "WEAKNESS" = "Weakness: Level {0}.",
  "WITHER" = "Wither: Level {0}."
}

enum conditionsEnum {
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

enum effectsEnum { 
  "attack-speed-multiplier" = "Atack Speed: {0} Multiplier.",
  "bonus-hearts" = "Bonus Hearts: {0} Hearts.",
  "boss-damage-multiplier" = "Boss Damage: {0} Multiplier.",
  "bow-damage-multiplier" = "Bow Damage: {0} Multiplier.",
  "damage-multiplier" = "Damage: {0} Multiplier.",
  "damage-taken-multiplier" = "Damage Taken: {0} Multiplier.",
  "durability-multiplier" = "Durability: {0} Multiplier.",
  "evade-chance" = "Evade: {0}% Chance.",
  "experience-multiplier" = "Experience: {0} Multiplier.",
  "fall-damage-multiplier" = "Fall Damage: {0} Multiplier.",
  "flight" = "Flight: {0}.",
  "hunger-loss-multiplier" = "Hunger Loss: {0} Multiplier.",
  "melee-damage-multiplier" = "Melee Damage: {0} Multiplier.",
  "regeneration-multiplier" = "Regeration: {0} Multiplier.",
  "speed-multiplier" = "Speed: {0} Multiplier.",
  "trident-damage-multiplier" = "Trident Damage: {0} Multiplier.",
  "warp-chance" = "Warp: {0}% Chance."
}

const pain = {
  potionEffects: potionsEnum,
  advancedPotionEffects: potionsEnum,
  conditions: conditionsEnum,
  effects: effectsEnum,
  advancedEffects: effectsEnum
}