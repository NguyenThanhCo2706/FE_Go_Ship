



const Profile = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <img src={process.env.PUBLIC_URL + "/images/person-icon.png"} alt="" />
        </div>
        <div className="col-8">ngu</div>
      </div>
    </div>
  )
}

export default Profile