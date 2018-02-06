import React, { Component } from 'react';

class ShopButtons extends Component {

  render() {
    const {shop_id,shop_page,handelAction,...rest} = this.props;

    if(shop_page === "nearby"){
      return (
        <div className="button_group">
            <button className="btn btn-primary btn-md dislike-btn" type="button"
            onClick={() => handelAction("dislike",shop_id)} >
              <i className="fa fa-thumbs-down"></i>
            </button>
            <button className="btn btn-primary btn-md like-btn" type="button"
            onClick={() => handelAction("like",shop_id)} >
              <i className="fa fa-thumbs-up"></i>
            </button>
        </div>
      )
    }else if (shop_page === "preferred") {
      return (
        <div className="button_group">
            <input className="btn btn-primary btn-md dislike-btn" type="button" value="Remove"
            onClick={() => handelAction("unlike",rest.preferred_id)} />
        </div>
      )
    }

  }
}

export default ShopButtons
