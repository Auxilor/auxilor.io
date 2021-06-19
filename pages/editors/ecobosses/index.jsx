import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import req from 'petitio';

const page = ({ data }) => {
  console.log(data);
  return(
    <Jumbotron>
      <h1>Hello, there!</h1>
      <p>
        This page hasnt quite been developed quite yet, please come back later!
      </p>
    </Jumbotron>
  );
};

export async function getServerSideProps({query}) {
  let token;
  if(query.token !== undefined) {
    token = query.token;
  }
  const request = await req(`https://hastebin.com/raw/${token}`)
    .send();

  if(request.statusCode !== 200) {
    // return {
    //   notFound: true
    // }
  }

  const data = request.json();

  console.log(data);

  return{
    props: {
      data,
    }
  };
}

export default page;
