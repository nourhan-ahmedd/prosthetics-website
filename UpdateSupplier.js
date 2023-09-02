import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import supabase from "../config/supabaseClient"

const UpdateSupplier = () => {
  const { ID } = useParams()
  const navigate = useNavigate()

  const[Name, setName] = useState('')
  const[Address, setAddress] = useState('')
  const[Email, setEmail] = useState('')
  const[PhoneNumber, setPhoneNumber] = useState('')
  const[formError, setFormError] = useState(null)

  const handleSubmit = async(e) =>{
      e.preventDefault()

      if(!Name || !Address || !Email || !PhoneNumber){
        setFormError('Please enter all the fields correctly')
        return
      }

      const {data, error} = await supabase
      .from('Supplier')
      .update({Name, Address, Email, PhoneNumber})
      .eq("ID", ID)

      if(error){
        console.log(error)
        setFormError('Please enter all the fields correctly')
      }
      if(data){
        console.log(data)
        setFormError(null)
      }

      navigate('/supplier')
  }

  useEffect(() =>{
    const fetchSuppliers = async() =>{
      const {data, error} = await supabase
      .from('Supplier')
      .select()
      .eq("ID", ID)
      .single()

      if(error){
        navigate('/supplier', {replace: true})
      }

      if(data){
        setName(data.Name)
        setAddress(data.Address)
        setEmail(data.Email)
        setPhoneNumber(data.PhoneNumber)
        console.log(data)
      }
    }

    fetchSuppliers()
  }, [ID, navigate])

  

  return (
    <div className="page update">
      <form onSubmit={handleSubmit}>
        <label htmlFor="Name">Name:</label>
        <input 
          type="text" 
          id="name"
          value={Name}
          onChange={(e) => {
            const value = e.target.value;
            if (!/\d/.test(value) || value === '') {
              setName(value);
              setFormError(null);
            } else {
              setFormError('Name cannot contain numbers');
            }
          }}
        />

        <label htmlFor="Address">Address:</label>
        <input
          type="text"
          id="address"
          value={Address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label htmlFor="Email">Email:</label>
        <input 
          type="text"
          id="email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="Phone Number">Phone Number:</label>
        <input 
          type="text"
          id="phone"
          maxLength={11}
          pattern="\d{11}"
          value={PhoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <button className="add">Update Supplier Data</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default UpdateSupplier