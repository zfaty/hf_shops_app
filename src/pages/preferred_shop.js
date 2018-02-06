import React, { Component } from 'react';
import {NotificationManager} from 'react-notifications';
import TopMenu from '../components/top_menu';
import ShopItem from '../components/shop_item';
import { sendRequest, getCurrentPosition } from '../lib/functions';

class Preferred extends Component {

  constructor(props) {
    super(props);
    this.state = {preferredshops: []};
  }

  componentDidMount() {
    this.getShops()
  }

  getShops() {
    if ('geolocation' in navigator) {
      getCurrentPosition(
        position => this.getShopsPreferred(position),
        this.positionError
      )
    }
  }

  getShopsPreferred(position) {
    sendRequest(`/api/shops/preferred`)
      .then(response => {
        if (response.status === 200) return response.json();
        if (response.status === 400) this.props.history.push('/signin')
        else throw new Error('failed to get shops')
      })
      .then(data => {
        if (data) {
          this.setState(state => {
            state.preferredshops = data.data
            return state
          })
        }
      })
      .catch(err => {
        NotificationManager.error('Error', "Failed to get shops", 5000);
      })
  }
  handelAction(action,shop_id){

    sendRequest(`/api/shop/${action}/${shop_id}`, { method: 'delete' })
      .then(response => {
        if (response.status === 200) return response.json();
        if (response.status === 400) this.props.history.push('/signin')
        else throw new Error('failed to unlike shop')
      })
      .then(data => {

        if (data) {
          this.setState(
            state => {
              // remove unliked shop from current state
              state.preferredshops = state.preferredshops.filter(
                shop => shop.id !== shop_id
              )
              return state
            });
        }
      })
      .catch(err => {
        NotificationManager.error('Error', "Failed to "+action+ "the shop", 5000);
      })
  }
  render() {
      const { preferredshops } = this.state;
      const handelAction = this.handelAction.bind(this);
      return (
      <div className="container">
      <TopMenu selected_page={"preferred"}/>
      <div className="container">
          <div className="shop_list_warpper">
              {preferredshops.map(shop => (
                <ShopItem
                key={shop.id}
                shop_detail={shop.shop}
                preferred_id={shop.id}
                shop_page={"preferred"}
                handelAction={handelAction}
                 />
              ))}
          </div>
      </div>
      </div>
    )
  }
}

export default Preferred
