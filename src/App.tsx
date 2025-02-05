import{ MapPin as MapPinIcon, Cake as CakeIcon, User}  from "lucide-react";
  
import { useState , useEffect} from "react";
import {USERS} from "./config";



function App() {

  const [searchText, setSearchText] = useState("");

  const [filteredUsers, setFilteredUsers] = useState(USERS);
  const[filterCity,setFilterCity] = useState("");
  const[filterAge,setfilterAge] = useState("");
const [sortOrder,setSortOrder] =useState("asc");

  useEffect(()=>{

  if(!searchText){
    setFilteredUsers(USERS);
    return;
  }
  
    const tempFilteredUsers = USERS.filter((user) => {
      
      if (user.name.toLocaleLowerCase().includes(searchText)){
        return true;
    }
    else if (user.city.toLocaleLowerCase().includes(searchText)){
      return true;
    }
    else if (user.age.toString().includes(searchText)){
      return true;
    }
    else{
      return false;
    }
    });

setFilteredUsers(tempFilteredUsers);
}, [searchText]);

  useEffect(() => {
    if(!filterCity && !filterAge){
      setFilteredUsers(USERS);
      return;
    }

const tempFilteredUsers = USERS.filter((user) => {
  if (
    filterCity && 
    user.city === filterCity && 
  filterAge &&
user.age === (filterAge)
){
    return true;
    }

  if (filterAge && !filterCity && user.age === filterAge){
    return  true;
  }
  if (filterCity && !filterAge && user.city === filterCity){ 
    return  true;
  } 
  return false;
});
setFilteredUsers(tempFilteredUsers);
 },[filterCity,filterAge]);


 useEffect(() => {
  const tempSortedUsers = filteredUsers.sort((a,b)=>{

    if (sortOrder ==="asc"){
      return a.name.localeCompare(b.name);
    }else{
      return b.name.localeCompare(a.name);
    }
  });
  setFilteredUsers([...tempSortedUsers]);
},[sortOrder, filteredUsers])

  return(
    <div className="bg-slate-100 min-h-screen">
    <h1 className="text-center text-blue-500 text-4xl font-bold py-5" 
    >
      Search, Sort, Filter
      </h1>

     <input
      type="text" placeholder="Search" 
      className=
     "w-2/3 p-2 mt-10 mb-5 bg-white block mx-auto rounded-lg text-2xl 
     focus:outline-none border-gray-200"
     value={searchText}
     onChange={(e) => setSearchText(e.target.value.toLocaleLowerCase())}
     />

     {searchText ? ( 
      <p className="text-center mt-1 ">
        {filteredUsers.length===0 
        ? "Oops! No user found...Try another search..."
         :  `Found ${filteredUsers.length} user for search result....`}
        </p>
        ): null}
  
<div className="flex justify-around">
<div>
  <span>Filter By City : </span>
  <select className="bg-white text-lg my-2 rounded-lg px-5" 
    value={filterCity}
   onChange={(e) => setFilterCity(e.target.value)}
>
    <option value="">All</option>

{
  USERS.map((User) => {
    return<option key={User.city} value={User.city}>{User.city}</option>
  })
}
</select>
  

</div>
<div>

<span>Filter By age :</span>
  <select className="bg-white text-lg my-2 rounded-lg px-5"
  value={filterAge}
  onChange={(e) => setfilterAge(e.target.value)}
  >
    <option value="">All</option>
    {
      USERS.map((user) => {
        return <option key={user.age} value={user.age}>{user.age}</option>
      })
    }
  </select>
</div>


<div>
  
<span>Sort By Nmae :</span>
  <select className="bg-white text-lg my-2 rounded-lg px-5"
  value={sortOrder}
  onChange={(e) => setSortOrder(e.target.value)}
  >
     <option value="asc">Ascending</option>
    <option value="desc">Descending</option>  
    </select>
</div>
</div>
      <div className="flex flex-wrap justify-around mt-10">
        {filteredUsers.map((userData, index)=>{
        const {name, city,age,avatar} = userData;


        return(
         <div 
         className="bg-white shadow-lg m-5 px-5 py-2 rounded-lg w-[400px] flex"
          key={index}>
          <img src={avatar} className="h-15 rounded-full mr-4"/>
          <div>
          <h1 className="font-bold text-lg border-b border-gray-200 pb-2">{name}</h1>

          <div className="flex " >
         <p className="w-[100px] flex items-center">
          <CakeIcon className="inline"/> {age}
          </p>
          <p className="flex items-center">
            <MapPinIcon className=" ml-4 inline"/>{city}
            </p>
             
            </div>
        </div>
        </div>
        );
      })}
      </div>
    </div>
  );
}


export default  App;