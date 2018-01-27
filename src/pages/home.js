import React, { Component } from 'react';
import TopMenu from '../components/top_menu';

class Home extends Component {

  render() {
      return (
      <div className="container">
      <TopMenu/>
      <div className="container">
          <div className="shop_list_warpper">
            <div className="shop_item">
              <div className="shop_name">My shop</div>
              <div className="shop_image_warpper">
                <img src="http://placehold.it/150x150"></img>
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
