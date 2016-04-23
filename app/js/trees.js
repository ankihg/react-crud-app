var data = [
  {species:'livermorium lawrencia', lat: 5, lng: 1},
  {species:'hildus mcgardica', lat: 9, lng: 4}
];

var TreeSection = React.createClass({
  render: function() {
    return (
      <section className="trees">
        i am trees
        <TreeList data={this.props.data}/>
      </section>
  )}
});

var TreeList = React.createClass({
  render: function() {
    var treeNodes = this.props.data.map(function(tree) {
      return (
        <Tree species={tree.species} lat={tree.lat} lng={tree.lng}>plz</Tree>
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
        {this.props.species}
      </div>
  )}
});

ReactDOM.render(
  <TreeSection data={data}/>,
  document.getElementById('trees')
);
