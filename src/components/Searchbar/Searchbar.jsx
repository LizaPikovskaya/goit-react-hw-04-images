import { React, useState } from 'react';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Searchbar = ({ getValueFromSearchBar }) => {
  const [value, setValue] = useState('');

  const handlerSubmit = evt => {
    evt.preventDefault();
    if (!value.trim()) {
      return toast.warn('Please, fill the field.');
    }
    getValueFromSearchBar(value);
    reset();
  };
  const handlerOnChange = evt => {
    setValue(evt.target.value);
  };

  const reset = () => {
    setValue('');
  };
  return (
    <Header>
      <SearchForm onSubmit={handlerSubmit}>
        <SearchFormButton>
          <ImSearch width={30} height={30} />
        </SearchFormButton>
        <SearchFormInput
          onChange={handlerOnChange}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
        />
        <ToastContainer />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  getValueFromSearchBar: PropTypes.func,
};
