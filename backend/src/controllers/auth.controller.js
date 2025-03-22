function loginUser(req,res){
    res.send("login User");
}

function signUp(req,res){
    res.send("singup");
}

function logoutUser(req,res){
    res.send("logout");
}

export {loginUser, signUp, logoutUser};