import React from 'react';
import Header, { Footer, ProfileContent } from '../../Components';
import { getItem } from '../../helpers/storage';
import USER from '../../services/variables';
import { yellowProfileIcon } from '../../assets';

export default function Profile() {
  const { email } = getItem(USER) || {};

  return (
    <div>
      <Header
        icon={ yellowProfileIcon }
        title="Profile"
      />
      <ProfileContent email={ email } />
      <Footer />
    </div>
  );
}
