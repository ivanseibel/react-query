import React, { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useHistory, useLocation } from 'react-router';
import _ from 'lodash';
import './styles.css';
import { User } from '../../../types/server.data.types';

export const UserDetailsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const history = useHistory();

  const userId = _.get(location, 'state.userId');
  const data = queryClient.getQueryData<User>(['user', Number(userId)]);
  console.log(data, userId);

  useEffect(() => {
    if (!data) {
      history.push('/users');
    }
  }, [data, history]);

  return (
    <>
      <h2>User Details</h2>

      <div id="user-details-main">
        <label htmlFor="personal-data" className="group-label">Personal data</label>
        <div id="personal-data" className="data-group">
          <div className="field-container">
            <label htmlFor="">id</label>
            <span>{data?.id}</span>
          </div>
          <div className="field-container">
            <label htmlFor="">name</label>
            <span>{data?.name}</span>
          </div>
          <div className="field-container">
            <label htmlFor="">email</label>
            <span>{data?.email}</span>
          </div>
          <div className="field-container">
            <label htmlFor="">website</label>
            <span>{data?.website}</span>
          </div>
          <div className="field-container">
            <label htmlFor="">website</label>
            <span>{data?.website}</span>
          </div>
          <div className="field-container">
            <label htmlFor="">phone</label>
            <span>{data?.phone}</span>
          </div>
          <div className="field-container">
            <label htmlFor="">username</label>
            <span>{data?.username}</span>
          </div>
        </div>
        <label htmlFor="address-data" className="group-label">Address</label>
        <div id="address-data" className="data-group">
          <div className="field-container">
            <label htmlFor="">city</label>
            <span>{data?.address.city}</span>
          </div>
          <div className="field-container">
            <label htmlFor="">street</label>
            <span>{data?.address.street}</span>
          </div>
          <div className="field-container">
            <label htmlFor="">suite</label>
            <span>{data?.address.suite}</span>
          </div>
          <div className="field-container">
            <label htmlFor="">zipcode</label>
            <span>{data?.address.zipcode}</span>
          </div>
          <div className="field-container">
            <label htmlFor="">geo lat</label>
            <span>{data?.address.geo.lat}</span>
          </div>
          <div className="field-container">
            <label htmlFor="">geo lng</label>
            <span>{data?.address.geo.lng}</span>
          </div>
        </div>
        <label htmlFor="address-data" className="group-label">Company</label>
        <div id="company-data" className="data-group">
          <div className="field-container">
            <label htmlFor="">name</label>
            <span>{data?.company.name}</span>
          </div>
          <div className="field-container">
            <label htmlFor="">bs</label>
            <span>{data?.company.bs}</span>
          </div>
          <div className="field-container">
            <label htmlFor="">catch phrase</label>
            <span>{data?.company.catchPhrase}</span>
          </div>
        </div>
      </div>
    </>
  );
  ;
}
