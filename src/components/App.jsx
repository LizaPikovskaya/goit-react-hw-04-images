import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery.';
import { fetchImages } from 'services/api';
import { useEffect, useState } from 'react';

export const App = () => {
  const [value, setValue] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [dataLengthPerPage, setDataLengthPerPage] = useState(null);
  const [dataTotal, setDataTotal] = useState(null);

  useEffect(() => {
    if (!value) {
      return;
    }

    async function getImages() {
      try {
        setLoading(true);
        const response = await fetchImages(
          value.split('/')[1],
          page,
        );
        const { data } = response;
        setSearchData(prevData => [...prevData, ...data.hits]);
        setDataLengthPerPage(data.hits.length);
        setDataTotal(data.total);
        if (data.hits.length === 0 && data.total < 12) {
          throw new Error('По запросу нічого не знайдено.');
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    getImages();

  }, [value, page]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    window.scrollBy({
      top: 300 * 2,
      behavior: 'smooth',
    });
  }, [searchData, page]);

  const handlerOnLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const getValueFromSearchBar = value => {
    setValue(`${Date.now()}/${value}`);
    setSearchData([]);
    setPage(1);
    setError(null);
  };

  return (
    <>
      <Searchbar getValueFromSearchBar={getValueFromSearchBar} />
      <ImageGallery
        searchData={searchData}
        loading={loading}
        error={error}
        handlerOnLoadMoreClick={handlerOnLoadMoreClick}
        dataLengthPerPage={dataLengthPerPage}
        dataTotal={dataTotal}
      />
    </>
  );
};
