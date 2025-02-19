import React from 'react';
import search_girl_url from 'images/search_girl.png';
import { Trans } from 'react-i18next';

const SearchLoading = () => (
  <div className="box mt-5 py-20 px-5">
    <div className="flex flex-col items-center justify-center">
      <div style={{ height: 300 }}>
        <img src={search_girl_url} alt="Search" width={300} />
      </div>
      <div className="search-loader mt-10 mb-5">
        <div className="search-loader-inner" />
      </div>
      <div className="text-2xl font-bold text-center">
        <Trans i18nKey="personPage.loadingText" />
      </div>
    </div>
  </div>
);

export default SearchLoading;
