import React, { useRef, useState, useEffect } from 'react'
// Importing necessary libraries and modules
import { ToastContainer, toast } from 'react-toastify'; // For displaying toast notifications
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import axios from 'axios'; // (Not used in the current code)

const Maneger = () => {

  // State to hold all stored things-----
  const [passwordArry, setpasswordArry] = useState([]);

  const [form, setform] = useState({ url: '', username: '', password: '' });

  const [loading, setLoading] = useState(false);

  const ref = useRef();

  // Fetch all saved passwords from the backend
  const fetchPasswords = async () => {
    const req = await fetch("http://localhost:3000/");
    const passwords = await req.json();
    await setpasswordArry(passwords);
  };

  // Run on component mount
  useEffect(() => {
    fetchPasswords(); // Load passwords initially
    localStorage.setItem('editId', "") // Reset edit ID
  }, []);

  // Update password entry by ID
  const updatePasswordArry = async (id) => {
    try {
      await fetch('http://localhost:3000/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ ...form, id }),
      });
      // Update UI state with new form data
      setpasswordArry(prevArray =>
        prevArray.map(obj => obj.id === id ? { ...obj, ...form } : obj)
      );
      toast('password Updated'); // Show success toast
    }
    catch (err) {
      toast('Somthing went Wrong') // Show error toast
    }
  }

  // Save new password or update existing one
  const savePassword = async () => {
    // Validate input fields
    if (form.url.length < 3 || form.username.length < 3 || form.password.length < 3) {
      toast('Please Enter valied Info..') // Show error if input is invalid
    } else {
      let editId = localStorage.getItem('editId')
      if (editId !== "") {
        // If editing, update the password
        updatePasswordArry(editId)
      } else {
        // Otherwise, save as new password entry
        await setpasswordArry([...passwordArry, { ...form }])
        try {
          await fetch('http://localhost:3000/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ ...form, id: uuidv4() }), // Assign a unique ID
          });
          toast('Password Seved') // Success toast
        } catch (err) {
          toast('Somthing went Wrong!'); // Error toast
        }
      }

      // Reset form fields after save/update
      setform({ url: '', username: '', password: '' });
    }
  }

  // Delete password by ID
  const deletePassword = async (id) => {
    if (confirm("You want to Delete ?")) {
      await setpasswordArry(passwordArry.filter(item => item.id !== id)) // Remove from UI
      await fetch('http://localhost:3000/', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ id }),
      });
    }
  };

  // Populate form with selected password for editing
  const editPassword = (id) => {
    const item = passwordArry.find(item => item.id === id);
    localStorage.setItem('editId', id)
    setform(item); // Fill form with selected item
  };

  // Handle form input changes
  const hanldeChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  // Toggle password visibility
  const showPass = () => {
    const passInput = document.querySelector('.password');
    if (passInput.type === "password") {
      passInput.type = "text";
      ref.current.src = "img/eye.png"; // Show visible icon
    } else {
      passInput.type = "password";
      ref.current.src = "img/eyecross.png"; // Show hidden icon
    }
  };

  // Copy given text to clipboard and show a toast
  const copyFunc = (text) => {
    navigator.clipboard.writeText(text);
    toast('Copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      {/* Toast notification container */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />

      {/* Background gradient */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

      {/* Form container */}
      <div className="mx-auto width-3/4">
        <div className='w-2/3 mx-auto border-2 border-gray-300 flex flex-col justify-center items-center p-10 mt-10 bg-white shadow-lg rounded-lg'>

          {/* URL input */}
          <input value={form.url} onChange={hanldeChange} name="url"
            className="w-3/4 py-1 rounded px-2 mb-4 border-1 border-gray-300"
            type="text" placeholder="Enter URL" />

          {/* Username and password inputs */}
          <div className='flex gap-2 justify-between items-center w-3/4 mb-4'>
            <input value={form.username} onChange={hanldeChange} name='username'
              className="w-2/4 py-1 rounded px-2 mb-4 border-1 border-gray-300"
              type="text" placeholder="Enter Username" />

            <div className='relative w-2/4'>
              <input onChange={hanldeChange} value={form.password} name='password'
                className="password w-full py-1 rounded px-2 mb-4 border-1 border-gray-300"
                type="password" placeholder="Enter Password" />
              {/* Toggle password visibility */}
              <img ref={ref} onClick={showPass}
                className='passIcon w-10 h-6 absolute right-1 top-1 cursor-pointer' src="img/eyecross.png" alt="copy icon" />
            </div>
          </div>

          {/* Save button */}
          <button onClick={savePassword} disabled={loading}
            className='flex justify-center items-center gap-2 bg-green-500 px-8 py-2 rounded cursor-pointer'>
            Save
          </button>
        </div>
      </div >

      {/* Password list display */}
      <div className="table container w-2/3 m-auto mt-20" style={{ minHeight: '46.9vh' }}>
        {passwordArry.length == 0 && <div className='font-bold text-2xl text-center'> No data found! </div>}

        {passwordArry.length != 0 &&
          <>
            <div><h2 className='text-3xl font-bold'>Your Passwords</h2></div>

            {/* Table for passwords */}
            <table className="table-auto w-full mb-4">
              <thead className='bg-gray-500 text-white'>
                <tr>
                  <th >Website URL</th>
                  <th>User Name</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody className='bg-gray-200 '>
                {passwordArry.map((item, index) => {
                  return (
                    <tr key={index} className='border-b-1 px-10 h-5 text-center'>
                      <td>
                        <div className='flex justify-center'>
                          <a href={item.url} target="_blank" className='hover:underline hover:text-violet-400'>{item.url}</a>
                          {/* Copy URL icon */}
                          <div onClick={() => { copyFunc(item.url) }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/vesvelsm.json"
                              trigger="morph"
                              state="morph-share"
                              style={{ "width": "25px", "height": "25px", "cursor": "pointer", "padding": "0" }}>
                            </lord-icon>
                          </div>
                        </div>
                      </td>

                      {/* Username with copy button */}
                      <td>
                        <div className='flex justify-center'>
                          {item.username}
                          <div onClick={() => { copyFunc(item.username) }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/vesvelsm.json"
                              trigger="morph"
                              state="morph-share"
                              style={{ "width": "25px", "height": "25px", "cursor": "pointer", "padding": "0" }}>
                            </lord-icon>
                          </div>
                        </div>
                      </td>

                      {/* Password with copy button */}
                      <td>
                        <div className='flex justify-center'>
                          {item.password}
                          <div onClick={() => { copyFunc(item.password) }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/vesvelsm.json"
                              trigger="morph"
                              state="morph-share"
                              style={{ "width": "25px", "height": "25px", "cursor": "pointer", "padding": "0" }}>
                            </lord-icon>
                          </div>
                        </div>
                      </td>

                      {/* Action buttons for edit/delete */}
                      <td className='flex justify-center gap-3 '>
                        <button onClick={() => { editPassword(item.id) }} className='cursor-pointer transition-transform focus:[transform:rotate(-45deg)_translate(-5px,15px)]'>
                          <lord-icon
                            src="https://cdn.lordicon.com/qawxkplz.json"
                            trigger="hover"
                            style={{ "width": "25px", "height": "25px" }}>
                          </lord-icon>
                        </button>
                        <div onClick={() => { deletePassword(item.id) }} className='cursor-pointer'>
                          <lord-icon
                            src="https://cdn.lordicon.com/xyfswyxf.json"
                            trigger="hover"
                            style={{ "width": "25px", "height": "25px" }}>
                          </lord-icon>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </>
        }
      </div >
    </>
  )
}

export default Maneger
