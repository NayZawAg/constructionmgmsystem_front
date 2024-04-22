import Head from 'next/head';
import React from 'react';

const ForbiddenPage = () => {
  return (
    <>
      <Head>
        <title>403 Forbidden</title>
      </Head>
      <div className="errorLayout">
        <div>
          <h1
            className="next-error-h1 errorTitle "
            style={{ fontWeight: 'bold' }}
          >
            403
          </h1>
          <div className="errorText">
            <h2>This page could not be access.</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForbiddenPage;
