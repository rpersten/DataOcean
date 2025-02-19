import React from 'react';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { Button } from 'components/form-components';
import { ReactComponent as PepIcon } from 'images/logo_person.svg';
import { Download, Printer } from 'react-feather';
import { getLocaleField, renderDate } from 'utils';
import SearchNoResults from 'components/pages/search/SearchNoResults';
import SearchLoading from 'components/pages/search/SearchLoading';
import { useTableController } from 'components/table';
import PaginationPages from 'components/table/PaginationPages';
import { useTranslation, Trans } from 'react-i18next';


const PersonResultsPage = (props) => {
  const { location } = props;
  const { t } = useTranslation();

  const urlParams = new URLSearchParams(location.search);
  const params = {
    first_name: urlParams.get('first_name'),
    last_name: urlParams.get('last_name'),
    middle_name: urlParams.get('middle_name'),
    country_id: urlParams.get('country_id'),
  };

  const tc = useTableController({
    url: 'person/search/',
    // defaultPageSize: 5,
    params,
    topOnPageChange: true,
  });

  const queryString = `${params.last_name || ''} ${params.first_name || ''} ${params.middle_name || ''}`
    .replace(/\s+/g, ' ')
    .trim();

  if (!params.last_name) {
    return <SearchNoResults queryString={queryString} />;
  }
  if (!tc.isDataReady) {
    return <SearchLoading />;
  }
  if (tc.data.length === 0) {
    return <SearchNoResults queryString={queryString} />;
  }

  return (
    <div className="py-5">
      <div className="flex items-center text-xl mb-3">
        <div>
          <Trans
            i18nKey="personPage.matchesWereFoundFor"
            values={{ count: tc.count, queryString }}
            components={{ b: <b /> }}
          />.
        </div>
        <Button
          className="text-sm ml-2"
          variant="outline-primary"
          link="/system/home/person/"
        >
          {t('newSearch')}
        </Button>
      </div>
      <div className="flex flex-col space-y-3">
        {tc.data.map((person) => (
          <div
            key={person.id}
            className="bg-white p-5 flex space-x-3 border border-gray-500 intro-x rounded-lg"
          >
            <div><PepIcon width={170} height={170} /></div>

            <div className="flex-grow">
              <div className="text-xl font-bold">{person.full_name_original}</div>
              <div className="">{person.full_name}</div>
              <div className="flex flex-wrap my-2">
                {person.is_pep && (
                  <div className="px-3 border border-gray-700 rounded-full text-xs">
                    {t('mentionedInTheRegistersOfPEP')}
                  </div>
                )}
              </div>
              <table>
                <tbody>
                  {person.date_of_birth && (
                    <tr>
                      <td>{t('dateOfBirth')}:</td>
                      <td className="font-bold pl-2">{renderDate(person.date_of_birth)}</td>
                    </tr>
                  )}
                  {!!person.citizenships.length && (
                    <tr>
                      <td>{t('famousCitizenships')}:</td>
                      <td className="font-bold pl-2">
                        {person.citizenships.map((country) => getLocaleField(country, 'name')).join(', ')}
                      </td>
                    </tr>
                  )}
                  {person.residence && (
                    <tr>
                      <td>{t('countryOfResidence')}:</td>
                      <td className="font-bold pl-2">{getLocaleField(person.residence, 'name')}</td>
                    </tr>
                  )}
                  {person.gender && (
                    <tr>
                      <td>{t('gender')}:</td>
                      <td className="font-bold pl-2">{person.gender_display}</td>
                    </tr>
                  )}
                  {person.is_dead && (
                    <tr>
                      <td>{t('isDead')}:</td>
                      <td className="font-bold pl-2">{t('yes')}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col justify-between">
              <div className="text-right">
                {t('updatedAt')}: <br />
                {renderDate(person.updated_at)}
              </div>
              <div>
                <div className="flex justify-end py-5">
                  <Download className="w-5 h-5 mr-5" />
                  <Printer className="w-5 h-5" />
                </div>
                <Button
                  className="px-8"
                  variant="outline-primary"
                  link={`/system/datasets/pep/${person.pep_data[0].id}`}
                >
                  {t('view')}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center my-4">
        <Button
          className="mb-4"
          variant="outline-primary"
          onClick={() => tc.nextPage()}
        >
          {t('nextPage')}
        </Button>
        <PaginationPages tableController={tc} />
      </div>
    </div>
  );
};

PersonResultsPage.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
};

export default PersonResultsPage;
