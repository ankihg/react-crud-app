var serverPath = 'http://localhost:3000';

var SpeciesSection = React.createClass({
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
    console.log('submit '+data);
    $.ajax({
      url: this.props.url,
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify(data),
      processData: false,
      success: function(res) {
        // this.setState({data: this.state.data.push(res)});
        this.state.data.push(res);
        this.setState({data: this.state.data});
        console.log(this.state.data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleDataUpdate: function(data) {
    $.ajax({
      url: this.props.url+'/'+data._id,
      contentType: 'application/json',
      type: 'PUT',
      data: JSON.stringify(data),
      processData: false,
      success: function(res) {
        this.state.data = this.state.data.map(function(d) {
          return (d._id === data._id) ? data : d;
        });
        this.setState({data: this.state.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleDataDelete: function(species) {
    $.ajax({
      url: this.props.url+'/'+species._id,
      type: 'DELETE',
      success: function(res) {
        this.setState({data: this.state.data.filter(function(data) {
          return data.id !== species._id;
        })});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(this.props.url, status, err.toString());
      }
    });
  },
  componentDidMount: function() {
    this.getData();
    // setInterval(this.getData, this.props.pollInterval);
  },
  render: function() {
    return (
      <section className="speciess">
        i am speciess
        <SpeciesList data={this.state.data} handleDataUpdate={this.handleDataUpdate} handleDataDelete={this.handleDataDelete}/>
        <SpeciesForm onDataSubmit={this.handleDataSubmit} />
      </section>
  )}
});

var SpeciesList = React.createClass({
  render: function() {
    var speciesNodes = this.props.data.map(function(species) {
      return (
        <Species species={species} onUpdate={this.props.handleDataUpdate} onDelete={this.props.handleDataDelete}>plz</Species>
      );
    }.bind(this));
    return (
      <section>
        {speciesNodes}
      </section>
  )}
});

var Species = React.createClass({
  getInitialState: function() {
    return {shoudHideUpdateFrom: true};
  },
  del: function(e) {
    this.props.onDelete(this.props.species);
  },
  showUpdateForm: function() {
    this.setState({shoudHideUpdateFrom: false});
  },
  hideUpdateForm: function() {
    this.setState({shoudHideUpdateFrom: true});
  },
  render: function() {
    return (
      <div>
        {this.props.species.genus} {this.props.species.species} <small>also knowm as</small> {this.props.species.cmnName} <small>[id:{this.props.species._id}]</small>
        <button onClick={this.showUpdateForm}>update</button>
        <button onClick={this.del}>delete</button>
        <UpdateSpeciesForm hide={this.hideUpdateForm} submitUpdate={this.props.onUpdate} hideFrom={this.hideUpdateForm} shouldHide={this.state.shoudHideUpdateFrom} species={this.props.species} />
      </div>
  )}
});

var SpeciesForm = React.createClass({
  getInitialState: function() {
    return {genus: '', species: '', cmnName: ''};
  },
  handleGenusChange: function(e) {
    this.setState({genus: e.target.value});
  },
  handleSpeciesChange: function(e) {
    this.setState({species: e.target.value});
  },
  handleCmnNameChange: function(e) {
    this.setState({cmnName: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var genus = this.state.genus.trim();
    var species = this.state.species.trim();
    var cmnName = this.state.cmnName.trim();
    if (!genus || !species || !cmnName) return;
    this.props.onDataSubmit({genus:genus, species:species, cmnName:cmnName});
    this.setState({genus: '', species: '', cmnName: ''});
  },
  render: function() {
    return (
      <form className="speciesForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="genus" value={this.state.genus} onChange={this.handleGenusChange}/> <br/>
        <input type="text" placeholder="species" value={this.state.species} onChange={this.handleSpeciesChange}/> <br/>
        <input type="text" placeholder="common name" value={this.state.cmnName} onChange={this.handleCmnNameChange}/>
        <input type="submit" value="post" />
      </form>
  )}
});

var UpdateSpeciesForm = React.createClass({
  getInitialState: function() {
    return {genus: this.props.species.genus, species: this.props.species.species, cmnName: this.props.species.cmnName};
  }, cancel: function(e) {
    e.preventDefault();
    this.setState({genus: this.props.genus, species: this.props.species, cmnName: this.props.cmnName});
    this.props.hide();
  },
  handleGenusChange: function(e) {
    this.setState({genus: e.target.value});
  },
  handleSpeciesChange: function(e) {
    this.setState({species: e.target.value});
  },
  handleCmnNameChange: function(e) {
    this.setState({cmnName: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var genus = this.state.genus.trim();
    var species = this.state.species.trim();
    var cmnName = this.state.cmnName.trim();
    if (!genus || !species || !cmnName) return;
    this.props.submitUpdate({_id: this.props.species._id, genus:genus, species:species, cmnName:cmnName});
    this.setState({genus: '', species: '', cmnName: ''});
  },
  render: function() {
    return (
      <form className={this.props.shouldHide ? 'hidden' : ''} onSubmit={this.handleSubmit}>
        <input type="text" placeholder={this.state.genus} value={this.state.genus} onChange={this.handleGenusChange}/> <br/>
        <input type="text" placeholder={this.state.species}value={this.state.species} onChange={this.handleSpeciesChange}/> <br/>
        <input type="text" placeholder={this.state.cmnName} value={this.state.cmnName} onChange={this.handleCmnNameChange}/>
        <button onClick={this.cancel}>cancel</button>
        <input type="submit" value="post" onClick={this.handleSubmit}/>
      </form>
  )}
});


ReactDOM.render(
  <SpeciesSection url={serverPath+'/speciess'} pollInterval={2000}/>,
  document.getElementById('speciess')
);
