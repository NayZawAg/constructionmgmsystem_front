import Head from 'next/head';
import React from 'react';

const InternalServerErrorPage = () => {
  return (
    <>
      <Head>
        <title>500 Internal server error</title>
      </Head>
      <div className="errorLayout">
        <div>
          <h1
            className="next-error-h1 errorTitle"
            style={{ fontWeight: 'bold' }}
          >
            500
          </h1>
          <div className="errorText">
            <h2>Internal server error.</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default InternalServerErrorPage;
