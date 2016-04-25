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
        // this.setState({data: this.state.data.push(res)});
        this.state.data.push(res);
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleDataUpdate: function(data) {
    console.log('update tree '+data._id);
    // $.ajax({
    //   url: this.props.url,
    //   type: 'PUT',
    //   data: JSON.stringify(data),
    //   processData: false,
    //   success: function(res) {
    //     this.state.data[this.state.data]
    //     this.setState({data: });
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.log(this.props.url, status, err.toString());
    //   }.bind(this)
    // });
  },
  handleDataDelete: function(tree) {
    $.ajax({
      url: this.props.url+'/'+tree._id,
      type: 'DELETE',
      success: function(res) {
        this.setState({data: this.state.data.filter(function(data) {
          return data.id !== tree._id;
        })});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(this.props.url, status, err.toString());
      }
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
        <TreeList data={this.state.data} handleDataUpdate={this.handleDataUpdate} handleDataDelete={this.handleDataDelete}/>
        <TreeForm onDataSubmit={this.handleDataSubmit} />
      </section>
  )}
});

var TreeList = React.createClass({
  render: function() {
    var treeNodes = this.props.data.map(function(tree) {
      return (
        <Tree tree={tree} onUpdate={this.props.handleDataUpdate} onDelete={this.props.handleDataDelete}>plz</Tree>
      );
    }.bind(this));
    return (
      <section>
        {treeNodes}
      </section>
  )}
});

var Tree = React.createClass({
  del: function(e) {
    this.props.onDelete(this.props.tree);
  },
  update: function(e) {
    // attempting update
    this.props.onUpdate(this.props.tree);
  },
  render: function() {
    return (
      <div>
        {this.props.tree.species.cmnName} at lat: {this.props.tree.lat} and lng: {this.props.tree.lng} <small>id: {this.props.tree._id}</small>
        <button onClick={this.update}>update</button>
        <button onClick={this.del}>delete</button>
        <UpdateTreeForm tree={this.props.tree}/>
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

var UpdateTreeForm = React.createClass({
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
        <input type="text" placeholder={this.props.tree.species._id} value={this.state.species} onChange={this.handleSpeciesChange}/> <br/>
        <input type="text" placeholder={this.props.tree.lat}value={this.state.lat} onChange={this.handleLatChange}/> <br/>
        <input type="text" placeholder={this.props.tree.lng} value={this.state.lng} onChange={this.handleLngChange}/>
        <button type="cancel">cancel</button>
        <input type="submit" value="post" />
      </form>
  )}
});

ReactDOM.render(
  <TreeSection url={serverPath+'/trees'} pollInterval={2000}/>,
  document.getElementById('trees')
);
