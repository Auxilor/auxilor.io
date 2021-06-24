import React, { useState } from 'react';
// import style from '../../styles/BaseEditor/BaseEditor.module.scss';
import { transformSetData, createNewSet } from '../../lib/BaseEditor.ts';
import { getEditorView } from '../../lib/EditorView.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Button, Form, Nav } from 'react-bootstrap';
import { useEffect } from 'react';

const BaseEditor = ({data}) => {
  transformSetData(data);
  const [EditorEnabled, setEditorEnabled] = useState(false);
  const [EditorView, setEditorView] = useState({});
  const [CacheEditorData, setCacheEditorData] = useState({});
  const [ActiveEditorKey, setActiveEditorKey] = useState();

  const [setsExpanded, setSetsExpanded] = useState(false);
  const [setsCreateModal, setSetsCreateModal] = useState(false);
  const [setsMetaExpanded, setSetsMetaExpanded] = useState({});
  const [tierExpanded, setTierExpanded] = useState(false);
  const [tiersCreateModal, setTiersCreateModal] = useState(false);
  const [tierMetaExpanded, setTierMetaExpanded] = useState(false);

  // useEffect(() => {
  //   console.log(EditorData);
  //   setEditorView(getEditorView(data, EditorData, ActiveEditorKey));
  // }, [ActiveEditorKey, EditorData, data]);


  const updateProps = () => {
    setSetsExpanded(true);
    setTierExpanded(true);
  };

  const toggleSets = () => {
    setSetsExpanded(!setsExpanded);
  };
  
  const toggleTiers = () => {
    setTierExpanded(!tierExpanded);
  };
  
  const toggleSetsMeta = (name) => (evt) => {
    setActiveEditorKey('Properties');
    ToggleEditor({'name': 'sets', 'type': name});
    if(Object.keys(setsMetaExpanded).includes(name)) {
      setSetsMetaExpanded({...setsMetaExpanded, [name]: true});
    }
    setSetsMetaExpanded({...setsMetaExpanded, [name]: !setsMetaExpanded[name]});
  };
  
  const toggleTiersMeta = (name) => (evt) => {
    setActiveEditorKey('Properties');
    ToggleEditor({'name': 'tiers', 'type': name});
    if(Object.keys(tierMetaExpanded).includes(name)) {
      setTierMetaExpanded({...tierMetaExpanded, [name]: true});
    }
    setTierMetaExpanded({...tierMetaExpanded, [name]: true});
  };

  const ToggleEditor = (EditorData, key = 'properties') => {
    setCacheEditorData(EditorData);
    // console.log('editor toggled');
    // console.log(getEditorView(data, editorData)['props']['children'].forEach(item => console.log(item['props']['children'])));
    // console.log(getEditorView(data, editorData));
    setEditorView(getEditorView(data, EditorData, key));
    setEditorEnabled(true);
  };

  const showSetsModal = (e) => {
    e.stopPropagation();
    setSetsCreateModal(!setsCreateModal);
  };
  
  const showTiersModal = (e) => {
    e.stopPropagation();
    setTiersCreateModal(!tiersCreateModal);
  };

  const formHandler = (e) => {
    e.preventDefault();
    data.sets.push(createNewSet(e.target.setName.value));
    setSetsCreateModal(false);
    updateProps();
  };
  
  const selectHandler = (selectedKey) => {
    ToggleEditor(CacheEditorData, selectedKey);
    setActiveEditorKey(selectedKey);
    // console.log(ActiveEditorKey);
  };
  function VCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add a new set.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Set name.</h4>
          <Form onSubmit={formHandler}>
            <Form.Group controlId="formSetName">
              <Form.Label>Enter a Set Name.</Form.Label>
              <Form.Control type="text" label="setName" name="setName" placeholder="Your set name (eg Reaper)"/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div className="Base_Editor-container">
      <div className="Base_Editor-EditorContainer"> 
        <div className="Base_Editor-editorwrap">
          <nav id="Base_Editor-editor-menu">
            <div className="Base_Editor-sets">
              <h2 onClick={toggleSets}>
                <button title="i need help">
                  <FontAwesomeIcon icon='caret-right' className={setsExpanded ? 'fa-rotate-90' : 'fa-rotate-0'}/>
                </button>
                <span>
                  Sets
                </span>
                <button title="Add Set" onClick={showSetsModal}>
                  <FontAwesomeIcon icon="plus-circle"/>
                </button>
              </h2>
              {setsExpanded ? <ul>{data.sets.map(item => (
                <li key={item.name}>
                  <div className="editor-menu-item">
                    <h3 key={item.name} onClick={toggleSetsMeta(item.name)}>
                      <span>{item.name}</span>
                    </h3>
                  </div>
                  {/* {setsMetaExpanded[item.name] ? <ul>{Object.keys(item).map(key => {
                    if(['helmet', 'chestplate', 'elytra', 'leggings', 'boots'].includes(key)){
                      return (
                        <li key={`${item.name}: ${key}`}>
                          {key}
                        </li>
                      );
                    }
                  })}</ul> : null} */}
                </li>
              ))
              }</ul>: null}
            </div>
            <div className="Base_Editor-tiers">
              <h2 onClick={toggleTiers}>
                <button title="i need help">
                  <FontAwesomeIcon icon='caret-right' className={tierExpanded ? 'fa-rotate-90' : 'fa-rotate-0'}/>
                </button>
                <span>
                  Tiers
                </span>
                <button title="Add Tier" onClick={showTiersModal}>
                  <FontAwesomeIcon icon="plus-circle"/>
                </button>
              </h2>
              {tierExpanded ? <ul>{data.tiers.map(item => (
                <li key={item.name}>
                  <div className="editor-menu-item">
                    <h3 key={item.name} onClick={toggleTiersMeta(item.name)}>
                      <span>{item.name}</span>
                    </h3>
                  </div>
                </li>
              ))
              }</ul>: null}
            </div>
          </nav>
          <div className="Base_Editor-editor">
            <div className="Base_Editor-editor-view">
              <Nav variant="tabs" defaultActiveKey="Properties" activeKey={ActiveEditorKey} className="side-padding-25" onSelect={selectHandler}>
                <Nav.Item>
                  <Nav.Link eventKey="Properties">Properties</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Armour">Armor Items</Nav.Link>
                </Nav.Item>
              </Nav>
              {
                EditorEnabled &&
                EditorView
              }
              {/* <div>{EditorView.name}</div>
              {EditorView.conditions?.map(item => (<p key={item.id}>{`ID: ${item.id}. args: ${item.args}`}</p>))}
              {EditorView.effects?.map(item => (<p key={item.id}>{`ID: ${item.id}. args: ${item.args}`}</p>))}
              {EditorView.advancedEffects?.map(item => (<p key={item.id}>{`ID: ${item.id}. args: ${item.args}`}</p>))} */}
            </div>
          </div>
        </div>
      </div>
      <VCenteredModal show={setsCreateModal} onHide={() => setSetsCreateModal(false)}/>
    </div>
  );
};


const process = (data) => {
  const setData = transformSetData(data);
};

export default BaseEditor;