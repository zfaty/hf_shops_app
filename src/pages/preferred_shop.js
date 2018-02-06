import React, { Component } from 'react';
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
        console.log("response ",response);
        if (response.status === 200) return response.json();
        if (response.status === 500) this.props.history.push('/signin')
        else throw new Error('failed to load shops')
      })
      .then(data => {
        if (data) {
          this.setState(state => {
            state.preferredshops = data.data
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

    sendRequest(`/api/shop/${action}/${shop_id}`, { method: 'delete' })
      .then(response => {
        console.log("response ",response);
        if (response.status === 200) return response.json();
        if (response.status === 400) this.props.history.push('/signin')
        else throw new Error('failed to load shops')
      })
      .then(data => {
        console.log("Responsssse data",this.state);

        if (data) {
          this.setState(
            state => {
              console.log("ddrrr",shop_id);
              // remove unliked shop from current state
              state.preferredshops = state.preferredshops.filter(
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
      const { preferredshops } = this.state;
      const handelAction = this.handelAction.bind(this);
      console.log("shopss preferredshops",preferredshops);
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
