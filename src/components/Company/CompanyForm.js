import { useEffect, useState } from "react";
import * as CompanyServer from "./CompanyServer";
import { useNavigate, useParams } from "react-router-dom";



const CompanyForm = () => {
  const navigate = useNavigate();
  const params = useParams();

  // console.log(params)

  const initialState = { id: 0, name: "Nombre", foundation: 1950, website: "" };

  const [company, setCompany] = useState(initialState);

  const handleInputChange = (e) => {
    // console.log(e)
    // console.log(e.target.name)
    // console.log(e.target.value)
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;
      if (!params.id) {
        res = await CompanyServer.registerCompany(company);
        const data = await res.json();
        //console.log(data);
        if (data.message === "Success") {
          setCompany(initialState);
        } 
      }else {
        await CompanyServer.updateCompany(params.id, company);
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getCompany = async (companyId) => {
    try {
      const res = await CompanyServer.getCompany(companyId);
      const data = await res.json();
      const { name, foundation, website } = data.company;
      setCompany({ name, foundation, website });
      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getCompany(params.id);
    }
    // eslint-disable-next-line
  }, []);

  return (
    
    <div className=" bg-light p-3 rounded  col-md-3 mx-auto">
      <h2 className="mb-3 text-center">Company</h2>
      <form  onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            minLength="2"
            maxLength="50"
            autoFocus
            required
            value={company.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Foundation</label>
          <input
            type="number"
            className="form-control"
            name="foundation"
            min="1900"
            max="2022"
            required
            value={company.foundation}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Website</label>
          <input
            type="url"
            name="website"
            className="form-control"
            maxLength="100"
            required
            value={company.website}
            onChange={handleInputChange}
          />
        </div>
        <div className="d-grip gap-2">
          {params.id ? (
            <button type="submit" className="btn btn-block btn-primary btn-lg">
              Update
            </button>
          ) : (
            <button type="submit" className="btn btn-block btn-success">
              Register
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;
