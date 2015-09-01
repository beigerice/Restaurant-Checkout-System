/** @jsx React.DOM */

var ProductsList = React.createClass({
    render: function() {

        var products = this.props.data.map(function(product) {
            return (
              <li className="col-xs-6 col-md-4" key={product.id}>
                <Product data={product} />
              </li>
            )
        });

        return (
          <ul className="clearfix">
            {products}
          </ul>
        );
    }
});
