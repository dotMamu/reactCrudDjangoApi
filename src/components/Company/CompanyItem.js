import React from "react";
import * as CompanyServer from "./CompanyServer";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

const CompanyItem = ({ company, listCompanies }) => {
  const navigate = useNavigate();
  //console.log(company);

  const handleDelete = async (companyId) => {
    confirmAlert({
      title: "Confirmar Eliminación",
      message: "¿Está seguro que desea eliminar esta compañia?",
      buttons: [
        {
          label: "Si",
          onClick: async () => {
            await CompanyServer.deleteCompany(companyId);
            listCompanies();
            //alert("Eliminado correctamente");
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });

    // await CompanyServer.deleteCompany(companyId);
    // listCompanies();
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card card-body">
        <h3 className="card-title">
          {company.name}
          <button
            className="btn btn-info btn-sm m-1"
            onClick={() => navigate(`/updateCompany/${company.id}`)}
          >
            Update
          </button>
        </h3>
        <p className="card-text">
          Founded: <strong>{company.foundation}</strong>{" "}
        </p>
        <a
          href={company.website}
          className="btn btn-primary"
          rel="noopener noreferrer"
          target="_blank"
        >
          Ir al sitio web
        </a>
        <button
          onClick={() => company.id && handleDelete(company.id)}
          className="btn btn-danger my-2"
        >
          Delete Company
        </button>
      </div>
    </div>
  );
};

export default CompanyItem;
