/*global React*/
/*global ReactDOM*/
/*global _*/
/*global $*/




var DimensionConfig = React.createClass({
	getOptions: function () {
		var options = [];
		var values = this.props.dimensionsValues
		for (var i = 0; i < values.length ; i++) {
			options.push(<option key={values[i]} value={values[i]}>{values[i]}</option>);
		}
		return options;
	},

  onUserInput: function (event) {
		this.props.onUserInput(event, this.props.name);
	},

	render: function () {
		if (!this.props.dimensionsValues) {
			return (<div></div>);
		}
		var options = this.getOptions();
		if (_.isEmpty(options)) {
			return (<div></div>);
		}
		return (
			<div>
				Select {this.props.name}:
				<select onChange={this.onUserInput} value={this.props.value} multiple={true}>
					{options}
				</select>
			</div>
		);
	}
});




var DimensionsBox = React.createClass({
	render: function () {
		var toRender = [];
		var dimensions = this.props.dimensionsObjSelected;
		for (var i = 0; i < dimensions.length ; i++) {
      toRender.push(<DimensionConfig key={dimensions[i].name} dimensionsValues={dimensions[i].value} name={dimensions[i].name} value={dimensions[i].selected} onUserInput={this.props.onUserInput}/>);
		}
		return (
			<div>
				{toRender}
			</div>
		);
	}
});




var DimensionsSelect = React.createClass({
	getOptions: function () {
		var options = [];
		this.props.dimensions.forEach(function (dimension) {
			var name = dimension.name;
			options.push(<option key={name} value={name}>{name}</option>);
		});
		return options;
	},

	onUserInput: function (event) {
		this.props.onUserInput(event, this.props.dimensions);
	},

	render: function () {
		if (!this.props.dimensions) {
			return (<div></div>);
		}
		var options = this.getOptions();
		if (_.isEmpty(options)) {
			return (<div></div>);
		}
		return (
			<div>
				Dimensions:
				<select onChange={this.onUserInput} value={this.props.value} multiple={true}>
					{options}
				</select>
			</div>
		);
	}
});




var DatasetSelect = React.createClass({
	getOptions: function () {
		var options = [];
		this.props.datasets.forEach(function (dataset) {
			var name = dataset.name;
			options.push(<option key={name} value={name}>{name}</option>);
		});
		return options;
	},

	render: function () {
		if (!this.props.datasets) {
			return (<div></div>);
		}
		var options = this.getOptions();
		if (_.isEmpty(options)) {
			return (<div></div>);
		}
		return (
			<div>
				Dataset:
				<select onChange={this.props.onUserInput} value={this.props.value}>
					<option>Select</option>
					{options}
				</select>
			</div>
		);
	}
});




var ProviderSelect = React.createClass({
	getOptions: function () {
		var options = [];
		this.props.providers.forEach(function (provider) {
			var name = provider.name;
			options.push(<option key={name} value={name}>{name}</option>);
		});
		return options;
	},

	render: function () {
		if (!this.props.providers) {
			return (<div></div>);
		}
		var options = this.getOptions();
		if (_.isEmpty(options)) {
			return (<div></div>);
		}
		return (
			<div>
				Provider:
				<select onChange={this.props.onUserInput} value={this.props.value}>
					<option>Select</option>
					{options}
				</select>
			</div>
		);
	}
});




var ParamsBox = React.createClass({
	render: function () {
		var toRender = [];
		var providers = this.props.data;
		if (providers) {
			toRender.push(<ProviderSelect key="ProviderSelect" providers={providers} value={this.props.providerSelected} onUserInput={this.props.providerChange} />);
			var providerObj = _.find(providers, {'name': this.props.providerSelected});
			if (providerObj && providerObj.value) {
				toRender.push(<DatasetSelect key="DatasetSelect" datasets={providerObj.value} value={this.props.datasetSelected} onUserInput={this.props.datasetChange} />);
				var datasetObj = _.find(providerObj.value, {'name': this.props.datasetSelected});
				if (datasetObj && datasetObj.value) {
					toRender.push(<DimensionsSelect key="DimensionsSelect" dimensions={datasetObj.value} value={this.props.dimensionsSelected} onUserInput={this.props.dimensionsChange} />);
					toRender.push(<DimensionsBox key="DimensionsBox" dimensionsObjSelected={this.props.dimensionsObjSelected} onUserInput={this.props.dimensionsValueChange} />);
				}
			}
		}
		return (
			<div>
				{toRender}
			</div>
		);
	}
});




var QueryBox = React.createClass({
	render: function () {
		var url = '';
		url = 'http://widukind-api-dev.cepremap.org/api/v1/json/datasets/'+this.props.dataset+'/values';
		var values = this.props.values;
		var first = true;
		for (var i = 0; i < values.length ; i++) {
			var name = values[i].name;
			var selected = values[i].selected;
      if (typeof selected !== 'undefined' && !_.isEmpty(selected)) {
      	if (first) {
      		url += '?';
      		first = false;
      	}
      	var params = '';
      	for (var i = 0; i < selected.length ; i++) {
      		params += ((i > 0) ? '+' : '') + selected[i];
      	}
      	url += name + '=' + params;
      }
		}
		return (
			<div>
				{url}
			</div>
		);
	}
});




var ControlsBox = React.createClass({
	getInitialState: function () {
		return {
			'data': [],
			'providerSelected': 'Select',
			'datasetSelected': 'Select',
			'dimensionsSelected': [],
			'dimensionsObjSelected': []
		};
	},

	componentDidMount: function () {
		this.checkData({});
	},

	providerChange: function (event) {
		this.checkData({
			'providerSelected': event.target.value,
			'datasetSelected': 'Select',
			'dimensionsSelected': [],
			'dimensionsObjSelected': []
		});
	},

	datasetChange: function (event) {
		this.checkData({
			'datasetSelected': event.target.value,
			'dimensionsSelected': [],
			'dimensionsObjSelected': []
		});
	},

	dimensionsChange: function (event, dimensions) {
		var options = event.target.options;
		var dimensionsSelected = [];
		var dimensionsObjSelected = [];
		for (var i = 0; i < options.length ; i++) {
			if (options[i].selected) {
				var name = options[i].value;
				dimensionsSelected.push(name);
				dimensionsObjSelected.push({
					'name': name,
					'value': _.get(_.find(dimensions, {'name': name}), 'value')
				});
			}
		}
		this.checkData({
			'dimensionsSelected': dimensionsSelected,
			'dimensionsObjSelected': dimensionsObjSelected
		});
	},

	dimensionsValueChange: function (event, dimension) {
		var options = event.target.options;
    var dimensionsObjSelected = this.state.dimensionsObjSelected;
    var values = [];
		for (var i = 0; i < options.length ; i++) {
			if (options[i].selected) {
				values.push(options[i].value);
			}
		}
		var index = _.findIndex(dimensionsObjSelected, {'name': dimension});
    dimensionsObjSelected[index].selected = values;
		this.checkData({
      'dimensionsObjSelected': dimensionsObjSelected
		});
	},

	checkData: function (obj) {
		function refreshData (url) {
			var tmpData = {};
			$.ajax({
				url: url,
				async: false,
				success: function (received) {
					if (_.has(received, 'error')) {
						console.error(url, received.error.toString());
					} else {
						tmpData = received.data;	
					}
				},
				error: function (xhr, status, err) {
					console.error(url, status, err.toString());
				}
			});
			return tmpData;
		}
		var clone = _.assign(_.clone(this.state), obj);
		if (!clone.data || _.isEmpty(clone.data)) {
			var tmp = refreshData('//widukind-api-dev.cepremap.org/api/v1/json/providers/keys');
			clone.data = [];
			tmp.forEach(function (el, index) {
				clone.data[index] = {
					'name': el,
					'value': []
				}
			});
			this.setState(clone);
			return;
		}
		var providerObj = _.find(clone.data, {'name': clone.providerSelected});
		if (!providerObj) {
			return;
		}
		if (!providerObj.value || _.isEmpty(providerObj.value)) {
			var tmp = refreshData('//widukind-api-dev.cepremap.org/api/v1/json/providers/'+clone.providerSelected+'/datasets/keys');
			providerObj.value = [];
			tmp.forEach(function (el, index) {
				providerObj.value[index] = {
					'name': el,
					'value': []
				}
			});
			this.setState(clone);
			return;
		}
		var datasetObj = _.find(providerObj.value, {'name': clone.datasetSelected});
		if (!datasetObj) {
			return;
		}
		if (!datasetObj.value || _.isEmpty(datasetObj.value)) {
			var tmp = refreshData('//widukind-api-dev.cepremap.org/api/v1/json/datasets/'+clone.datasetSelected+'/dimensions');
			datasetObj.value = [];
			Object.keys(tmp).forEach(function (el, index, array) {
				datasetObj.value[index] = {
					'name': el,
					'value': Object.keys(tmp[el])
				}
			});
			this.setState(clone);
			return;
		}
		this.setState(obj);
	},

	render: function () {
		var toRender = [];
		if (this.state.datasetSelected && this.state.datasetSelected != 'Select') {
			toRender.push(<QueryBox dataset={this.state.datasetSelected} values={this.state.dimensionsObjSelected} />);
		}
		return (
			<div>
				{toRender}
				<ParamsBox data={this.state.data} providerSelected={this.state.providerSelected} datasetSelected={this.state.datasetSelected} dimensionsSelected={this.state.dimensionsSelected} dimensionsObjSelected={this.state.dimensionsObjSelected} providerChange={this.providerChange} datasetChange={this.datasetChange} dimensionsChange={this.dimensionsChange} dimensionsValueChange={this.dimensionsValueChange} />
			</div>
		);
	}
});




ReactDOM.render(
	<ControlsBox />,
	document.getElementById('content')
);
