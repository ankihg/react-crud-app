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
  handleDataSubmit: function(data) {
    $.ajax({
      url: this.props.url,
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify(data),
      processData: false,
      success: function(res) {
        this.setState({data: res});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    });
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
        <TreeForm onDataSubmit={this.handleDataSubmit} />
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

var TreeForm = React.createClass({
  getInitialState: function() {
    return {species: '', lat: '', lng: ''};
  },
  handleSpeciesChange: function(e) {
    this.setState({species: e.target.value});
  },
  handleLatChange: function(e) {
    this.setState({lat: e.target.value});
  },
  handleLngChange: function(e) {
    this.setState({lng: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var species = this.state.species.trim();
    var lat = this.state.lat.trim();
    var lng = this.state.lng.trim();
    if (!species || !lat || !lng) return;
    this.props.onDataSubmit({species:species, lat:lat, lng:lng});
    this.setState({species: '', lat: '', lng: ''});
  },
  render: function() {
    return (
      <form className="treeForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="species id" value={this.state.species} onChange={this.handleSpeciesChange}/> <br/>
        <input type="text" placeholder="lat" value={this.state.lat} onChange={this.handleLatChange}/> <br/>
        <input type="text" placeholder="lng" value={this.state.lng} onChange={this.handleLngChange}/>
        <input type="submit" value="post" />
      </form>
  )}
});

ReactDOM.render(
  <TreeSection url={serverPath+'/trees'} pollInterval={2000}/>,
  document.getElementById('trees')
);
