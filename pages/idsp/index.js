import React from "react";
import { Helmet } from "react-helmet";
import _ from "underscore";
import { Grid, Box } from "@chakra-ui/core";
import moment from "moment";

import IDSPSidebar from "components/IDSPSidebar";
import { IDSPVisualization, IDSPTable } from "components/IDSPVisualization";
import Layout from "components/Layout";
import { useDataFilter } from "context/hhm-data";

export default function IDSP() {
  const initialFilter = {
    terms: {
      "diagnosis.id": ["Dengue"],
      "entity.type": ["DISTRICT"],
      "source.id": ["IDSP"],
    },
    ranges: {
      "duration.start": {
        gte: moment("2019-04-01").toDate(),
        lte: moment("2019-08-31").toDate(),
      },
    },
  };

  const [filter, dispatchFilter] = useDataFilter(initialFilter);

  return (
    <Layout>
      <Helmet>
        <title>Health Heatmap - IDSP</title>
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <div className="container">
        <main>
          <div>
            <Grid gridTemplateColumns={"20% 1fr"} gap={10}>
              <Box>
                <IDSPSidebar filter={filter} dispatchFilter={dispatchFilter} />
              </Box>

              <Box className="vis-right-column">
                <div className="visualization-area">
                  <IDSPVisualization
                    filter={filter}
                    dispatchFilter={dispatchFilter}
                  />
                </div>
              </Box>
            </Grid>
            <Box>
              <IDSPTable filter={filter} dispatchFilter={dispatchFilter} />
            </Box>
          </div>
        </main>
      </div>
    </Layout>
  );
}
