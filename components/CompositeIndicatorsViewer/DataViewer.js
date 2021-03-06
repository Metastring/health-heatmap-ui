import { useCompositeScore } from "context/hhm-data";
import { useTable } from "react-table";
import { Tabs, TabList, Tab, Text, TabPanels, TabPanel } from "@chakra-ui/core";
import TableOfResults from "./Table";
import Map from "./Map";

export default function DataViewer({ filter }) {
  const {
    compositeScoreLoading,
    compositeScoreError,
    compositeScores,
  } = useCompositeScore(filter);
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>
            <Text fontWeight="bold" mt="8px">
              Map
            </Text>
          </Tab>
          <Tab>
            <Text fontWeight="bold" mt="8px">
              Table
            </Text>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Map data={compositeScores} filter={filter} />
          </TabPanel>
          <TabPanel>
            {compositeScoreLoading ? (
              <div>Loading...</div>
            ) : compositeScoreError ? (
              <div>{compositeScoreError.message}</div>
            ) : (
              <TableOfResults results={compositeScores} everything />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
