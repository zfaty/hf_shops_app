import React, { Component } from 'react';
import TopMenu from '../components/top_menu';
import { sendRequest, getCurrentPosition } from '../lib/functions';

class Home extends Component {

  state = {
    selectedShops: 'near',
    shops: {
      near: [],
      preferred: []
    }
  }
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
    } else {

    }
  }

  getShopsNearBy(position) {
    const { latitude, longitude } = position.coords
    sendRequest(`/api/shops/nearby?latitude=${latitude}&longitude=${longitude}`)
      .then(resp => {
        if (resp.status === 200) return resp.json()
        if (resp.status === 401) this.props.history.push('/signin')
        else throw new Error('failed to load shops')
      })
      .then(dt => {
        if (dt) {
          console.log('data',dt);
        }
      })
      .catch(err => {
        //Todo :Handel error
      })
  }

  render() {
      return (
      <div className="container">
      <TopMenu/>
      <div className="container">
          <div className="shop_list_warpper">
            <div className="shop_item">
              <div className="shop_name">My shop</div>
              <div className="shop_image_warpper">
                <img alt="item_1" src="http://placehold.it/150x150"></img>
              </div>
              <div className="button_group">
                  <input className="btn btn-primary btn-md" type="button" value="disLike" />
                  <input className="btn btn-primary btn-md" type="button" value="Like" />
              </div>
            </div>
          </div>
      </div>
      </div>
    )
  }
}

export default Home
