import "./App.css";
import List from "./List";
import { useState,useEffect } from "react";
import{uid} from "uid";
import axios from "axios";
function App() {
  const [items, setItems] = useState([]);
  const [isUpdate, setIsUpdate] = useState({ id: null, status:false});
  const [formData, setformData] = useState([{
    name:"",
    beli:"",
    jual:"",
    stok:""
  }]);

  useEffect(() => {
    //ambil data
    axios.get("http://localhost:3000/barang").then(res =>{
        console.log(res.data);
        setItems(res?.data ?? []);
    })
  }, []);
  

  function handleChange(e) {
    let data={...formData};
    data[e.target.name]= e.target.value;
    setformData(data);
    
  }
  function handleSubmit(e){
    e.preventDefault();
    
    let data =[...items];

    if (formData.name === "") {
      return false
    }
    if (formData.beli === "") {
      return false
    }
    if (formData.jual === "") {
        return false
    }
    if (formData.stok === "") {
        return false
     }
     let duplikat = data.find((item) =>item.name === formData.name);
    if(duplikat){
        alert("nama barang harus unik");
        setformData({name:""});
        return false;
    }
    if (isUpdate.status) {
      data.forEach((item) => {
        //edit item
        if (item.id === isUpdate.id) {
          item.name = formData.name;
          item.beli = formData.beli;
          item.jual = formData.jual;
          item.stok = formData.stok;
        }
        
      });
      axios.put(`http://localhost:3000/barang/${isUpdate.id}`,{
        name:formData.name,beli: formData.beli,jual:formData.jual,stok:formData.stok
      }).then(res =>{
        alert("edit berhasil");
      })
    }else{
        let newdata = {id:uid(),name:formData.name,beli: formData.beli,jual:formData.jual,stok:formData.stok};
        // add contact
        data.push(newdata);

        axios.post("http://localhost:3000/barang",newdata).then(res => {
            alert("berhasil simpan data");
        })
    }
    
    setItems(data);
    setformData({name:"",beli:"",jual:"",stok:""});
    setIsUpdate({id:null,status:false});
  }

  function handleEdit(id){
    let data =[...items];
    let found = data.find((item) =>item.id === id);
    setformData({name:found.name, beli: found.beli,jual:found.jual,stok:found.stok});
    setIsUpdate({id:id,status: true});
  }
  function handleDelete(id){
    let data =[...items];
    let filterdata = data.filter(item=> item.id !== id);

    axios.delete(`http://localhost:3000/barang/${id}`).then(res =>{
        alert("delete berhasil");
    })
    setItems(filterdata);
  }

  return (
    <div className="App">
      <h1 className="px-3 py-3">Stock Barang</h1>

      <form onSubmit={handleSubmit} className="px-3 py-4">
        <div className="form-group">
          <label htmlFor="">nama barang</label>
          <input type="text" className="form-control" onChange={handleChange} name="name" value={formData.name}/>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="">harga beli</label>
          <input type="number" className="form-control"onChange={handleChange} name="beli" value={formData.beli}/>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="">harga jual</label>
          <input type="number" className="form-control"onChange={handleChange} name="jual" value={formData.jual}/>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="">stok</label>
          <input type="number" className="form-control"onChange={handleChange} name="stok" value={formData.stok}/>
        </div>
        <div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Save
          </button>
        </div>
      </form>

      <List handleEdit={handleEdit} handleDelete={handleDelete} data={items} />
    </div>
  );
}

export default App;
