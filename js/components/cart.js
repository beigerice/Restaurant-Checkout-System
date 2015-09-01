/** @jsx React.DOM */

var Cart = React.createClass({

    getInitialState: function() {
      $.subscribe('cart.added', this.addItem);
      $.subscribe('cart.removed', this.removeItem);
      return {
        items: [],
        total: 0,
        currency: '$'
      };
    },

    addItem: function(e, item) {
      this.state.items.push(item);
      this.forceUpdate();
      this.countTotal();
    },

    removeItem: function(e, itemId) {
      var itemIndexInArray;

      this.state.items.some(function(item, index) {
        if(item.id === itemId) {
          itemIndexInArray = index;
          return true;
        }
      });

      this.state.items.splice(itemIndexInArray, 1);
      this.forceUpdate();
      this.countTotal();
    },

    countTotal: function() {
      var total = 0;

      this.state.items.forEach(function(item, index) {
        total += item.price * item.quant;
      });

      this.setState({
        total: total
      })
    },

    dialog: function() {
      alert("Fluc Yeah!");
    },

    render: function() {

        var items = this.state.items.map(function(item) {
            return (
              <li key={item.id} className="cart-item">
                <span className="cart-item__name">{item.name}</span>
                <span className="cart-item__quant">&times;{item.quant}</span>
                <span className="cart-item__price">{item.currency} {item.price*item.quant}</span>
              </li>
            )
        });

        var body = (
          <ul>
            {items}
          </ul>          
        );

        var checkout = (
          <button className="btn btn-success checkout" onClick={this.dialog}>Finish</button> 
        );

        var empty = <div className="alert alert-info">Cart is empty</div>;

        return (
          <div className="panel panel-default">
            <div className="panel-body">
              {items.length > 0 ? body : empty}
              <div className="cart__total">Total: {this.state.currency} {Math.round(this.state.total*100)/100}</div>
              {items.length > 0 ? checkout : {}}             
            </div>
          </div>
        );
    }
});
