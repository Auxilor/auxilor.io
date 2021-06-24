const transformSetData = (data: Data) => {
  data.sets.map(item => {
    // console.log(item.name);
    Object.keys(item).map(key => {
      if (key === 'helmet' || key === 'chestplate' || key === 'elytra' || key === 'leggings' || key === 'boots') {
        // console.log(item[key])
      }
    });
  });
};

const createNewSet = (setName: string) => {
  const newSet = <setData>{};
  newSet.name = setName;
  console.log(newSet);
  return newSet;
};


export {
  transformSetData,
  createNewSet
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
  enchants: Array<argument>,
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
