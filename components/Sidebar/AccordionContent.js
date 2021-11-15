import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "react-feather";
import { Stack, Text, Badge } from "@chakra-ui/core";
import _ from "underscore";
import Highlight from "react-highlighter";

import IndicatorItem from "./IndicatorItem";

function AccordionContent({ subgroup, name, openAll, setOpenAll, q }) {
  const [active, setActive] = useState(false);
  const chevron = active ? <ChevronDown /> : <ChevronRight />;

  useEffect(() => {
    if (openAll !== "tralse") setActive(openAll);
  }, [openAll]);

  return (
    <div>
      {subgroup.length ? (
        <li className="sub-group has-border">
          <div
            onClick={() => {
              setOpenAll("tralse");
              setActive(!active);
            }}
            className="sub-group-header"
          >
            <Stack isInline spacing={2} mt="5px" justifyContent="space-between">
              <Stack isInline>
                <span className="sub-group-chevy">{chevron}</span>
                <Text>
                  {" "}
                  <Highlight search={q}>{name}</Highlight>
                </Text>
              </Stack>
              <Text className="count-badge">{subgroup.length}</Text>
            </Stack>
          </div>
          <Stack
            className="indicators-list"
            spacing={10}
            display={active || q ? "block" : "none"}
          >
            {_.map(subgroup, (indicator, index) => (
              <IndicatorItem
                indicator={indicator}
                index={index}
                key={index}
                q={q}
              />
            ))}
          </Stack>
        </li>
      ) : null}
    </div>
  );
}

export default AccordionContent;
