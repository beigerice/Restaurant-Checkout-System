/** @jsx React.DOM */

var Product = React.createClass({
    getInitialState: function() {
      return {
        added: false
      };
    },

    addToCart: function(e) {
      if(!this.state.added) {
        // add
        $.publish('cart.added', this.props.data);
      }
      else {
        // remove
        $.publish('cart.removed', this.props.data.id);
      }

      this.setState({
        added: !this.state.added
      });
    },

    handleChange: function(e) {
      this.props.data.quant = e.target.value;
    },

    render: function() {
        // assign to props
        var data = this.props.data;

        return (
          <div className="thumbnail">
            <img src={data.image} alt="product image" />
            <div className="caption clearfix">
              <h3><a href={data.url}>{data.name}</a></h3>
              <div className="product__price">{data.currency} {data.price}</div>
              <select className="product__quant" onChange={this.handleChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select><br/>  
              <div className="product__button-wrap">
                <button className={this.state.added ? 'btn btn-danger' : 'btn btn-primary'} onClick={this.addToCart}>
                  {this.state.added ? 'Remove' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        );
    }
});
