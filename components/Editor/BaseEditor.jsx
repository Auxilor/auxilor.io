import React from 'react';
import style from '../../styles/BaseEditor/BaseEditor.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BaseEditor = ({data}) => {
  return (
    <div className={style.container}>
      <div className={style.editorMenu}> 
        <div className={style.editorContainer}>
          <div className={style.sets}>
            <h2>
              <button title="i need help">
                <FontAwesomeIcon icon={['fas', 'caret-right']}/>
              </button>
              <span>
                Sets
              </span>
              <button title="Add Set"></button>
            </h2>
          </div>
          <div className={style.tiers}></div>
        </div>
      </div>
      <div className={style.editor}>

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