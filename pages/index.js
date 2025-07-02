import Head from 'next/head';
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import {
  InstantSearch,
  Hits,
  HierarchicalMenu,
  RangeInput,
  ToggleRefinement,
  ClearRefinements,
  HitsPerPage,
  SortBy,
  Pagination,
  InstantSearchSSRProvider,
  getServerState,
} from 'react-instantsearch';
import { Hit } from '../components/Hit';
import { TrackedSearchBox } from '../components/TrackedSearchBox';
import { TrackedStats } from '../components/TrackedStats';
import { TrackedRefinementList } from '../components/TrackedRefinementList';
import { EcommerceTracker } from '../components/EcommerceTracker';
import { GATest } from '../components/GATest';
import { GADebugger } from '../components/GADebugger';
import { GAEventTester } from '../components/GAEventTester';
import { GADirectTest } from '../components/GADirectTest';
import ErrorBoundary from '../components/ErrorBoundary';
import { assembleTypesenseServerConfig } from '../lib/utils';
import { renderToString } from 'react-dom/server';
import singletonRouter from 'next/router';
import { createInstantSearchRouterNext } from 'react-instantsearch-router-nextjs';
import * as gtag from '../lib/gtag';

// Initialize the Typesense Instantsearch adapter: https://github.com/typesense/typesense-instantsearch-adapter
const TYPESENSE_SERVER_CONFIG = assembleTypesenseServerConfig();
const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: TYPESENSE_SERVER_CONFIG,
  additionalSearchParameters: {
    // The following parameters are directly passed to Typesense's search API endpoint.
    //  So you can pass any parameters supported by the search endpoint below.
    //  queryBy is required.
    query_by: 'name,categories,description',
    query_by_weights: '4,2,1',
    num_typos: 1,
    typo_tokens_threshold: 1,
    // groupBy: "categories",
    // groupLimit: 1
    // pinnedHits: "23:2"
  },
});

const transformItems = (items) => {
  return items.sort((a, b) => (a.label > b.label ? 1 : -1));
};

export default function Home({ serverState, serverUrl }) {
  return (
    <div>
      <GADirectTest />
      <Head>
        <title>Ecommerce Store with Typesense + Next.js + Vercel</title>
        <link rel='icon' href='/favicon.png' />
      </Head>

      <main>
        <ErrorBoundary>
          <InstantSearchSSRProvider {...serverState}>
          <InstantSearch
            indexName='products'
            searchClient={typesenseInstantsearchAdapter.searchClient}
            routing={{
              router: createInstantSearchRouterNext({
                singletonRouter,
                serverUrl,
                routerOptions: {
                  cleanUrlOnDispose: false,
                },
              }),
            }}
            future={{ preserveSharedStateOnUnmount: true }}
          >
            <EcommerceTracker />
            <GATest />
            <GADebugger />
            <GAEventTester />
            <div className='container-fluid px-md-5 pt-4'>
              <div className='row d-flex align-items-center'>
                <div className='col-md'>
                  <h1 className='display-6'>
                    Ecommerce Store with Typesense + Next.js + Vercel
                  </h1>
                </div>
                <div className='col-md-2 d-none d-md-block'>
                  <TrackedSearchBox classNames={{ loadingIcon: 'd-none' }} />
                </div>
              </div>

              <div className='lead mt-2'>
                Besides search experiences, Typesense can also be used to build{' '}
                <strong className='marker-highlight'>blazing fast</strong>,{' '}
                <strong className='marker-highlight'>
                  browsing experiences
                </strong>{' '}
                like product listing pages in an ecommerce store.
              </div>
              <ul className='lead mt-1'>
                <li>
                  Product data to render the grid is fetched by the front-end
                  from a{' '}
                  <strong>Geo-Distributed Typesense Cloud cluster</strong> with
                  nodes in Oregon, Frankfurt and Mumbai.
                </li>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <li>
                  Product API Requests are routed to the node that is closest to
                  the user's location, like a CDN. Since data is geographically
                  distributed, this reduces latency even more for your users, as
                  they browse products.
                </li>
                <li>
                  The front-end uses Next.js, is statically generated and is
                  hosted on Vercel.
                </li>
                <li>
                  See{' '}
                  <a
                    href='https://github.com/typesense/showcase-nextjs-typesense-ecommerce-store'
                    target='_blank'
                    rel='noreferrer'
                  >
                    Source Code
                  </a>
                  .
                </li>
              </ul>

              <div className='row mt-4'>
                <div className='col-md-3 pr-md-5'>
                  <h5>Browse by Categories</h5>
                  <HierarchicalMenu
                    className='mt-3'
                    attributes={[
                      'categories.lvl0',
                      'categories.lvl1',
                      'categories.lvl2',
                      'categories.lvl3',
                    ]}
                    showParentLevel={true}
                    rootPath={'Cell Phones'}
                    limit={50}
                  />

                  <h5 className='mt-5'>Filter by Brands</h5>
                  <TrackedRefinementList
                    className='mt-3'
                    attribute='brand'
                    limit={10}
                    showMore={true}
                    showMoreLimit={50}
                    searchable={true}
                    transformItems={transformItems}
                  />

                  <div className='mt-2'>&nbsp;</div>

                  <ToggleRefinement
                    className='mt-5'
                    attribute='free_shipping'
                    label='Free Shipping'
                    value={true}
                  />

                  <div className='mt-1'>&nbsp;</div>

                  <h5 className='mt-5'>Filter by Price</h5>
                  <RangeInput attribute='price' />

                  <div className='mt-1'>&nbsp;</div>

                  <ClearRefinements className='mt-5' />
                </div>
                <div className='col-md'>
                  <div className='row mt-5 mt-md-0'>
                    <div className='col-md'>
                      <div className='row'>
                        <div className='col-md-4'></div>
                        <div className='col-md-8 d-flex justify-content-end align-items-center'>
                          <TrackedStats />
                          <HitsPerPage
                            className='ms-4'
                            items={[
                              { label: '9 per page', value: 9, default: true },
                              { label: '18 per page', value: 18 },
                            ]}
                          />
                          <SortBy
                            items={[
                              { label: 'Relevancy', value: 'products' },
                              {
                                label: 'Price (asc)',
                                value: 'products/sort/price:asc',
                              },
                              {
                                label: 'Price (desc)',
                                value: 'products/sort/price:desc',
                              },
                            ]}
                            defaultValue='products'
                            transformItems={(items) => {
                              return items.map(item => ({
                                ...item,
                                label: item.label,
                                value: item.value,
                                onSelect: () => gtag.trackSort(item.label)
                              }));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='row mt-1'>
                    <div className='col-sm'>
                      <Hits hitComponent={Hit} />
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-sm'>
                      <Pagination />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </InstantSearch>
          </InstantSearchSSRProvider>
        </ErrorBoundary>
      </main>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    `s-maxage=${1 * 60 * 60}, stale-while-revalidate=${24 * 60 * 60}`
  );

  const protocol = req.headers.referer?.split('://')[0] || 'https';
  const serverUrl = `${protocol}://${req.headers.host}${req.url}`;
  const serverState = await getServerState(<Home serverUrl={serverUrl} />, {
    renderToString,
  });

  return {
    props: {
      serverState: JSON.parse(JSON.stringify(serverState)), // replace `undefined` (which isn't serializable) with `null`
      serverUrl,
    },
  };
}
