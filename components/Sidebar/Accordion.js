import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown } from 'react-feather';
import _ from 'underscore';

import AccordionContent from './AccordionContent';
import { Box, Text } from '@chakra-ui/core';

function Accordion({ group, index, onSelectIndicator, q, showMetadata }) {
	const [active, setActive] = useState(false);
	const chevron = active ? <ChevronDown /> : <ChevronRight />;

	return (
		<Box>
			<ul className="accordion-container">
				<div className="accordion-header" onClick={() => setActive(!active)}>
					<Text>
						<span>{chevron}</span>
						{group.name} <Text as="sup" fontWeight="300">{group.count}</Text>
					</Text>
				</div>
				{(active || q) &&
					_.map(group.subs, (sub, key) => (
						<div className="sub-group" key={key}>
							<AccordionContent
								subgroup={sub}
								name={key}
								key={key}
								q={q}
								showMetadata={showMetadata}
								onSelectIndicator={onSelectIndicator}
							/>
						</div>
					))}
			</ul>
		</Box>
	);
}

export default Accordion;
