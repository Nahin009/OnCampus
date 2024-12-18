import POST from '@/server_actions/POST';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import React from 'react'

function google() {

  // const login = useGoogleLogin({
  //   onSuccess: (codeResponse) => console.log(codeResponse),
  //   flow: "auth-code",
  // });

  const handleCalender = async (credentialResponse: any) => {
    // const res = await POST("event/addToGoogleCalender", {
    //   id: event.id,
    //   response: credentialResponse,
    // });

    // if (res) {
    //   console.log(res);
    // }

    const postData = {
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: credentialResponse.credential,
    };
    
    const res = await POST('https://oauth2.googleapis.com/token', {
      data: postData,
    
    })
    console.log(res);
    

  };
  return (
    <div>
      <GoogleOAuthProvider clientId="646612884662-mugejqko8hqitnt2lt5ltr1mi0g9sr56.apps.googleusercontent.com">
                  {/* <Button
                    variant="text"
                    className="flex items-center gap-3"
                    placeholder={undefined}
                    onClick={() => useGoogleLogin({
                      onSuccess: (codeResponse) => console.log(codeResponse),
                      flow: "auth-code",
                    })}
                  >
                    Add to Google Calender 🚀
                  </Button> */}
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      console.log(credentialResponse);
                      handleCalender(credentialResponse);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </GoogleOAuthProvider>
    </div>
  )
}

export default google
