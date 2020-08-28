import React, { useState, useEffect } from 'react';
import request from 'superagent';
import _ from 'underscore';
import { Box, Stack } from '@chakra-ui/core';

import AppConstant from '../../../constant/AppConstant';
import Search from '../Search';
import Layer from './layer';

const filterLayers = (layers, q) => {
	return _.filter(layers, (layer) => {
		return (
			layer.layerName.toLowerCase().includes(q.toLowerCase()) ||
			layer.layerDescription.toLowerCase().includes(q.toLowerCase())
		);
	});
};

function IBPLayers() {
	const [q, setQ] = useState(false);
	const [layers, setLayers] = useState([]);
	const [filteredLayers, setFilteredLayers] = useState(false);

	useEffect(() => {
		// Get IBP Layers
		request
			.get(`${AppConstant.config.nakshaApi}/layer/all`)
			.then((res) => {
				setLayers(_.map(res.body, (l) => ({ ...l, isAdded: false })));
			})
			.catch((err) => {
				console.log('Error loading Data', err);
			});
	}, []);

	useEffect(() => {
		setFilteredLayers(q ? filterLayers(JSON.parse(JSON.stringify(layers)), q) : layers);
	}, [q, layers]);

	const handleToggleLayer = (layer) => {
		const __layers = [...layers];
		const index = _.findIndex(layers, (l) => l.id === layer.id);
		__layers[index].isAdded = !__layers[index].isAdded;
		setLayers(__layers);
	};
	return (
		<div>
			<Box className="sidebar-container" pb="50px">
				<Box className="sidebar-header">
					<div className="searchbox">
						<Search onChange={setQ} disabled={!layers} placeholder="Filter layers by name" />
					</div>
				</Box>

				<Box mt="10px" className="inidicator-list">
					<Stack>
						{_.map(filteredLayers, (layer) => (
							<Layer key={layer.id} layer={layer} q={q} onAddToMap={handleToggleLayer} />
						))}
					</Stack>
				</Box>
			</Box>
		</div>
	);
}

export default IBPLayers;
