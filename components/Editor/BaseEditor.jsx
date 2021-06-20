import React, { useState } from 'react';
// import style from '../../styles/BaseEditor/BaseEditor.module.scss';
import { transformSetData } from '../../lib/BaseEditor.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BaseEditor = ({data}) => {
  transformSetData(data);
  const [setsExpanded, setSetsExpanded] = useState(false);
  const [setsMetaExpanded, setSetsMetaExpanded] = useState({});
  const [tierExpanded, setTierExpanded] = useState(false);
  const [tierMetaExpanded, setTierMetaExpanded] = useState(false);

  const toggleSets = () => {
    setSetsExpanded(!setsExpanded);
  };

  const toggleTiers = () => {
    setTierExpanded(!tierExpanded);
  };
  
  const ToggleSetsMeta = (name) => (evt) => {
    console.log(name);
    if(Object.keys(setsMetaExpanded).includes(name)) {
      setSetsMetaExpanded({...setsMetaExpanded, [name]: true});
    }
    console.log(setsMetaExpanded);
    setSetsMetaExpanded({...setsMetaExpanded, [name]: !setsMetaExpanded[name]});
  };
  
  const toggleTiersMeta = () => {
    setTierMetaExpanded(!tierMetaExpanded);
  };

  return (
    <div className="Base_Editor-container">
      <div className="Base_Editor-EditorContainer"> 
        <div className="Base_Editor-editorwrap">
          <nav id="Base_Editor-editor-menu">
            <div className="Base_Editor-sets">
              <h2 onClick={toggleSets}>
                <button title="i need help">
                  <FontAwesomeIcon icon='caret-right'/>
                </button>
                <span>
                  Sets
                </span>
                <button title="Add Set">
                  <FontAwesomeIcon icon="plus-circle"/>
                </button>
              </h2>
              {setsExpanded ? <ul>{data.sets.map(item => (
                <li key={item.name}>
                  <div className="editor-menu-item">
                    <h3 key={item.name} onClick={ToggleSetsMeta(item.name)}>
                      <span>{item.name}</span>
                    </h3>
                  </div>
                  {setsMetaExpanded[item.name] ? <ul>{Object.keys(item).map(key => {
                    if(['helmet', 'chestplate', 'elytra', 'leggings', 'boots'].includes(key)){
                      return (
                        <li key={`${item.name}: ${key}`}>
                          {key}
                        </li>
                      );
                    }
                  })}</ul> : null}
                </li>
              ))
              }</ul>: null}
            </div>
            <div >  </div>
          </nav>
        </div>
      </div>
      <div>

      </div>
    </div>
  );
};


const process = (data) => {
  const setData = transformSetData(data);
};

export default BaseEditor;


