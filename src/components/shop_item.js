import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ShopButtons from './shop_buttons';

class ShopItem extends Component {

  render() {
    const {shop_detail,shop_page,handelAction,...rest} = this.props;
    return (
      <div className="shop_item">
        <div className="shop_name">{shop_detail.name}</div>
        <div className="shop_image_warpper">
          <img alt="item_1" src={shop_detail.picture}></img>
        </div>
        <ShopButtons shop_id={shop_detail.id} shop_page={shop_page} handelAction={handelAction} {...rest}/>
      </div>
    )
  }
}

export default ShopItem
