import React, { Component } from 'react';
import {NotificationManager} from 'react-notifications';
import TopMenu from '../components/top_menu';
import ShopItem from '../components/shop_item';
import { sendRequest, getCurrentPosition } from '../lib/functions';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {nearbyshops: []};

  }
  componentDidMount() {
    this.getShops()
  }
  getShops() {
    if ('geolocation' in navigator) {
      getCurrentPosition(
        position => this.getShopsNearBy(position),
        this.positionError
      )
    }
  }

  getShopsNearBy(position) {
    const { latitude, longitude } = position.coords
    sendRequest(`/api/shops/nearby?page=1&latitude=${latitude}&longitude=${longitude}`)
      .then(response => {
        if (response.status === 200) return response.json();
        if (response.status === 500) this.props.history.push('/signin')
        else throw new Error('failed to get shops')
      })
      .then(data => {
        if (data) {
          this.setState(state => {
            state.nearbyshops = data.data;
            return state
          })
        }
      })
      .catch(err => {
        NotificationManager.error('Error', "Failed to get shops", 5000);
      })
  }
  handelAction(action,shop_id){

    sendRequest(`/api/shop/${action}/${shop_id}`, { method: 'post' })
      .then(response => {
        if (response.status === 200) return response.json();
        if (response.status === 500) this.props.history.push('/signin')
        else throw new Error('failed to load shops')
      })
      .then(data => {
        if (data) {
          this.setState(
            state => {
              // remove liked shop from current state
              state.nearbyshops = state.nearbyshops.filter(
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
      const { nearbyshops } = this.state;
      const handelAction = this.handelAction.bind(this);
      return (
      <div className="container">
      <TopMenu selected_page={"nearby"}/>
      <div className="container">
          <div className="shop_list_warpper">
              {nearbyshops.map(shop => (
                <ShopItem
                key={shop.id}
                shop_detail={shop}
                shop_page={"nearby"}
                handelAction = {handelAction}
                 />
              ))}
          </div>
      </div>
      </div>
    )
  }
}

export default Home
