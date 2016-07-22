let React = require('react');
let { shallow } = require('enzyme');

let DataTable = require('../../src/components/DataTable.jsx');
let { BootstrapTable } = require('react-bootstrap-table');
const mocks = getMocks();



describe('DataTable - render', () => {
	it('renders with one series', () => {
		let series = _.cloneDeep(mocks.series.one);
		let selection = _.cloneDeep(mocks.selection.empty);
		let data = [_.cloneDeep(mocks.data.first)];
		const wrapper = shallow(
			<DataTable
				series={series}
				selection={selection}
				updateSelection={()=>{}}
			/>
		);
		const elBootstrapTable = wrapper.find(BootstrapTable);
		let elBootstrapTableData = elBootstrapTable.prop('data');

		expect(elBootstrapTableData).toEqual(data);
  });

	it('renders with 10 series', () => {
		let series = _.cloneDeep(mocks.series.all);
		let selection = _.cloneDeep(mocks.selection.empty);
		let data = _.cloneDeep(mocks.data.all);
		const wrapper = shallow(
			<DataTable
				series={series}
				selection={selection}
				updateSelection={()=>{}}
			/>
		);
		const elBootstrapTable = wrapper.find(BootstrapTable);
		let elBootstrapTableData = elBootstrapTable.prop('data');

		expect(elBootstrapTableData).toEqual(data);
  });
});



describe('DataTable - select', () => {
	let series;
	let firstRow;
	let secondRow;
	let thirdRow;
	let selectionEmpty;
	let selectionFirst;
	let selectionSecond;
	let selectionThird;
	let selectionAll;

	beforeEach(() => {
		series = _.cloneDeep(mocks.series.all);
		firstRow = _.cloneDeep(mocks.data.first);
		secondRow = _.cloneDeep(mocks.data.second);
		thirdRow = _.cloneDeep(mocks.data.third);
		selectionEmpty = _.cloneDeep(mocks.selection.empty);
		selectionFirst = _.cloneDeep(mocks.selection.first);
		selectionSecond = _.cloneDeep(mocks.selection.second);
		selectionThird = _.cloneDeep(mocks.selection.third);
		selectionAll = _.cloneDeep(mocks.selection.all);
	});

	let spyValue;
	let spy = function (arg) {
		spyValue = arg;
	};
	let selectRow;
	let selectRowAll;

	function render (selection) {
		spyValue = null;
		const wrapper = shallow(
			<DataTable
				series={series}
				selection={selection}
				updateSelection={spy}
			/>
		);
		const elBootstrapTable = wrapper.find(BootstrapTable);
		let elBootstrapTableData = elBootstrapTable.prop('data');
		let elBootstrapTableSelectRow = elBootstrapTable.prop('selectRow');
		selectRow = elBootstrapTableSelectRow.onSelect;
		selectRowAll = elBootstrapTableSelectRow.onSelectAll;
	}



	it('S1', () => {
		render(selectionEmpty);
		selectRow(firstRow, true);
		expect(spyValue).toEqual(selectionFirst);
	});

	it('(S1) D1', () => {
		render(selectionFirst);
		selectRow(firstRow, false);
		expect(spyValue).toEqual(selectionEmpty);
	});

	it('(S1) S2', () => {
		render(selectionFirst);
		selectRow(secondRow, true);
		expect(spyValue).toEqual(_.concat(selectionFirst, selectionSecond));
	});

	it('(S1 S2) D1', () => {
		render(_.concat(selectionFirst, selectionSecond));
		selectRow(firstRow, false);
		expect(spyValue).toEqual(selectionSecond);
	});

	it('(S1 S2) D2', () => {
		render(_.concat(selectionFirst, selectionSecond));
		selectRow(secondRow, false);
		expect(spyValue).toEqual(selectionFirst);
	});

	it('(S1 S2) S3', () => {
		render(_.concat(selectionFirst, selectionSecond));
		selectRow(thirdRow, true);
		expect(spyValue).toEqual(_.concat(selectionFirst, selectionSecond, selectionThird));
	});

	it('(S1 S2 S3) D2', () => {
		render(_.concat(selectionFirst, selectionSecond, selectionThird));
		selectRow(secondRow, false);
		expect(spyValue).toEqual(_.concat(selectionFirst, selectionThird));
	});



	it('SA', () => {
		render(selectionEmpty);
		selectRowAll(true);
		expect(spyValue).toEqual(selectionAll);
	});

	it('(SA) DA', () => {
		render(selectionAll);
		selectRowAll(false);
		expect(spyValue).toEqual(selectionEmpty);
	});

	it('(SA) D1', () => {
		let tmp = _.cloneDeep(selectionAll);
		_.remove(tmp, (el) => {
			return (el === firstRow['slug']);
		});
		render(selectionAll);
		selectRow(firstRow, false);
		expect(spyValue).toEqual(tmp);
	});

	it('(SA D1) DA', () => {
		let tmp = _.cloneDeep(selectionAll);
		_.remove(tmp, (el) => {
			return (el === firstRow['slug']);
		});
		render(tmp);
		selectRowAll(false);
		expect(spyValue).toEqual(selectionEmpty);
	});

	it('(SA D1 D2) DA', () => {
		let tmp = _.cloneDeep(selectionAll);
		_.remove(tmp, (el) => {
			return (el === firstRow['slug'] || el === secondRow['slug']);
		});
		render(tmp);
		selectRowAll(false);
		expect(spyValue).toEqual(selectionEmpty);
	});

	it('(SA D1 D2) S1', () => {
		let tmp = _.cloneDeep(selectionAll);
		_.remove(tmp, (el) => {
			return (el === firstRow['slug'] || el === secondRow['slug']);
		});
		let tmp2 = _.cloneDeep(tmp);
		tmp2.push(firstRow['slug']);
		render(tmp);
		selectRow(firstRow, true);
		expect(spyValue).toEqual(tmp2);
	});

	it('(S1) SA', () => {
		render(selectionFirst);
		selectRowAll(true);
		expect(spyValue).toEqual(selectionAll);
	});

	it('(S1 S2) SA', () => {
		render(_.concat(selectionFirst, selectionSecond));
		selectRowAll(true);
		expect(spyValue).toEqual(selectionAll);
	});

	it('(S1) DA', () => {
		render(selectionFirst);
		selectRowAll(false);
		expect(spyValue).toEqual(selectionEmpty);
	});

	it('(S1 S2) DA', () => {
		render(_.concat(selectionFirst, selectionSecond));
		selectRowAll(false);
		expect(spyValue).toEqual(selectionEmpty);
	});
});



function getMocks () {
	return {
		"selection": {
			"empty": [],
			"first": ["insee-ipch-2015-fr-coicop-001763155"],
			"second": ["insee-ipch-2015-fr-coicop-001762548"],
			"third": ["insee-ipch-2015-fr-coicop-001763298"],
			"all": ["insee-ipch-2015-fr-coicop-001763155", "insee-ipch-2015-fr-coicop-001762548", "insee-ipch-2015-fr-coicop-001763298", "insee-ipch-2015-fr-coicop-001762935", "insee-ipch-2015-fr-coicop-001762227", "insee-ipch-2015-fr-coicop-001762639", "insee-ipch-2015-fr-coicop-001763067", "insee-ipch-2015-fr-coicop-001762172", "insee-ipch-2015-fr-coicop-001762244", "insee-ipch-2015-fr-coicop-001763296"]
		},



		"series": {
			"one": [
		  {
			    "attributes": {
			      "base-per": "2015",
			      "decimals": "2",
			      "last-update": "2016-07-13",
			      "ref-area": "fe",
			      "time-per-collect": "periode",
			      "title": "indice-des-prix-a-la-consommation-harmonise-base-2015-ensemble-des-menages-france-nomenclature-coicop-07-3-1-transport-ferroviaire-de-passagers",
			      "unit-measure": "so",
			      "unit-mult": "0"
			    },
			    "dataset_code": "IPCH-2015-FR-COICOP",
			    "dimensions": {
			      "freq": "m",
			      "nature": "indice",
			      "produit": "0731"
			    },
			    "end_date": 557,
			    "end_ts": "2016-01-31T23:59:59.999000+00:00",
			    "frequency": "M",
			    "key": "001763155",
			    "name": "Monthly - 07.3.1 - Passenger transport by railway - Index",
			    "notes": null,
			    "provider_name": "INSEE",
			    "slug": "insee-ipch-2015-fr-coicop-001763155",
			    "start_date": 312,
			    "start_ts": "1996-01-01T00:00:00+00:00",
			    "tags": [
			      "2016-04-13",
			      "area",
			      "base",
			      "bdm",
			      "classification",
			      "coicop",
			      "collection",
			      "consumer",
			      "date",
			      "decimals",
			      "economic",
			      "france",
			      "frequency",
			      "groups",
			      "harmonised",
			      "identifier",
			      "index",
			      "insee",
			      "institute",
			      "ipch-2015-fr-coicop",
			      "ipch-mensuel-ensemble-des-menages-france-base-2015-nomenclature-coicop-07-3-1-transport-ferroviaire-de-passagers",
			      "last",
			      "main",
			      "monthly",
			      "multiplier",
			      "national",
			      "nature",
			      "numerical",
			      "object",
			      "observation",
			      "passenger",
			      "period",
			      "price",
			      "product",
			      "railway",
			      "reference",
			      "series",
			      "statistics",
			      "studies",
			      "time",
			      "title",
			      "transport",
			      "unit",
			      "update",
			      "used",
			      "website",
			      "without"
			    ]
		  }
			],

			"all": [
		  {
		    "attributes": {
		      "base-per": "2015",
		      "decimals": "2",
		      "last-update": "2016-07-13",
		      "ref-area": "fe",
		      "time-per-collect": "periode",
		      "title": "indice-des-prix-a-la-consommation-harmonise-base-2015-ensemble-des-menages-france-nomenclature-coicop-07-3-1-transport-ferroviaire-de-passagers",
		      "unit-measure": "so",
		      "unit-mult": "0"
		    },
		    "dataset_code": "IPCH-2015-FR-COICOP",
		    "dimensions": {
		      "freq": "m",
		      "nature": "indice",
		      "produit": "0731"
		    },
		    "end_date": 557,
		    "end_ts": "2016-01-31T23:59:59.999000+00:00",
		    "frequency": "M",
		    "key": "001763155",
		    "name": "Monthly - 07.3.1 - Passenger transport by railway - Index",
		    "notes": null,
		    "provider_name": "INSEE",
		    "slug": "insee-ipch-2015-fr-coicop-001763155",
		    "start_date": 312,
		    "start_ts": "1996-01-01T00:00:00+00:00",
		    "tags": [
		      "2016-04-13",
		      "area",
		      "base",
		      "bdm",
		      "classification",
		      "coicop",
		      "collection",
		      "consumer",
		      "date",
		      "decimals",
		      "economic",
		      "france",
		      "frequency",
		      "groups",
		      "harmonised",
		      "identifier",
		      "index",
		      "insee",
		      "institute",
		      "ipch-2015-fr-coicop",
		      "ipch-mensuel-ensemble-des-menages-france-base-2015-nomenclature-coicop-07-3-1-transport-ferroviaire-de-passagers",
		      "last",
		      "main",
		      "monthly",
		      "multiplier",
		      "national",
		      "nature",
		      "numerical",
		      "object",
		      "observation",
		      "passenger",
		      "period",
		      "price",
		      "product",
		      "railway",
		      "reference",
		      "series",
		      "statistics",
		      "studies",
		      "time",
		      "title",
		      "transport",
		      "unit",
		      "update",
		      "used",
		      "website",
		      "without"
		    ]
		  },
		  {
		    "attributes": {
		      "base-per": "2015",
		      "decimals": "2",
		      "last-update": "2016-07-13",
		      "ref-area": "fe",
		      "time-per-collect": "periode",
		      "title": "indice-des-prix-a-la-consommation-harmonise-base-2015-ensemble-des-menages-france-nomenclature-coicop-01-1-4-6-autres-produits-laitiers",
		      "unit-measure": "so",
		      "unit-mult": "0"
		    },
		    "dataset_code": "IPCH-2015-FR-COICOP",
		    "dimensions": {
		      "freq": "m",
		      "nature": "indice",
		      "produit": "01146"
		    },
		    "end_date": 557,
		    "end_ts": "2016-01-31T23:59:59.999000+00:00",
		    "frequency": "M",
		    "key": "001762548",
		    "name": "Monthly - 01.1.4.6 - Other milk products - Index",
		    "notes": null,
		    "provider_name": "INSEE",
		    "slug": "insee-ipch-2015-fr-coicop-001762548",
		    "start_date": 312,
		    "start_ts": "1996-01-01T00:00:00+00:00",
		    "tags": [
		      "2016-04-13",
		      "area",
		      "base",
		      "bdm",
		      "classification",
		      "coicop",
		      "collection",
		      "consumer",
		      "date",
		      "decimals",
		      "economic",
		      "france",
		      "frequency",
		      "groups",
		      "harmonised",
		      "identifier",
		      "index",
		      "insee",
		      "institute",
		      "ipch-2015-fr-coicop",
		      "ipch-mensuel-ensemble-des-menages-france-base-2015-nomenclature-coicop-01-1-4-6-autres-produits-laitiers",
		      "last",
		      "main",
		      "milk",
		      "monthly",
		      "multiplier",
		      "national",
		      "nature",
		      "numerical",
		      "object",
		      "observation",
		      "period",
		      "price",
		      "product",
		      "products",
		      "reference",
		      "series",
		      "statistics",
		      "studies",
		      "time",
		      "title",
		      "unit",
		      "update",
		      "used",
		      "website",
		      "without"
		    ]
		  },
		  {
		    "attributes": {
		      "base-per": "2015",
		      "decimals": "2",
		      "last-update": "2016-07-13",
		      "ref-area": "fe",
		      "time-per-collect": "periode",
		      "title": "indice-des-prix-a-la-consommation-harmonise-base-2015-ensemble-des-menages-france-nomenclature-coicop-09-1-4-supports-d-enregistrement",
		      "unit-measure": "so",
		      "unit-mult": "0"
		    },
		    "dataset_code": "IPCH-2015-FR-COICOP",
		    "dimensions": {
		      "freq": "m",
		      "nature": "indice",
		      "produit": "0914"
		    },
		    "end_date": 557,
		    "end_ts": "2016-01-31T23:59:59.999000+00:00",
		    "frequency": "M",
		    "key": "001763298",
		    "name": "Monthly - 09.1.4 - Recording media - Index",
		    "notes": null,
		    "provider_name": "INSEE",
		    "slug": "insee-ipch-2015-fr-coicop-001763298",
		    "start_date": 312,
		    "start_ts": "1996-01-01T00:00:00+00:00",
		    "tags": [
		      "2016-04-13",
		      "area",
		      "base",
		      "bdm",
		      "classification",
		      "coicop",
		      "collection",
		      "consumer",
		      "date",
		      "decimals",
		      "economic",
		      "france",
		      "frequency",
		      "groups",
		      "harmonised",
		      "identifier",
		      "index",
		      "insee",
		      "institute",
		      "ipch-2015-fr-coicop",
		      "ipch-mensuel-ensemble-des-menages-france-base-2015-nomenclature-coicop-09-1-4-supports-d-enregistrement",
		      "last",
		      "main",
		      "media",
		      "monthly",
		      "multiplier",
		      "national",
		      "nature",
		      "numerical",
		      "object",
		      "observation",
		      "period",
		      "price",
		      "product",
		      "recording",
		      "reference",
		      "series",
		      "statistics",
		      "studies",
		      "time",
		      "title",
		      "unit",
		      "update",
		      "used",
		      "website",
		      "without"
		    ]
		  },
		  {
		    "attributes": {
		      "base-per": "2015",
		      "decimals": "2",
		      "last-update": "2016-07-13",
		      "ref-area": "fe",
		      "time-per-collect": "periode",
		      "title": "indice-des-prix-a-la-consommation-harmonise-base-2015-ensemble-des-menages-france-nomenclature-coicop-05-3-2-1-appareils-de-transformation-d-aliments",
		      "unit-measure": "so",
		      "unit-mult": "0"
		    },
		    "dataset_code": "IPCH-2015-FR-COICOP",
		    "dimensions": {
		      "freq": "m",
		      "nature": "indice",
		      "produit": "05321"
		    },
		    "end_date": 557,
		    "end_ts": "2016-01-31T23:59:59.999000+00:00",
		    "frequency": "M",
		    "key": "001762935",
		    "name": "Monthly - 05.3.2.1 - Food processing appliances - Index",
		    "notes": null,
		    "provider_name": "INSEE",
		    "slug": "insee-ipch-2015-fr-coicop-001762935",
		    "start_date": 312,
		    "start_ts": "1996-01-01T00:00:00+00:00",
		    "tags": [
		      "2016-04-13",
		      "appliances",
		      "area",
		      "base",
		      "bdm",
		      "classification",
		      "coicop",
		      "collection",
		      "consumer",
		      "date",
		      "decimals",
		      "economic",
		      "food",
		      "france",
		      "frequency",
		      "groups",
		      "harmonised",
		      "identifier",
		      "index",
		      "insee",
		      "institute",
		      "ipch-2015-fr-coicop",
		      "ipch-mensuel-ensemble-des-menages-france-base-2015-nomenclature-coicop-05-3-2-1-appareils-de-transformation-d-aliments",
		      "last",
		      "main",
		      "monthly",
		      "multiplier",
		      "national",
		      "nature",
		      "numerical",
		      "object",
		      "observation",
		      "period",
		      "price",
		      "processing",
		      "product",
		      "reference",
		      "series",
		      "statistics",
		      "studies",
		      "time",
		      "title",
		      "unit",
		      "update",
		      "used",
		      "website",
		      "without"
		    ]
		  },
		  {
		    "attributes": {
		      "base-per": "2015",
		      "decimals": "2",
		      "last-update": "2016-07-13",
		      "ref-area": "fe",
		      "time-per-collect": "periode",
		      "title": "indice-des-prix-a-la-consommation-harmonise-base-2015-ensemble-des-menages-france-nomenclature-coicop-09-4-2-3-redevances-et-abonnements-audio-visuels",
		      "unit-measure": "so",
		      "unit-mult": "0"
		    },
		    "dataset_code": "IPCH-2015-FR-COICOP",
		    "dimensions": {
		      "freq": "m",
		      "nature": "indice",
		      "produit": "09423"
		    },
		    "end_date": 557,
		    "end_ts": "2016-01-31T23:59:59.999000+00:00",
		    "frequency": "M",
		    "key": "001762227",
		    "name": "Monthly - 09.4.2.3 - Television and radio licence fees, subscriptions - Index",
		    "notes": null,
		    "provider_name": "INSEE",
		    "slug": "insee-ipch-2015-fr-coicop-001762227",
		    "start_date": 312,
		    "start_ts": "1996-01-01T00:00:00+00:00",
		    "tags": [
		      "2016-04-13",
		      "area",
		      "base",
		      "bdm",
		      "classification",
		      "coicop",
		      "collection",
		      "consumer",
		      "date",
		      "decimals",
		      "economic",
		      "fees",
		      "france",
		      "frequency",
		      "groups",
		      "harmonised",
		      "identifier",
		      "index",
		      "insee",
		      "institute",
		      "ipch-2015-fr-coicop",
		      "ipch-mensuel-ensemble-des-menages-france-base-2015-nomenclature-coicop-09-4-2-3-redevances-et-abonnements-audio-visuels",
		      "last",
		      "licence",
		      "main",
		      "monthly",
		      "multiplier",
		      "national",
		      "nature",
		      "numerical",
		      "object",
		      "observation",
		      "period",
		      "price",
		      "product",
		      "radio",
		      "reference",
		      "series",
		      "statistics",
		      "studies",
		      "subscriptions",
		      "television",
		      "time",
		      "title",
		      "unit",
		      "update",
		      "used",
		      "website",
		      "without"
		    ]
		  },
		  {
		    "attributes": {
		      "base-per": "2015",
		      "decimals": "2",
		      "last-update": "2016-07-13",
		      "ref-area": "fe",
		      "time-per-collect": "periode",
		      "title": "indice-des-prix-a-la-consommation-harmonise-base-2015-ensemble-des-menages-france-nomenclature-coicop-02-1-2-vin-et-boissons-fermentees",
		      "unit-measure": "so",
		      "unit-mult": "0"
		    },
		    "dataset_code": "IPCH-2015-FR-COICOP",
		    "dimensions": {
		      "freq": "m",
		      "nature": "indice",
		      "produit": "0212"
		    },
		    "end_date": 557,
		    "end_ts": "2016-01-31T23:59:59.999000+00:00",
		    "frequency": "M",
		    "key": "001762639",
		    "name": "Monthly - 02.1.2 - Wine - Index",
		    "notes": null,
		    "provider_name": "INSEE",
		    "slug": "insee-ipch-2015-fr-coicop-001762639",
		    "start_date": 312,
		    "start_ts": "1996-01-01T00:00:00+00:00",
		    "tags": [
		      "2016-04-13",
		      "area",
		      "base",
		      "bdm",
		      "classification",
		      "coicop",
		      "collection",
		      "consumer",
		      "date",
		      "decimals",
		      "economic",
		      "france",
		      "frequency",
		      "groups",
		      "harmonised",
		      "identifier",
		      "index",
		      "insee",
		      "institute",
		      "ipch-2015-fr-coicop",
		      "ipch-mensuel-ensemble-des-menages-france-base-2015-nomenclature-coicop-02-1-2-vin-et-boissons-fermentees",
		      "last",
		      "main",
		      "monthly",
		      "multiplier",
		      "national",
		      "nature",
		      "numerical",
		      "object",
		      "observation",
		      "period",
		      "price",
		      "product",
		      "reference",
		      "series",
		      "statistics",
		      "studies",
		      "time",
		      "title",
		      "unit",
		      "update",
		      "used",
		      "website",
		      "wine",
		      "without"
		    ]
		  },
		  {
		    "attributes": {
		      "base-per": "2015",
		      "decimals": "2",
		      "last-update": "2016-07-13",
		      "ref-area": "fe",
		      "time-per-collect": "periode",
		      "title": "indice-des-prix-a-la-consommation-harmonise-base-2015-ensemble-des-menages-france-nomenclature-coicop-06-1-3-appareils-et-materiel-therapeutiques",
		      "unit-measure": "so",
		      "unit-mult": "0"
		    },
		    "dataset_code": "IPCH-2015-FR-COICOP",
		    "dimensions": {
		      "freq": "m",
		      "nature": "indice",
		      "produit": "0613"
		    },
		    "end_date": 557,
		    "end_ts": "2016-01-31T23:59:59.999000+00:00",
		    "frequency": "M",
		    "key": "001763067",
		    "name": "Monthly - 06.1.3 - Therapeutic appliances and equipment - Index",
		    "notes": null,
		    "provider_name": "INSEE",
		    "slug": "insee-ipch-2015-fr-coicop-001763067",
		    "start_date": 360,
		    "start_ts": "2000-01-01T00:00:00+00:00",
		    "tags": [
		      "2016-04-13",
		      "appliances",
		      "area",
		      "base",
		      "bdm",
		      "classification",
		      "coicop",
		      "collection",
		      "consumer",
		      "date",
		      "decimals",
		      "economic",
		      "equipment",
		      "france",
		      "frequency",
		      "groups",
		      "harmonised",
		      "identifier",
		      "index",
		      "insee",
		      "institute",
		      "ipch-2015-fr-coicop",
		      "ipch-mensuel-ensemble-des-menages-france-base-2015-nomenclature-coicop-06-1-3-appareils-et-materiel-therapeutiques",
		      "last",
		      "main",
		      "monthly",
		      "multiplier",
		      "national",
		      "nature",
		      "numerical",
		      "object",
		      "observation",
		      "period",
		      "price",
		      "product",
		      "reference",
		      "series",
		      "statistics",
		      "studies",
		      "therapeutic",
		      "time",
		      "title",
		      "unit",
		      "update",
		      "used",
		      "website",
		      "without"
		    ]
		  },
		  {
		    "attributes": {
		      "base-per": "2015",
		      "decimals": "2",
		      "last-update": "2016-07-13",
		      "ref-area": "fe",
		      "time-per-collect": "periode",
		      "title": "indice-des-prix-a-la-consommation-harmonise-base-2015-ensemble-des-menages-france-nomenclature-coicop-09-3-5-0-services-veterinaires-et-autres-services-pour-animaux-de-compagnie",
		      "unit-measure": "so",
		      "unit-mult": "0"
		    },
		    "dataset_code": "IPCH-2015-FR-COICOP",
		    "dimensions": {
		      "freq": "m",
		      "nature": "indice",
		      "produit": "09350"
		    },
		    "end_date": 557,
		    "end_ts": "2016-01-31T23:59:59.999000+00:00",
		    "frequency": "M",
		    "key": "001762172",
		    "name": "Monthly - 09.3.5.0 - Veterinary and other services for pets - Index",
		    "notes": null,
		    "provider_name": "INSEE",
		    "slug": "insee-ipch-2015-fr-coicop-001762172",
		    "start_date": 312,
		    "start_ts": "1996-01-01T00:00:00+00:00",
		    "tags": [
		      "2016-04-13",
		      "area",
		      "base",
		      "bdm",
		      "classification",
		      "coicop",
		      "collection",
		      "consumer",
		      "date",
		      "decimals",
		      "economic",
		      "france",
		      "frequency",
		      "groups",
		      "harmonised",
		      "identifier",
		      "index",
		      "insee",
		      "institute",
		      "ipch-2015-fr-coicop",
		      "ipch-mensuel-ensemble-des-menages-france-base-2015-nomenclature-coicop-09-3-5-0-services-veterinaires-et-autres-services-pour-animaux-de-compagnie",
		      "last",
		      "main",
		      "monthly",
		      "multiplier",
		      "national",
		      "nature",
		      "numerical",
		      "object",
		      "observation",
		      "period",
		      "pets",
		      "price",
		      "product",
		      "reference",
		      "series",
		      "services",
		      "statistics",
		      "studies",
		      "time",
		      "title",
		      "unit",
		      "update",
		      "used",
		      "veterinary",
		      "website",
		      "without"
		    ]
		  },
		  {
		    "attributes": {
		      "base-per": "2015",
		      "decimals": "2",
		      "last-update": "2016-07-13",
		      "ref-area": "fe",
		      "time-per-collect": "periode",
		      "title": "indice-des-prix-a-la-consommation-harmonise-base-2015-ensemble-des-menages-france-nomenclature-coicop-09-5-4-papeterie-et-materiel-de-dessin",
		      "unit-measure": "so",
		      "unit-mult": "0"
		    },
		    "dataset_code": "IPCH-2015-FR-COICOP",
		    "dimensions": {
		      "freq": "m",
		      "nature": "indice",
		      "produit": "0954"
		    },
		    "end_date": 557,
		    "end_ts": "2016-01-31T23:59:59.999000+00:00",
		    "frequency": "M",
		    "key": "001762244",
		    "name": "Monthly - 09.5.4 - Stationery and drawing materials - Index",
		    "notes": null,
		    "provider_name": "INSEE",
		    "slug": "insee-ipch-2015-fr-coicop-001762244",
		    "start_date": 312,
		    "start_ts": "1996-01-01T00:00:00+00:00",
		    "tags": [
		      "2016-04-13",
		      "area",
		      "base",
		      "bdm",
		      "classification",
		      "coicop",
		      "collection",
		      "consumer",
		      "date",
		      "decimals",
		      "drawing",
		      "economic",
		      "france",
		      "frequency",
		      "groups",
		      "harmonised",
		      "identifier",
		      "index",
		      "insee",
		      "institute",
		      "ipch-2015-fr-coicop",
		      "ipch-mensuel-ensemble-des-menages-france-base-2015-nomenclature-coicop-09-5-4-papeterie-et-materiel-de-dessin",
		      "last",
		      "main",
		      "materials",
		      "monthly",
		      "multiplier",
		      "national",
		      "nature",
		      "numerical",
		      "object",
		      "observation",
		      "period",
		      "price",
		      "product",
		      "reference",
		      "series",
		      "stationery",
		      "statistics",
		      "studies",
		      "time",
		      "title",
		      "unit",
		      "update",
		      "used",
		      "website",
		      "without"
		    ]
		  },
		  {
		    "attributes": {
		      "base-per": "2015",
		      "decimals": "2",
		      "last-update": "2016-07-13",
		      "ref-area": "fe",
		      "time-per-collect": "periode",
		      "title": "indice-des-prix-a-la-consommation-harmonise-base-2015-ensemble-des-menages-france-nomenclature-coicop-09-1-3-2-accessoires-pour-materiel-de-traitement-de-l-information",
		      "unit-measure": "so",
		      "unit-mult": "0"
		    },
		    "dataset_code": "IPCH-2015-FR-COICOP",
		    "dimensions": {
		      "freq": "m",
		      "nature": "indice",
		      "produit": "09132"
		    },
		    "end_date": 557,
		    "end_ts": "2016-01-31T23:59:59.999000+00:00",
		    "frequency": "M",
		    "key": "001763296",
		    "name": "Monthly - 09.1.3.2 - Accessories for information processing equipment - Index",
		    "notes": null,
		    "provider_name": "INSEE",
		    "slug": "insee-ipch-2015-fr-coicop-001763296",
		    "start_date": 360,
		    "start_ts": "2000-01-01T00:00:00+00:00",
		    "tags": [
		      "2016-04-13",
		      "accessories",
		      "area",
		      "base",
		      "bdm",
		      "classification",
		      "coicop",
		      "collection",
		      "consumer",
		      "date",
		      "decimals",
		      "economic",
		      "equipment",
		      "france",
		      "frequency",
		      "groups",
		      "harmonised",
		      "identifier",
		      "index",
		      "information",
		      "insee",
		      "institute",
		      "ipch-2015-fr-coicop",
		      "ipch-mensuel-ensemble-des-menages-france-base-2015-nomenclature-coicop-09-1-3-2-accessoires-pour-materiel-de-traitement-de-l-information",
		      "last",
		      "main",
		      "monthly",
		      "multiplier",
		      "national",
		      "nature",
		      "numerical",
		      "object",
		      "observation",
		      "period",
		      "price",
		      "processing",
		      "product",
		      "reference",
		      "series",
		      "statistics",
		      "studies",
		      "time",
		      "title",
		      "unit",
		      "update",
		      "used",
		      "website",
		      "without"
		    ]
		  }
		]
		},



		"data": {
			"first": {
		    "provider": "INSEE",
		    "dataset": "IPCH-2015-FR-COICOP",
		    "key": "001763155",
		    "slug": "insee-ipch-2015-fr-coicop-001763155",
		    "name": "Monthly - 07.3.1 - Passenger transport by railway - Index",
		    "freq": "Monthly",
		    "startDate": 312,
		    "endDate": 557
			},
			"second": {
		    "provider": "INSEE",
		    "dataset": "IPCH-2015-FR-COICOP",
		    "key": "001762548",
		    "slug": "insee-ipch-2015-fr-coicop-001762548",
		    "name": "Monthly - 01.1.4.6 - Other milk products - Index",
		    "freq": "Monthly",
		    "startDate": 312,
		    "endDate": 557
		  },
			"third": {
		    "provider": "INSEE",
		    "dataset": "IPCH-2015-FR-COICOP",
		    "key": "001763298",
		    "slug": "insee-ipch-2015-fr-coicop-001763298",
		    "name": "Monthly - 09.1.4 - Recording media - Index",
		    "freq": "Monthly",
		    "startDate": 312,
		    "endDate": 557
		  },

			"all": [
	  {
	    "provider": "INSEE",
	    "dataset": "IPCH-2015-FR-COICOP",
	    "key": "001763155",
	    "slug": "insee-ipch-2015-fr-coicop-001763155",
	    "name": "Monthly - 07.3.1 - Passenger transport by railway - Index",
	    "freq": "Monthly",
	    "startDate": 312,
	    "endDate": 557
	  },
	  {
	    "provider": "INSEE",
	    "dataset": "IPCH-2015-FR-COICOP",
	    "key": "001762548",
	    "slug": "insee-ipch-2015-fr-coicop-001762548",
	    "name": "Monthly - 01.1.4.6 - Other milk products - Index",
	    "freq": "Monthly",
	    "startDate": 312,
	    "endDate": 557
	  },
	  {
	    "provider": "INSEE",
	    "dataset": "IPCH-2015-FR-COICOP",
	    "key": "001763298",
	    "slug": "insee-ipch-2015-fr-coicop-001763298",
	    "name": "Monthly - 09.1.4 - Recording media - Index",
	    "freq": "Monthly",
	    "startDate": 312,
	    "endDate": 557
	  },
	  {
	    "provider": "INSEE",
	    "dataset": "IPCH-2015-FR-COICOP",
	    "key": "001762935",
	    "slug": "insee-ipch-2015-fr-coicop-001762935",
	    "name": "Monthly - 05.3.2.1 - Food processing appliances - Index",
	    "freq": "Monthly",
	    "startDate": 312,
	    "endDate": 557
	  },
	  {
	    "provider": "INSEE",
	    "dataset": "IPCH-2015-FR-COICOP",
	    "key": "001762227",
	    "slug": "insee-ipch-2015-fr-coicop-001762227",
	    "name": "Monthly - 09.4.2.3 - Television and radio licence fees, subscriptions - Index",
	    "freq": "Monthly",
	    "startDate": 312,
	    "endDate": 557
	  },
	  {
	    "provider": "INSEE",
	    "dataset": "IPCH-2015-FR-COICOP",
	    "key": "001762639",
	    "slug": "insee-ipch-2015-fr-coicop-001762639",
	    "name": "Monthly - 02.1.2 - Wine - Index",
	    "freq": "Monthly",
	    "startDate": 312,
	    "endDate": 557
	  },
	  {
	    "provider": "INSEE",
	    "dataset": "IPCH-2015-FR-COICOP",
	    "key": "001763067",
	    "slug": "insee-ipch-2015-fr-coicop-001763067",
	    "name": "Monthly - 06.1.3 - Therapeutic appliances and equipment - Index",
	    "freq": "Monthly",
	    "startDate": 360,
	    "endDate": 557
	  },
	  {
	    "provider": "INSEE",
	    "dataset": "IPCH-2015-FR-COICOP",
	    "key": "001762172",
	    "slug": "insee-ipch-2015-fr-coicop-001762172",
	    "name": "Monthly - 09.3.5.0 - Veterinary and other services for pets - Index",
	    "freq": "Monthly",
	    "startDate": 312,
	    "endDate": 557
	  },
	  {
	    "provider": "INSEE",
	    "dataset": "IPCH-2015-FR-COICOP",
	    "key": "001762244",
	    "slug": "insee-ipch-2015-fr-coicop-001762244",
	    "name": "Monthly - 09.5.4 - Stationery and drawing materials - Index",
	    "freq": "Monthly",
	    "startDate": 312,
	    "endDate": 557
	  },
	  {
	    "provider": "INSEE",
	    "dataset": "IPCH-2015-FR-COICOP",
	    "key": "001763296",
	    "slug": "insee-ipch-2015-fr-coicop-001763296",
	    "name": "Monthly - 09.1.3.2 - Accessories for information processing equipment - Index",
	    "freq": "Monthly",
	    "startDate": 360,
	    "endDate": 557
	  }
	]
	}
	}
}
