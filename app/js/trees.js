var serverPath = 'http://localhost:3000';

var data = [
  {species:'livermorium lawrencia', lat: 5, lng: 1},
  {species:'hildus mcgardica', lat: 9, lng: 4}
];

var TreeSection = React.createClass({
  getInitialState: function() {
    return {data: []}
  },
  getData: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      crossDomain: true,
      processData: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    })
  },
  componentDidMount: function() {
    this.getData();
    setInterval(this.getData, this.props.pollInterval);
  },
  render: function() {
    return (
      <section className="trees">
        i am trees
        <TreeList data={this.state.data}/>
      </section>
  )}
});

var TreeList = React.createClass({
  render: function() {
    var treeNodes = this.props.data.map(function(tree) {
      return (
        <Tree species={tree.species.cmnName} lat={tree.lat} lng={tree.lng}>plz</Tree>
      );
    });
    return (
      <section>
        {treeNodes}
      </section>
  )}
});

var Tree = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.species} at lat: {this.props.lat} and lng: {this.props.lng}
      </div>
  )}
});

ReactDOM.render(
  <TreeSection url={serverPath+'/trees'} pollInterval={2000}/>,
  document.getElementById('trees')
);
