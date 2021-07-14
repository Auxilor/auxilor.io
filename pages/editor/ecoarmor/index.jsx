import React from 'react';
import axios from 'axios';
import BaseEditor from '../../../components/Editor/BaseEditor';


export default class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { success, data } = this.props;
    
    if (success) {
      return (
        <BaseEditor data={data} />
      );
    } else {
      return (
        <div>
          {
            data
          }
        </div>
      );
    }
  }
}

export async function getServerSideProps({ query }) {
  let token;
  if (query.token !== undefined) {
    token = query.token;
  }

  let response;

  await axios.get(`https://hastebin.com/raw/${token}`)
    .then((res) => {
      try {
        console.log("URL ENCODED")
        res.data = JSON.parse(decodeURIComponent(res.data).replaceAll("+"," "));
      } catch (_) {
        console.log("NOT URL ENCODED")
      }
      response = {
        success: true,
        data: res.data,
      };
    })
    .catch((err) => {
      response = {
        success: false, 
        data: err.message,
      };
    });
    
  return {
    props: {
      ...response
    }
  };
}
