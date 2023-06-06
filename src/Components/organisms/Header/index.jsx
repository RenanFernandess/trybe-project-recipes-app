import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HeaderSection, { SearchBar } from '../../molecules';
import { PageTitle } from '../../atoms';

export default function Header({ title, enableSearchButton, icon }) {
  const [searchBarIsActive, setSearchBarIsActive] = useState(false);

  return (
    <header>
      <HeaderSection
        enableSearchButton={ enableSearchButton }
        setSearchBarIsActive={
          () => { setSearchBarIsActive((prevState) => !prevState); }
        }
      />
      <PageTitle
        title={ title }
        icon={ icon }
      />
      {searchBarIsActive && <SearchBar title={ title } />}
    </header>
  );
}

Header.defaultProps = {
  enableSearchButton: false,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  enableSearchButton: PropTypes.bool,
  icon: PropTypes.node.isRequired,
};
