import React  from "react";

export default function List({data,handleEdit,handleDelete}) {
    
  
  return (
    <div className="list-group">
      {
        data.map((item)=> {
          return(
            
            <div className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
            
              <h5 className="mb-1">nama: {item.name}</h5>
              <div>
                <button onClick={()=> handleEdit(item.id)} className="btn btn-sm btn-link">Edit</button>
                <button onClick={()=> window.confirm("are you sure?") ? handleDelete(item.id) : null } className="btn btn-sm btn-link">Del</button>
              </div>
            </div>
            <p className="mb-1">harga beli:{item.beli}</p>
            <p className="mb-1">harga jual:{item.jual}</p>
            <p className="mb-1">stok:{item.stok}</p>
          </div>
          )
        })
      }
    </div>
  );
}
