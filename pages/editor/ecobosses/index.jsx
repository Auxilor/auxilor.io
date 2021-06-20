import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import axios from 'axios';
import BaseEditor from '../../../components/Editor/BaseEditor';

const page = () => {
  return (
    <BaseEditor/>
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
