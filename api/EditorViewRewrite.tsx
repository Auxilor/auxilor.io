import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// @ts-expect-error
import { ucase } from './lang.tsx';
import React, { useState } from 'react';
// @ts-expect-error
import { createNewArgument } from './BaseEditor.ts';
import crypto from 'crypto';
import { Button, Form, Modal } from 'react-bootstrap';
import { Hint } from 'react-autocomplete-hint';

const getEditorView = (data: Data, editorData, key) => {
  const {name, type} = editorData;
  const { meta } = data;
  switch (name) {
  case 'sets':
    const sets = data.sets;
    const set = sets.filter(item => item.name === type)[0];
    return newMethod(set, key, meta);
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

function CreateSetArgumentPropertyNode({nodeName, set, children, meta}: {nodeName:string, set:setData, children:Array<argument>, meta:metaData}){
  console.log(meta)
  const [returnValue, setReturnValue] = useState();
  const [showModal, setModalShow] = useState(false);
  const [properties, setProperties] = useState(children);
  const removeArg = (name:string) => {
    console.log(`removing item: ${name}`)
    console.table({...properties})
    setProperties([...properties.filter(item => item.id !== name)]);
  };

  const createArg = (item:string) => {
    setModalShow(true)
  };

  const formHandler = (e) => {
    e.preventDefault();
    console.log("benis")
    setProperties([...properties, createNewArgument('test'+crypto.randomBytes(2), 10)]);
    setModalShow(false);
  };

  return (
    <div className='node-container'>
      <PropertyModal show={showModal} onHide={() => setModalShow(false)} type="enchants"/>
      <div className='property-node'>
        <span>{nodeName}:</span>
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

  //TODO Make auto complete + make it look better
  function PropertyModal(props) {
    const type = props.type;
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add a property.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Set name.</h4>
          <Form onSubmit={formHandler}>
            <Form.Group controlId="formSetName">
              <Form.Label>Enter a Property</Form.Label>
              <Hint options={meta[type]} allowTabFill>
                {/* <input label="property" id="formSetName" className="form-control" /> */}
                <Form.Control type="text" label="property" name="property" placeholder="" as="input"/>
              </Hint>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
} 

function CreateSetNonArgumentPropertyNode({nodeName, set, children}:  {nodeName:string, set:setData, children:Array<unknown>}) {
  return (
    <div className='node-container'>
      <div className='property-node'>
        <span>{Array.isArray(children) ? `${nodeName}:` : `${nodeName}: ${children}`}</span>
      </div>
      {
        Array.isArray(children)
        ? children.map(item => (
          <div key={`${item}`} className='tab property'>
            <div>
              {
                item
              }
            </div>
          </div>
          
        ))
        : null
      }
    </div>
  )
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

const newMethod = (set: setData, EditorKey: String, meta: metaData) => {
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
              ? <CreateSetArgumentPropertyNode nodeName={item} set={set} children={set[item]} meta={meta}/>
              : <CreateSetNonArgumentPropertyNode nodeName={item} set={set} children={set[item]} />
              
              // : <div className="node-container">
              //     <div className="property-node">
              //       <span style={{"color": "black"}}>
              //         {
              //           item
              //         }
              //       </span>
              //     </div>
              //   </div>
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