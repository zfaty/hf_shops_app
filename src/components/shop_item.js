import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class ShopItem extends Component {

  render() {
    const {shop_detail} = this.props;
    return (
      <div className="shop_item">
        <div className="shop_name">{shop_detail.name}</div>
        <div className="shop_image_warpper">
          <img alt="item_1" src={shop_detail.picture}></img>
        </div>
        <div className="button_group">
            <input className="btn btn-primary btn-md dislike-btn" type="button" value="disLike" />
            <input className="btn btn-primary btn-md like-btn" type="button" value="Like" />
        </div>
      </div>
    )
  }
}

export default ShopItem
