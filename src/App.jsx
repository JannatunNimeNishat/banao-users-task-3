import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { BiUser } from "react-icons/bi";
import Lottie from "lottie-react";

import userImgStatic from './assets/user_description/userImg.png'
import loading_animation from './assets/loading/loading.json'

function App() {
  const [users, setUsers] = useState()

  const [singleUser, setSingleUser] = useState()

  const [loading, setLoading] = useState(true)

  const [userDetailsLoading, setUserDetailsLoading] = useState(true)




  //loading all the users
  useEffect(() => {

    axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users')
      .then(data => {
        if (data.data) {

          setLoading(false)
          setUsers(data.data)
        }
        else {
          setUsers('no data found')
        }
      })

  
  }, [])



  //load initial user
  useEffect(() => {
    axios.get(`https://602e7c2c4410730017c50b9d.mockapi.io/users/17`)
      .then(data => {
        if (data.data) {
          setUserDetailsLoading(false)
          setSingleUser(data.data)
        }

      })
  }, [])




  // load single user data
  const handleSingleUserDetails = (id) => {
    setSingleUser('')
    setUserDetailsLoading(true)
    console.log(id);


    axios.get(`https://602e7c2c4410730017c50b9d.mockapi.io/users/${id}`)
      .then(data => {
        if (data.data) {
          //setLoading(false)
          setUserDetailsLoading(false)
          setSingleUser(data.data)
        }

      })

  }



  return (
    <div className="  font-medium ">
      {
        loading ?
          
          <div className="min-h-screen flex justify-center items-center">
            <Lottie className="w-80 h-80" animationData={loading_animation} loop={true} />

          </div>
          :
          <>
            {/* parent */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-10 mt-8">
              {/* users */}
              <div className="">
                <h3 className="capitalize text-center font-semibold  bg-[#C5DFFF] px-8 py-2 mb-5">USERS LIST</h3>

                {
                 
                  users?.map(user => <>
                    <div key={user.id}
                      className="border h-[66px] flex items-center gap-3 bg-[#ECECEC] hover:bg-[#D4D4D4]  px-2"
                      onClick={() => handleSingleUserDetails(user?.id)}
                    >

                      {
                        user?.profile?.firstName ?
                        <img className="h-[50px] w-[50px] rounded-full" src={user?.avatar} alt='user picture' />
                        :
                        <BiUser />
                      }

                      <p>{user?.profile?.firstName}</p>

                    </div>
                    <br />
                  </>)

                }


              </div>

              {/* users details */}
              <>
                
                  
                  <div className="lg:fixed  right-20   lg:h-[755px] lg:w-[502px]">

                    <h3 className="capitalize text-center font-semibold  bg-[#C5DFFF] px-8 py-2 mb-3">USER DETAILS</h3>

                    {

                      userDetailsLoading ?

                        <div className=" flex  items-center justify-center">
                          <Lottie className="" animationData={loading_animation} loop={true} />

                        </div>

                        :
                        // single User details
                        <div className="text-center font-medium">

                          <div className="w-[131px] h-[131px] mx-auto  rounded-full border ">


                            {
                              singleUser?.avatar ?
                                <img className="object-cover lg:w-[131px] lg:h-[131px]  rounded-full" src={singleUser?.avatar} alt="user img" />
                                :
                                <img className="object-cover h-full w-full" src={userImgStatic} alt="user img" />

                            }

                          </div>
                          <p className="mt-3">@{singleUser?.profile?.username}</p>

                          <p className=" lg:w-[304px] text-left  px-3 py-2 bg-[#DBDBDB] mt-5 mx-auto border-2 border-black rounded-lg" >
                            {singleUser.Bio}
                          </p>


                          {/* full name */}
                          <div className=" lg:w-[304px] mx-auto mt-2 ">

                            <div className="form-control ">
                              <label className="label">
                                <span className="label-text">Full Name</span>
                              </label>
                              <label className="input-group  bg-[#DBDBDB] py-2 px-2 border-2 border-black rounded-lg ">

                                <p>{singleUser?.profile?.firstName} {singleUser?.profile?.lastName}</p>
                              </label>
                            </div>

                          </div>

                          {/* job title */}
                          <div className=" lg:w-[304px] mx-auto ">

                            <div className="form-control ">
                              <label className="label">
                                <span className="label-text">Job Title</span>
                              </label>
                              <label className="input-group bg-[#DBDBDB] py-2 px-2 border-2 border-black rounded-lg ">

                                <p>{singleUser?.jobTitle}</p>
                              </label>
                            </div>

                          </div>

                          {/* Email */}
                          <div className=" lg:w-[304px] mx-auto ">

                            <div className="form-control ">
                              <label className="label">
                                <span className="label-text">Email</span>
                              </label>
                              <label className="input-group bg-[#DBDBDB] py-2 px-2 border-2 border-black rounded-lg ">

                                <p>{singleUser?.profile?.email}</p>
                              </label>
                            </div>

                          </div>



                        </div>


                    }

                   

                  </div>
                
              </>


            </div>
          </>
      }
    </div>
  )
}

export default App
