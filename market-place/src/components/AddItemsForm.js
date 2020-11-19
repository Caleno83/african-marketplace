import React, {  useContext } from 'react';
import axiosWithAuth from "../utils/axiosWithAuth";
import { PlantsContext } from '../context/PlantsContext';
import ItemsAddCard from "./ItemsAddCard";




const AddItemsForm = () => {
    //aftert the useContext Plants is implemented, we dont need this anymore
    const {itemsList, setItemsList} = useContext(PlantsContext)
    //   const [plants, setPlants] = useState([])

   
    const fetchItems = () => {
        axiosWithAuth()
        .get("/items") //I will add here the info from backend
        .then(res => {
            console.log("This is the fetchItems response", res);
             setItemsList(res.data);
        })
        .catch(err => {
            console.log("This is the fetchItems error", err.message);
        })
    };

    // useEffect(() => {
    //     fetchPlants();
    // }, []);

    return (
        <>
   

    
        <div>
            <ItemsAddCard items={itemsList} fetchItems={fetchItems} />

    
        </div>
       
        </>
    )
};

export default AddItemsForm;