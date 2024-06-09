import React, { useState, useEffect  } from 'react';


const Admin = () => {
      const [data, setData] = useState(null);
      const [statusPrijave, setStatusPrijave] = useState(false);
      const [tableVisible,setTableVisible]=useState(false);
      useEffect(() => {
        fetch("/adminTasks").then(
          response=>response.json()
          
        ).then(data=>{
          console.log(data.data);
          setTableVisible(true);
          setData(JSON.parse(data.data));
        })
      },[]);
     const kreni=()=>{
      fetch("/sendMess").then(
        response=>response.json()
        
      ).then(data=>{
        
      })
        setTableVisible(true);
     }
   

      const odobriPrijavu = (id) => {
        
        setStatusPrijave(true);
        potvrdi_odluku_o_prijavi(id);      
      }


      const odbijPrijavu = (id) => {
        
        setStatusPrijave(false);
        potvrdi_odluku_o_prijavi(id);
      }

      const potvrdi_odluku_o_prijavi = (tid) => {
       console.log(statusPrijave);
       console.log(tid);
       fetch("/sendOdobreno", {

        // Adding method type 
        method: "POST",

        // Adding body or contents to send 
        body: JSON.stringify({
            "id":tid,
            "data":{
            "variables":{
              "prijavaUspjesna": {
                "value": statusPrijave
              }
            
            }

        }}),

        // Adding headers to the request 
        headers: {
            "Content-type": "application/json"
        }
    }).then(response => response.json()) 

    // Displaying results to console 
    .then(json => console.log(json)); 

      }
    
      return (
        <div className="App">
          <header className="App-header">
            <h1>Tablica Podataka</h1>
          </header>
          <button onClick={kreni}>Kreni s provjerom</button>
         {tableVisible && <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Created</th>
                <th>Name</th>
               
                <th>Odobriti</th>
                <th>Odbiti</th>
              </tr>
            </thead>
            <tbody>
                    {data && data.map((item) => (
                        <tr key={item["id"]}>
                            <td>{item["id"]}</td>
                            <td>{item["created"]}</td>
                            <td>{item["name"]}</td>
                            <td>
                                <button type="button" className="form-button" onClick={() => odobriPrijavu(item["id"])}>
                                    Odobri
                                </button>
                            </td>
                            <td>
                                <button type="button" className="form-button" onClick={() => odbijPrijavu(item["id"])}>
                                    Odbij
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
          </table>}
        </div>
      );
 
};

export default Admin;
