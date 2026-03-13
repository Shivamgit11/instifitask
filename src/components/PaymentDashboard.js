import React, { useState, useEffect } from "react";

import axios from 'axios';

const PaymentDashboard  = () => {
    const [loading, setloading]  = useState(0);
    const [data, setData] = useState([]);
    const [initialData, setInitialData] = useState([])


    const handleSearch = (e) => {
          console.log(e.target.value)
          if(e.target.value.length === 0){
            setData(initialData)
          }
          else {
          const filteredResults = initialData.filter(item => {
  // Example: check if item name includes the query (case-insensitive)
  return item.merchant.toLowerCase().includes(e.target.value.toLowerCase());
});
setData(filteredResults)
          }
          

    }


    console.log(data)
    const handleChange =(e) => {
        if(e.target.value === "All"){
            setData(initialData)
        }else {
const filteredResults = initialData.filter(item => {
  // Example: check if item name includes the query (case-insensitive)
  return item.status.toLowerCase().includes(e.target.value.toLowerCase());

});
setData(filteredResults)
        }
        

    }

    useEffect(() => {
        (async() => {
            try{
            setloading(0)
            const result = await axios.get('https://jsonplaceholder.typicode.com/users');
            const resultedData = result?.data?.map((item, index) => ({
                id: index + 1,
                merchant: item?.company?.name,
                amount: Math.floor(Math.random() * (2000 - 100 + 1)) + 100,
                status: index === 0 ? "Success" : index  %2 === 0 ? "Failed": "Pending",
                date: `2026-03-${index+1}`
            })) 
            setData(resultedData)

            setInitialData(resultedData)

            setloading(1)
            // console.log(result)
            }catch(err){
                setloading(2)
                console.error(err)
            }
            

        })()

    }, [])

    return (
        <div>
            
            <div style={{ color: "blue", fontSize: "20px", padding: "10px", display: "flex", justifyContent: "space-between" }}>
                <div><input type="text" onChange={handleSearch} /></div>
                <div><select onChange={handleChange}>
      <option value="All">All</option>

      <option value="Success">Success</option>
      <option value="Failed">Failed</option>
      <option value="Pending">Pending</option>
    </select></div>
                
            </div>
            {loading  === 0 ? 'Loading' : loading === 2 ? "Error Occurs" :  <div className="cetered_data">
                <div>
                    <div>Total Transaction: {data?.length} </div>
                    <div>Total Successful Transaction Amount: </div>
                </div>
                
                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
          <th style={{ padding: '10px', textAlign: 'left' }}>Merchant</th>
          <th style={{ padding: '10px', textAlign: 'left' }}>Amount</th>
           <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
           <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
            <tr key={index}>
                          <td style={{ padding: '10px', border: '1px solid #ddd' }}>{index}</td>
          <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item?.merchant}</td>
           <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item?.amount}</td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item?.status}</td>
             <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item?.date}</td>
            </tr>
        ))}
        
      </tbody>
    </table>
</div>}
     </div>
    )
}

export default PaymentDashboard