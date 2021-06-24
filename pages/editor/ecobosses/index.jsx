import React from 'react';
import axios from 'axios';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data } = this.props;

    return (
      <div id="editor">
        <p>{JSON.stringify(data)}</p>
      </div>
    );
  }
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