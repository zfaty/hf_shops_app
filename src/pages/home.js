import React, { Component } from 'react';
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
        console.log("response ",response);
        if (response.status === 200) return response.json();
        if (response.status === 500) this.props.history.push('/signin')
        else throw new Error('failed to load shops')
      })
      .then(data => {
        console.log("shopsshops data",data);
        if (data) {
          this.setState(state => {
            state.nearbyshops = data.data
            console.log("shopsshops",state);
            return state
          })
        }
      })
      .catch(err => {
        //Todo :Handel error
      })
  }
  handelAction(action,shop_id){

    sendRequest(`/api/shop/${action}/${shop_id}`, { method: 'post' })
      .then(response => {
        console.log("response ",response);
        if (response.status === 200) return response.json();
        if (response.status === 500) this.props.history.push('/signin')
        else throw new Error('failed to load shops')
      })
      .then(data => {
        console.log("Responsssse data",this.state);

        if (data) {
          this.setState(
            state => {
              console.log("ddrrr",shop_id);
              // remove liked shop from current state
              state.nearbyshops = state.nearbyshops.filter(
                shop => shop.id !== shop_id
              )
              return state
            });
            console.log("idd",shop_id);
        }
      })
      .catch(err => {
        //Todo :Handel error
      })
  }

  render() {
      const { nearbyshops } = this.state;
      const handelAction = this.handelAction.bind(this);
      console.log("shopss",nearbyshops);
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
