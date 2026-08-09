const user={
    name:'Hedy lamarr',
  imageUrl: 'https://react.dev/images/docs/scientists/yXOvdOSs.jpg',
   imageSize:90,
};

function Profile (){
    return (
    <>
        <h1> {user.name}</h1>
        <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
      </>
      
    )
};
export default Profile;


    



    
    

    





    

