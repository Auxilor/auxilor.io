import React from 'react';
// import style from '../../styles/BaseEditor/BaseEditor.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BaseEditor = ({data}) => {
  return (
    <div className="Base_Editor-container">
      <div className="Base_Editor-EditorContainer"> 
        <div className="Base_Editor-editorwrap">
          <nav id="Base_Editor-editor-menu">
            <div className="Base_Editor-sets">
              <h2>
                <button title="i need help">
                  <FontAwesomeIcon icon='caret-right'/>
                </button>
                <span>
                  Sets
                </span>
                <button title="Add Set"></button>
              </h2>
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


export async function getServerSideProps({ query }) {
  let token;
  if (query.token !== undefined) {
    token = query.token;
  }

  let response;

  await axios.get(`https://hastebin.com/raw/${token}`)
    .then((res) => {
      response = {
        data: res.data,
      };
    })
    .catch((err) => {
      response = {
        data: err.message,
      };
    });

  return {
    props: {
      data: response.data,
    }
  };
}

export default BaseEditor;