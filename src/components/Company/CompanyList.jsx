import React, { useEffect, useState } from "react";

// importe de componentes 
import * as CompanyServer from './CompanyServer';

import CompanyItem from './CompanyItem';

const CompanyList = () => {

  const [companies, setCompanies] = useState([]);


  const listCompanies = async()=>{
    try{
        const res = await CompanyServer.listCompanies();
        const data = await res.json();
        setCompanies(data.companies);
        //console.log(data);
    }catch(error){
        console.log(error);

    }

  }

  useEffect(()=>{
    listCompanies();
  },[])

  return (
    <div className="row">
      {companies.map((company) => (
        <CompanyItem listCompanies={listCompanies} key={company.id} company={company}/>
      ))}
    </div>
  );
};

export default CompanyList;
