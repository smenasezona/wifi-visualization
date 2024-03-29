import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import routerColumns from "../../data/columns/routerColumns";
import RadiationModal from "../modal/RadiationModal";
import ShowPatternCellRenderer from "../modal/ShowPatternCellRenderer";
import FieldVisibilityController from "../visibility/FieldVisibilityController";

const RoutersTable = () => {
  const [routers, setRouters] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [columnApi, setColumnApi] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  const handleShowModal = (url) => {
    setImgUrl(url);
    setShowModal(true);
    console.log("ya najal na knopku");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetch("http://localhost:3001/routers")
      .then((response) => response.json())
      .then((data) => setRouters(data));
  }, []);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
    params.api.sizeColumnsToFit();
  };

  return (
    <>
      <div className="flex-container">
        <div className="flex">
          <div className="ag-theme-alpine w-full ml-3" style={{ flexGrow: 1 }}>
            <AgGridReact
              rowData={routers}
              columnDefs={routerColumns}
              defaultColDef={{
                resizable: true,
                minWidth: 150,
                cellStyle: {
                  "white-space": "normal",
                  "line-height": "28px",
                },
                sortable: true,
                filter: true,
              }}
              onGridReady={onGridReady}
              onFirstDataRendered={onGridReady}
              rowSelection="multiple"
              suppressRowClickSelection
              getRowStyle={(params) => {
                return {
                  // backgroundColor:
                  // 	params.node.rowIndex % 2 === 0
                  // 		? '#ffffff'
                  // 		: '#f3f3f3',
                };
              }}
              context={{ handleShowModal }}
              frameworkComponents={{
                showPatternCellRenderer: ShowPatternCellRenderer,
              }}
            />
          </div>
          {columnApi && (
            <div className="w-1/4 ml-4">
              <FieldVisibilityController
                columnApi={columnApi}
                columnDefs={routerColumns}
              />
            </div>
          )}
        </div>
      </div>
      <RadiationModal
        show={showModal}
        onHide={handleCloseModal}
        imgUrl={imgUrl}
      />
    </>
  );
};

export default RoutersTable;
