import React from 'react';
import Header from '../Header';
import AddResourceForm from '../Form/AddResource';
import FooterNav from '../FooterNav';

const AddResource = () => (
  <div className="wrapper">
    <Header />
    <AddResourceForm />
    <FooterNav />
  </div>
);

export default AddResource;
