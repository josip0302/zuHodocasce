import React, { useState,useEffect } from 'react';

const ZapocniPrijavu = () => {
    const [idPrijave, setIdPrijave] = useState('');
    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [godine, setGodine] = useState('');
    const [zupa, setZupa] = useState('');
    const [process, setProcess] = useState(true);
    const [prijavaS, setPrijava] = useState(false);
  
    const handleSubmit1 = (e) => {
        e.preventDefault();
        alert(`Uneseni ID prijave: ${idPrijave}`);
        setPrijava(true);
   

    };
    const handleSubmit2 = () => {
        fetch("/sendForm", {

            // Adding method type 
            method: "POST",

            // Adding body or contents to send 
            body: JSON.stringify({
                "id":idPrijave,
                "data":{
                "variables": {
                    "ime": {
                        "value": ime
                    },
                    "prezime": {
                        "value": prezime
                    },
                    "godine": {
                        "value": godine
                    },
                    "maticnaZupa": {
                        "value": zupa
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
   

    };
    const start= ()=>{
        fetch("/start").then(
            response=>response.json()
            
          ).then(data=>{
            
          })
          setProcess(false);
          setPrijava(true);
      }
    const getTask=()=>{
        fetch("/getTask").then(
            response=>response.json()
            
          ).then(data=>{
            console.log(data["id"]);
            setIdPrijave(data["id"]);
          })
          setPrijava(false);
      }

      const zapocniProces = (        
        <form onSubmit={start}>
           
            <button type="submit" className="form-button">Pokreni prijavu</button>
        </form>);
    const zapocniPrijavu = (        
    <form onSubmit={getTask}>
       
        <button type="submit" className="form-button">Započni prijavu</button>
    </form>);

    const prijava = (<form onSubmit={handleSubmit2}>
        <div className="form-group">
            <label className="form-label">Ime:</label>
            <input
                type="text"
                className="form-input"
                value={ime}
                onChange={(e) => setIme(e.target.value)}
                required
            />
        </div>
        <div className="form-group">
            <label className="form-label">Prezime:</label>
            <input
                type="text"
                className="form-input"
                value={prezime}
                onChange={(e) => setPrezime(e.target.value)}
                required
            />
        </div>
        <div className="form-group">
            <label className="form-label">Godine:</label>
            <input
                type="number"
                className="form-input"
                value={godine}
                onChange={(e) => setGodine(e.target.value)}
                min="0"
                required
            />
        </div>
        <div className="form-group">
            <label className="form-label">Župa:</label>
            <input
                type="text"
                className="form-input"
                value={zupa}
                onChange={(e) => setZupa(e.target.value)}
                required
            />
        </div>
        <button type="submit" className="form-button">Prijavi</button>
    </form>);


   
        return (
            <div>
                {process && zapocniProces}
                {idPrijave && <p>{idPrijave}</p>}
            {prijavaS && zapocniPrijavu}
            {idPrijave && prijava}
            </div>
        );
   
    
};

export default ZapocniPrijavu;
