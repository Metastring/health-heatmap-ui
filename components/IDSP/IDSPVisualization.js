import { useContext } from "react";
import { Text, Spinner, Button, Box, Flex } from "@chakra-ui/core";

import { BubbleChart } from "@metastring/multidimensional-charts";
import { useData } from "context/hhm-data";
import { uniq, contains } from "underscore";
import { getDomainFromStates } from "./states-domain";

export default function IDSPVisualization({ filter }) {
  const { isLoading, error, data } = useData(filter, ["meta.original"]);
  if (error) return <div>{error.message}</div>;
  const useDistrict = filter?.terms?.["entity.State"]?.length > 0 ?? false;
  const yDomain = useDistrict
    ? uniq(data?.data?.map((d) => d["entity.Name"]))
    : getDomainFromStates(data?.data?.map((d) => d["entity.State"]));
  const yParam = useDistrict ? "entity.Name" : "entity.State";
  const dateDomain = [
    new Date(filter?.ranges?.["duration.start"]?.gte),
    new Date(filter?.ranges?.["duration.start"]?.lte),
  ];
  const casesOrDeaths = contains(
    filter?.terms?.["meta.original.countOf"],
    "Number of cases"
  )
    ? "cases"
    : "deaths";
  const tooltipFunction = (d) =>
    `${d["diagnosis.id"]}: ${d["entity.Name"]} (${d["entity.State"]}) - ${d["duration.start"]} - ${d.value} ${casesOrDeaths}`;
  return (
    <>
      <Flex direction="column">
        <BubbleChart
          data={data?.data}
          colorParam="diagnosis.id"
          yParam={yParam}
          yDomain={yDomain}
          dateParam="duration.start"
          dateDomain={dateDomain}
          sizeParam="value"
          tooltipFunction={tooltipFunction}
        />
      </Flex>
    </>
  );
}
