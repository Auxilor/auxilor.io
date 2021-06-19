import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import axios from 'axios';

const page = ({ data }) => {
  return (
    <div id="editor">
      <Jumbotron>
        <h1>Hello, there!</h1>
        <p>
          This page hasnt quite been developed quite yet, please come back later!
        </p>
      </Jumbotron>
      <p>{JSON.stringify(data)}</p>
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

export default page;
