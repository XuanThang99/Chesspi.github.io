async function signInWithPi(){
    try{
        const user = await PiSDK.signIn();
        localStorage.setItem('piUser', JSON.stringify(user));
        return user;
    }catch(e){
        alert("Đăng nhập thất bại: "+e.message);
    }
}
